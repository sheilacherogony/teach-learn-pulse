import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- INTEGRATION POINT 2: Get admission numbers from session ---
  const getChildrenAdmissions = () => {
    try {
        const admissions = localStorage.getItem("childrenAdmissions");
        if (admissions) {
            // Returns an array of admission numbers like ["2024-0156", "2024-0157"]
            return JSON.parse(admissions);
        }
    } catch (error) {
        console.error("Error parsing childrenAdmissions from localStorage:", error);
    }
    return [];
  };
  // -------------------------------------------------------------

  const fetchChildren = useCallback(async () => {
    const parentChildrenAdmissions = getChildrenAdmissions();

    if (parentChildrenAdmissions.length === 0) {
        setChildren([]);
        setLoading(false);
        return;
    }
    
    try {
      const response = await fetch("http://localhost:5000/children"); // Mock API endpoint
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      
      // --- INTEGRATION POINT 3: Filter by Admission Number ---
      // Filter the children whose admission number is in the parent's list
      const parentChildren = data.filter((child) => 
        parentChildrenAdmissions.includes(child.admissionNumber)
      );
      // ------------------------------------------------------
      
      setChildren(parentChildren);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load children data. Check if your JSON server is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChildren();
  }, [fetchChildren]); // Depend on fetchChildren to avoid stale closure (though it's memoized)

  const handleSignOut = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("childrenAdmissions");
    toast.info("Signed out successfully.");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Button variant="default" className="gap-2 bg-indigo-700 hover:bg-indigo-800">
              <FileText className="h-4 w-4" />
              View Reports
            </Button>
            <div className="flex-1">
              <h2 className="text-white text-2xl font-bold">Parent Dashboard</h2>
              <p className="text-white/70 text-sm">Track your child’s progress</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleSignOut} // Use the new sign-out function
            className="border-gray-400 text-gray-200 hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Children Data Section */}
        {loading ? (
          <Card className="shadow-md bg-slate-800 text-gray-200">
            <CardContent className="pt-6">
              <p className="text-center text-gray-400">Loading children data...</p>
            </CardContent>
          </Card>
        ) : children.length === 0 ? (
          <Card className="shadow-md bg-slate-800 text-gray-200">
            <CardContent className="pt-6">
              <p className="text-center text-gray-400">
                No progress records found for the registered children. Please ensure the Admission Numbers are correct.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {children.map((child) => (
              <Card key={child.id} className="shadow-lg bg-slate-800/90 border border-slate-700">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl text-white">{child.name}</CardTitle>
                      <p className="text-gray-400">
                        {child.class} • Admission #: {child.admissionNumber}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-600/20 text-green-400 border border-green-600"
                    >
                      Overall Progress: {child.progress}%
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {child.subjects.map((subject) => (
                      <div
                        key={subject.subject}
                        className="bg-slate-700/50 p-4 rounded-xl border border-slate-600"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-lg text-white">
                              {subject.subject}
                            </h3>
                            <p className="text-sm text-gray-400">
                              Teacher: {subject.teacher}
                            </p>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-blue-600/20 text-blue-400 border border-blue-600"
                          >
                            {subject.progress}% Complete
                          </Badge>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-300">
                            Latest Lesson:
                          </p>
                          <p className="text-sm text-gray-400">
                            {subject.lastLesson}
                          </p>
                        </div>
                      </div>
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