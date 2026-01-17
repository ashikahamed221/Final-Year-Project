import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmationDialogProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmationDialog = ({
    isOpen,
    onConfirm,
    onCancel,
}: ConfirmationDialogProps) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
            <AlertDialogContent className="bg-card border-border">
                <AlertDialogHeader>
                    <div className="flex justify-center mb-4">
                        <div className="p-4 rounded-full bg-primary/10">
                            <span className="text-4xl">🤔</span>
                        </div>
                    </div>
                    <AlertDialogTitle className="text-center text-xl">
                        Confirm Your Answer
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-muted-foreground">
                        Are you sure you want to submit this answer? Take a moment to review if needed.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="sm:justify-center gap-3 mt-4">
                    <AlertDialogCancel
                        onClick={onCancel}
                        className="px-6"
                    >
                        Review Again
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="px-6 bg-gradient-to-r from-primary to-purple-500"
                    >
                        Yes, Submit
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmationDialog;
