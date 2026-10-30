import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import HowItWorks from "@/components/home/HowItWorks";
import Divisions from "@/components/home/Divisions";
import StatsBand from "@/components/home/StatsBand";
import RecentIssues from "@/components/home/RecentIssues";
import Faq from "@/components/home/Faq";
import CtaBand from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <HowItWorks />
      <Divisions />
      <StatsBand />
      <RecentIssues />
      <Faq />
      <CtaBand />
    </>
  );
}
