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

const Auth = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("teacher");
  const [tscNumber, setTscNumber] = useState("");
  const [password, setPassword] = useState("");

  // Parent children state
  const [children, setChildren] = useState([
    { name: "", admissionNumber: "" },
  ]);

  const handleSignIn = (e) => {
    e.preventDefault();

    if (role === "teacher" && !tscNumber) {
      toast.error("Please enter your TSC number");
      return;
    }
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    toast.success("Signed in successfully!");
    if (role === "teacher") navigate("/teacher");
    else if (role === "parent") navigate("/parent");
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
    }

    toast.success("Account created successfully!");
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
                    <Input id="email" type="email" required />
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
                  <div className="space-y-2">
                    <Label htmlFor="tsc">TSC Number</Label>
                    <Input id="tsc" type="text" placeholder="TSC-123456" required />
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                  </div>
                )}

                {/* Parent Signup */}
                {role === "parent" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="parent-name">Full Name</Label>
                      <Input id="parent-name" type="text" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+254..." required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parent-email">Email</Label>
                      <Input id="parent-email" type="email" required />
                    </div>

                    {/* Children Inputs */}
                    {children.map((child, index) => (
                      <div key={index} className="space-y-2 border p-2 rounded">
                        <Label>Child {index + 1}</Label>
                        <Input
                          placeholder="Child Name"
                          value={child.name}
                          onChange={(e) =>
                            handleChildChange(index, "name", e.target.value)
                          }
                          required
                        />
                        <Input
                          placeholder="Admission Number"
                          value={child.admissionNumber}
                          onChange={(e) =>
                            handleChildChange(index, "admissionNumber", e.target.value)
                          }
                          required
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
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
                      <Input id="admin-name" type="text" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school-code">School Code/ID</Label>
                      <Input id="school-code" type="text" required />
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" required />
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
