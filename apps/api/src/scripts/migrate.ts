import "dotenv/config";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import {Client} from "pg";
async function main(){
 if(!process.env.DATABASE_URL)throw new Error("DATABASE_URL is required");
 const db=new Client({connectionString:process.env.DATABASE_URL});
 await db.connect();
 try{
  const migration="001_parties.sql";
  const sql=readFileSync(join(process.cwd(),"db/migrations",migration),"utf8");
  await db.query("BEGIN");
  // Migration is repeatable (IF NOT EXISTS); record it transactionally.
  await db.query(sql);
  await db.query("INSERT INTO schema_migrations(id) VALUES($1) ON CONFLICT DO NOTHING",[migration]);
  await db.query("COMMIT");
  console.log("Applied migration:",migration);
 }catch(e){await db.query("ROLLBACK");throw e;}finally{await db.end();}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
