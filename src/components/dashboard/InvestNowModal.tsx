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
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { investmentService } from "@/api/investments";
import { accountService } from "@/api/accounts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, TrendingUp, Info } from "lucide-react";
import { InvestmentPlan } from "@/api/types";

interface InvestNowModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    initialPlanId?: InvestmentPlan;
}

const InvestNowModal = ({ isOpen, onOpenChange, initialPlanId }: InvestNowModalProps) => {
    const [planId, setPlanId] = useState<InvestmentPlan>(initialPlanId || 'starter');
    const [amount, setAmount] = useState("");
    const [accountId, setAccountId] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const queryClient = useQueryClient();

    const { data: accounts = [] } = useQuery({
        queryKey: ['accounts'],
        queryFn: () => accountService.getMyAccounts(),
        enabled: isOpen,
    });

    const requestOtpMutation = useMutation({
        mutationFn: () => investmentService.requestOtp(),
        onSuccess: () => {
            setShowOtp(true);
            toast.success("OTP sent to your email");
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to request OTP");
        }
    });

    const createInvestmentMutation = useMutation({
        mutationFn: () => investmentService.createInvestment({
            planId,
            amount: parseFloat(amount),
            accountId,
            otp
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['investments'] });
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            toast.success("Investment successful!");
            onOpenChange(false);
            resetForm();
        },
        onError: (error: any) => {
            toast.error(error.message || "Investment failed");
        }
    });

    const resetForm = () => {
        setAmount("");
        setAccountId("");
        setOtp("");
        setShowOtp(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!accountId || !amount) {
            toast.error("Please fill in all fields");
            return;
        }
        if (!showOtp) {
            requestOtpMutation.mutate();
        } else {
            if (!otp) {
                toast.error("Please enter OTP");
                return;
            }
            createInvestmentMutation.mutate();
        }
    };

    const plans = [
        { id: 'starter', name: 'Starter Plan', roi: '8.5%', min: 500 },
        { id: 'balanced', name: 'Balanced Plan', roi: '12.2%', min: 2500 },
        { id: 'advanced', name: 'Advanced Plan', roi: '18.5%', min: 10000 },
    ];

    const selectedPlan = plans.find(p => p.id === planId);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px] rounded-3xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <TrendingUp className="w-6 h-6 text-green-600" /> Confirm Investment
                    </DialogTitle>
                    <DialogDescription>
                        Secure your future by investing in our {selectedPlan?.name}.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 py-4">
                    {!showOtp ? (
                        <>
                            <div className="space-y-2">
                                <Label>Select Investment Plan</Label>
                                <Select value={planId} onValueChange={(val: InvestmentPlan) => setPlanId(val)}>
                                    <SelectTrigger className="h-12 rounded-xl">
                                        <SelectValue placeholder="Choose a plan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {plans.map(plan => (
                                            <SelectItem key={plan.id} value={plan.id}>
                                                {plan.name} ({plan.roi} ROI)
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Funding Account</Label>
                                <Select value={accountId} onValueChange={setAccountId}>
                                    <SelectTrigger className="h-12 rounded-xl">
                                        <SelectValue placeholder="Select account" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {accounts.map(acc => (
                                            <SelectItem key={acc.id} value={acc.id}>
                                                {acc.type.toUpperCase()} ({acc.accountNumber}) - ${acc.balance.toLocaleString()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Investment Amount</Label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                                    <Input
                                        type="number"
                                        placeholder={`Min. $${selectedPlan?.min}`}
                                        className="h-12 pl-8 rounded-xl font-bold text-lg"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        min={selectedPlan?.min}
                                        required
                                    />
                                </div>
                                <p className="text-[10px] text-muted-foreground px-1 flex items-center gap-1">
                                    <Info className="w-3 h-3" /> Minimum investment for this plan is ${selectedPlan?.min.toLocaleString()}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <p className="text-sm text-center">
                                    You are about to invest <span className="font-bold">${parseFloat(amount).toLocaleString()}</span> into the <span className="font-bold">{selectedPlan?.name}</span>.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="otp">Enter Verification OTP</Label>
                                <Input
                                    id="otp"
                                    placeholder="Enter 6-digit code"
                                    className="h-14 rounded-2xl text-center text-2xl tracking-[0.5em] font-bold"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength={6}
                                    required
                                />
                                <p className="text-xs text-muted-foreground text-center">
                                    Check your email for the verification code.
                                </p>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            type="submit"
                            className="w-full h-12 rounded-xl text-lg font-bold"
                            disabled={requestOtpMutation.isPending || createInvestmentMutation.isPending}
                        >
                            {requestOtpMutation.isPending || createInvestmentMutation.isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            ) : null}
                            {!showOtp ? "Proceed to Invest" : "Confirm Investment"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default InvestNowModal;
