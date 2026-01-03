import { useState } from "react";
import { MapPin, Clock, IndianRupee, Sparkles, AlertCircle, ArrowRight, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import AIMatchModal from "@/components/ui/AIMatchModal";
import JobDetailsModal from "@/components/ui/JobDetailsModal";
import { toast } from "sonner";

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  skills: string[];
  isAiMatch?: boolean;
  isUrgent?: boolean;
  postedTime?: string;
}

const JobCard = ({
  title,
  company,
  location,
  salary,
  type,
  skills,
  isAiMatch = false,
  isUrgent = false,
  postedTime = "2 days ago",
}: JobCardProps) => {
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Job removed from saved" : "Job saved!", {
      description: isSaved ? `${title} removed from your list` : `${title} added to your saved jobs`,
    });
  };

  const handleAIMatchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAIModalOpen(true);
  };

  const handleCardClick = () => {
    setIsDetailsModalOpen(true);
  };

  const handleApplyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success(`Application submitted for ${title}!`, {
      description: "We'll notify you when the employer responds.",
    });
  };

  const jobData = { title, company, location, salary, type, skills, postedTime };

  return (
    <>
      <div 
        className="card-elevated p-6 flex flex-col h-full cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        onClick={handleCardClick}
        onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
        tabIndex={0}
        role="article"
        aria-label={`Job: ${title} at ${company}`}
      >
        {/* Header with Badges and Save */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-2 flex-wrap">
            {isAiMatch && (
              <button
                onClick={handleAIMatchClick}
                className="badge-ai cursor-pointer hover:scale-105 active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
                aria-label="View AI Match analysis"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Match
              </button>
            )}
            {isUrgent && (
              <span className="badge-urgent">
                <AlertCircle className="w-3.5 h-3.5" />
                Urgent
              </span>
            )}
          </div>
          <button
            onClick={handleSave}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isSaved 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-primary hover:bg-primary/10"
            }`}
            aria-label={isSaved ? "Remove from saved jobs" : "Save job"}
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Job Info */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-primary font-medium mb-3">{company}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <IndianRupee className="w-4 h-4 shrink-0" />
              <span>{salary}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4 shrink-0" />
              <span>{type} • {postedTime}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {skills.slice(0, 4).map((skill) => (
              <span 
                key={skill} 
                className="skill-tag cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info(`Searching for ${skill} jobs...`);
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 group/btn min-h-[44px]"
            onClick={(e) => {
              e.stopPropagation();
              setIsDetailsModalOpen(true);
            }}
          >
            View Details
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
          <Button 
            className="flex-1 min-h-[44px]"
            onClick={handleApplyNow}
          >
            Apply Now
          </Button>
        </div>
      </div>

      <AIMatchModal 
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        jobTitle={title}
        company={company}
      />

      <JobDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        job={jobData}
      />
    </>
  );
};

export default JobCard;
