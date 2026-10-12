import {Module} from "@nestjs/common";
import {DbService} from "./db";
import {HealthController,ServerController} from "./status";
import {PartiesController} from "./parties";
import {BotAuthGuard} from "./security";
@Module({controllers:[HealthController,ServerController,PartiesController],providers:[DbService,BotAuthGuard]})
export class AppModule{}
