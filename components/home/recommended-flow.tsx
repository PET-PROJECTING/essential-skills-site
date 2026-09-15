import { recommendedFlow } from "@/lib/home-data";
import { RecommendedFlowContrast } from "@/components/home/recommended-flow-contrast";
import { RecommendedFlowPipeline } from "@/components/home/recommended-flow-pipeline";

export function RecommendedFlow() {
  const { filesVsChat } = recommendedFlow;

  return (
    <section
      id="workflow"
      className="relative flex w-full flex-col border-b border-border"
    >
      <div className="flex flex-col gap-8 px-5 py-14 sm:gap-10 sm:px-10 sm:py-16 lg:px-20 lg:py-20">
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
            {recommendedFlow.title}
          </h2>
          <p className="max-w-3xl font-text text-sm text-muted">
            {recommendedFlow.subtitle}
          </p>
        </div>
        <RecommendedFlowPipeline />
      </div>

      <div className="flex flex-col gap-8 border-t border-border px-5 py-14 sm:px-10 sm:py-16 lg:px-20 lg:py-20">
        <div className="flex max-w-3xl flex-col gap-4">
          <p className="font-mono text-xs uppercase leading-4 text-muted">
            {filesVsChat.title}
          </p>
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
            {filesVsChat.headline}
          </h3>
          {filesVsChat.intro.map((paragraph) => (
            <p
              key={paragraph}
              className="font-text text-sm leading-relaxed text-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <RecommendedFlowContrast />
      </div>
    </section>
  );
}
