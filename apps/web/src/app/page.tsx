import Image from "next/image";
import Link from "next/link";
import {discordInvite,getServerStatus} from "@/lib/api";
export const dynamic="force-dynamic";
export default async function Home(){
 const status=await getServerStatus(), invite=discordInvite();
 return <>
  <section className="hero"><div className="crest-bg"><Image src="/mark.svg" width={340} height={340} alt=""/></div>
   <div className="container hero-inner"><p className="eyebrow">THAILAND · COMMUNITY SURVIVAL · ALPHA 0.1</p>
    <h1>RULE THE WILD.<br/><em>LEAVE A LEGACY.</em></h1>
    <p>ทุกฝูงมีเรื่องเล่า ค้นหาเพื่อนร่วมทาง สร้างฝูง และร่วมออกแบบชุมชน PRIMAL CROWN ที่ยุติธรรมสำหรับทุกคน</p>
    <div className="actions"><Link className="btn primary" href="/parties">Find Your Pack →</Link>
     {invite?<a className="btn outline" href={invite} target="_blank" rel="noopener noreferrer">Join the Community</a>:<span className="btn disabled">Discord coming soon</span>}
    </div><small>Under construction · No live The Isle server is claimed online</small>
   </div>
  </section>
  <section className="container status-bar"><div><span className="eyebrow">LIVE INFRASTRUCTURE</span><h2>Golden Server Status</h2>
   <p>Current API state · game integration not yet enabled</p></div>
   <strong className={"status "+(status.status==="online"?"live":"")}>{status.status.toUpperCase()}</strong>
   <span>PLAYERS <b>{status.players===null?"— / —":status.players+" / "+(status.maxPlayers??"—")}</b></span></section>
  <section className="container sections"><div className="section-head"><span className="eyebrow">THE GOLDEN DIFFERENCE</span>
   <h2>MORE THAN A SERVER.</h2><p>ออกแบบเพื่อให้ผู้เล่นหาเพื่อนได้ง่าย สร้างประวัติฝูง และอยู่ร่วมกันอย่างยุติธรรม</p></div>
   <div className="cards">
    <article><span className="eyebrow">01 / THE PACK</span><div className="ornament">♛</div><h3>HERDOS</h3><p>ระบบฝูงถาวรและประวัติร่วมกัน อยู่ใน Roadmap หลัง Alpha Foundation</p></article>
    <article><span className="eyebrow">02 / FIND YOUR ALLIES</span><div className="ornament">◇</div><h3>PARTY FINDER</h3><p>วางแผนหาตี้ผ่าน Discord และ API ไม่ใช่การสร้างกลุ่มในเกมอัตโนมัติ</p></article>
    <article><span className="eyebrow">03 / BUILD A STORY</span><div className="ornament">✧</div><h3>THE LEGACY</h3><p>ระบบฤดูกาลและกิจกรรมที่ไม่มี Pay-to-Win จะตามมาในระยะถัดไป</p></article>
   </div>
  </section><section className="cta"><div className="container cta-row"><div><span className="eyebrow">YOUR LEGACY STARTS HERE</span>
   <h2>NO ONE SURVIVES ALONE.</h2><p>เริ่มสร้างเรื่องราวกับเพื่อนร่วมฝูงของท่าน</p></div><Link className="btn primary" href="/parties">Explore Parties →</Link></div></section>
 </>;
}
