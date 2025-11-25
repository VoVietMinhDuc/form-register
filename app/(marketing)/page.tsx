import { PhoenixNavbar } from "@/components/navigation/PhoenixNavbar";
import { HeroSection } from "@/sections/HeroSection";
import { FeaturedBlogSection } from "@/sections/FeaturedBlogSection";
import { MotionCarouselSection } from "@/sections/MotionCarouselSection";
import { FeatureSection } from "@/sections/FeatureSection";
import { ShowcaseSection } from "@/sections/ShowcaseSection";
import { CTASection } from "@/sections/CTASection";
import { BackToTopButton } from "@/components/shared/BackToTopButton";

export default function Home() {
  return (
    <main className="relative mx-auto max-w-[1200px] px-4 pb-16 pt-4 md:px-6">
      <PhoenixNavbar />
      <div className="mt-16 flex flex-col gap-16">
        <HeroSection />
        <ShowcaseSection />
        <FeaturedBlogSection />
        <MotionCarouselSection />
        {/* <FeatureSection /> */}
        {/* <CTASection /> */}
      </div>
      <footer className="mt-16 text-center text-xs uppercase tracking-[0.4em] text-white/50">
        © 2025 Phoenix House
        <br />
        <a
          href="https://www.facebook.com/phoenixhousefptuhcmc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-white/70 hover:text-[#ff6b00] transition"
        >
          Fanpage: The Flaming Chickens
        </a>
      </footer>
      <BackToTopButton />
    </main>
  );
}
