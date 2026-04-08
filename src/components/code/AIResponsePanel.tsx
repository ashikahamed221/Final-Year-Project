interface AIReviewResponse {
  logicExplanation?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  mistakes?: string[];
  betterApproach?: string;
  improvedCode?: string;
}

interface AIResponsePanelProps {
  response?: AIReviewResponse | null;
  isLoading?: boolean;
  error?: string | null;
}

const SectionCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-lg border border-border/60 bg-card/50 p-4">
    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

const AIResponsePanel = ({ response, isLoading = false, error = null }: AIResponsePanelProps) => {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold">AI Review Response</h2>
      </div>

      <div className="h-[520px] overflow-y-auto pr-1">
        {isLoading && (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Reviewing your code...
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500">
            {error}
          </div>
        )}

        {!isLoading && !error && !response && (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Submit your code to see AI feedback.
          </div>
        )}

        {!isLoading && !error && response && (
          <div className="space-y-3">
            <SectionCard title="Logic Explanation">
              {response.logicExplanation || "Not available."}
            </SectionCard>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SectionCard title="Time Complexity">
                {response.timeComplexity || "Not available."}
              </SectionCard>
              <SectionCard title="Space Complexity">
                {response.spaceComplexity || "Not available."}
              </SectionCard>
            </div>

            <SectionCard title="Mistakes">
              {response.mistakes && response.mistakes.length > 0 ? (
                <ul className="list-disc space-y-1 pl-5">
                  {response.mistakes.map((mistake, index) => (
                    <li key={`${mistake}-${index}`}>{mistake}</li>
                  ))}
                </ul>
              ) : (
                "No major mistakes found."
              )}
            </SectionCard>

            <SectionCard title="Better Approach">
              {response.betterApproach || "Not available."}
            </SectionCard>

            <SectionCard title="Improved Code">
              {response.improvedCode ? (
                <pre className="overflow-x-auto rounded-md bg-background p-3 text-xs">
                  <code>{response.improvedCode}</code>
                </pre>
              ) : (
                "Not available."
              )}
            </SectionCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIResponsePanel;

