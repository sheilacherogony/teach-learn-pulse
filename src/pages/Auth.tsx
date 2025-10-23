import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<string>("teacher");
  const [tscAutoFilled, setTscAutoFilled] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Signed in successfully!");
    
    if (role === "teacher") navigate("/teacher");
    else if (role === "parent") navigate("/parent");
    else if (role === "admin") navigate("/headteacher");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created successfully!");
    
    if (role === "teacher") navigate("/teacher");
    else if (role === "parent") navigate("/parent");
    else if (role === "admin") navigate("/headteacher");
  };

  const handleTscNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length >= 6) {
      setTscAutoFilled(true);
      toast.success("Teacher details auto-filled!");
    } else {
      setTscAutoFilled(false);
    }
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

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-role">Sign in as</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="signin-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="admin">Admin (Headmaster)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@school.edu" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-role">Register as</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger id="signup-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="admin">Admin (Headmaster)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {role === "teacher" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="tsc">TSC Number</Label>
                      <div className="relative">
                        <Input 
                          id="tsc" 
                          type="text" 
                          placeholder="123456" 
                          onChange={handleTscNumberChange}
                          required 
                        />
                        {tscAutoFilled && (
                          <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-success" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input 
                        id="first-name" 
                        type="text" 
                        value={tscAutoFilled ? "John" : ""} 
                        disabled={tscAutoFilled}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input 
                        id="last-name" 
                        type="text" 
                        value={tscAutoFilled ? "Doe" : ""} 
                        disabled={tscAutoFilled}
                        required 
                      />
                    </div>
                  </>
                )}

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
                    <div className="space-y-2">
                      <Label htmlFor="admission">Student Admission Number</Label>
                      <Input id="admission" type="text" required />
                    </div>
                  </>
                )}

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
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required />
                </div>
                <Button type="submit" className="w-full">Create Account</Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
