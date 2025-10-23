import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Flame, Calendar, QrCode, BookOpen, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LessonModal from "@/components/LessonModal";

interface TimetableSubject {
  id: string;
  subject: string;
  class: string;
  time: string;
  completed: boolean;
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<TimetableSubject | null>(null);
  const [subjects, setSubjects] = useState<TimetableSubject[]>([
    { id: "1", subject: "Mathematics", class: "Form 3A", time: "8:00 - 9:00 AM", completed: true },
    { id: "2", subject: "Physics", class: "Form 4B", time: "9:00 - 10:00 AM", completed: true },
    { id: "3", subject: "Chemistry", class: "Form 2C", time: "10:30 - 11:30 AM", completed: false },
    { id: "4", subject: "Mathematics", class: "Form 1A", time: "11:30 AM - 12:30 PM", completed: false },
    { id: "5", subject: "Physics", class: "Form 3B", time: "2:00 - 3:00 PM", completed: false },
    { id: "6", subject: "Chemistry", class: "Form 4A", time: "3:00 - 4:00 PM", completed: false },
  ]);

  const streak = 12;
  const todayCompleted = subjects.filter(s => s.completed).length;
  const todayTotal = subjects.length;

  const handleSubjectClick = (subject: TimetableSubject) => {
    setSelectedSubject(subject);
  };

  const handleLessonSubmit = () => {
    if (selectedSubject) {
      setSubjects(subjects.map(s => 
        s.id === selectedSubject.id ? { ...s, completed: true } : s
      ));
      setSelectedSubject(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent-light p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">John Doe</h1>
              <p className="text-muted-foreground">Science Department</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Streak</p>
                  <p className="text-3xl font-bold text-primary">{streak} days</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-primary-light flex items-center justify-center">
                  <Flame className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Progress</p>
                  <p className="text-3xl font-bold text-accent">{todayCompleted}/{todayTotal}</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-accent-light flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Week</p>
                  <p className="text-3xl font-bold text-secondary">24/30</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-secondary-light flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timetable */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <div className="flex gap-4 text-sm pt-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-success"></div>
                <span className="text-muted-foreground">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-pending"></div>
                <span className="text-muted-foreground">Pending</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <Card
                  key={subject.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 shadow-soft ${
                    subject.completed ? 'bg-success/10 border-success' : 'bg-pending/5 border-pending'
                  }`}
                  onClick={() => handleSubjectClick(subject)}
                >
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{subject.subject}</h3>
                          <p className="text-sm text-muted-foreground">{subject.class}</p>
                        </div>
                        {subject.completed ? (
                          <Badge variant="secondary" className="bg-success text-success-foreground">
                            Done
                          </Badge>
                        ) : (
                          <QrCode className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm font-medium">{subject.time}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedSubject && (
        <LessonModal
          isOpen={!!selectedSubject}
          onClose={() => setSelectedSubject(null)}
          onSubmit={handleLessonSubmit}
          subject={selectedSubject}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
