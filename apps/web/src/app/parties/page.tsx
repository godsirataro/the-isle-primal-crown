import type {Metadata} from "next";
import {discordInvite,getParties} from "@/lib/api";
export const metadata:Metadata={title:"Find a Party"};
export const dynamic="force-dynamic";
export default async function Parties(){
 const {available,items}=await getParties(), invite=discordInvite();
 return <section className="container interior"><span className="eyebrow">FIND YOUR PACK</span><h1>PARTY FINDER</h1>
  <p className="lead">ปาร์ตี้ที่สร้างผ่าน Discord Bot ใช้เพื่อนัดเล่นร่วมกัน ไม่ใช่ Native Group ในเกม</p>
  {!available&&<p className="notice">Party API is unavailable. Please try again later.</p>}
  {available&&items.length===0&&<div className="empty"><h2>NO PARTIES YET</h2><p>เมื่อ Discord Bot เปิดใช้งาน จะสร้างปาร์ตี้ด้วย /party create ได้</p></div>}
  <div className="cards party-list">{items.map(p=><article key={p.id}><span className="eyebrow">COMMUNITY PARTY</span><h3>{p.species}</h3>
   <p>{p.description||"Looking for survivors"}</p><div className="party-footer"><span>{p.memberCount}/{p.maxMembers} members</span><code>{p.id.slice(0,8)}</code></div>
  </article>)}</div>
  {invite?<a className="btn primary" href={invite} target="_blank" rel="noopener noreferrer">Open Discord →</a>:<p className="muted">Discord invite will be published for the alpha community.</p>}
 </section>;
}
