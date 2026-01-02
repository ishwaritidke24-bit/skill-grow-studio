import { MapPin, Clock, IndianRupee, Sparkles, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  return (
    <div className="card-elevated p-6 flex flex-col h-full">
      {/* Badges */}
      <div className="flex gap-2 mb-4">
        {isAiMatch && (
          <span className="badge-ai">
            <Sparkles className="w-3.5 h-3.5" />
            AI Match
          </span>
        )}
        {isUrgent && (
          <span className="badge-urgent">
            <AlertCircle className="w-3.5 h-3.5" />
            Urgent
          </span>
        )}
      </div>

      {/* Job Info */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold mb-1 text-foreground">{title}</h3>
        <p className="text-primary font-medium mb-3">{company}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <IndianRupee className="w-4 h-4" />
            <span>{salary}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{type} • {postedTime}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.slice(0, 4).map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Button variant="outline" className="w-full group">
        View Details
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  );
};

export default JobCard;
