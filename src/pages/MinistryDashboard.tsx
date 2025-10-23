import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { School, TrendingUp, Download, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const MinistryDashboard = () => {
  const navigate = useNavigate();

  const schools = [
    { name: "Springfield High School", teachers: 45, attendance: 94, performance: 88 },
    { name: "Riverside Academy", teachers: 38, attendance: 91, performance: 85 },
    { name: "Greenwood Institute", teachers: 52, attendance: 96, performance: 92 },
    { name: "Lakeside Secondary", teachers: 41, attendance: 89, performance: 83 },
  ];

  const handleDownloadReport = (schoolName: string) => {
    toast.success(`Downloading report for ${schoolName}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-light via-background to-primary-light p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Ministry Dashboard</h1>
            <p className="text-muted-foreground">National Education Monitoring System</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Schools</p>
                  <p className="text-3xl font-bold">{schools.length}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-secondary-light flex items-center justify-center">
                  <School className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Teachers</p>
                  <p className="text-3xl font-bold">176</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-primary-light flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Attendance</p>
                  <p className="text-3xl font-bold text-success">92.5%</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Performance</p>
                  <p className="text-3xl font-bold text-accent">87%</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-accent-light flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* School Reports */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>School Performance Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schools.map((school) => (
                <Card key={school.name} className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{school.name}</h3>
                        <p className="text-sm text-muted-foreground">{school.teachers} Teachers</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Attendance</p>
                          <Badge variant="secondary" className="mt-1 bg-success/20 text-success-foreground">
                            {school.attendance}%
                          </Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Performance</p>
                          <Badge variant="secondary" className="mt-1 bg-accent/20 text-accent-foreground">
                            {school.performance}%
                          </Badge>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadReport(school.name)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Notes */}
        <Card className="shadow-medium bg-accent-light/30">
          <CardHeader>
            <CardTitle>System Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p><strong>TSC Number Linking:</strong> Teacher Service Commission numbers are automatically linked to teacher profiles for verification.</p>
            <p><strong>Student Admission Linking:</strong> Student admission numbers connect parents to their children's progress and teachers.</p>
            <p><strong>QR Attendance Flow:</strong> Teachers scan location-based QR codes to verify physical presence in classrooms.</p>
            <p><strong>Performance Metrics:</strong> Reports include professional knowledge, innovation, classroom management, learner safety, time management, and collaboration scores.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MinistryDashboard;
