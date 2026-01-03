import { useState } from "react";
import { Clock, Users, Star, Play, Heart, HeartOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const levelColors = {
    Beginner: "bg-success/10 text-success",
    Intermediate: "bg-warning/10 text-warning",
    Advanced: "bg-destructive/10 text-destructive",
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist!", {
      description: isWishlisted ? `${title} removed` : `${title} saved to your wishlist`,
    });
  };

  const handleEnroll = () => {
    toast.success(`Enrolled in ${title}!`, {
      description: "You can access the course from your dashboard.",
    });
  };

  const handleWatchDemo = () => {
    setIsDemoModalOpen(true);
  };

  const handleCardClick = () => {
    setIsDemoModalOpen(true);
  };

  return (
    <>
      <div 
        className="card-elevated overflow-hidden flex flex-col h-full cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        onClick={handleCardClick}
        onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
        tabIndex={0}
        role="article"
        aria-label={`Course: ${title}`}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform scale-90 group-hover:scale-100">
              <Play className="w-8 h-8 text-primary fill-primary ml-1" />
            </div>
          </div>
          {isFree && (
            <span className="absolute top-3 right-3 badge-accent">
              Free Demo
            </span>
          )}
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${levelColors[level]}`}>
            {level}
          </span>
          <button
            onClick={handleWishlist}
            className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              isWishlisted 
                ? "bg-destructive text-white" 
                : "bg-white/90 text-muted-foreground hover:text-destructive"
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? (
              <Heart className="w-5 h-5 fill-current" />
            ) : (
              <HeartOff className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-2 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
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
              <span 
                key={skill} 
                className="skill-tag cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info(`Browsing ${skill} courses...`);
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex gap-3 mt-auto">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 min-h-[44px]"
              onClick={(e) => {
                e.stopPropagation();
                handleWatchDemo();
              }}
            >
              <Play className="w-4 h-4" />
              Watch Demo
            </Button>
            <Button 
              size="sm" 
              className="flex-1 min-h-[44px]"
              onClick={(e) => {
                e.stopPropagation();
                handleEnroll();
              }}
            >
              Enroll Now
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <Dialog open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10 text-primary fill-primary ml-1" />
              </div>
              <p className="text-muted-foreground">Demo video would play here</p>
              <Button className="mt-4" onClick={handleEnroll}>
                Enroll Now - {isFree ? "Free" : "Paid"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseCard;
