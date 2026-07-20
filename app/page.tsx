import { Metadata } from "next";
import Parent from "./components/client-components/parent";
import { brand } from "@/brand";
export const metadata: Metadata = {
  title: brand.name,
  description: brand.description,
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
