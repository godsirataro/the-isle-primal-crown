import "reflect-metadata";
import "dotenv/config";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./module";
async function bootstrap(){
 const app=await NestFactory.create(AppModule,{bodyParser:true});
 app.setGlobalPrefix("v1");
 app.enableCors({origin:process.env.WEB_ORIGIN?.split(",")??["http://localhost:3000"],methods:["GET","POST"]});
 app.enableShutdownHooks();
 const port=Number(process.env.API_PORT??4000);
 await app.listen(port,"0.0.0.0");
 console.log("PRIMAL CROWN API listening on",port);
}
bootstrap().catch(e=>{console.error(e);process.exitCode=1;});
