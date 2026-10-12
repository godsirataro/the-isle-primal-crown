import {BadRequestException,ConflictException,Controller,ForbiddenException,Get,NotFoundException,
 Param,Post,Body,UseGuards} from "@nestjs/common";
import {DbService} from "./db";
import {BotAuthGuard} from "./security";
import {validDiscordId,validDescription,validMemberLimit,validSpecies} from "./validation";
type CreateBody={species?:unknown;description?:unknown;maxMembers?:unknown;creatorDiscordId?:unknown};
type MemberBody={discordUserId?:unknown};
const isUuid=(v:string)=>/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
@Controller("parties")
export class PartiesController{
 constructor(private readonly db:DbService){}
 @Get() async list(){
  const r=await this.db.query(
   `SELECT p.id,p.species,p.description,p.max_members AS "maxMembers",
   p.created_at AS "createdAt",COUNT(m.discord_user_id)::int AS "memberCount"
   FROM parties p LEFT JOIN party_members m ON m.party_id=p.id
   WHERE p.status='open' GROUP BY p.id ORDER BY p.created_at DESC LIMIT 50`);
  return r.rows;
 }
 @Post()
 @UseGuards(BotAuthGuard)
 async create(@Body() body:CreateBody){
  if(!validSpecies(body.species)||!validMemberLimit(body.maxMembers)||!validDiscordId(body.creatorDiscordId)
    ||(body.description!==undefined&&!validDescription(body.description)))
   throw new BadRequestException("invalid species, member limit, description or Discord user ID");
  const species=body.species.trim(),desc=typeof body.description==="string"?body.description.trim():"";
  const c=await this.db.connect();
  try{
   await c.query("BEGIN");
   const r=await c.query<{id:string}>(`INSERT INTO parties(species,description,max_members,creator_discord_id)
    VALUES($1,$2,$3,$4) RETURNING id`,[species,desc,body.maxMembers,body.creatorDiscordId]);
   const id=r.rows[0].id;
   await c.query("INSERT INTO party_members(party_id,discord_user_id) VALUES($1,$2)",[id,body.creatorDiscordId]);
   await c.query("COMMIT");return {id,species,description:desc,maxMembers:body.maxMembers,memberCount:1};
  }catch(e){await c.query("ROLLBACK");throw e;}finally{c.release();}
 }
 @Post(":id/join")
 @UseGuards(BotAuthGuard)
 async join(@Param("id") id:string,@Body() body:MemberBody){
  if(!isUuid(id)||!validDiscordId(body.discordUserId))throw new BadRequestException("invalid party or Discord user ID");
  const c=await this.db.connect();
  try{
   await c.query("BEGIN");
   const p=await c.query<{max_members:number;status:string}>(
    "SELECT max_members,status FROM parties WHERE id=$1 FOR UPDATE",[id]);
   if(!p.rowCount||p.rows[0].status!=="open")throw new NotFoundException("party not available");
   const existed=await c.query("SELECT 1 FROM party_members WHERE party_id=$1 AND discord_user_id=$2",
    [id,body.discordUserId]);
   const count=await c.query<{total:number}>(
    "SELECT COUNT(*)::int AS total FROM party_members WHERE party_id=$1",[id]);
   if(!existed.rowCount&&count.rows[0].total>=p.rows[0].max_members)throw new ConflictException("party full");
   if(!existed.rowCount)await c.query(
    "INSERT INTO party_members(party_id,discord_user_id) VALUES($1,$2)",[id,body.discordUserId]);
   await c.query("COMMIT");
   return {partyId:id,joined:true,memberCount:count.rows[0].total+(existed.rowCount?0:1)};
  }catch(e){await c.query("ROLLBACK");throw e;}finally{c.release();}
 }
 @Post(":id/close")
 @UseGuards(BotAuthGuard)
 async close(@Param("id") id:string,@Body() body:MemberBody){
  if(!isUuid(id)||!validDiscordId(body.discordUserId))throw new BadRequestException("invalid party or Discord user ID");
  const result=await this.db.query<{creator_discord_id:string}>(
   "SELECT creator_discord_id FROM parties WHERE id=$1",[id]);
  if(!result.rowCount)throw new NotFoundException("party not found");
  if(result.rows[0].creator_discord_id!==body.discordUserId)throw new ForbiddenException("only creator may close party");
  await this.db.query("UPDATE parties SET status='closed' WHERE id=$1",[id]);
  return {partyId:id,closed:true};
 }
}
