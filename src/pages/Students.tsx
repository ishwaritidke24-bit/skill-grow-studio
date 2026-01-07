import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Search, MapPin, GraduationCap, Briefcase, Mail, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Static dummy data for students
const studentsData = [
  {
    id: "1",
    full_name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    avatar_url: null,
    bio: "Passionate full-stack developer with expertise in React and Node.js. Looking for opportunities in product-based companies.",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    experience_level: "Fresher",
    education: "B.Tech Computer Science, IIT Delhi",
    location: "Bangalore, Karnataka",
  },
  {
    id: "2",
    full_name: "Priya Patel",
    email: "priya.patel@email.com",
    avatar_url: null,
    bio: "Data Science enthusiast with strong foundation in ML and statistics. Eager to work on challenging data problems.",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Pandas"],
    experience_level: "1-2 years",
    education: "M.Sc Data Science, IISC Bangalore",
    location: "Hyderabad, Telangana",
  },
  {
    id: "3",
    full_name: "Amit Kumar",
    email: "amit.kumar@email.com",
    avatar_url: null,
    bio: "UI/UX Designer with a keen eye for detail. Experienced in creating user-centered designs for web and mobile applications.",
    skills: ["Figma", "UI/UX", "Adobe XD", "Prototyping", "User Research"],
    experience_level: "2-3 years",
    education: "B.Des, NID Ahmedabad",
    location: "Mumbai, Maharashtra",
  },
  {
    id: "4",
    full_name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    avatar_url: null,
    bio: "Backend developer specializing in Java and microservices architecture. Strong problem-solving skills.",
    skills: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes"],
    experience_level: "3-5 years",
    education: "B.Tech IT, VIT Vellore",
    location: "Chennai, Tamil Nadu",
  },
  {
    id: "5",
    full_name: "Vikram Singh",
    email: "vikram.singh@email.com",
    avatar_url: null,
    bio: "DevOps Engineer passionate about automation and cloud infrastructure. AWS certified.",
    skills: ["AWS", "DevOps", "CI/CD", "Terraform", "Linux"],
    experience_level: "2-3 years",
    education: "B.Tech Computer Science, DTU Delhi",
    location: "Noida, UP",
  },
  {
    id: "6",
    full_name: "Ananya Gupta",
    email: "ananya.gupta@email.com",
    avatar_url: null,
    bio: "Mobile app developer with expertise in React Native and Flutter. Published multiple apps on Play Store.",
    skills: ["React Native", "Flutter", "JavaScript", "Firebase", "REST APIs"],
    experience_level: "1-2 years",
    education: "BCA, Christ University Bangalore",
    location: "Pune, Maharashtra",
  },
];

const experienceLevels = ["All", "Fresher", "1-2 years", "2-3 years", "3-5 years", "5+ years"];

const Students = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<typeof studentsData[0] | null>(null);

  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch = 
      student.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      student.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesExperience = 
      selectedExperience === "All" || student.experience_level === selectedExperience;

    return matchesSearch && matchesExperience;
  });

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8">
        <div className="section-container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Student Directory</h1>
            <p className="text-muted-foreground">
              Browse talented students and connect with potential candidates
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, skills, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input pl-12"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedExperience(level)}
                  className={`chip ${selectedExperience === level ? "chip-active" : ""}`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Students Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student, index) => (
              <div
                key={student.id}
                className="card-elevated p-6 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setSelectedStudent(student)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-lg">
                    {getInitials(student.full_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{student.full_name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      <span className="truncate">{student.experience_level}</span>
                    </div>
                  </div>
                </div>

                {student.location && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{student.location}</span>
                  </div>
                )}

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {student.bio}
                </p>

                <div className="flex flex-wrap gap-2">
                  {student.skills?.slice(0, 4).map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                  {student.skills && student.skills.length > 4 && (
                    <span className="text-xs text-muted-foreground">
                      +{student.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No students found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Student Details Modal */}
      <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-xl">
                  {getInitials(selectedStudent.full_name)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedStudent.full_name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Briefcase className="w-4 h-4" />
                    <span>{selectedStudent.experience_level}</span>
                  </div>
                  {selectedStudent.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedStudent.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedStudent.bio && (
                <div>
                  <h4 className="font-medium mb-2">About</h4>
                  <p className="text-sm text-muted-foreground">{selectedStudent.bio}</p>
                </div>
              )}

              {selectedStudent.education && (
                <div>
                  <h4 className="font-medium mb-2">Education</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    <span>{selectedStudent.education}</span>
                  </div>
                </div>
              )}

              {selectedStudent.skills && selectedStudent.skills.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudent.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button className="w-full" onClick={() => window.location.href = `mailto:${selectedStudent.email}`}>
                <Mail className="w-4 h-4 mr-2" />
                Contact Student
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Students;
