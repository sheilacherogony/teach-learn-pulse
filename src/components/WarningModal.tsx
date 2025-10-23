import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
  teacherId: string;
}

const WarningModal = ({ isOpen, onClose, teacherName, teacherId }: WarningModalProps) => {
  const [warningMessage, setWarningMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!warningMessage.trim()) {
      toast.error("Please enter a warning message");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/warnings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherId,
          teacherName,
          message: warningMessage,
          date: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast.success("Warning sent successfully");
        setWarningMessage("");
        onClose();
      } else {
        toast.error("Failed to send warning");
      }
    } catch (error) {
      toast.error("Error connecting to server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send Warning to {teacherName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="warning">Warning Message</Label>
            <Textarea
              id="warning"
              placeholder="Enter your warning message..."
              value={warningMessage}
              onChange={(e) => setWarningMessage(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Warning"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarningModal;
