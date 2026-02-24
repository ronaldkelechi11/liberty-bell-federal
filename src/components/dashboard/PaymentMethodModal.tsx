import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";
import { PaymentMethod } from "@/api/types";

interface PaymentMethodModalProps {
    paymentMethod: PaymentMethod | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const PaymentMethodModal = ({
    paymentMethod,
    isOpen,
    onOpenChange,
}: PaymentMethodModalProps) => {
    if (!paymentMethod) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] rounded-3xl">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-primary" />
                        </div>
                        <Badge variant="outline" className="ml-auto">
                            {paymentMethod.name}
                        </Badge>
                    </div>
                    <DialogTitle className="text-2xl">
                        {paymentMethod.name}
                    </DialogTitle>
                    <DialogDescription className="text-base mt-4">
                        {paymentMethod.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                                Processing Time
                            </p>
                            <p className="text-base font-semibold">
                                {paymentMethod.processingTime}
                            </p>
                        </div>
                        {paymentMethod.minimumAmount !== undefined && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                    Minimum Amount
                                </p>
                                <p className="text-base font-semibold">
                                    ${paymentMethod.minimumAmount.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </p>
                            </div>
                        )}
                    </div>
                    {paymentMethod.maximumAmount !== undefined && (
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">
                                Maximum Amount
                            </p>
                            <p className="text-base font-semibold">
                                ${paymentMethod.maximumAmount.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PaymentMethodModal;
