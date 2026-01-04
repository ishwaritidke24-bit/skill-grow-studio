import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { User, Briefcase, Bookmark, FileText, TrendingUp, MapPin, ArrowRight, X, ExternalLink, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const appliedJobs = [
  { title: "Senior Frontend Developer", company: "TechCorp India", status: "In Review", date: "Dec 28, 2024" },
  { title: "Product Designer", company: "DesignHub", status: "Shortlisted", date: "Dec 25, 2024" },
  { title: "Full Stack Developer", company: "StartupXYZ", status: "Applied", date: "Dec 20, 2024" },
];

const savedJobs = [
  { title: "DevOps Engineer", company: "InfraCloud", location: "Remote", salary: "22-28 LPA" },
  { title: "UX Researcher", company: "UserFirst", location: "Delhi NCR", salary: "12-18 LPA" },
];

const scoreHistory = [
  { date: "Dec 2024", score: 72 },
  { date: "Nov 2024", score: 65 },
  { date: "Oct 2024", score: 58 },
  { date: "Sep 2024", score: 52 },
];

const Dashboard = () => {
  const [savedJobsList, setSavedJobsList] = useState(savedJobs);
  const [selectedJob, setSelectedJob] = useState<typeof appliedJobs[0] | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const statusColors: Record<string, string> = {
    "Applied": "bg-muted text-muted-foreground",
    "In Review": "bg-warning/10 text-warning",
    "Shortlisted": "bg-success/10 text-success",
    "Rejected": "bg-destructive/10 text-destructive",
  };

  const handleRemoveSavedJob = (index: number) => {
    setSavedJobsList(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Job removed",
      description: "Job has been removed from your saved list.",
    });
  };

  const handleApplyNow = (job: typeof savedJobs[0]) => {
    toast({
      title: "Application started!",
      description: `Applying to ${job.title} at ${job.company}...`,
    });
  };

  const handleStatClick = (label: string, value: string) => {
    toast({
      title: label,
      description: `You have ${value} ${label.toLowerCase()}.`,
    });
  };

  const handleCompleteProfile = () => {
    setProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Profile Completion Modal */}
      <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Profile</DialogTitle>
            <DialogDescription>
              Add missing information to improve your job matches.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Portfolio URL</label>
              <input 
                type="url" 
                placeholder="https://your-portfolio.com"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Certifications</label>
              <input 
                type="text" 
                placeholder="e.g., AWS Certified, Google UX"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <Button 
              className="w-full" 
              onClick={() => {
                setProfileModalOpen(false);
                toast({
                  title: "Profile updated!",
                  description: "Your profile completion is now at 100%.",
                });
              }}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Job Details Modal */}
      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedJob?.title}</DialogTitle>
            <DialogDescription>{selectedJob?.company}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[selectedJob?.status || '']}`}>
                {selectedJob?.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Applied Date</span>
              <span className="text-sm font-medium">{selectedJob?.date}</span>
            </div>
            <div className="pt-4 border-t border-border space-y-2">
              <h4 className="font-medium">Application Timeline</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span>Application submitted</span>
                </div>
                {selectedJob?.status !== "Applied" && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span>Under review by HR</span>
                  </div>
                )}
                {selectedJob?.status === "Shortlisted" && (
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Shortlisted for interview</span>
                  </div>
                )}
              </div>
            </div>
            <Button className="w-full" onClick={() => setSelectedJob(null)}>
              <ExternalLink className="w-4 h-4 mr-2" />
              View Full Application
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <main className="py-8">
        <div className="section-container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Track your job search progress and career growth
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Briefcase, label: "Applied Jobs", value: "12", color: "text-primary" },
              { icon: Bookmark, label: "Saved Jobs", value: String(savedJobsList.length), color: "text-accent" },
              { icon: FileText, label: "Resume Score", value: "72", color: "text-success" },
              { icon: TrendingUp, label: "Profile Views", value: "156", color: "text-warning" },
            ].map((stat) => (
              <div 
                key={stat.label} 
                className="card-elevated p-5 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
                onClick={() => handleStatClick(stat.label, stat.value)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleStatClick(stat.label, stat.value)}
                aria-label={`${stat.label}: ${stat.value}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Completion */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card-elevated p-6">
                <div 
                  className="flex items-center gap-4 mb-6 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setProfileModalOpen(true)}
                  role="button"
                  tabIndex={0}
                  aria-label="Edit profile"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">John Doe</h3>
                    <p className="text-sm text-muted-foreground">Senior Developer</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Profile Completion</span>
                    <span className="text-sm text-primary font-semibold">75%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: "75%" }} />
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    <li 
                      className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted"
                      onClick={handleCompleteProfile}
                      role="button"
                      tabIndex={0}
                    >
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                      Add portfolio link
                    </li>
                    <li 
                      className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted"
                      onClick={handleCompleteProfile}
                      role="button"
                      tabIndex={0}
                    >
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                      Add certifications
                    </li>
                  </ul>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full mt-4 min-h-[44px]"
                  onClick={handleCompleteProfile}
                >
                  Complete Profile
                </Button>
              </div>

              {/* Resume Score History */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold mb-4">Resume Score History</h2>
                
                <div className="space-y-3">
                  {scoreHistory.map((item) => (
                    <div 
                      key={item.date} 
                      className="flex items-center justify-between cursor-pointer hover:bg-muted p-2 -mx-2 rounded-lg transition-colors"
                      onClick={() => toast({ title: item.date, description: `Resume score was ${item.score}/100` })}
                      role="button"
                      tabIndex={0}
                    >
                      <span className="text-sm text-muted-foreground">{item.date}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-primary rounded-full transition-all duration-500"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{item.score}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Link to="/resume">
                  <Button variant="outline" className="w-full mt-4 group min-h-[44px]">
                    Improve Score
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Applied Jobs */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-elevated p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Applied Jobs</h2>
                  <Link to="/jobs">
                    <Button variant="ghost" size="sm" className="group min-h-[44px]">
                      View All
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {appliedJobs.map((job, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors cursor-pointer group"
                      onClick={() => setSelectedJob(job)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedJob(job)}
                      aria-label={`View application for ${job.title} at ${job.company}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center border border-border group-hover:border-primary/50 transition-colors">
                          <Briefcase className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div>
                          <p className="font-medium group-hover:text-primary transition-colors">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                            {job.status}
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">{job.date}</p>
                        </div>
                        <Eye className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved Jobs */}
              <div className="card-elevated p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Saved Jobs</h2>
                  <Link to="/jobs">
                    <Button variant="ghost" size="sm" className="group min-h-[44px]">
                      Browse More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {savedJobsList.map((job, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors group relative"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSavedJob(index);
                        }}
                        aria-label={`Remove ${job.title} from saved jobs`}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                      <div className="flex items-start justify-between mb-3 pr-8">
                        <div>
                          <p className="font-medium group-hover:text-primary transition-colors">{job.title}</p>
                          <p className="text-sm text-primary">{job.company}</p>
                        </div>
                        <Bookmark className="w-5 h-5 text-primary fill-primary shrink-0" />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span>{job.salary}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-3 min-h-[44px]"
                        onClick={() => handleApplyNow(job)}
                      >
                        Apply Now
                      </Button>
                    </div>
                  ))}
                </div>

                {savedJobsList.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No saved jobs yet</p>
                    <Link to="/jobs">
                      <Button variant="link" className="mt-2">
                        Browse Jobs
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;