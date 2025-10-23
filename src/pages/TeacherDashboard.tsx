import { useEffect, useState } from "react";
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

interface Teacher {
  id: string;
  name: string;
  tscNumber: string;
  department: string;
  attendance: number;
  lessons: number;
  streak: number;
  flagged: boolean;
}

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<TimetableSubject | null>(null);
  const [subjects, setSubjects] = useState<TimetableSubject[]>([]);

  // Fetch mock teacher data
  useEffect(() => {
    fetch("http://localhost:5000/teachers/1") // For demo, get the first teacher
      .then((res) => res.json())
      .then((data) => {
        setTeacher(data);
        // Example mock subjects for this teacher
        setSubjects([
          { id: "1", subject: "Mathematics", class: "Form 3A", time: "8:00 - 9:00 AM", completed: true },
          { id: "2", subject: "Physics", class: "Form 4B", time: "9:00 - 10:00 AM", completed: false },
          { id: "3", subject: "Chemistry", class: "Form 2C", time: "10:30 - 11:30 AM", completed: false }
        ]);
      })
      .catch((err) => console.error("Error loading teacher:", err));
  }, []);

  const handleSubjectClick = (subject: TimetableSubject) => setSelectedSubject(subject);

  const handleLessonSubmit = () => {
    if (selectedSubject) {
      setSubjects(subjects.map(s => 
        s.id === selectedSubject.id ? { ...s, completed: true } : s
      ));
      setSelectedSubject(null);
    }
  };

  if (!teacher) return <p className="p-6 text-center text-muted-foreground">Loading teacher data...</p>;

  const streak = teacher.streak;
  const todayCompleted = subjects.filter(s => s.completed).length;
  const todayTotal = subjects.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-background to-accent-light p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {teacher.name.split(" ")[0][0]}{teacher.name.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{teacher.name}</h1>
              <p className="text-muted-foreground">{teacher.department} Department</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Current Streak</p><p className="text-3xl font-bold text-primary">{streak} days</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Today's Progress</p><p className="text-3xl font-bold text-accent">{todayCompleted}/{todayTotal}</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-sm text-muted-foreground">Attendance</p><p className="text-3xl font-bold text-secondary">{teacher.attendance}%</p></CardContent></Card>
        </div>

        {/* Timetable */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map(subject => (
                <Card
                  key={subject.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    subject.completed ? 'bg-green-100 border-green-300' : 'bg-yellow-50 border-yellow-200'
                  }`}
                  onClick={() => handleSubjectClick(subject)}
                >
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg">{subject.subject}</h3>
                    <p className="text-sm text-muted-foreground">{subject.class}</p>
                    <p className="text-sm font-medium">{subject.time}</p>
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
