import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, TrendingUp, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ParentDashboard = () => {
  const navigate = useNavigate();

  const studentClasses = [
    { subject: "Mathematics", teacher: "Jane Smith", lastLesson: "Quadratic Equations", progress: 85 },
    { subject: "Physics", teacher: "John Doe", lastLesson: "Newton's Laws", progress: 78 },
    { subject: "Chemistry", teacher: "John Doe", lastLesson: "Chemical Bonding", progress: 82 },
    { subject: "English", teacher: "Michael Brown", lastLesson: "Poetry Analysis", progress: 90 },
    { subject: "History", teacher: "Sarah Wilson", lastLesson: "World War II", progress: 88 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-lg">SA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Student Progress</h1>
              <p className="text-muted-foreground">Admission #: 2024-0156</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Subjects</p>
                  <p className="text-3xl font-bold">{studentClasses.length}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-primary-light flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Teachers</p>
                  <p className="text-3xl font-bold">4</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-secondary-light flex items-center justify-center">
                  <User className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Progress</p>
                  <p className="text-3xl font-bold text-success">85%</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Current Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentClasses.map((classItem) => (
                <Card key={classItem.subject} className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-lg">{classItem.subject}</h3>
                          <p className="text-sm text-muted-foreground">Teacher: {classItem.teacher}</p>
                        </div>
                        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground w-fit">
                          {classItem.progress}% Complete
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Latest Lesson:</p>
                        <p className="text-sm text-muted-foreground">{classItem.lastLesson}</p>
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

export default ParentDashboard;
