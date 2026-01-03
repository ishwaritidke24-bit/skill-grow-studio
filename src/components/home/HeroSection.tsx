import { useState } from "react";
import { Search, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AIMatchModal from "@/components/ui/AIMatchModal";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Work from Home");
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  const filters = ["Work from Home", "Fresher Jobs", "Internships", "Part-time"];

  const handleSearch = () => {
    if (searchQuery || locationQuery) {
      toast.success("Searching for jobs...", {
        description: `${searchQuery || "All jobs"} ${locationQuery ? `in ${locationQuery}` : ""}`,
      });
      navigate("/jobs");
    } else {
      navigate("/jobs");
    }
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    toast.info(`Filtering: ${filter}`, {
      description: "Browse jobs matching this criteria",
    });
  };

  const handleAIBadgeClick = () => {
    setIsAIModalOpen(true);
  };

  return (
    <>
      <section className="relative py-16 lg:py-24 bg-gradient-hero overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Your <span className="text-gradient">Careerly</span>
                  <br />
                  Journey Awaits
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  AI-powered career support that matches you with perfect opportunities, 
                  enhances your resume, and accelerates your professional growth.
                </p>
              </div>

              {/* Search Bar */}
              <div className="bg-card rounded-2xl p-2 shadow-card-lg border border-border/50">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Job title, skills, or company"
                      className="search-input pl-12"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                      aria-label="Search jobs by title, skills, or company"
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
                      aria-label="Search jobs by location"
                    />
                  </div>
                  <Button 
                    size="lg" 
                    className="shrink-0 min-h-[44px]"
                    onClick={handleSearch}
                  >
                    Search Jobs
                  </Button>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3" role="group" aria-label="Quick filters">
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

            {/* Right Content - Hero Image */}
            <div className="relative hidden lg:block animate-slide-in-right">
              <div className="relative">
                <div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden shadow-card-xl">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                    alt="Team collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating AI Badge - Now Clickable */}
                <button
                  onClick={handleAIBadgeClick}
                  className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-card-xl border border-border/50 animate-float cursor-pointer hover:scale-105 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label="View AI Match details"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">AI Insights</p>
                      <p className="text-2xl font-bold text-gradient">85% Match</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AIMatchModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        jobTitle="Your Profile"
        company="Top Matches"
      />
    </>
  );
};

export default HeroSection;
