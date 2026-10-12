import "dotenv/config";
export type Party={id:string;species:string;description:string;memberCount:number;maxMembers:number};
export type GameStatus={name:string;status:string;players:number|null;maxPlayers:number|null};
export async function api<T>(path:string, method:"GET"|"POST"="GET",body?:unknown):Promise<T>{
 const base=process.env.API_BASE_URL??"http://localhost:4000";
 const token=process.env.INTERNAL_API_TOKEN;
 if(method==="POST"&&(!token||token.length<32))throw new Error("INTERNAL_API_TOKEN not configured");
 const res=await fetch(base+"/v1"+path,{method,
  headers:{"content-type":"application/json",...(method==="POST"?{"authorization":"Bearer "+token}:{})},
  body:method==="POST"?JSON.stringify(body):undefined,signal:AbortSignal.timeout(6000)});
 if(!res.ok){
  const detail=await res.json().catch(()=>({message:"request failed"})) as {message?:string};
  throw new Error(typeof detail.message==="string"?detail.message:"API error "+res.status);
 }
 return await res.json() as T;
}
