import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import JobCard from "@/components/jobs/JobCard";
import { Search, MapPin, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Jobs");
  const [sortBy, setSortBy] = useState("Most Relevant");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    toast.success("Searching jobs...", {
      description: `${searchQuery || "All jobs"} ${locationQuery ? `in ${locationQuery}` : ""}`,
    });
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    toast.info(`Filter applied: ${filter}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    toast.info(`Sorting by: ${e.target.value}`);
  };

  const handleLoadMore = () => {
    toast.info("Loading more jobs...");
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      toast.info(`Page ${currentPage - 1}`);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    toast.info(`Page ${currentPage + 1}`);
  };

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  aria-label="Search jobs"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Location"
                  className="search-input pl-12"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  aria-label="Search by location"
                />
              </div>
              <Button size="lg" className="shrink-0 min-h-[44px]" onClick={handleSearch}>
                <Filter className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Job filters">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`chip min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    activeFilter === filter ? "chip-active" : ""
                  }`}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{allJobs.length}</span> jobs
            </p>
            <select 
              className="search-input w-auto py-2 min-h-[44px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              value={sortBy}
              onChange={handleSortChange}
              aria-label="Sort jobs"
            >
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

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button 
              variant="outline" 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="min-h-[44px]"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    toast.info(`Page ${page}`);
                  }}
                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80 text-muted-foreground"
                  }`}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button 
              variant="outline" 
              onClick={handleNextPage}
              className="min-h-[44px]"
              aria-label="Next page"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={handleLoadMore} className="min-h-[44px]">
              Load More Jobs
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
