import Image from "next/image";
import localFont from "next/font/local";
import UnknownComponent from "@/src/components/action-menu";
import { useState } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [options] = useState([
    { id: "base", label: "Button text", subtitle: "Price" },
    {
      id: "full",
      label: "Button text",
      subtitle: "Price",
      description: "An optional description",
      tags: ["Optional tag"],
    },
    { id: "desc-only", label: "Button text", description: "Description only" },
    { id: "tag-only", label: "Button text", tags: ["Tag only"] },
  ]);
  const sample = Array(10).fill(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores inventore eveniet atque dolore, eaque hic? Numquam vitae eum tempore sint, fugiat ullam aperiam odio alias! Provident consequuntur nihil natus officiis?"
  );
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] min-h-screen flex flex-col justify-between py-4`}
    >
      <UnknownComponent options={options} />
      <UnknownComponent options={options} />
      <UnknownComponent options={options} />
      <UnknownComponent options={options} />
    </div>
  );
}
