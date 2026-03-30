import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InterviewRound } from "@/data/mockInterviewData";

interface DomainSelectorProps {
    rounds: InterviewRound[];
    selectedDomain: string | null;
    onSelectDomain: (domain: string) => void;
    onStartTest: () => void;
}

const DomainSelector = ({
    rounds,
    selectedDomain,
    onSelectDomain,
    onStartTest,
}: DomainSelectorProps) => {
    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm">
                    <span className="text-4xl">📝</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Mock Interview Test
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Select an interview round and type. The AI will generate questions tailored for your choice.
                </p>
            </div>

            {/* 4 Rounds Grid */}
            <div className="space-y-6">
                {rounds.map((round) => (
                    <Card
                        key={round.id}
                        className="p-6 border-2 border-border bg-card/50 overflow-hidden"
                    >
                        {/* Round Header */}
                        <div className="flex items-center gap-4 mb-5">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 text-primary">
                                <span className="text-2xl">{round.icon}</span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                                        Round {round.roundNumber}
                                    </span>
                                    <h2 className="text-xl font-bold text-foreground">
                                        {round.title}
                                    </h2>
                                </div>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    {round.description}
                                </p>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                            {round.options.map((option) => {
                                const isSelected = selectedDomain === option.domain;
                                return (
                                    <Card
                                        key={option.domain}
                                        onClick={() => onSelectDomain(option.domain)}
                                        className={`
                                            relative p-4 cursor-pointer transition-all duration-300
                                            border-2 group overflow-hidden hover:scale-[1.02]
                                            ${isSelected
                                                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                                                : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                                            }
                                        `}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-2 right-2">
                                                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                                    <svg className="w-3 h-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        )}
                                        <div className="relative z-10 space-y-2">
                                            <span className="text-2xl">{option.icon}</span>
                                            <h3 className="text-sm font-semibold text-foreground">
                                                {option.label}
                                            </h3>
                                            {option.description && (
                                                <p className="text-xs text-muted-foreground line-clamp-2">
                                                    {option.description}
                                                </p>
                                            )}
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </Card>
                ))}
            </div>

            {/* Start Test Button */}
            <div className="flex flex-col items-center gap-4">
                <Button
                    size="lg"
                    onClick={onStartTest}
                    disabled={!selectedDomain}
                    className={`
                        px-10 py-6 text-lg fixed bottom-8 left-1/2 -translate-x-1/2 font-semibold rounded-xl transition-all duration-300
                        ${selectedDomain
                            ? 'bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 shadow-lg hover:shadow-primary/25'
                            : 'opacity-50'
                        }
                    `}
                >
                    {selectedDomain ? '🚀 Start Test' : 'Select a type above to start'}
                </Button>
                <p className="text-sm text-muted-foreground/70">
                    ⚠️ Once you start, navigation will be disabled until test completion
                </p>
            </div>
        </div>
    );
};

export default DomainSelector;
