import { Metadata } from "next";
import Parent from "./components/client/parent";
export const metadata: Metadata = {
  title: "FudStack - The Chef's key to seamless workflow",
  description: "An AI powered multi-tenant e-commerce app making workflows in restaurants fast , reliable and seamless",
};
export default function Home() {
  return (
    <>
   <section className="overflow-x-hidden overflow-y-auto">
   <Parent/>
    </section> 
    </>
  );
}
