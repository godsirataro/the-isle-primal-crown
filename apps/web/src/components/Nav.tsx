import Link from "next/link";
import Image from "next/image";
import {discordInvite} from "@/lib/api";
export default function Nav(){
 const invite=discordInvite();
 return <header className="topbar"><div className="container nav-row">
   <Link href="/" className="brand"><Image src="/mark.svg" alt="PRIMAL CROWN" width={48} height={48}/><span>PRIMAL CROWN<small>EVERY HERD HAS A LEGACY</small></span></Link>
   <nav aria-label="Main navigation"><Link href="/">Home</Link><Link href="/parties">Find a Party</Link><Link href="/membership">Membership</Link></nav>
   {invite?<a href={invite} target="_blank" rel="noopener noreferrer" className="btn outline">Join Discord ↗</a>:<span className="muted">Discord opening soon</span>}
 </div></header>;
}
