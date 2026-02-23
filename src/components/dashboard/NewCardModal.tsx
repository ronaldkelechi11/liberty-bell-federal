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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cardService } from "@/api/cards";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface NewCardModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const NewCardModal = ({ isOpen, onOpenChange }: NewCardModalProps) => {
    const [cardType, setCardType] = useState<string>('debit');
    const [otp, setOtp] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const requestOtpMutation = useMutation({
        mutationFn: () => cardService.requestOtp(),
        onSuccess: () => {
            setShowOtp(true);
            toast({
                title: "OTP Sent",
                description: "Please check your email/phone for the verification code.",
            });
        },
        onError: (error: any) => {
            toast({
                title: "Error",
                description: error.message || "Failed to request OTP",
                variant: "destructive",
            });
        }
    });

    const createCardMutation = useMutation({
        mutationFn: () => cardService.createCard({ cardType: cardType, otp }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cards'] });
            toast({
                title: "Success",
                description: `Your new ${cardType} card has been created successfully.`,
            });
            onOpenChange(false);
            resetForm();
        },
        onError: (error: any) => {
            toast({
                title: "Error",
                description: error.message || "Failed to create card",
                variant: "destructive",
            });
        }
    });

    const resetForm = () => {
        setCardType('debit');
        setOtp("");
        setShowOtp(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!showOtp) {
            requestOtpMutation.mutate();
        } else {
            createCardMutation.mutate();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle>Add New Card</DialogTitle>
                    <DialogDescription>
                        Choose your card type and verify with OTP to get started.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    {!showOtp ? (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="cardType">Card Type</Label>
                                <Select value={cardType} onValueChange={setCardType}>
                                    <SelectTrigger className="rounded-xl h-12">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="debit">Debit Card</SelectItem>
                                        <SelectItem value="credit">Credit Card</SelectItem>
                                        <SelectItem value="prepaid">Prepaid Card</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-2">
                            <Label htmlFor="otp">Enter Verification Code</Label>
                            <Input
                                id="otp"
                                placeholder="6-digit code"
                                className="h-12 rounded-xl text-center text-lg tracking-widest font-bold"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                required
                            />
                            <p className="text-xs text-muted-foreground text-center mt-2">
                                We've sent a code to your registered device.
                            </p>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            type="submit"
                            className="w-full h-12 rounded-xl text-lg font-bold"
                            disabled={requestOtpMutation.isPending || createCardMutation.isPending}
                        >
                            {requestOtpMutation.isPending || createCardMutation.isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            ) : null}
                            {!showOtp ? "Next" : "Add Card"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewCardModal;
