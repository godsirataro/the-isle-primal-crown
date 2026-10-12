import {CanActivate,ExecutionContext,Injectable,UnauthorizedException} from "@nestjs/common";
import {timingSafeEqual} from "node:crypto";
@Injectable()
export class BotAuthGuard implements CanActivate{
 canActivate(context:ExecutionContext):boolean{
  const token=process.env.INTERNAL_API_TOKEN;
  if(!token||token.length<32||token.startsWith("replace-"))throw new UnauthorizedException("bot token not configured");
  const request=context.switchToHttp().getRequest<{headers:{authorization?:string}}>();
  const supplied=request.headers.authorization?.startsWith("Bearer ")?request.headers.authorization.slice(7):"";
  const a=Buffer.from(supplied),b=Buffer.from(token);
  if(a.length!==b.length||!timingSafeEqual(a,b))throw new UnauthorizedException("invalid bot token");
  return true;
 }
}
