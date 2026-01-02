import Navbar from "@/components/layout/Navbar";
import { Upload, FileText, Sparkles, Download, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const suggestions = [
  { type: "improvement", text: "Add more quantifiable achievements to your experience section" },
  { type: "improvement", text: "Include relevant keywords: 'agile', 'scrum', 'CI/CD'" },
  { type: "improvement", text: "Add a professional summary highlighting your key strengths" },
  { type: "good", text: "Strong educational background clearly presented" },
  { type: "good", text: "Skills section is well-organized" },
  { type: "improvement", text: "Consider adding project links or portfolio URL" },
];

const Resume = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8">
        <div className="section-container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Resume AI</h1>
            <p className="text-muted-foreground">
              Let AI analyze and enhance your resume for better job matches
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Panel */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold mb-4">Upload Resume</h2>
                
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <p className="font-medium mb-1">Drop your resume here</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                <div className="mt-6 p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <FileText className="w-10 h-10 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">resume_john_doe.pdf</p>
                      <p className="text-sm text-muted-foreground">Uploaded just now</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Score */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold mb-4">Resume Score</h2>
                
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="url(#scoreGradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${72 * 4.4} ${100 * 4.4}`}
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(239 84% 67%)" />
                        <stop offset="100%" stopColor="hsl(168 76% 50%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">72</span>
                    <span className="text-sm text-muted-foreground">out of 100</span>
                  </div>
                </div>

                <p className="text-center text-muted-foreground">
                  Good score! A few improvements could make your resume stand out more.
                </p>
              </div>
            </div>

            {/* Resume Preview & Suggestions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Preview */}
              <div className="card-elevated p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Resume Preview</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Enhance with AI
                    </Button>
                    <Button variant="accent" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="bg-muted rounded-xl p-8 min-h-[400px]">
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold">John Doe</h3>
                      <p className="text-primary">Senior Frontend Developer</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        john.doe@email.com • +91 98765 43210 • Bangalore, India
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold border-b border-border pb-1 mb-2">Experience</h4>
                      <div className="space-y-3">
                        <div>
                          <p className="font-medium">Senior Frontend Developer</p>
                          <p className="text-sm text-muted-foreground">TechCorp • 2021 - Present</p>
                        </div>
                        <div>
                          <p className="font-medium">Frontend Developer</p>
                          <p className="text-sm text-muted-foreground">StartupXYZ • 2019 - 2021</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold border-b border-border pb-1 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {["React", "TypeScript", "Node.js", "GraphQL", "AWS"].map((skill) => (
                          <span key={skill} className="skill-tag">{skill}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Suggestions */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold mb-4">AI Suggestions</h2>
                
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-4 rounded-xl ${
                        suggestion.type === "good" 
                          ? "bg-success/10" 
                          : "bg-warning/10"
                      }`}
                    >
                      {suggestion.type === "good" ? (
                        <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm">{suggestion.text}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6 group">
                  Apply All Suggestions
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resume;
