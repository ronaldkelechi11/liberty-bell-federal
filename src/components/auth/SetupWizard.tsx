import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, ShieldCheck, Key, CheckCircle2 } from "lucide-react";
import { profileService } from "@/api/profile";
import { toast } from "sonner";
import { User } from "@/api/types";

const SetupWizard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Initial check from localStorage to avoid flashing for admins
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        if (storedUser?.role === 'admin') return;

        const userData = await profileService.getProfile();
        setUser(userData);

        if (userData?.role === 'admin') return;

        // Check if setup is needed
        if (userData && (!userData.profilePicture || !userData.hasTransferPin)) {
          setIsOpen(true);
          if (userData.profilePicture) {
            setStep(2); // Skip to PIN setup if picture is already there
          } else {
            setStep(1); // Start with profile picture
          }
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    fetchUser();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleUploadPicture = async () => {
    if (!file) {
      toast.error("Please select a picture first");
      return;
    }

    setIsLoading(true);
    try {
      await profileService.uploadProfilePicture(file);
      toast.success("Profile picture uploaded!");

      if (!user?.hasTransferPin) {
        setStep(2);
      } else {
        setIsOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPin = async () => {
    if (pin.length !== 4) {
      toast.error("PIN must be 4 digits");
      return;
    }

    setIsLoading(true);
    try {
      await profileService.setTransferPin({ pin });
      await profileService.requestTransferPinOtp();
      toast.success("PIN set! Please verify with the OTP sent to your email.");
      setStep(3);
    } catch (error: any) {
      toast.error(error.message || "Failed to set PIN");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPin = async () => {
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    setIsLoading(true);
    try {
      await profileService.updateTransferPin({ pin, otp });
      toast.success("Transfer PIN verified and active!");
      setStep(4);
      setTimeout(() => setIsOpen(false), 2000);
    } catch (error: any) {
      toast.error(error.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] overflow-hidden" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading font-bold text-center">
            {step === 1 && "Upload Profile Picture"}
            {step === 2 && "Setup Transfer PIN"}
            {step === 3 && "Verify Transfer PIN"}
            {step === 4 && "Setup Complete!"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {step === 1 && "Help us personalize your account by uploading a profile picture."}
            {step === 2 && "Create a secure 4-digit PIN for your transfers and sensitive actions."}
            {step === 3 && "We've sent a verification code to your email to activate your PIN."}
            {step === 4 && "You're all set! Your account is now fully secured."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {step === 1 && (
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-primary/10 shadow-xl">
                  <AvatarImage src={previewUrl || ""} />
                  <AvatarFallback className="text-4xl bg-primary/5 text-primary">
                    {user?.firstname?.[0]}{user?.lastname?.[0]}
                  </AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="picture"
                  className="absolute bottom-0 right-0 rounded-full h-10 w-10 bg-primary text-white flex items-center justify-center cursor-pointer shadow-lg hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </Label>
              </div>
              <Button className="w-full btn-glow" onClick={handleUploadPicture} loading={isLoading}>
                Continue
              </Button>
              <button
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                onClick={() => {
                  if (!user?.hasTransferPin) {
                    setStep(2);
                  } else {
                    setIsOpen(false);
                  }
                }}
              >
                Skip for now
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Key className="w-8 h-8" />
                </div>
              </div>
              <div className="space-y-4">
                <Label htmlFor="pin" className="text-center block">Enter 4-Digit PIN</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={4}
                    value={pin}
                    onChange={(val) => setPin(val)}
                  >
                    <InputOTPGroup className="gap-4">
                      <InputOTPSlot index={0} className="w-12 h-12 text-xl border-2 rounded-xl" />
                      <InputOTPSlot index={1} className="w-12 h-12 text-xl border-2 rounded-xl" />
                      <InputOTPSlot index={2} className="w-12 h-12 text-xl border-2 rounded-xl" />
                      <InputOTPSlot index={3} className="w-12 h-12 text-xl border-2 rounded-xl" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <Button className="w-full btn-glow" onClick={handleSetPin} loading={isLoading}>
                Set PIN
              </Button>
              <div className="text-center">
                <button
                  className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
                  onClick={() => setIsOpen(false)}
                >
                  Skip for now
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-center block">Verification Code</Label>
                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(val) => setOtp(val)}
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} className="w-10 h-12 text-lg border-2 rounded-md" />
                      <InputOTPSlot index={1} className="w-10 h-12 text-lg border-2 rounded-md" />
                      <InputOTPSlot index={2} className="w-10 h-12 text-lg border-2 rounded-md" />
                      <InputOTPSlot index={3} className="w-10 h-12 text-lg border-2 rounded-md" />
                      <InputOTPSlot index={4} className="w-10 h-12 text-lg border-2 rounded-md" />
                      <InputOTPSlot index={5} className="w-10 h-12 text-lg border-2 rounded-md" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <Button className="w-full btn-glow" onClick={handleVerifyPin} loading={isLoading}>
                Verify & Activate
              </Button>
              <div className="text-center">
                <button
                  className="text-sm text-primary hover:underline font-medium"
                  onClick={() => profileService.requestTransferPinOtp().then(() => toast.success("OTP Resent!"))}
                >
                  Resend Code
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col items-center py-4 space-y-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <p className="font-bold text-lg">Account Fully Secured</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SetupWizard;
