import { brand } from "@/brand";
import RestaurantSideBar from "./sidebar";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const name = (await params).id;
  return {
    title: `${brand.name} - ${name}`,
  };
};

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-neutral-50/50">
      <RestaurantSideBar />
        {children}
    </div>
  );
}