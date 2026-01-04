import { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import { Upload, FileText, Sparkles, Download, CheckCircle, AlertCircle, ArrowRight, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const suggestions = [
  { type: "improvement", text: "Add more quantifiable achievements to your experience section", applied: false },
  { type: "improvement", text: "Include relevant keywords: 'agile', 'scrum', 'CI/CD'", applied: false },
  { type: "improvement", text: "Add a professional summary highlighting your key strengths", applied: false },
  { type: "good", text: "Strong educational background clearly presented", applied: false },
  { type: "good", text: "Skills section is well-organized", applied: false },
  { type: "improvement", text: "Consider adding project links or portfolio URL", applied: false },
];

const Resume = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState<number[]>([]);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [score, setScore] = useState(72);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or DOCX file.",
        variant: "destructive",
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB.",
        variant: "destructive",
      });
      return;
    }
    setUploadedFile(file);
    toast({
      title: "Resume uploaded!",
      description: "Your resume is being analyzed by AI.",
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setAppliedSuggestions([]);
    setScore(72);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplySuggestion = (index: number) => {
    if (!appliedSuggestions.includes(index)) {
      setAppliedSuggestions([...appliedSuggestions, index]);
      setScore(prev => Math.min(prev + 5, 100));
      toast({
        title: "Suggestion applied!",
        description: "Your resume has been updated.",
      });
    }
  };

  const handleApplyAllSuggestions = () => {
    const allIndices = suggestions.map((_, i) => i);
    setAppliedSuggestions(allIndices);
    setScore(98);
    toast({
      title: "All suggestions applied!",
      description: "Your resume score has improved significantly.",
    });
  };

  const handleEnhanceWithAI = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setIsEnhancing(false);
      setScore(prev => Math.min(prev + 10, 100));
      toast({
        title: "Resume enhanced!",
        description: "AI has optimized your resume for better visibility.",
      });
    }, 2000);
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your enhanced resume is being downloaded.",
    });
  };

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
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileInputChange}
                  className="hidden"
                  aria-label="Upload resume file"
                />
                
                <div 
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 cursor-pointer
                    ${isDragging 
                      ? 'border-primary bg-primary/5 scale-[1.02]' 
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                  aria-label="Drop zone for resume upload"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110">
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

                {(uploadedFile || true) && (
                  <div className="mt-6 p-4 bg-muted rounded-xl group hover:bg-muted/80 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-10 h-10 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {uploadedFile?.name || "resume_john_doe.pdf"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {uploadedFile ? "Just uploaded" : "Uploaded just now"}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFile();
                        }}
                        aria-label="Remove uploaded file"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Resume Score */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold mb-4">Resume Score</h2>
                
                <div 
                  className="relative w-40 h-40 mx-auto mb-4 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => {
                    toast({
                      title: `Score Breakdown`,
                      description: `Content: ${Math.floor(score * 0.4)}%, Keywords: ${Math.floor(score * 0.3)}%, Format: ${Math.floor(score * 0.3)}%`,
                    });
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label="View score breakdown"
                >
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
                      strokeDasharray={`${score * 4.4} ${100 * 4.4}`}
                      className="transition-all duration-700"
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(239 84% 67%)" />
                        <stop offset="100%" stopColor="hsl(168 76% 50%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">{score}</span>
                    <span className="text-sm text-muted-foreground">out of 100</span>
                  </div>
                </div>

                <p className="text-center text-muted-foreground">
                  {score >= 90 
                    ? "Excellent! Your resume is highly optimized."
                    : score >= 75
                    ? "Great score! A few more improvements possible."
                    : "Good score! A few improvements could make your resume stand out more."}
                </p>
              </div>
            </div>

            {/* Resume Preview & Suggestions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Preview */}
              <div className="card-elevated p-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h2 className="text-lg font-semibold">Resume Preview</h2>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleEnhanceWithAI}
                      disabled={isEnhancing}
                      className="min-h-[44px] sm:min-h-0"
                    >
                      <Sparkles className={`w-4 h-4 mr-2 ${isEnhancing ? 'animate-spin' : ''}`} />
                      {isEnhancing ? 'Enhancing...' : 'Enhance with AI'}
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={handleDownload}
                      className="min-h-[44px] sm:min-h-0"
                    >
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
                        <div className="p-2 rounded-lg hover:bg-background/50 transition-colors cursor-pointer">
                          <p className="font-medium">Senior Frontend Developer</p>
                          <p className="text-sm text-muted-foreground">TechCorp • 2021 - Present</p>
                        </div>
                        <div className="p-2 rounded-lg hover:bg-background/50 transition-colors cursor-pointer">
                          <p className="font-medium">Frontend Developer</p>
                          <p className="text-sm text-muted-foreground">StartupXYZ • 2019 - 2021</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold border-b border-border pb-1 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {["React", "TypeScript", "Node.js", "GraphQL", "AWS"].map((skill) => (
                          <span 
                            key={skill} 
                            className="skill-tag cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                            onClick={() => toast({ title: `Skill: ${skill}`, description: "This skill is well-represented in your resume." })}
                          >
                            {skill}
                          </span>
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
                      className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                        appliedSuggestions.includes(index)
                          ? "bg-success/20 opacity-75"
                          : suggestion.type === "good" 
                            ? "bg-success/10 hover:bg-success/20" 
                            : "bg-warning/10 hover:bg-warning/20"
                      }`}
                      onClick={() => handleApplySuggestion(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplySuggestion(index)}
                      aria-label={`${appliedSuggestions.includes(index) ? 'Applied' : 'Apply'}: ${suggestion.text}`}
                    >
                      {appliedSuggestions.includes(index) ? (
                        <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      ) : suggestion.type === "good" ? (
                        <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm flex-1">{suggestion.text}</span>
                      {!appliedSuggestions.includes(index) && suggestion.type === "improvement" && (
                        <Button variant="ghost" size="sm" className="shrink-0">
                          Apply
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full mt-6 group min-h-[44px]"
                  onClick={handleApplyAllSuggestions}
                  disabled={appliedSuggestions.length === suggestions.length}
                >
                  {appliedSuggestions.length === suggestions.length ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      All Suggestions Applied
                    </>
                  ) : (
                    <>
                      Apply All Suggestions
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
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