import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";

// --- NEW CODE: State for Parent/Admin Signup ---
const Auth = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("teacher");
  const [tscNumber, setTscNumber] = useState("");
  const [password, setPassword] = useState("");
  
  // Parent/Admin Signup States
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState(""); // Use a separate state for signup password
  const [adminName, setAdminName] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  // ---------------------------------------------

  // Parent children state
  const [children, setChildren] = useState([
    { name: "", admissionNumber: "" },
  ]);

  // --- Helper Function for Simulating Auth/Session ---
  const saveSession = (userRole, userId, childrenAdmissions = []) => {
    localStorage.setItem("userRole", userRole);
    if (userId) localStorage.setItem("userId", userId);
    if (userRole === "parent") {
      localStorage.setItem("childrenAdmissions", JSON.stringify(childrenAdmissions.map(c => c.admissionNumber.toUpperCase())));
    }
  };
  // --------------------------------------------------

  const handleSignIn = (e) => {
    e.preventDefault();
    // Simplified logic: Assume sign-in is successful and sets session
    
    // For Parent Sign In, let's assume successful sign-in uses the fixed 'parent1' ID
    if (role === "parent") {
        saveSession(role, "parent1", [
            // Assuming children for parent1 are known on sign-in, or fetched after
            { admissionNumber: "2024-0156" },
            { admissionNumber: "2024-0157" }
        ]);
        toast.success("Signed in successfully!");
        navigate("/parent");
        return;
    }
    
    if (role === "teacher" && !tscNumber) {
      toast.error("Please enter your TSC number");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    // Example for Teacher/Admin:
    const userId = role === "teacher" ? tscNumber : "admin1"; // Simulating user ID
    saveSession(role, userId);
    toast.success("Signed in successfully!");
    if (role === "teacher") navigate("/teacher");
    else if (role === "admin") navigate("/headteacher");
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    
    if (role === "parent") {
      const emptyChild = children.find(
        (c) => c.name.trim() === "" || c.admissionNumber.trim() === ""
      );
      if (emptyChild) {
        toast.error("Please fill all child name and admission number fields");
        return;
      }
      
      // --- INTEGRATION POINT 1: Parent Signup Logic ---
      // 1. **Simulate creating a new Parent ID (Unique ID is key!)**
      const newParentId = "newParent" + Date.now(); 
      
      // 2. **Get the list of children's admission numbers**
      const childrenAdmissionNumbers = children.map(c => ({
          name: c.name.trim(),
          admissionNumber: c.admissionNumber.trim().toUpperCase()
      }));
      
      // 3. **Simulate successful account creation and setting session**
      // In a real app, this is where you'd send data to your backend:
      // { parentName, parentPhone, parentEmail, signupPassword, childrenAdmissionNumbers }
      saveSession(role, newParentId, childrenAdmissionNumbers);
      // ----------------------------------------------------
      
    } else if (role === "teacher") {
        // Teacher signup logic (e.g., check for TSC number availability)
        saveSession(role, "newTeacher" + Date.now());
    } else if (role === "admin") {
        // Admin signup logic
        saveSession(role, "newAdmin" + Date.now());
    }
    
    // Final navigation
    toast.success("Account created successfully! Redirecting...");
    if (role === "teacher") navigate("/teacher");
    else if (role === "parent") navigate("/parent");
    else if (role === "admin") navigate("/headteacher");
  };

  // Add another child input
  const addChild = () => {
    setChildren([...children, { name: "", admissionNumber: "" }]);
  };

  // Update child input
  const handleChildChange = (index, field, value) => {
    const newChildren = [...children];
    newChildren[index][field] = value;
    setChildren(newChildren);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light via-secondary-light to-accent-light p-4">
      <Card className="w-full max-w-md shadow-large">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">EduTrack</CardTitle>
          <CardDescription>School Monitoring & Progress System</CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* --- Sign In Form --- */}
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-role">Sign in as</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="signin-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="admin">Admin (Headmaster)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {role === "teacher" ? (
                  <div className="space-y-2">
                    <Label htmlFor="tsc">TSC Number</Label>
                    <Input
                      id="tsc"
                      type="text"
                      placeholder="TSC-123456"
                      value={tscNumber}
                      onChange={(e) => setTscNumber(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {/* Placeholder for Parent/Admin Email/ID */}
                    <Input id="email" type="email" placeholder="email@school.com" required /> 
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>
            </TabsContent>

            {/* --- Sign Up Form --- */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-role">Register as</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="signup-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="admin">Admin (Headmaster)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Teacher Signup */}
                {role === "teacher" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="tsc">TSC Number</Label>
                      <Input 
                        id="tsc" 
                        type="text" 
                        placeholder="TSC-123456" 
                        required 
                        value={tscNumber} 
                        onChange={(e) => setTscNumber(e.target.value)} 
                      />
                    </div>
                  </>
                )}

                {/* Parent Signup */}
                {role === "parent" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="parent-name">Full Name</Label>
                      <Input 
                        id="parent-name" 
                        type="text" 
                        required 
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+254..." 
                        required 
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent-email">Email</Label>
                      <Input 
                        id="parent-email" 
                        type="email" 
                        required 
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                      />
                    </div>

                    {/* Children Inputs */}
                    <div className="pt-2">
                        <Label className="font-semibold text-md block mb-2">Child Information</Label>
                    {children.map((child, index) => (
                      <div key={index} className="space-y-2 border p-3 rounded-lg mb-4">
                        <Label className="block text-sm font-medium">Child {index + 1}</Label>
                        <Input
                          placeholder="Child Name"
                          value={child.name}
                          onChange={(e) =>
                            handleChildChange(index, "name", e.target.value)
                          }
                          required
                        />
                        <Input
                          placeholder="Admission Number (e.g., 2024-0156)"
                          value={child.admissionNumber}
                          onChange={(e) =>
                            handleChildChange(index, "admissionNumber", e.target.value)
                          }
                          required
                        />
                      </div>
                    ))}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={addChild}
                    >
                      + Add another child
                    </Button>
                  </>
                )}

                {/* Admin Signup */}
                {role === "admin" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="admin-name">Full Name</Label>
                      <Input 
                        id="admin-name" 
                        type="text" 
                        required 
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school-code">School Code/ID</Label>
                      <Input 
                        id="school-code" 
                        type="text" 
                        required 
                        value={schoolCode}
                        onChange={(e) => setSchoolCode(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* Separate password input for signup */}
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    required 
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;