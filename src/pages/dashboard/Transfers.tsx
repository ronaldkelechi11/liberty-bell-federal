import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Send, Building2, User2, ArrowRightCircle, Info } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Transfers = () => {
  const [amount, setAmount] = useState("");

  const accounts = [
    { id: '1', type: 'Checking', balance: 12500.50, number: '**** 4582' },
    { id: '2', type: 'Savings', balance: 45000.00, number: '**** 1290' },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-heading font-bold">Transfer Funds</h1>
          <p className="text-muted-foreground">Send money to your other accounts or to someone else.</p>
        </div>

        <Tabs defaultValue="internal" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1 h-14 bg-secondary/50">
            <TabsTrigger value="internal" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
              <User2 className="w-4 h-4" /> Internal
            </TabsTrigger>
            <TabsTrigger value="external" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm gap-2">
              <Building2 className="w-4 h-4" /> External Bank
            </TabsTrigger>
          </TabsList>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <TabsContent value="internal" className="mt-0">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>Transfer between accounts</CardTitle>
                    <CardDescription>Move funds instantly between your own accounts.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>From Account</Label>
                        <Select>
                          <SelectTrigger className="rounded-xl h-12">
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts.map(acc => (
                              <SelectItem key={acc.id} value={acc.id}>
                                {acc.type} ({acc.number}) - ${acc.balance.toLocaleString()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>To Account</Label>
                        <Select>
                          <SelectTrigger className="rounded-xl h-12">
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            {accounts.map(acc => (
                              <SelectItem key={acc.id} value={acc.id}>
                                {acc.type} ({acc.number}) - ${acc.balance.toLocaleString()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg">$</span>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className="pl-8 h-12 text-lg font-bold rounded-xl"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description (Optional)</Label>
                      <Textarea placeholder="What's this for?" className="rounded-xl resize-none" rows={3} />
                    </div>

                    <Button className="w-full h-12 rounded-xl text-lg font-bold gap-2">
                      Transfer Funds <ArrowRightCircle className="w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="external" className="mt-0">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>External Bank Transfer</CardTitle>
                    <CardDescription>Send money to a bank account outside of Liberty Bell.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>From Account</Label>
                      <Select>
                        <SelectTrigger className="rounded-xl h-12">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map(acc => (
                            <SelectItem key={acc.id} value={acc.id}>
                              {acc.type} ({acc.number}) - ${acc.balance.toLocaleString()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Recipient Name</Label>
                        <Input placeholder="Full name" className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Bank Name</Label>
                        <Input placeholder="e.g. Chase, Wells Fargo" className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Account Number</Label>
                        <Input placeholder="Enter account number" className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label>Routing Number</Label>
                        <Input placeholder="Enter routing number" className="h-12 rounded-xl" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Amount</Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg">$</span>
                        <Input type="number" placeholder="0.00" className="pl-8 h-12 text-lg font-bold rounded-xl" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea placeholder="Note for recipient" className="rounded-xl resize-none" rows={3} />
                    </div>

                    <Button className="w-full h-12 rounded-xl text-lg font-bold gap-2">
                      Send Funds <Send className="w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" /> Transfer Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p>Internal transfers are processed <span className="font-bold text-primary">instantly</span>.</p>
                  <p>External transfers may take <span className="font-bold">1-3 business days</span> to complete.</p>
                  <p>Daily limit for external transfers is <span className="font-bold">$10,000.00</span>.</p>
                </CardContent>
              </Card>

              <Alert className="bg-amber-50 border-amber-200 text-amber-800 rounded-2xl">
                <Info className="h-4 w-4 text-amber-600" />
                <AlertTitle className="font-bold">Security Tip</AlertTitle>
                <AlertDescription className="text-xs">
                  Always verify the recipient's bank details before confirming. Liberty Bell is not responsible for funds sent to incorrect accounts.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Transfers;
