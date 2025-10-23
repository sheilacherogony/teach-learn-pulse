import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, TrendingUp, Send, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HeadteacherDashboard = () => {
  const navigate = useNavigate();

  const teachers = [
    { name: "John Doe", department: "Science", attendance: 95, lessons: 28, streak: 12 },
    { name: "Jane Smith", department: "Mathematics", attendance: 92, lessons: 30, streak: 15 },
    { name: "Michael Brown", department: "Languages", attendance: 88, lessons: 26, streak: 8 },
    { name: "Sarah Wilson", department: "Humanities", attendance: 97, lessons: 32, streak: 18 },
  ];

  const performanceMetrics = [
    { label: "Professional Knowledge", score: 87 },
    { label: "Innovation", score: 82 },
    { label: "Classroom Management", score: 91 },
    { label: "Time Management", score: 85 },
    { label: "Learner Safety", score: 94 },
    { label: "Collaboration", score: 88 },
  ];

  const handlePushReport = () => {
    toast.success("Performance report sent to Ministry!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-light via-background to-accent-light p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Headteacher Dashboard</h1>
            <p className="text-muted-foreground">School Performance Overview</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handlePushReport} className="bg-gradient-to-r from-primary to-accent">
              <Send className="h-4 w-4 mr-2" />
              Push to Ministry
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Teachers</p>
                  <p className="text-3xl font-bold">{teachers.length}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-primary-light flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Attendance</p>
                  <p className="text-3xl font-bold text-success">93%</p>
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
                  <p className="text-sm text-muted-foreground">Lessons This Week</p>
                  <p className="text-3xl font-bold text-accent">116</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-accent-light flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>School Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {performanceMetrics.map((metric) => (
                <div key={metric.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{metric.label}</span>
                    <span className="text-muted-foreground">{metric.score}%</span>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teacher List */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Teacher Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teachers.map((teacher) => (
                <Card key={teacher.name} className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg">{teacher.name}</h3>
                        <p className="text-sm text-muted-foreground">{teacher.department}</p>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Attendance</p>
                          <Badge variant="secondary" className="mt-1 bg-success/20 text-success-foreground">
                            {teacher.attendance}%
                          </Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Lessons</p>
                          <Badge variant="secondary" className="mt-1 bg-accent/20 text-accent-foreground">
                            {teacher.lessons}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Streak</p>
                          <Badge variant="secondary" className="mt-1 bg-primary/20 text-primary-foreground">
                            {teacher.streak} days
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeadteacherDashboard;
