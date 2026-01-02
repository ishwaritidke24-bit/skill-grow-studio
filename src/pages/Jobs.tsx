import Navbar from "@/components/layout/Navbar";
import JobCard from "@/components/jobs/JobCard";
import { Search, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const allJobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp India",
    location: "Bangalore, Karnataka",
    salary: "18-25 LPA",
    type: "Full-time",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    isAiMatch: true,
    postedTime: "1 day ago",
  },
  {
    title: "Product Designer",
    company: "DesignHub",
    location: "Remote",
    salary: "12-18 LPA",
    type: "Full-time",
    skills: ["Figma", "UI/UX", "Prototyping"],
    isAiMatch: true,
    isUrgent: true,
    postedTime: "2 hours ago",
  },
  {
    title: "Data Analyst Intern",
    company: "Analytics Pro",
    location: "Mumbai, Maharashtra",
    salary: "25K/month",
    type: "Internship",
    skills: ["Python", "SQL", "Excel", "Tableau"],
    postedTime: "3 days ago",
  },
  {
    title: "Marketing Manager",
    company: "GrowthX",
    location: "Hyderabad, Telangana",
    salary: "15-20 LPA",
    type: "Full-time",
    skills: ["SEO", "Content Strategy", "Analytics"],
    isUrgent: true,
    postedTime: "1 week ago",
  },
  {
    title: "Backend Engineer",
    company: "CloudScale",
    location: "Pune, Maharashtra",
    salary: "20-30 LPA",
    type: "Full-time",
    skills: ["Python", "Django", "PostgreSQL", "Redis"],
    isAiMatch: true,
    postedTime: "4 days ago",
  },
  {
    title: "UX Research Intern",
    company: "UserFirst",
    location: "Delhi NCR",
    salary: "20K/month",
    type: "Internship",
    skills: ["User Research", "Surveys", "Analytics"],
    postedTime: "5 days ago",
  },
  {
    title: "DevOps Engineer",
    company: "InfraCloud",
    location: "Remote",
    salary: "22-28 LPA",
    type: "Full-time",
    skills: ["Kubernetes", "Docker", "CI/CD", "Terraform"],
    isAiMatch: true,
    postedTime: "2 days ago",
  },
  {
    title: "Content Writer",
    company: "MediaPulse",
    location: "Chennai, Tamil Nadu",
    salary: "6-10 LPA",
    type: "Full-time",
    skills: ["Copywriting", "SEO", "Social Media"],
    postedTime: "1 week ago",
  },
];

const filters = ["All Jobs", "Remote", "On-site", "Hybrid", "Internship", "Full-time"];

const Jobs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8">
        <div className="section-container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Browse Jobs</h1>
            <p className="text-muted-foreground">
              Discover opportunities that match your skills and aspirations
            </p>
          </div>

          {/* Search & Filters */}
          <div className="bg-card rounded-2xl p-4 shadow-card border border-border/50 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search jobs, skills, or companies..."
                  className="search-input pl-12"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Location"
                  className="search-input pl-12"
                />
              </div>
              <Button size="lg" className="shrink-0">
                <Filter className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {filters.map((filter, index) => (
                <button
                  key={filter}
                  className={`chip ${index === 0 ? "chip-active" : ""}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{allJobs.length}</span> jobs
            </p>
            <select className="search-input w-auto py-2">
              <option>Most Relevant</option>
              <option>Latest First</option>
              <option>Highest Salary</option>
            </select>
          </div>

          {/* Job Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {allJobs.map((job, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <JobCard {...job} />
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Jobs
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
