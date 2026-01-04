import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import CourseCard from "@/components/courses/CourseCard";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const allCourses = [
  {
    title: "Complete React Developer Course",
    description: "Master React, Redux, Hooks, and build real-world applications from scratch.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    duration: "8 weeks",
    learners: "15.2K",
    rating: 4.8,
    level: "Intermediate" as const,
    skills: ["React", "Redux", "JavaScript"],
    isFree: true,
    category: "Development",
  },
  {
    title: "Python for Data Science",
    description: "Learn Python programming and essential data science libraries like Pandas and NumPy.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    duration: "10 weeks",
    learners: "28.5K",
    rating: 4.9,
    level: "Beginner" as const,
    skills: ["Python", "Pandas", "NumPy"],
    isFree: true,
    category: "Data Science",
  },
  {
    title: "UI/UX Design Masterclass",
    description: "From wireframes to high-fidelity prototypes. Design beautiful user experiences.",
    thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop",
    duration: "6 weeks",
    learners: "9.8K",
    rating: 4.7,
    level: "Beginner" as const,
    skills: ["Figma", "Prototyping", "Design Systems"],
    category: "Design",
  },
  {
    title: "Cloud Computing with AWS",
    description: "Deploy, manage, and scale applications on Amazon Web Services.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    duration: "12 weeks",
    learners: "11.3K",
    rating: 4.6,
    level: "Advanced" as const,
    skills: ["AWS", "DevOps", "Cloud Architecture"],
    category: "Cloud",
  },
  {
    title: "Digital Marketing Fundamentals",
    description: "SEO, social media marketing, content strategy, and analytics for beginners.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    duration: "4 weeks",
    learners: "22.1K",
    rating: 4.5,
    level: "Beginner" as const,
    skills: ["SEO", "Social Media", "Analytics"],
    isFree: true,
    category: "Marketing",
  },
  {
    title: "Machine Learning Essentials",
    description: "Build and deploy machine learning models using scikit-learn and TensorFlow.",
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
    duration: "14 weeks",
    learners: "8.7K",
    rating: 4.8,
    level: "Advanced" as const,
    skills: ["Machine Learning", "TensorFlow", "Python"],
    category: "Data Science",
  },
];

const categories = ["All Courses", "Development", "Data Science", "Design", "Marketing", "Cloud"];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Courses");
  const [filteredCourses, setFilteredCourses] = useState(allCourses);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    let results = allCourses;

    if (activeCategory !== "All Courses") {
      results = results.filter(course => course.category === activeCategory);
    }

    if (query) {
      results = results.filter(
        course =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    setFilteredCourses(results);

    if (results.length === 0) {
      toast({
        title: "No courses found",
        description: "Try adjusting your search or filters.",
      });
    } else {
      toast({
        title: `${results.length} course${results.length > 1 ? 's' : ''} found`,
        description: query ? `Showing results for "${searchQuery}"` : undefined,
      });
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    let results = allCourses;

    if (category !== "All Courses") {
      results = results.filter(course => course.category === category);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        course =>
          course.title.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }

    setFilteredCourses(results);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setActiveCategory("All Courses");
    setFilteredCourses(allCourses);
  };

  const handleStatClick = (label: string, value: string) => {
    toast({
      title: label,
      description: `We have ${value} ${label.toLowerCase()}.`,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8">
        <div className="section-container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Learn New Skills</h1>
            <p className="text-muted-foreground">
              Upskill with industry-relevant courses and certifications
            </p>
          </div>

          {/* Search & Categories */}
          <div className="bg-card rounded-2xl p-4 shadow-card border border-border/50 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses, skills, or topics..."
                  className="search-input pl-12 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  aria-label="Search courses"
                />
                {searchQuery && (
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button 
                size="lg" 
                className="shrink-0 min-h-[44px]"
                onClick={handleSearch}
              >
                <Filter className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`chip transition-all duration-200 min-h-[44px] px-4 ${
                    activeCategory === category 
                      ? "chip-active" 
                      : "hover:bg-primary/10"
                  }`}
                  onClick={() => handleCategoryClick(category)}
                  aria-pressed={activeCategory === category}
                  aria-label={`Filter by ${category}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Courses", value: "120+" },
              { label: "Active Learners", value: "50K+" },
              { label: "Free Courses", value: "35+" },
              { label: "Expert Instructors", value: "80+" },
            ].map((stat) => (
              <div 
                key={stat.label} 
                className="bg-card rounded-xl p-4 text-center border border-border/50 cursor-pointer hover:border-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                onClick={() => handleStatClick(stat.label, stat.value)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleStatClick(stat.label, stat.value)}
                aria-label={`${stat.label}: ${stat.value}`}
              >
                <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CourseCard {...course} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="outline" onClick={handleClearSearch}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredCourses.length > 0 && (
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                className="min-h-[44px]"
                onClick={() => toast({
                  title: "Loading more courses...",
                  description: "More courses will appear shortly.",
                })}
              >
                Explore All Courses
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Courses;