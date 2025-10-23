import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, BarChart3, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Users, title: "Teacher Tracking", description: "Monitor attendance and lesson progress in real-time" },
    { icon: BarChart3, title: "Performance Analytics", description: "Comprehensive metrics and reporting" },
    { icon: Shield, title: "Secure & Reliable", description: "Role-based access and data protection" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-light to-accent-light">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-large">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            EduTrack
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Modern School Monitoring & Progress Tracking System
          </p>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Empowering teachers, headteachers, and education ministries with real-time insights and comprehensive reporting
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" onClick={() => navigate("/auth")} className="text-lg shadow-medium">
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/auth")} className="text-lg">
              Sign In
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-medium hover:shadow-large transition-shadow duration-200">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-xl">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
