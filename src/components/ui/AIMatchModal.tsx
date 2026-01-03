import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sparkles, CheckCircle, Target, Briefcase, GraduationCap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AIMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
  company?: string;
}

const AIMatchModal = ({ isOpen, onClose, jobTitle = "Job Position", company = "Company" }: AIMatchModalProps) => {
  const matchData = {
    overallMatch: 85,
    skillMatch: 92,
    experienceMatch: 78,
    roleRelevance: 88,
    cultureFit: 82,
  };

  const matchedSkills = ["React", "TypeScript", "Node.js"];
  const missingSkills = ["AWS", "Docker"];
  const recommendations = [
    "Your frontend experience aligns well with this role",
    "Consider adding AWS certification to boost your profile",
    "Your project portfolio demonstrates relevant expertise",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="block">AI Match Analysis</span>
              <span className="text-sm font-normal text-muted-foreground">{jobTitle} at {company}</span>
            </div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            AI-powered analysis of your profile match with this job
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Overall Match Score */}
          <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl">
            <div className="relative w-28 h-28 mx-auto mb-3">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="url(#matchGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${matchData.overallMatch * 3.02} ${100 * 3.02}`}
                />
                <defs>
                  <linearGradient id="matchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(239 84% 67%)" />
                    <stop offset="100%" stopColor="hsl(168 76% 50%)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gradient">{matchData.overallMatch}%</span>
              </div>
            </div>
            <p className="font-semibold text-foreground">Overall Match</p>
            <p className="text-sm text-muted-foreground">Strong alignment with your profile</p>
          </div>

          {/* Match Breakdown */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Match Breakdown</h3>
            {[
              { icon: Target, label: "Skill Match", value: matchData.skillMatch, color: "bg-primary" },
              { icon: Briefcase, label: "Experience Match", value: matchData.experienceMatch, color: "bg-accent" },
              { icon: GraduationCap, label: "Role Relevance", value: matchData.roleRelevance, color: "bg-success" },
              { icon: TrendingUp, label: "Culture Fit", value: matchData.cultureFit, color: "bg-warning" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm font-semibold">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills Analysis */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Skills Analysis</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-success/10 rounded-xl">
                <p className="text-xs font-medium text-success mb-2 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Matched Skills
                </p>
                <div className="flex flex-wrap gap-1">
                  {matchedSkills.map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 bg-success/20 text-success rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-warning/10 rounded-xl">
                <p className="text-xs font-medium text-warning mb-2">Skills to Develop</p>
                <div className="flex flex-wrap gap-1">
                  {missingSkills.map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 bg-warning/20 text-warning rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">AI Recommendations</h3>
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                  <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Close
            </Button>
            <Button className="flex-1">
              Apply Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIMatchModal;
