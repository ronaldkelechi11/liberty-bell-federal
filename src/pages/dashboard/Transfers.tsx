import { useState, useMemo, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Building2, User2, ArrowRightCircle, Check } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { accountService } from "@/api/accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Transfers = () => {
  const queryClient = useQueryClient();

  const [amount, setAmount] = useState("");
  const [fromAccountId, setFromAccountId] = useState("");
  const [toAccountId, setToAccountId] = useState("");
  const [externalFromAccountId, setExternalFromAccountId] = useState("");
  const [transferDescription, setTransferDescription] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: rawAccounts = [], isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => accountService.getMyAccounts(),
  });

  const accounts = useMemo(() => {
    return rawAccounts.map((acc: any) => ({
      ...acc,
      id: acc.id || acc._id,
    }));
  }, [rawAccounts]);

  useEffect(() => {
    setShowOtp(false);
    setOtp("");
  }, [externalFromAccountId]);

  const renderAccountCards = (
    selectedId: string,
    onSelect: (id: string) => void,
    excludeAccountId?: string
  ) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2].map(i => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {accounts.map(acc => {
          const isExcluded = excludeAccountId === acc.id;
          const isSelected = selectedId === acc.id;

          return (
            <button
              key={acc.id}
              type="button"
              disabled={isExcluded}
              onClick={() => {
                if (isExcluded) return;

                // 🔥 Toggle select / unselect
                if (isSelected) {
                  onSelect("");
                } else {
                  onSelect(acc.id);
                }
              }}
              className={`p-4 rounded-xl border-2 text-left transition-all
                ${isSelected
                  ? "border-primary bg-primary/5"
                  : isExcluded
                    ? "border-muted bg-muted/30 opacity-50 cursor-not-allowed"
                    : "border-secondary hover:border-primary/50"
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold capitalize">
                    {acc.type === "btc" ? "Bitcoin" : acc.type}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {acc.accountNumber}
                  </p>
                  <p className="text-lg font-bold mt-2">
                    {acc.currency === "BTC" ? "Bitcoin " : "$"}
                    {Number(acc.balance).toLocaleString()}
                  </p>
                </div>
                {isSelected && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Transfer Funds</h1>

        <Tabs defaultValue="internal">
          <TabsList className="grid grid-cols-2 h-14 rounded-2xl">
            <TabsTrigger value="internal">
              <User2 className="w-4 h-4 mr-2" /> Internal
            </TabsTrigger>
            <TabsTrigger value="external">
              <Building2 className="w-4 h-4 mr-2" /> External
            </TabsTrigger>
          </TabsList>

          {/* ================= INTERNAL ================= */}
          <TabsContent value="internal">
            <Card>
              <CardHeader>
                <CardTitle>Internal Transfer</CardTitle>
                <CardDescription>
                  Move money between your accounts instantly.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">

                <div>
                  <Label className="block mb-2">From Account <span className="text-red-500">*</span> </Label>
                  {renderAccountCards(fromAccountId, setFromAccountId, toAccountId)}
                </div>

                <div>
                  <Label className="block mb-2">To Account <span className="text-red-500">*</span> </Label>
                  {renderAccountCards(toAccountId, setToAccountId, fromAccountId)}
                </div>

                <div>
                  <Label>Amount <span className="text-red-500">*</span> </Label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                {/* ✅ Description under amount */}
                <div>
                  <Label>Description <span className="text-red-500">*</span> </Label>
                  <Textarea
                    value={transferDescription}
                    onChange={(e) => setTransferDescription(e.target.value)}
                    placeholder="What's this transfer for?"
                    rows={3}
                  />
                </div>

                <Button
                  className="w-full"
                  loading={isProcessing}
                  onClick={async () => {
                    if (!fromAccountId || !toAccountId || !amount) {
                      toast.error("Fill all required fields");
                      return;
                    }

                    if (fromAccountId === toAccountId) {
                      toast.error("Cannot transfer to same account");
                      return;
                    }

                    setIsProcessing(true);
                    try {
                      await accountService.internalTransfer({
                        fromAccountId,
                        toAccountId,
                        amount: parseFloat(amount),
                        description: transferDescription,
                      });

                      toast.success("Transfer successful");
                      queryClient.invalidateQueries({ queryKey: ["accounts"] });

                      setAmount("");
                      setTransferDescription("");
                    } catch (err: any) {
                      toast.error(err.message || "Transfer failed");
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                >
                  Transfer <ArrowRightCircle className="ml-2 w-4 h-4" />
                </Button>

              </CardContent>
            </Card>
          </TabsContent>

          {/* ================= EXTERNAL ================= */}
          <TabsContent value="external">
            <Card>
              <CardHeader>
                <CardTitle>External Transfer</CardTitle>
                <CardDescription>
                  Send money outside the bank.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">

                <div>
                  <Label className="block mb-2">From Account <span className="text-red-500">*</span> </Label>
                  {renderAccountCards(externalFromAccountId, setExternalFromAccountId)}
                </div>

                <div>
                  <Label>Amount <span className="text-red-500">*</span> </Label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                {/* ✅ Description under amount */}
                <div>
                  <Label>Description <span className="text-red-500">*</span> </Label>
                  <Textarea
                    value={transferDescription}
                    onChange={(e) => setTransferDescription(e.target.value)}
                    placeholder="Add a note for this transfer"
                    rows={3}
                  />
                </div>

                {showOtp && (
                  <Input
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                )}

                <Button
                  className="w-full"
                  loading={isProcessing}
                  onClick={async () => {
                    if (!externalFromAccountId || !amount) {
                      toast.error("Select account and enter amount");
                      return;
                    }

                    if (!showOtp) {
                      setShowOtp(true);
                      toast.success("OTP sent");
                      return;
                    }

                    setIsProcessing(true);
                    try {
                      await accountService.externalTransfer({
                        fromAccountId: externalFromAccountId,
                        amount: parseFloat(amount),
                        description: transferDescription,
                        otp,
                      });

                      toast.success("Transfer submitted");
                      queryClient.invalidateQueries({ queryKey: ["accounts"] });

                      setAmount("");
                      setTransferDescription("");
                      setOtp("");
                      setShowOtp(false);
                    } catch (err: any) {
                      toast.error(err.message || "Transfer failed");
                    } finally {
                      setIsProcessing(false);
                    }
                  }}
                >
                  {!showOtp ? "Send Funds" : "Confirm Transfer"}
                  <Send className="ml-2 w-4 h-4" />
                </Button>

              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Transfers;