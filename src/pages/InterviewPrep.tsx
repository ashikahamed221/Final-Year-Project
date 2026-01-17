import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Save, Trash2, MessageSquare } from "lucide-react";
import ChatMessage from "@/components/interview/ChatMessage";
import ChatInput from "@/components/interview/ChatInput";
import RoleSelector from "@/components/interview/RoleSelector";
import { generateInterviewResponse } from "@/utils/aiApi";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const InterviewPrep = () => {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState("frontend");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const history = messages.map(msg => ({ role: msg.role, content: msg.content }));
    history.push({ role: "user", content });

    try {
      const response = await generateInterviewResponse(history, selectedRole);
      const aiResponse: Message = {
        id: generateId(),
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      toast({
        title: "AI Response Failed",
        description: "Failed to get a response from the AI. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getMockResponse = (question: string, role: string): string => {
    const roleLabel = {
      frontend: "Frontend Developer",
      backend: "Backend Developer",
      fullstack: "Full Stack Developer",
      "data-scientist": "Data Scientist",
      devops: "DevOps Engineer",
      "product-manager": "Product Manager",
      "ui-ux": "UI/UX Designer",
      mobile: "Mobile Developer",
    }[role] || "Software Developer";

    return `Great question for a ${roleLabel} interview! Here's how I would approach answering "${question.substring(0, 50)}...":

**Key Points to Cover:**
1. Start with a clear, concise definition or explanation
2. Provide a real-world example from your experience
3. Discuss trade-offs or considerations
4. Mention best practices in the industry

**Sample Answer Structure:**
- Begin with the "what" - explain the concept clearly
- Move to the "why" - explain its importance
- End with the "how" - share practical implementation details

Would you like me to provide a more specific answer or ask another question?`;
  };

  const handleSaveConversation = () => {
    // TODO: Implement Firebase save
    // Example: await addDoc(collection(db, 'conversations'), { messages, role: selectedRole, createdAt: new Date() })

    toast({
      title: "Conversation Saved",
      description: "Your interview practice session has been saved.",
    });
  };

  const handleClearChat = () => {
    setMessages([]);
    toast({
      title: "Chat Cleared",
      description: "Started a new conversation.",
    });
  };

  return (
    <div className="min-h-screen bg-background ">
      <div className="p-5">
        <Link to='/' className="mr-4"><LogOut /></Link>
      </div>
      <div className="container max-w-4xl mx-auto px-4 mb-30 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Interview Prep</h1>
              <p className="text-sm text-muted-foreground">Practice with AI interviewer</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <RoleSelector
              value={selectedRole}
              onChange={setSelectedRole}
              disabled={messages.length > 0}
            />
          </div>
        </div>

        {/* Chat Container */}
        <Card className="flex flex-col h-[calc(100vh-220px)] min-h-[600px] bg-card/50 border-border">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="p-4 rounded-full bg-primary/10 mb-4">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Start Your Interview Practice
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Ask any interview question and get AI-powered responses tailored to your selected role. Practice common questions, technical concepts, or behavioral scenarios.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    role={message.role}
                    content={message.content}
                  />
                ))}
                {isLoading && (
                  <ChatMessage role="assistant" content="" isLoading />
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <ChatInput
              onSend={handleSendMessage}
              disabled={isLoading}
              placeholder={`Ask a ${selectedRole.replace("-", " ")} interview question...`}
            />
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={handleClearChat}
            disabled={messages.length === 0}
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear Chat
          </Button>
          <Button
            onClick={handleSaveConversation}
            disabled={messages.length === 0}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Save Conversation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
