import type {Metadata} from "next";
import Nav from "@/components/Nav";
import "./globals.css";
export const metadata:Metadata={
 title:{default:"PRIMAL CROWN | Every Herd Has a Legacy",template:"%s | PRIMAL CROWN"},
 description:"Thailand-first dinosaur survival community. Find a pack, build a legacy, play fair. Alpha development.",
 robots:{index:false,follow:false}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
 return <html lang="th"><body><Nav/><main>{children}</main><footer><div className="container foot">
  <span>© {new Date().getFullYear()} PRIMAL CROWN</span><span>Alpha 0.1 · Community-led · Fair play</span>
  <span>Unofficial community. Not affiliated with The Isle or Afterthought.</span>
 </div></footer></body></html>;
}
