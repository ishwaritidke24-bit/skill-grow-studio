import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { 
  Plus, 
  Briefcase, 
  Users, 
  Eye,
  Edit,
  Trash2,
  MapPin,
  Clock,
  IndianRupee
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

// Static dummy data for company jobs
const companyJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    location: "Bangalore, Karnataka",
    job_type: "Full-time",
    salary_range: "18-25 LPA",
    experience_required: "3-5 years",
    skills_required: ["React", "TypeScript", "Node.js", "AWS"],
    applications: 45,
    is_active: true,
    created_at: "2026-01-01",
  },
  {
    id: "2",
    title: "Product Designer",
    location: "Remote",
    job_type: "Full-time",
    salary_range: "12-18 LPA",
    experience_required: "2-4 years",
    skills_required: ["Figma", "UI/UX", "Prototyping", "User Research"],
    applications: 32,
    is_active: true,
    created_at: "2026-01-03",
  },
  {
    id: "3",
    title: "Data Analyst Intern",
    location: "Mumbai, Maharashtra",
    job_type: "Internship",
    salary_range: "25K/month",
    experience_required: "0-1 years",
    skills_required: ["Python", "SQL", "Excel", "Tableau"],
    applications: 78,
    is_active: false,
    created_at: "2025-12-20",
  },
];

const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"];

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState(companyJobs);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    job_type: "Full-time",
    salary_range: "",
    experience_required: "",
    skills: "",
    description: "",
  });

  const handleCreateJob = () => {
    if (!newJob.title || !newJob.location) {
      toast.error("Please fill in required fields");
      return;
    }

    const job = {
      id: String(jobs.length + 1),
      title: newJob.title,
      location: newJob.location,
      job_type: newJob.job_type,
      salary_range: newJob.salary_range,
      experience_required: newJob.experience_required,
      skills_required: newJob.skills.split(",").map(s => s.trim()).filter(Boolean),
      applications: 0,
      is_active: true,
      created_at: new Date().toISOString().split("T")[0],
    };

    setJobs([job, ...jobs]);
    setIsCreateModalOpen(false);
    setNewJob({
      title: "",
      location: "",
      job_type: "Full-time",
      salary_range: "",
      experience_required: "",
      skills: "",
      description: "",
    });
    toast.success("Job posted successfully!");
  };

  const toggleJobStatus = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, is_active: !job.is_active } : job
    ));
    toast.success("Job status updated");
  };

  const deleteJob = (jobId: string) => {
    setJobs(jobs.filter(job => job.id !== jobId));
    toast.success("Job deleted");
  };

  const stats = [
    { title: "Total Jobs", value: jobs.length, icon: Briefcase },
    { title: "Active Jobs", value: jobs.filter(j => j.is_active).length, icon: Eye },
    { title: "Total Applications", value: jobs.reduce((acc, j) => acc + j.applications, 0), icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8">
        <div className="section-container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Company Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your job postings and view applications
              </p>
            </div>
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create Job Posting</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Title *</label>
                    <input
                      type="text"
                      placeholder="e.g., Senior Frontend Developer"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                      className="search-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location *</label>
                    <input
                      type="text"
                      placeholder="e.g., Bangalore, Karnataka or Remote"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      className="search-input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Job Type</label>
                      <select
                        value={newJob.job_type}
                        onChange={(e) => setNewJob({ ...newJob, job_type: e.target.value })}
                        className="search-input"
                      >
                        {jobTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Salary Range</label>
                      <input
                        type="text"
                        placeholder="e.g., 15-20 LPA"
                        value={newJob.salary_range}
                        onChange={(e) => setNewJob({ ...newJob, salary_range: e.target.value })}
                        className="search-input"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Experience Required</label>
                    <input
                      type="text"
                      placeholder="e.g., 2-4 years"
                      value={newJob.experience_required}
                      onChange={(e) => setNewJob({ ...newJob, experience_required: e.target.value })}
                      className="search-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Skills (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g., React, TypeScript, Node.js"
                      value={newJob.skills}
                      onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                      className="search-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Description</label>
                    <textarea
                      placeholder="Describe the role and responsibilities..."
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      rows={4}
                      className="search-input resize-none"
                    />
                  </div>
                  <Button className="w-full" onClick={handleCreateJob}>
                    Post Job
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Jobs List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Job Postings</CardTitle>
            </CardHeader>
            <CardContent>
              {jobs.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No jobs posted yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first job posting to start receiving applications
                  </p>
                  <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Post Your First Job
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 mb-4 md:mb-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{job.title}</h3>
                          <Badge variant={job.is_active ? "default" : "secondary"}>
                            {job.is_active ? "Active" : "Paused"}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {job.job_type}
                          </span>
                          {job.salary_range && (
                            <span className="flex items-center gap-1">
                              <IndianRupee className="w-4 h-4" />
                              {job.salary_range}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {job.applications} applications
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {job.skills_required?.slice(0, 4).map((skill) => (
                            <span key={skill} className="skill-tag text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleJobStatus(job.id)}
                        >
                          {job.is_active ? "Pause" : "Activate"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.info("Edit functionality coming soon")}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteJob(job.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;
