import assert from "node:assert/strict";
import {spawn} from "node:child_process";

const base="http://127.0.0.1:4000/v1";
const token=process.env.INTERNAL_API_TOKEN;
if(!token||!process.env.DATABASE_URL)throw new Error("CI test needs DATABASE_URL and INTERNAL_API_TOKEN");
const server=spawn(process.execPath,["apps/api/dist/main.js"],{env:{...process.env,API_PORT:"4000",WEB_ORIGIN:"http://localhost:3000"},stdio:["ignore","pipe","pipe"]});
let output="";
server.stdout.on("data",d=>output+=String(d));
server.stderr.on("data",d=>output+=String(d));
async function call(path,{method="GET",body,auth=true}={}){
 const headers={"content-type":"application/json",...(auth?{authorization:"Bearer "+token}:{})};
 const r=await fetch(base+path,{method,headers,body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(4000)});
 let data={};
 try{data=await r.json();}catch{}
 return {status:r.status,data};
}
async function main(){
 let ready=false;
 for(let i=0;i<40;i++){
  if(server.exitCode!==null)throw new Error("API exited early: "+output);
  try{const r=await call("/ready");if(r.status===200){ready=true;break;}}catch{}
  await new Promise(resolve=>setTimeout(resolve,250));
 }
 assert.equal(ready,true,"API ready, logs: "+output);
 const health=await call("/health");assert.equal(health.data.status,"ok");
 const game=await call("/servers/status");assert.equal(game.data.status,"unconfigured");
 const unauthorized=await call("/parties",{method:"POST",body:{},auth:false});assert.equal(unauthorized.status,401);
 const leader="123456789012345678",member="223456789012345678";
 const created=await call("/parties",{method:"POST",body:{species:"Carnotaurus",description:"CI test",maxMembers:3,creatorDiscordId:leader}});
 assert.equal(created.status,201,JSON.stringify(created.data));assert.ok(created.data.id);
 const id=created.data.id;
 const joined=await call("/parties/"+id+"/join",{method:"POST",body:{discordUserId:member}});
 assert.equal(joined.status,201);assert.equal(joined.data.memberCount,2);
 const listed=await call("/parties");assert.equal(listed.status,200);
 assert.equal(listed.data.find(p=>p.id===id).memberCount,2);
 const wrongCloser=await call("/parties/"+id+"/close",{method:"POST",body:{discordUserId:member}});
 assert.equal(wrongCloser.status,403);
 const closed=await call("/parties/"+id+"/close",{method:"POST",body:{discordUserId:leader}});
 assert.equal(closed.status,201);
 const after=await call("/parties");assert.equal(after.data.some(p=>p.id===id),false);
 console.log("PASS: health, readiness, honest game status, auth, create/join/list/close and owner protection");
}
try{await main();}catch(e){console.error(e,output);process.exitCode=1;}
finally{server.kill("SIGTERM");}
