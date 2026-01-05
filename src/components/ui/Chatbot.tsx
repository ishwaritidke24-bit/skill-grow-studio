import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  options?: string[];
}

const botResponses: Record<string, { reply: string; options?: string[] }> = {
  default: {
    reply: "Hi! I'm your AI Career Assistant. How can I help you today?",
    options: ["Find Jobs", "Resume Tips", "Interview Prep", "Career Advice"],
  },
  "find jobs": {
    reply: "Great! I can help you find the perfect job. What type of role are you looking for?",
    options: ["Full-time", "Internship", "Remote", "Part-time"],
  },
  "full-time": {
    reply: "We have 500+ full-time opportunities! Use our smart filters on the Jobs page to narrow down by skills, location, and salary. Would you like tips on standing out?",
    options: ["Application Tips", "Resume Review", "Back to Menu"],
  },
  "internship": {
    reply: "Internships are a great way to start! We partner with top companies offering paid internships. Check the Jobs page and filter by 'Internship'. Need help preparing?",
    options: ["Interview Prep", "Resume Tips", "Back to Menu"],
  },
  "remote": {
    reply: "Remote work is trending! We have 200+ remote positions. Filter by 'Remote' on the Jobs page. Many companies offer flexible hours too!",
    options: ["Find Jobs", "Application Tips", "Back to Menu"],
  },
  "part-time": {
    reply: "Part-time roles offer great work-life balance. Check our listings for flexible schedules. Many include benefits too!",
    options: ["Find Jobs", "Career Advice", "Back to Menu"],
  },
  "resume tips": {
    reply: "Here are my top resume tips:\n\n1. **Quantify achievements** - Use numbers (e.g., 'Increased sales by 25%')\n2. **Tailor for each job** - Match keywords from job descriptions\n3. **Keep it concise** - 1 page for <5 years experience\n4. **Use action verbs** - Led, Developed, Achieved\n\nTry our Resume AI tool for personalized feedback!",
    options: ["Resume AI Tool", "More Tips", "Back to Menu"],
  },
  "resume ai tool": {
    reply: "Our AI Resume Analyzer can:\n\n✨ Score your resume against job requirements\n✨ Suggest improvements for each section\n✨ Highlight missing keywords\n✨ Format optimization tips\n\nUpload your resume on the Resume AI page to get started!",
    options: ["Resume Tips", "Interview Prep", "Back to Menu"],
  },
  "interview prep": {
    reply: "Preparation is key! Here's how to ace your interview:\n\n1. **Research the company** - Know their mission, products, culture\n2. **STAR method** - Structure answers: Situation, Task, Action, Result\n3. **Prepare questions** - Show genuine interest\n4. **Practice common Qs** - Tell me about yourself, weaknesses, etc.\n\nWant specific tips?",
    options: ["Technical Interview", "Behavioral Questions", "Back to Menu"],
  },
  "technical interview": {
    reply: "For technical interviews:\n\n💻 **Practice coding** - Use LeetCode, HackerRank\n💻 **Know your projects** - Explain decisions deeply\n💻 **System design basics** - For senior roles\n💻 **Ask clarifying Qs** - Shows problem-solving approach\n\nDon't forget to think aloud during coding!",
    options: ["Behavioral Questions", "Resume Tips", "Back to Menu"],
  },
  "behavioral questions": {
    reply: "Common behavioral questions:\n\n• Tell me about a challenging project\n• Describe a conflict with a teammate\n• Share a failure and what you learned\n• Why do you want this role?\n\nUse STAR method: Situation → Task → Action → Result",
    options: ["Technical Interview", "Interview Prep", "Back to Menu"],
  },
  "career advice": {
    reply: "What aspect of your career would you like guidance on?",
    options: ["Skill Development", "Salary Negotiation", "Career Change", "Back to Menu"],
  },
  "skill development": {
    reply: "Top in-demand skills for 2026:\n\n🚀 AI/ML & Data Science\n🚀 Cloud Computing (AWS, Azure)\n🚀 Full-stack Development\n🚀 Product Management\n🚀 Digital Marketing\n\nCheck our Learn section for courses!",
    options: ["Find Courses", "Career Advice", "Back to Menu"],
  },
  "salary negotiation": {
    reply: "Negotiation tips:\n\n💰 **Research market rates** - Use Glassdoor, Levels.fyi\n💰 **Know your value** - List your achievements\n💰 **Let them offer first** - Then counter +10-20%\n💰 **Consider total comp** - Benefits, bonuses, equity\n💰 **Practice your pitch** - Be confident, not aggressive",
    options: ["Interview Prep", "Career Advice", "Back to Menu"],
  },
  "career change": {
    reply: "Changing careers? Here's a roadmap:\n\n1. **Identify transferable skills** - Leadership, communication\n2. **Upskill strategically** - Take relevant courses\n3. **Network actively** - LinkedIn, industry events\n4. **Start with adjacent roles** - Easier transition\n5. **Update your story** - Frame the change positively",
    options: ["Skill Development", "Resume Tips", "Back to Menu"],
  },
  "application tips": {
    reply: "Stand out in applications:\n\n📝 **Customize cover letters** - Reference specific company projects\n📝 **Apply early** - First 24-48 hours matter\n📝 **Follow up** - Send a polite email after 1 week\n📝 **LinkedIn optimization** - Recruiters check profiles\n📝 **Use referrals** - 10x higher success rate",
    options: ["Resume Tips", "Interview Prep", "Back to Menu"],
  },
  "more tips": {
    reply: "Advanced resume tips:\n\n📄 **ATS-friendly format** - Simple layout, no tables\n📄 **LinkedIn URL** - Include a custom URL\n📄 **GitHub/Portfolio** - For tech roles\n📄 **Certifications** - Add relevant ones\n📄 **Volunteer work** - Shows initiative",
    options: ["Resume AI Tool", "Interview Prep", "Back to Menu"],
  },
  "find courses": {
    reply: "Our Learn section offers:\n\n📚 Technical courses (React, Python, AWS)\n📚 Soft skills training\n📚 Industry certifications\n📚 Free and paid options\n\nVisit the Learn page to explore!",
    options: ["Skill Development", "Career Advice", "Back to Menu"],
  },
  "back to menu": {
    reply: "No problem! What else can I help you with?",
    options: ["Find Jobs", "Resume Tips", "Interview Prep", "Career Advice"],
  },
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: botResponses.default.reply, isBot: true, options: botResponses.default.options },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: text,
      isBot: false,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const key = text.toLowerCase().trim();
      const response = botResponses[key] || {
        reply: "I'm not sure about that. Let me help you with something else!",
        options: ["Find Jobs", "Resume Tips", "Interview Prep", "Career Advice"],
      };

      const botMessage: Message = {
        id: messages.length + 2,
        text: response.reply,
        isBot: true,
        options: response.options,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleOptionClick = (option: string) => {
    handleSend(option);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          isOpen ? "bg-muted text-foreground rotate-90" : "bg-gradient-primary text-primary-foreground"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat assistant"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-primary p-4 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Career Assistant</h3>
              <p className="text-xs opacity-80">AI-powered guidance</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[350px] overflow-y-auto p-4 space-y-4 bg-background">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              {message.isBot && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                  message.isBot
                    ? "bg-muted text-foreground rounded-tl-sm"
                    : "bg-primary text-primary-foreground rounded-tr-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                {message.options && message.isBot && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionClick(option)}
                        className="px-3 py-1.5 text-xs font-medium bg-card border border-border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {!message.isBot && (
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-border bg-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-full border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full shrink-0"
              disabled={!inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
