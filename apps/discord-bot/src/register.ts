import "dotenv/config";
import {REST,Routes} from "discord.js";
import {commands} from "./commands";
async function main(){
 const token=process.env.DISCORD_BOT_TOKEN,id=process.env.DISCORD_APPLICATION_ID,guild=process.env.DISCORD_TEST_GUILD_ID;
 if(!token||!id||!guild)throw new Error("Set DISCORD_BOT_TOKEN, DISCORD_APPLICATION_ID and DISCORD_TEST_GUILD_ID");
 const rest=new REST({version:"10"}).setToken(token);
 await rest.put(Routes.applicationGuildCommands(id,guild),{body:commands});
 console.log("Registered",commands.length,"slash commands in test guild",guild);
}
main().catch(e=>{console.error(e);process.exitCode=1;});
