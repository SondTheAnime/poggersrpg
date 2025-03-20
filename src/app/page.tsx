import { HeroSection } from "@/components/home/HeroSection";
import { FeatureSection } from "@/components/home/FeatureSection";
import { SchoolsSection } from "@/components/home/SchoolsSection";
import { HomeBackgroundEffects } from "@/components/home/HomeBackgroundEffects";
import { Footer } from "@/components/magias/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a0d2c] to-[#0f0a1e] text-white overflow-hidden relative">
      <HomeBackgroundEffects />

      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen relative z-10">
        <HeroSection />
        <FeatureSection />
        <SchoolsSection />
      </main>

      <Footer />
    </div>
  );
}
