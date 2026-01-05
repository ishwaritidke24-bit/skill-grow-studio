import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeatureCards from "@/components/home/FeatureCards";
import JobCard from "@/components/jobs/JobCard";
import Chatbot from "@/components/ui/Chatbot";
import { ArrowRight, Mail, Send } from "lucide-react";
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
  const [email, setEmail] = useState("");
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscribed!",
        description: "You'll receive the latest job updates in your inbox.",
      });
      setEmail("");
    }
  };

  const handleFooterLink = (link: string) => {
    if (link === "Contact") {
      setContactModalOpen(true);
    } else {
      toast({
        title: link,
        description: `${link} page will be available soon.`,
      });
    }
  };

  const handleContactSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setContactModalOpen(false);
      setContactForm({ name: "", email: "", message: "" });
    } else {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to submit.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Contact Modal */}
      <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>
              Have questions? We'd love to hear from you.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input 
                type="text" 
                placeholder="Your name"
                value={contactForm.name}
                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                placeholder="your@email.com"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea 
                placeholder="How can we help?"
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
              />
            </div>
            <Button className="w-full" onClick={handleContactSubmit}>
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <main>
        <HeroSection />
        
        {/* Featured Jobs Section */}
        <section className="py-16 lg:py-20">
          <div className="section-container">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  Featured Opportunities
                </h2>
                <p className="text-muted-foreground">
                  Hand-picked jobs matching your profile
                </p>
              </div>
              <Link to="/jobs">
                <Button variant="ghost" className="group min-h-[44px]">
                  View All
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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

        {/* Newsletter Section */}
        <section className="py-16 lg:py-20 bg-muted/50">
          <div className="section-container">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                Stay Updated with Latest Jobs
              </h2>
              <p className="text-muted-foreground mb-8">
                Get personalized job recommendations and career tips delivered to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all min-h-[44px]"
                  aria-label="Email for newsletter"
                />
                <Button type="submit" className="min-h-[44px]">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Careerly. Powered by AI.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              {["Privacy", "Terms", "Contact"].map((link) => (
                <button
                  key={link}
                  onClick={() => handleFooterLink(link)}
                  className="hover:text-foreground transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label={link}
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
