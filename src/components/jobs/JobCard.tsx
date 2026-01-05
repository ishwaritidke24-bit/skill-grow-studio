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
        className="card-elevated p-4 lg:p-5 flex flex-col h-full cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
        <div className="flex-grow min-h-0">
          <h3 className="text-base lg:text-lg font-semibold mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-primary font-medium mb-2 text-sm">{company}</p>

          <div className="space-y-1.5 mb-3 text-xs lg:text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <IndianRupee className="w-3.5 h-3.5 shrink-0" />
              <span>{salary}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{type} • {postedTime}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skills.slice(0, 3).map((skill) => (
              <span 
                key={skill} 
                className="skill-tag text-xs cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info(`Searching for ${skill} jobs...`);
                }}
              >
                {skill}
              </span>
            ))}
            {skills.length > 3 && (
              <span className="skill-tag text-xs">+{skills.length - 3}</span>
            )}
          </div>
        </div>

        {/* CTAs */}
        <div className="grid grid-cols-2 gap-2 mt-auto pt-2">
          <Button 
            variant="outline" 
            size="sm"
            className="group/btn min-h-[40px] text-xs lg:text-sm px-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsDetailsModalOpen(true);
            }}
          >
            Details
            <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/btn:translate-x-1" />
          </Button>
          <Button 
            size="sm"
            className="min-h-[40px] text-xs lg:text-sm px-2"
            onClick={handleApplyNow}
          >
            Apply
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
