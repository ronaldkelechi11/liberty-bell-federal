import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { profileService } from "@/api/profile";
import { toast } from "sonner";
import { Loader2, Key } from "lucide-react";

interface ChangeTransferPinModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const ChangeTransferPinModal = ({ isOpen, onOpenChange }: ChangeTransferPinModalProps) => {
    const [pin, setPin] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

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
            setStep(2);
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
            toast.success("Transfer PIN updated successfully!");
            onOpenChange(false);
            resetForm();
        } catch (error: any) {
            toast.error(error.message || "Verification failed");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setPin("");
        setOtp("");
        setStep(1);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            onOpenChange(open);
            if (!open) resetForm();
        }}>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Key className="w-6 h-6 text-primary" /> {step === 1 ? "Change Transfer PIN" : "Verify New PIN"}
                    </DialogTitle>
                    <DialogDescription>
                        {step === 1
                            ? "Enter a new 4-digit PIN for your transfers and sensitive actions."
                            : "We've sent a 6-digit verification code to your email."}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 space-y-8">
                    {step === 1 ? (
                        <div className="space-y-4">
                            <Label className="text-center block text-muted-foreground uppercase text-xs font-bold tracking-widest">New 4-Digit PIN</Label>
                            <div className="flex justify-center">
                                <InputOTP
                                    maxLength={4}
                                    value={pin}
                                    onChange={(val) => setPin(val)}
                                >
                                    <InputOTPGroup className="gap-4">
                                        <InputOTPSlot index={0} className="w-14 h-14 text-2xl border-2 rounded-2xl" />
                                        <InputOTPSlot index={1} className="w-14 h-14 text-2xl border-2 rounded-2xl" />
                                        <InputOTPSlot index={2} className="w-14 h-14 text-2xl border-2 rounded-2xl" />
                                        <InputOTPSlot index={3} className="w-14 h-14 text-2xl border-2 rounded-2xl" />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Label className="text-center block text-muted-foreground uppercase text-xs font-bold tracking-widest">Verification Code</Label>
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
                            <div className="text-center">
                                <button
                                    type="button"
                                    className="text-sm text-primary hover:underline font-medium"
                                    onClick={() => profileService.requestTransferPinOtp().then(() => toast.success("OTP Resent!"))}
                                >
                                    Resend Code
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        className="w-full h-12 rounded-xl text-lg font-bold"
                        onClick={step === 1 ? handleSetPin : handleVerifyPin}
                        disabled={isLoading}
                    >
                        {isLoading && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
                        {step === 1 ? "Continue" : "Verify & Save"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeTransferPinModal;
