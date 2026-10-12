import {Controller,Get,ServiceUnavailableException} from "@nestjs/common";
import {DbService} from "./db";
@Controller()
export class HealthController{
 constructor(private readonly db:DbService){}
 @Get("health") health(){return {status:"ok",service:"primal-crown-api",version:"alpha-0.1",gameConnected:false};}
 @Get("ready") async ready(){
  try{await this.db.query("SELECT 1");return {status:"ready",database:"ok"};}
  catch{throw new ServiceUnavailableException("database not ready");}
 }
}
@Controller("servers")
export class ServerController{
 @Get("status") status(){
  // Do not imply connection to The Isle until a verified adapter is installed.
  return {name:process.env.GAME_SERVER_NAME??"PRIMAL CROWN",status:"unconfigured" as const,
   players:null,maxPlayers:null,lastCheckedAt:null,source:"not_connected"};
 }
}
