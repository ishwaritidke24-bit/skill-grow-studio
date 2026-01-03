import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MapPin, Clock, IndianRupee, Building2, Calendar, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: {
    title: string;
    company: string;
    location: string;
    salary: string;
    type: string;
    skills: string[];
    postedTime?: string;
  };
}

const JobDetailsModal = ({ isOpen, onClose, job }: JobDetailsModalProps) => {
  const handleApply = () => {
    toast.success(`Application submitted for ${job.title} at ${job.company}!`, {
      description: "We'll notify you when the employer responds.",
    });
    onClose();
  };

  const handleSave = () => {
    toast.success("Job saved!", {
      description: `${job.title} has been added to your saved jobs.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{job.title}</DialogTitle>
          <DialogDescription className="text-primary font-medium text-base">
            {job.company}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Job Meta */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <IndianRupee className="w-4 h-4" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{job.postedTime || "Recently"}</span>
            </div>
          </div>

          {/* About Company */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              About {job.company}
            </h3>
            <p className="text-sm text-muted-foreground">
              {job.company} is a leading technology company focused on building innovative solutions. 
              We're looking for talented individuals to join our growing team and make an impact.
            </p>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <h3 className="font-semibold">Job Description</h3>
            <p className="text-sm text-muted-foreground">
              We are looking for a skilled {job.title} to join our team. The ideal candidate will have 
              experience with modern technologies and a passion for building great products. You'll be 
              working on challenging projects in a collaborative environment.
            </p>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <h3 className="font-semibold">Requirements</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>3+ years of experience in a similar role</li>
              <li>Strong proficiency in required skills</li>
              <li>Excellent communication and teamwork abilities</li>
              <li>Problem-solving mindset and attention to detail</li>
            </ul>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h3 className="font-semibold">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Users className="w-4 h-4" />
              Benefits
            </h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Competitive salary and equity</li>
              <li>Health insurance coverage</li>
              <li>Flexible work arrangements</li>
              <li>Learning and development budget</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={handleSave}>
              Save Job
            </Button>
            <Button className="flex-1" onClick={handleApply}>
              Apply Now
              <ExternalLink className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsModal;
