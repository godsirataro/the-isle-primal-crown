import type {Metadata} from "next";
export const metadata:Metadata={title:"Membership Preview"};
const plans=[
 ["SURVIVOR",0,"Community access · Party Finder · Events"],
 ["HATCHLING",49,"Supporter badge · Profile border"],
 ["RAPTOR",99,"Hatchling + Profile themes"],
 ["ALPHA",299,"Raptor + Clan banner templates"],
 ["ELDER",499,"Alpha + Prestige recognition"],
 ["LEGEND",999,"Elder + Hall of Legends"]
] as const;
export default function Membership(){return <section className="container interior"><span className="eyebrow">SUPPORT THE LEGACY</span>
 <h1>GOLDEN MEMBERSHIP</h1><p className="lead">ทุกคนเล่นเท่าเทียมกัน ไม่มี Pay-to-Win</p>
 <div className="notice">PREVIEW ONLY — Billing is disabled until commercial permissions and payment-provider approval are confirmed.</div>
 <div className="cards memberships">{plans.map(([name,price,description],i)=><article key={name} className={i===2?"recommended":""}>
  <span className="eyebrow">TIER 0{i}</span><h3>{name}</h3><div className="tier">฿{price.toLocaleString("th-TH")} <small>{price?"/ MONTH":"FREE"}</small></div>
  <p>{description}</p><span className="disabled tier-disabled">NOT FOR SALE YET</span>
 </article>)}</div></section>;}
