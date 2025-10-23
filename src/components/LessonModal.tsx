import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { QrCode, Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  subject: {
    subject: string;
    class: string;
    time: string;
  };
}

const LessonModal = ({ isOpen, onClose, onSubmit, subject }: LessonModalProps) => {
  const [qrScanned, setQrScanned] = useState(false);
  const [lessonSummary, setLessonSummary] = useState("");

  const handleQrScan = () => {
    setQrScanned(true);
    toast.success("Attendance recorded!");
  };

  const handleSubmit = () => {
    if (!qrScanned) {
      toast.error("Please scan QR code for attendance");
      return;
    }
    if (!lessonSummary.trim()) {
      toast.error("Please enter a lesson summary");
      return;
    }
    toast.success("Lesson logged successfully!");
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{subject.subject} - {subject.class}</DialogTitle>
          <DialogDescription>{subject.time}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* QR Code Section */}
          <div className="space-y-3">
            <Label>Scan QR Code for Attendance</Label>
            <div className="flex items-center justify-center p-8 bg-muted rounded-2xl">
              {!qrScanned ? (
                <Button onClick={handleQrScan} size="lg" variant="outline">
                  <QrCode className="h-5 w-5 mr-2" />
                  Scan QR Code
                </Button>
              ) : (
                <div className="text-center space-y-2">
                  <CheckCircle2 className="h-12 w-12 text-success mx-auto" />
                  <p className="text-sm text-muted-foreground">Attendance Recorded</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date().toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Lesson Summary */}
          <div className="space-y-3">
            <Label htmlFor="summary">Lesson Summary</Label>
            <Textarea
              id="summary"
              placeholder="Brief summary of today's lesson, topics covered, and any notes..."
              rows={5}
              value={lessonSummary}
              onChange={(e) => setLessonSummary(e.target.value)}
              className="resize-none"
            />
          </div>

          {/* Upload Option */}
          <div className="space-y-3">
            <Label>Upload Supporting Documents (Optional)</Label>
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Files
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              Submit Lesson Log
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonModal;
