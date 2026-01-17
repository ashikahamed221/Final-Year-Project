import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface WarningDialogProps {
    isOpen: boolean;
    onDismiss: () => void;
}

const WarningDialog = ({ isOpen, onDismiss }: WarningDialogProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && onDismiss()}>
            <AlertDialogContent className="bg-card border-yellow-500/30">
                <AlertDialogHeader>
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-yellow-500/10 animate-pulse">
                            <AlertTriangle className="w-10 h-10 text-yellow-500" />
                        </div>
                    </div>
                    <AlertDialogTitle className="text-center text-xl text-yellow-400">
                        Please Read Carefully
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-muted-foreground space-y-2">
                        <p>
                            You're answering too quickly! Take your time to read the question properly.
                        </p>
                        <p className="text-sm">
                            In a real interview, rushing through questions can lead to mistakes.
                            Please review the question and options carefully before selecting your answer.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center mt-4">
                    <AlertDialogAction
                        onClick={onDismiss}
                        className="px-8 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30"
                    >
                        I Understand, Let Me Read Again
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default WarningDialog;
