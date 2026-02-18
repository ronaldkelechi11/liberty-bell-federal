import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  emailOrPhone: string;
}

const OtpModal = ({ isOpen, onClose, onVerify, emailOrPhone }: OtpModalProps) => {
  const [otp, setOtp] = React.useState("");

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    onVerify(otp);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-center">Verify Your Identity</DialogTitle>
          <DialogDescription className="text-center">
            We've sent a 6-digit verification code to <span className="font-semibold text-foreground">{emailOrPhone}</span>.
            Enter the code below to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-6">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            render={({ slots }) => (
              <InputOTPGroup className="gap-2">
                {slots.map((slot, index) => (
                  <InputOTPSlot
                    key={index}
                    {...slot}
                    className="w-12 h-12 text-lg border-2 rounded-md"
                  />
                ))}
              </InputOTPGroup>
            )}
          />
          <div className="mt-8 w-full space-y-4">
            <Button className="w-full btn-glow" onClick={handleVerify}>
              Verify & Login
            </Button>
            <div className="text-center">
              <button
                className="text-sm text-primary hover:underline font-medium"
                onClick={() => toast.success("OTP has been resent!")}
              >
                Didn't receive a code? Resend
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OtpModal;
