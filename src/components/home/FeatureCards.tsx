import { FileText, GraduationCap, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    icon: FileText,
    title: "Boost Your Resume",
    description: "Let AI analyze and enhance your resume to stand out from the competition.",
    cta: "Try Now",
    link: "/resume",
    gradient: "from-primary/10 to-primary/5",
    iconBg: "bg-gradient-primary",
  },
  {
    icon: GraduationCap,
    title: "Learn New Skills",
    description: "Access curated courses to upskill and stay ahead in your career journey.",
    cta: "Browse Courses",
    link: "/courses",
    gradient: "from-accent/10 to-accent/5",
    iconBg: "bg-gradient-accent",
  },
  {
    icon: BarChart3,
    title: "Track Your Journey",
    description: "Monitor your applications, saved jobs, and career progress in one place.",
    cta: "View Dashboard",
    link: "/dashboard",
    gradient: "from-success/10 to-success/5",
    iconBg: "bg-success",
  },
];

const FeatureCards = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Supercharge Your Career
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful AI-driven tools to help you land your dream job
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`card-elevated p-8 flex flex-col bg-gradient-to-br ${feature.gradient}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                {feature.description}
              </p>
              
              <Link to={feature.link}>
                <Button variant="outline" className="w-full group">
                  {feature.cta}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
