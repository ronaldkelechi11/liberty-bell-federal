import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Lock } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { profileService } from "@/api/profile";
import { User } from "@/api/types";

const SetupWizard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [step, setStep] = useState<"none" | "profile_picture" | "transfer_pin" | "completed">("none");
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;
      setUser(parsedUser);

      if (parsedUser.role === "admin") {
        setStep("none");
        return;
      }

      if (!parsedUser.profilePicture) {
        setStep("profile_picture");
      } else if (!parsedUser.hasTransferPin) {
        setStep("transfer_pin");
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUploadPicture = async () => {
    if (!file) {
      toast.error("Please select a picture first");
      return;
    }

    setIsLoading(true);
    try {
      const response = await profileService.uploadProfilePicture(file);
      const updatedUser = { ...user!, profilePicture: response.url };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Profile picture updated!");

      if (!updatedUser.hasTransferPin) {
        setStep("transfer_pin");
      } else {
        setStep("completed");
      }
    } catch (error: any) {
      toast.error(error.message || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetPin = async () => {
    if (pin.length !== 4) {
      toast.error("Please enter a 4-digit PIN");
      return;
    }

    setIsLoading(true);
    try {
      await profileService.setTransferPin({ pin });
      const updatedUser = { ...user!, hasTransferPin: true };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Transfer PIN set successfully!");
      setStep("completed");
    } catch (error: any) {
      toast.error(error.message || "Failed to set PIN");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "none" || step === "completed") return null;

  return (
    <>
      {/* Profile Picture Step */}
      <Dialog open={step === "profile_picture"} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[425px] [&>button]:hidden" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading font-bold text-center">Setup Your Profile</DialogTitle>
            <DialogDescription className="text-center">
              Let's start by adding a profile picture to your account.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6 space-y-6">
            <div className="relative">
              <Avatar className="h-32 w-32 border-4 border-primary/10 shadow-xl">
                <AvatarImage src={previewUrl || ""} />
                <AvatarFallback className="text-4xl bg-primary/5 text-primary">
                  {user?.firstname?.[0]}{user?.lastname?.[0]}
                </AvatarFallback>
              </Avatar>
              <Label
                htmlFor="picture-upload"
                className="absolute bottom-0 right-0 rounded-full h-10 w-10 bg-primary text-primary-foreground flex items-center justify-center cursor-pointer shadow-lg hover:bg-primary/90 transition-colors"
              >
                <Camera className="w-5 h-5" />
                <input
                  id="picture-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Label>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">{user?.firstname} {user?.lastname}</p>
              <p className="text-xs text-muted-foreground">@{user?.username}</p>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full btn-glow h-12 rounded-xl"
              onClick={handleUploadPicture}
              loading={isLoading}
              disabled={!file}
            >
              Save and Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transfer PIN Step */}
      <Dialog open={step === "transfer_pin"} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[425px] [&>button]:hidden" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-heading font-bold text-center">Secure Your Transfers</DialogTitle>
            <DialogDescription className="text-center">
              Create a 4-digit Transfer PIN. You'll need this to authorize all outgoing transactions.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={(value) => setPin(value)}
            >
              <InputOTPGroup className="gap-4">
                <InputOTPSlot index={0} className="w-14 h-14 text-2xl border-2 rounded-xl" />
                <InputOTPSlot index={1} className="w-14 h-14 text-2xl border-2 rounded-xl" />
                <InputOTPSlot index={2} className="w-14 h-14 text-2xl border-2 rounded-xl" />
                <InputOTPSlot index={3} className="w-14 h-14 text-2xl border-2 rounded-xl" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <DialogFooter>
            <Button
              className="w-full btn-glow h-12 rounded-xl"
              onClick={handleSetPin}
              loading={isLoading}
              disabled={pin.length !== 4}
            >
              Complete Setup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SetupWizard;
