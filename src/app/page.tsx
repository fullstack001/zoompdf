import Navbar from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ToolsGrid from "@/components/landing/ToolsGrid";
import HowItWorks from "@/components/landing/HowItWorks";
import FeatureCTA from "@/components/landing/FeatureCTA";
import WhyUs from "@/components/landing/WhyUs";
import CoreValues from "@/components/landing/CoreValues";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="bg-gray-50">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <ToolsGrid />   
      <FeatureCTA />
      <WhyUs />
      <CoreValues />
      <FAQ />
      <Footer />
    </main>
  );
}