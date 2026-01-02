import { Clock, Users, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  learners: string;
  rating: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  isFree?: boolean;
}

const CourseCard = ({
  title,
  description,
  thumbnail,
  duration,
  learners,
  rating,
  level,
  skills,
  isFree = false,
}: CourseCardProps) => {
  const levelColors = {
    Beginner: "bg-success/10 text-success",
    Intermediate: "bg-warning/10 text-warning",
    Advanced: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="card-elevated overflow-hidden flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative aspect-video">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
        {isFree && (
          <span className="absolute top-3 right-3 badge-accent">
            Free Demo
          </span>
        )}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${levelColors[level]}`}>
          {level}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 text-foreground line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{learners}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.slice(0, 3).map((skill) => (
            <span key={skill} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-3 mt-auto">
          <Button variant="outline" size="sm" className="flex-1">
            <Play className="w-4 h-4" />
            Watch Demo
          </Button>
          <Button size="sm" className="flex-1">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
