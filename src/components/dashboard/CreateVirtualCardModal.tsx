import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cardService } from "@/api/cards";
import { toast } from "sonner";
import { Loader2, Zap, ShieldCheck, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CreateVirtualCardModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const CreateVirtualCardModal = ({ isOpen, onOpenChange }: CreateVirtualCardModalProps) => {
    const [otp, setOtp] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const handleRequestOtp = async () => {
        setIsPending(true);
        try {
            await cardService.requestOtp();
            setShowOtp(true);
            toast.success("OTP sent to your email");
        } catch (error: any) {
            toast.error(error.message || "Failed to request OTP");
        } finally {
            setIsPending(false);
        }
    };

    const handleCreateCard = async () => {
        setIsPending(true);
        try {
            await cardService.createCard({ cardType: 'virtual', otp });
            toast.success("Virtual card created successfully!");
            onOpenChange(false);
            resetForm();
        } catch (error: any) {
            toast.error(error.message || "Failed to create card");
        } finally {
            setIsPending(false);
        }
    };

    const resetForm = () => {
        setOtp("");
        setShowOtp(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!showOtp) {
            handleRequestOtp();
        } else {
            handleCreateCard();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px] bg-zinc-950 border-zinc-800 text-zinc-100 rounded-3xl overflow-hidden p-0">
                <div className="bg-gradient-to-br from-zinc-900 to-black p-8">
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold text-amber-500 flex items-center gap-2">
                            <Zap className="w-6 h-6 fill-amber-500" /> Create Virtual Card
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Secure, disposable card for your online transactions.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Card Preview */}
                    <div className="relative mb-8 aspect-[1.586/1] w-full bg-gradient-to-br from-amber-200 via-amber-500 to-amber-700 rounded-2xl shadow-2xl p-6 flex flex-col justify-between overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <CreditCard className="w-48 h-48 -mr-12 -mt-12" />
                        </div>

                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <Badge className="bg-black/20 hover:bg-black/30 text-white border-none uppercase text-[10px] px-2 py-0">
                                    Virtual Platinum
                                </Badge>
                                <p className="text-black/80 font-bold mt-1">Liberty Bell</p>
                            </div>
                            <div className="w-10 h-8 rounded-md bg-black/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                                <div className="w-6 h-4 bg-amber-200/50 rounded-sm" />
                            </div>
                        </div>

                        <div className="relative z-10">
                            <p className="text-xl font-mono tracking-widest text-black/90">•••• •••• •••• ••••</p>
                            <div className="flex justify-between items-end mt-4">
                                <div>
                                    <p className="text-[8px] uppercase text-black/60 font-bold">Card Holder</p>
                                    <p className="text-xs font-bold text-black/90">VIRTUAL USER</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] uppercase text-black/60 font-bold">Expires</p>
                                    <p className="text-xs font-bold text-black/90">08/29</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {showOtp ? (
                            <div className="space-y-3">
                                <Label htmlFor="otp" className="text-amber-500/80 uppercase text-xs font-bold tracking-wider">Verification Code</Label>
                                <Input
                                    id="otp"
                                    placeholder="000000"
                                    className="h-14 bg-zinc-900 border-zinc-700 text-zinc-100 rounded-2xl text-center text-2xl tracking-[0.5em] font-bold focus:border-amber-500 focus:ring-amber-500/20"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                    required
                                />
                                <p className="text-[10px] text-zinc-500 text-center">
                                    Verify your identity with the code sent to your email.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Secure Creation</p>
                                        <p className="text-xs text-zinc-500">Encrypted card generation</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold">Instant Activation</p>
                                        <p className="text-xs text-zinc-500">Ready to use immediately</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-2xl text-lg font-bold shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            disabled={isPending}
                        >
                            {isPending && (
                                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                            )}
                            {!showOtp ? "Generate Card" : "Confirm & Activate"}
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateVirtualCardModal;
