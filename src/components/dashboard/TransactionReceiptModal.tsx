import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Transaction } from "@/api/types";
import { format } from "date-fns";
import { CheckCircle2, XCircle, Clock, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface TransactionReceiptModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TransactionReceiptModal = ({
  transaction,
  isOpen,
  onOpenChange,
}: TransactionReceiptModalProps) => {
  if (!transaction) return null;

  const isDebit = transaction.type === 'debit';

  const getStatusIcon = () => {
    switch (transaction.status) {
      case 'completed':
        return <CheckCircle2 className="w-12 h-12 text-green-500" />;
      case 'failed':
        return <XCircle className="w-12 h-12 text-destructive" />;
      default:
        return <Clock className="w-12 h-12 text-amber-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center">Transaction Receipt</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          {getStatusIcon()}
          <div className="text-center">
            <h3 className="text-3xl font-bold">
              {isDebit ? '-' : '+'}{transaction.currency === 'USD' ? '$' : transaction.currency}{Math.abs(transaction.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
            <p className="text-muted-foreground capitalize">{transaction.status}</p>
          </div>
        </div>

        <div className="space-y-4 bg-secondary/20 p-6 rounded-2xl">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Description</span>
            <span className="font-medium text-right max-w-[200px]">{transaction.description}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Category</span>
            <span className="font-medium capitalize">{transaction.category}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date & Time</span>
            <span className="font-medium">{format(new Date(transaction.createdAt), 'MMM dd, yyyy • HH:mm')}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Reference</span>
            <span className="font-medium font-mono text-xs">{transaction.reference}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Type</span>
            <span className="font-medium capitalize">{transaction.type}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button variant="outline" className="rounded-xl gap-2">
            <Download className="w-4 h-4" /> PDF
          </Button>
          <Button variant="outline" className="rounded-xl gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
        </div>

        <div className="text-center mt-4">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Liberty Bell Federal
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionReceiptModal;
