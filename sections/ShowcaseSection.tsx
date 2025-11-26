import { GradientText, BackgroundGrid, Spotlight } from "@/components/magicui";
import memberImages from "@/data/phoenixMembers";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export function ShowcaseSection() {
  return (
    <section
      id="member"
      aria-labelledby="showcase-title"
      className="phoenix-section relative mt-24 overflow-hidden rounded-[32px] border border-white/10 bg-linear-to-br from-[#120101] via-[#050505] to-[#1a0a00] px-6 py-20 md:px-16"
    >
      <BackgroundGrid className="opacity-60" />
      <Spotlight
        className="top-0 right-1/2"
        color="rgba(255,255,255,0.2)"
        size={360}
      />
      <Spotlight
        className="bottom-[-120px] left-12 opacity-60"
        color="rgba(255,107,0,0.5)"
        size={420}
      />

      <div className="relative z-10 mb-16 text-center">
        <p className="text-sm uppercase tracking-[0.5em] text-white/60">
          Phoenix House's Members
        </p>
        <h2
          id="showcase-title"
          className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl"
        >
          <GradientText className="text-4xl p-2 font-black md:text-5xl">
            ĐỘI HÌNH PHOENIX 2025
          </GradientText>
        </h2>
        <p className="mt-4 text-lg text-white/80 md:text-xl">
          47 thành viên – Khí chất dẫn đầu, đoàn kết và bùng nổ!
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl rounded-3xl bg-gray-950/5 p-2 ring-1 ring-neutral-700/10 dark:bg-neutral-800/50">
        <div className="relative h-[600px] w-full overflow-hidden md:h-[800px]">
          <ThreeDMarquee images={memberImages} />
        </div>
      </div>
    </section>
  );
}
