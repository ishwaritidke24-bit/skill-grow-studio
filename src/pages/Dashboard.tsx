import Navbar from "@/components/layout/Navbar";
import { User, Briefcase, Bookmark, FileText, TrendingUp, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  const statusColors: Record<string, string> = {
    "Applied": "bg-muted text-muted-foreground",
    "In Review": "bg-warning/10 text-warning",
    "Shortlisted": "bg-success/10 text-success",
    "Rejected": "bg-destructive/10 text-destructive",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
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
              { icon: Bookmark, label: "Saved Jobs", value: "8", color: "text-accent" },
              { icon: FileText, label: "Resume Score", value: "72", color: "text-success" },
              { icon: TrendingUp, label: "Profile Views", value: "156", color: "text-warning" },
            ].map((stat) => (
              <div key={stat.label} className="card-elevated p-5">
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
                <div className="flex items-center gap-4 mb-6">
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
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                      Add portfolio link
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                      Add certifications
                    </li>
                  </ul>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  Complete Profile
                </Button>
              </div>

              {/* Resume Score History */}
              <div className="card-elevated p-6">
                <h2 className="text-lg font-semibold mb-4">Resume Score History</h2>
                
                <div className="space-y-3">
                  {scoreHistory.map((item, index) => (
                    <div key={item.date} className="flex items-center justify-between">
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
                  <Button variant="outline" className="w-full mt-4 group">
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
                    <Button variant="ghost" size="sm" className="group">
                      View All
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {appliedJobs.map((job, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center border border-border">
                          <Briefcase className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                          {job.status}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{job.date}</p>
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
                    <Button variant="ghost" size="sm" className="group">
                      Browse More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {savedJobs.map((job, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-primary">{job.company}</p>
                        </div>
                        <Bookmark className="w-5 h-5 text-primary fill-primary" />
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span>{job.salary}</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3">
                        Apply Now
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
