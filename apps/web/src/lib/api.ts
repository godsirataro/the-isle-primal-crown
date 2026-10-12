export type ServerStatus = {
 name:string;status:"unconfigured"|"unknown"|"online"|"offline"|"maintenance";
 players:number|null;maxPlayers:number|null;lastCheckedAt:string|null;
};
export type Party = {id:string;species:string;description:string;maxMembers:number;memberCount:number;creatorDiscordId:string;createdAt:string};
const base=process.env.API_INTERNAL_URL??"http://localhost:4000";
async function get<T>(path:string):Promise<T>{
 const r=await fetch(base+path,{cache:"no-store",signal:AbortSignal.timeout(2500)});
 if(!r.ok) throw new Error("API unavailable");
 return r.json() as Promise<T>;
}
export async function getServerStatus():Promise<ServerStatus>{
 try{return await get<ServerStatus>("/v1/servers/status");}
 catch{return {name:"PRIMAL CROWN",status:"unknown",players:null,maxPlayers:null,lastCheckedAt:null};}
}
export async function getParties():Promise<{available:boolean;items:Party[]}>{
 try{return {available:true,items:await get<Party[]>("/v1/parties")};}
 catch{return {available:false,items:[]};}
}
export function discordInvite(){
 const u=process.env.NEXT_PUBLIC_DISCORD_INVITE_URL??"";
 return /^https:\/\/(discord\.gg|discord\.com\/invite)\/[a-zA-Z0-9_-]+\/?$/.test(u)?u:null;
}
