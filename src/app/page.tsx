import type { Metadata } from "next";
import { TrackDivider } from "@/components/Decor";
import { Hero } from "@/components/home/Hero";
import { Departures, GamesRoom, Station, TicketCounter, Visit } from "@/components/home/Sections";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Departures />
      <Station />
      <TrackDivider />
      <TicketCounter />
      <GamesRoom />
      <TrackDivider tone="dark" className="bg-depot" />
      <Visit />
    </>
  );
}
