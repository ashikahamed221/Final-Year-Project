import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadFormProps {
    onUpload: (file: File) => Promise<void>;
    isLoading: boolean;
}

const ResumeUploadForm = ({ onUpload, isLoading }: ResumeUploadFormProps) => {
    const { toast } = useToast();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileSelect = useCallback((file: File) => {
        // Validate file type
        const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
        
        if (!validTypes.includes(file.type)) {
            toast({
                title: "Invalid File Type",
                description: "Please upload a PDF, Word document, or text file.",
                variant: "destructive",
            });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "File Too Large",
                description: "Resume should be less than 5MB.",
                variant: "destructive",
            });
            return;
        }

        setSelectedFile(file);
        setUploadProgress(0);
    }, [toast]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            // Simulate progress
            setUploadProgress(20);
            setTimeout(() => setUploadProgress(40), 100);
            setTimeout(() => setUploadProgress(60), 200);
            
            await onUpload(selectedFile);
            
            setUploadProgress(100);
        } catch (error) {
            console.error("Upload error:", error);
            toast({
                title: "Upload Failed",
                description: "Failed to upload resume. Please try again.",
                variant: "destructive",
            });
            setUploadProgress(0);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-sm">
                    <span className="text-4xl">📄</span>
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                    Upload Your Resume
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Upload your resume and our AI will analyze it to provide personalized interview questions based on your skills, projects, and experience.
                </p>
            </div>

            {/* Upload Area */}
            <Card className="border-2 border-dashed border-border bg-secondary/30">
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`p-12 text-center cursor-pointer transition-all duration-200 ${
                        isDragging ? "border-primary bg-primary/10" : ""
                    }`}
                >
                    {!selectedFile ? (
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20">
                                    <FileUp className="w-8 h-8 text-primary" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg font-semibold text-foreground">
                                    Drag and drop your resume here
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    or click to browse
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Supported formats: PDF, DOC, DOCX, TXT (Max 5MB)
                                </p>
                            </div>
                            <input
                                type="file"
                                onChange={handleInputChange}
                                className="hidden"
                                id="resume-input"
                                accept=".pdf,.doc,.docx,.txt"
                            />
                            <label
                                htmlFor="resume-input"
                                className="inline-block mt-4"
                            >
                                <Button className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
                                    Browse Files
                                </Button>
                            </label>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                <div className="p-4 rounded-2xl bg-green-500/20">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-lg font-semibold text-foreground">
                                    {selectedFile.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {(selectedFile.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                            {uploadProgress > 0 && uploadProgress < 100 && (
                                <div className="w-full max-w-xs mx-auto">
                                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        {uploadProgress}%
                                    </p>
                                </div>
                            )}
                            <div className="flex gap-3 justify-center pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedFile(null);
                                        setUploadProgress(0);
                                    }}
                                    disabled={isLoading}
                                >
                                    Change File
                                </Button>
                                <Button
                                    onClick={handleUpload}
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Analyzing Resume...
                                        </>
                                    ) : (
                                        <>
                                            <FileUp className="w-4 h-4 mr-2" />
                                            Start Analysis
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Card>

            {/* Info Box */}
            <Card className="p-4 border border-border bg-secondary/50">
                <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">💡 What happens next?</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                        <li>✓ Our AI analyzes your resume to understand your skills</li>
                        <li>✓ We identify your projects and work experience</li>
                        <li>✓ Personalized interview questions will be generated</li>
                        <li>✓ The mock interview will cover 4 key areas including role-specific questions</li>
                    </ul>
                </div>
            </Card>
        </div>
    );
};

export default ResumeUploadForm;
