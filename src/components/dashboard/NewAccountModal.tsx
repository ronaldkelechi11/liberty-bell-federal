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
import { accountService } from "@/api/accounts";
import { AccountType } from "@/api/types";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface NewAccountModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewAccountModal = ({ isOpen, onOpenChange }: NewAccountModalProps) => {
  const [type, setType] = useState<AccountType>('checking');
  const [currency, setCurrency] = useState('USD');
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const requestOtpMutation = useMutation({
    mutationFn: () => accountService.requestOtp(),
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

  const createAccountMutation = useMutation({
    mutationFn: () => accountService.createAccount({ type, currency, otp }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast({
        title: "Success",
        description: `Your new ${type} account has been created successfully.`,
      });
      onOpenChange(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setType('checking');
    setCurrency('USD');
    setOtp("");
    setShowOtp(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtp) {
      requestOtpMutation.mutate();
    } else {
      createAccountMutation.mutate();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle>Open New Account</DialogTitle>
          <DialogDescription>
            Choose your account type and currency to get started.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {!showOtp ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="type">Account Type</Label>
                <Select value={type} onValueChange={(v) => setType(v as AccountType)}>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking Account</SelectItem>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="current">Current Account</SelectItem>
                    <SelectItem value="investment">Investment Account</SelectItem>
                    <SelectItem value="btc">Bitcoin Account</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="rounded-xl h-12">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
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
              disabled={requestOtpMutation.isPending || createAccountMutation.isPending}
            >
              {requestOtpMutation.isPending || createAccountMutation.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
              ) : null}
              {!showOtp ? "Next" : "Create Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAccountModal;
