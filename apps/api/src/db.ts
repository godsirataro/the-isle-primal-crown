import {Injectable,OnModuleDestroy} from "@nestjs/common";
import {Pool,PoolClient} from "pg";
@Injectable()
export class DbService implements OnModuleDestroy{
 private readonly pool:Pool;
 constructor(){
  this.pool=new Pool({connectionString:process.env.DATABASE_URL,connectionTimeoutMillis:2500,max:10,
   ssl:process.env.DB_SSL==="require"?{rejectUnauthorized:true}:undefined});
 }
 query<T extends import("pg").QueryResultRow=import("pg").QueryResultRow>(text:string,values?:unknown[]){
  return this.pool.query<T>(text,values);
 }
 connect():Promise<PoolClient>{return this.pool.connect();}
 async onModuleDestroy(){await this.pool.end();}
}
