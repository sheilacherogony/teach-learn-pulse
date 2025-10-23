import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User, TrendingUp, LogOut, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const response = await fetch("http://localhost:5000/children");
      const data = await response.json();
      setChildren(data.filter((child: any) => child.parentId === "parent1"));
    } catch (error) {
      toast.error("Failed to load children data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary-light p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Button variant="default" className="gap-2">
              <FileText className="h-4 w-4" />
              View Reports
            </Button>
            <div className="flex-1">
              <h2 className="text-foreground text-2xl font-bold">Parent Dashboard</h2>
              <p className="text-muted-foreground text-sm">Track your child's progress</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Children List */}
        {loading ? (
          <Card className="shadow-medium">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">Loading children data...</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {children.map((child) => (
              <Card key={child.id} className="shadow-medium">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">{child.name}</CardTitle>
                      <p className="text-muted-foreground">
                        {child.class} • Admission #: {child.admissionNumber}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-success/20 text-success-foreground w-fit">
                      Overall Progress: {child.progress}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {child.subjects.map((subject: any) => (
                      <Card key={subject.subject} className="shadow-soft">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                              <div>
                                <h3 className="font-semibold text-lg">{subject.subject}</h3>
                                <p className="text-sm text-muted-foreground">Teacher: {subject.teacher}</p>
                              </div>
                              <Badge variant="secondary" className="bg-accent/20 text-accent-foreground w-fit">
                                {subject.progress}% Complete
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Latest Lesson:</p>
                              <p className="text-sm text-muted-foreground">{subject.lastLesson}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ParentDashboard;
