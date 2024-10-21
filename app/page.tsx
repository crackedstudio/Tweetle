"use client";
import { createPortal } from "react-dom";
import ConnectButton from "./components/connect-button";
import GameTitle from "./components/game-title";
import PoweredBy from "./components/powered-by";
import LoadingFullPage from "./components/laoding-full-page";
import HomeHeroSection from "./components/home-hero-section";
import HomeStats from "./components/home-stats";
import DailyChallengeCard from "./components/daily-challenge-card";

export default function Home() {
  return (
    <div className="h-full overflow-auto">
      <HomeHeroSection />
      <div className="bg-black p-4 flex flex-col gap-y-5">
        <HomeStats />
        <DailyChallengeCard />
        <DailyChallengeCard />
      </div>
    </div>
  );
}
