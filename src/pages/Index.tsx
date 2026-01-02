import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeatureCards from "@/components/home/FeatureCards";
import JobCard from "@/components/jobs/JobCard";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featuredJobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp India",
    location: "Bangalore, Karnataka",
    salary: "18-25 LPA",
    type: "Full-time",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    isAiMatch: true,
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
  },
  {
    title: "Data Analyst Intern",
    company: "Analytics Pro",
    location: "Mumbai, Maharashtra",
    salary: "25K/month",
    type: "Internship",
    skills: ["Python", "SQL", "Excel", "Tableau"],
  },
  {
    title: "Marketing Manager",
    company: "GrowthX",
    location: "Hyderabad, Telangana",
    salary: "15-20 LPA",
    type: "Full-time",
    skills: ["SEO", "Content Strategy", "Analytics"],
    isUrgent: true,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        
        {/* Featured Jobs Section */}
        <section className="py-16 lg:py-20">
          <div className="section-container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  Featured Opportunities
                </h2>
                <p className="text-muted-foreground">
                  Hand-picked jobs matching your profile
                </p>
              </div>
              <Link to="/jobs">
                <Button variant="ghost" className="group">
                  View All
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredJobs.map((job, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <JobCard {...job} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeatureCards />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Career Playground. Powered by AI.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
