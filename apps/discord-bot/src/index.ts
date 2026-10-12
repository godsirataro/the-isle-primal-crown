import "dotenv/config";
import {ChatInputCommandInteraction,Client,GatewayIntentBits} from "discord.js";
import {api,GameStatus,Party} from "./api";

async function handle(i:ChatInputCommandInteraction){
 await i.deferReply({ephemeral:true});
 try{
  if(i.commandName==="help"){
   await i.editReply("PRIMAL CROWN Alpha 0.1\n/server — status\n/party list — find groups\n/party create — create a planning group\n/party join — join by ID\n/party close — close your group\n\nThese are community planning groups, not native The Isle groups.");
   return;
  }
  if(i.commandName==="server"){
   const s=await api<GameStatus>("/servers/status");
   const players=s.players===null?"not connected":s.players+"/"+(s.maxPlayers??"?");
   await i.editReply("**"+s.name+"**\nStatus: **"+s.status+"**\nPlayers: "+players+"\nLive integration is not yet enabled.");
   return;
  }
  if(i.commandName!=="party")return;
  const sub=i.options.getSubcommand();
  if(sub==="list"){
   const parties=await api<Party[]>("/parties");
   if(!parties.length){await i.editReply("No open parties. Try /party create");return;}
   await i.editReply(parties.slice(0,10).map(p=>"**"+p.species+"** ("+p.memberCount+"/"+p.maxMembers+") — `"+p.id+"`").join("\n"));
   return;
  }
  if(sub==="create"){
   const species=i.options.getString("species",true);
   const maxMembers=i.options.getInteger("max_members",true);
   const description=i.options.getString("description")??"";
   const p=await api<Party>("/parties","POST",{species,maxMembers,description,creatorDiscordId:i.user.id});
   await i.editReply("Community party created for **"+p.species+"**.\nID: `"+p.id+"`\nUse /party join to invite survivors. Remember game species group limits.");
   return;
  }
  if(sub==="join"||sub==="close"){
   const id=i.options.getString("id",true);
   const endpoint="/parties/"+encodeURIComponent(id)+"/"+sub;
   const result=await api<{partyId:string}>(endpoint,"POST",{discordUserId:i.user.id});
   await i.editReply(sub==="join"?"Joined party `"+result.partyId+"`. Meet in-game and form the native group normally.":"Closed party `"+result.partyId+"`.");
  }
 }catch(err){
  const message=err instanceof Error?err.message:"Unknown error";
  await i.editReply("Could not complete request: "+message.slice(0,300));
 }
}
async function main(){
 const token=process.env.DISCORD_BOT_TOKEN;
 if(!token)throw new Error("DISCORD_BOT_TOKEN is required");
 const bot=new Client({intents:[GatewayIntentBits.Guilds]});
 bot.once("ready",()=>console.log("PRIMAL CROWN Discord bot ready as",bot.user?.tag));
 bot.on("interactionCreate",async interaction=>{
  if(!interaction.isChatInputCommand())return;
  await handle(interaction).catch(e=>console.error("Discord interaction failed:",e));
 });
 await bot.login(token);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
