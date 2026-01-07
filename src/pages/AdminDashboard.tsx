import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { 
  Users, 
  Briefcase, 
  Building2, 
  GraduationCap,
  TrendingUp,
  FileText,
  Settings,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Static dummy data for admin dashboard
const stats = [
  { title: "Total Students", value: "2,847", change: "+12%", icon: GraduationCap, color: "text-primary" },
  { title: "Active Jobs", value: "156", change: "+8%", icon: Briefcase, color: "text-accent" },
  { title: "Companies", value: "89", change: "+5%", icon: Building2, color: "text-secondary" },
  { title: "Applications", value: "1,234", change: "+23%", icon: FileText, color: "text-warning" },
];

const recentUsers = [
  { name: "Rahul Sharma", email: "rahul@email.com", role: "student", date: "2 hours ago" },
  { name: "TechCorp India", email: "hr@techcorp.com", role: "recruiter", date: "5 hours ago" },
  { name: "Priya Patel", email: "priya@email.com", role: "student", date: "1 day ago" },
  { name: "StartupXYZ", email: "jobs@startupxyz.com", role: "recruiter", date: "1 day ago" },
  { name: "Amit Kumar", email: "amit@email.com", role: "student", date: "2 days ago" },
];

const recentJobs = [
  { title: "Senior Frontend Developer", company: "TechCorp India", applications: 45, status: "active" },
  { title: "Data Analyst", company: "Analytics Pro", applications: 32, status: "active" },
  { title: "Product Designer", company: "DesignHub", applications: 28, status: "paused" },
  { title: "Backend Engineer", company: "CloudTech", applications: 67, status: "active" },
  { title: "Marketing Manager", company: "GrowthX", applications: 19, status: "closed" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "paused": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "closed": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "student": return "bg-primary/10 text-primary";
      case "recruiter": return "bg-accent/10 text-accent";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8">
        <div className="section-container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage users, jobs, and platform settings
              </p>
            </div>
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              Platform Settings
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">{stat.change} this month</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="jobs" className="gap-2">
                <Briefcase className="w-4 h-4" />
                Jobs
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <PieChart className="w-4 h-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Recent Registrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-medium">
                              {user.name[0]}
                            </div>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs px-2 py-1 rounded-full ${getRoleBadge(user.role)}`}>
                              {user.role}
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">{user.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Jobs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Recent Job Postings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentJobs.map((job, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(job.status)}`}>
                              {job.status}
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">{job.applications} applications</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    User management features coming soon. You'll be able to view, edit, and manage all platform users here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle>Job Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Job management features coming soon. You'll be able to review, approve, and manage all job postings here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Platform Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-muted/50 rounded-xl">
                      <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold">87%</p>
                      <p className="text-sm text-muted-foreground">Placement Rate</p>
                    </div>
                    <div className="text-center p-6 bg-muted/50 rounded-xl">
                      <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold">4.2K</p>
                      <p className="text-sm text-muted-foreground">Monthly Active Users</p>
                    </div>
                    <div className="text-center p-6 bg-muted/50 rounded-xl">
                      <Briefcase className="w-8 h-8 text-secondary mx-auto mb-2" />
                      <p className="text-2xl font-bold">320</p>
                      <p className="text-sm text-muted-foreground">Jobs Filled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
