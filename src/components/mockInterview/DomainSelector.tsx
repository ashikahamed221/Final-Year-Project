import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DomainQuestions } from "@/data/mockInterviewData";

interface DomainSelectorProps {
    domains: DomainQuestions[];
    selectedDomain: string | null;
    onSelectDomain: (domain: string) => void;
    onStartTest: () => void;
}

const DomainSelector = ({
    domains,
    selectedDomain,
    onSelectDomain,
    onStartTest,
}: DomainSelectorProps) => {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm">
                    <span className="text-4xl">📝</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Mock Interview Test
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Select your interview domain and test your knowledge with behavior-aware MCQ assessment
                </p>
            </div>

            {/* Domain Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {domains.map((domain) => (
                    <Card
                        key={domain.domain}
                        onClick={() => onSelectDomain(domain.domain)}
                        className={`
              relative p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]
              border-2 group overflow-hidden
              ${selectedDomain === domain.domain
                                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                                : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                            }
            `}
                    >
                        {/* Background glow effect */}
                        <div className={`
              absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300
            `} />

                        {/* Selected indicator */}
                        {selectedDomain === domain.domain && (
                            <div className="absolute top-3 right-3">
                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                    <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        )}

                        <div className="relative z-10 space-y-3">
                            <div className="text-4xl mb-2">{domain.icon}</div>
                            <h3 className="text-lg font-semibold text-foreground">
                                {domain.label}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {domain.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="px-2 py-1 rounded-full bg-secondary">
                                    {domain.questions.length} questions
                                </span>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Start Test Button */}
            <div className="flex justify-center">
                <Button
                    size="lg"
                    onClick={onStartTest}
                    disabled={!selectedDomain}
                    className={`
            px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300
            ${selectedDomain
                            ? 'bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg hover:shadow-primary/25'
                            : 'opacity-50'
                        }
          `}
                >
                    {selectedDomain ? '🚀 Start Test' : 'Select a Domain'}
                </Button>
            </div>

            {/* Warning notice */}
            <div className="text-center">
                <p className="text-sm text-muted-foreground/70">
                    ⚠️ Once you start, navigation will be disabled until test completion
                </p>
            </div>
        </div>
    );
};

export default DomainSelector;
