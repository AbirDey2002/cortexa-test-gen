import { useState, useRef } from "react";
import { Plus, Send, Paperclip, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  file?: {
    name: string;
    type: string;
  };
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I'll help you generate comprehensive test cases for your requirement document. Here are the test cases based on your request:\n\n**Test Case 1: Login Functionality**\n- Verify successful login with valid credentials\n- Verify error message with invalid credentials\n- Verify password field masking\n\n**Test Case 2: Input Validation**\n- Test email format validation\n- Test password strength requirements\n- Test required field validation\n\nWould you like me to generate more detailed test cases or focus on a specific area?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: `I've uploaded a document. Please analyze it and generate test cases.`,
        file: {
          name: file.name,
          type: file.type,
        },
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {messages.length === 0 ? (
        // Welcome State
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-2xl fade-in">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow mb-6 glow-primary">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Hello, Abir
              </h1>
              <p className="text-lg text-muted-foreground">
                Upload a requirement document or ask a question to begin generating test cases.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <Card className="p-6 hover:bg-card-hover transition-colors cursor-pointer border-border">
                <FileText className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-card-foreground mb-2">Upload FSD</h3>
                <p className="text-sm text-muted-foreground">
                  Upload your Functional Specification Document for comprehensive test case generation
                </p>
              </Card>
              
              <Card className="p-6 hover:bg-card-hover transition-colors cursor-pointer border-border">
                <FileText className="w-8 h-8 text-secondary mb-3" />
                <h3 className="font-semibold text-card-foreground mb-2">Analyze CR</h3>
                <p className="text-sm text-muted-foreground">
                  Upload Change Requests to generate targeted test scenarios
                </p>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        // Chat Messages
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl p-4 ${
                    message.type === "user"
                      ? "bg-chat-user border border-border ml-auto"
                      : "bg-chat-assistant border border-border mr-auto"
                  }`}
                >
                  {message.file && (
                    <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-accent/50 border border-border">
                      <FileText className="w-4 h-4 text-accent-foreground" />
                      <span className="text-sm font-medium text-accent-foreground">
                        {message.file.name}
                      </span>
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-chat-assistant border border-border rounded-xl p-4 mr-auto">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      )}

      {/* Chat Input */}
      <div className="p-6 border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-3 bg-input rounded-xl border border-border p-3">
            <Button
              onClick={handleFileUpload}
              variant="ghost"
              size="sm"
              className="flex-shrink-0 p-2 hover:bg-accent hover:text-accent-foreground"
            >
              <Plus className="w-5 h-5" />
            </Button>
            
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe the feature you want to test, or upload a document..."
              className="flex-1 bg-transparent border-0 resize-none min-h-[20px] max-h-32 text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
              rows={1}
            />
            
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              variant="ghost"
              size="sm"
              className="flex-shrink-0 p-2 hover:bg-primary hover:text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}