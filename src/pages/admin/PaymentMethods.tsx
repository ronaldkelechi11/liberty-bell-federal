import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, Trash2, Edit2, ShieldCheck, Banknote, Loader2, Coins } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { paymentMethodService } from "@/api/payment-methods";
import { useState, useEffect } from "react";
import { PaymentMethod } from "@/api/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const PaymentMethods = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  // New Method Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    processingTime: "",
    minimumAmount: "",
    maximumAmount: ""
  });

  const fetchMethods = async () => {
    setIsLoading(true);
    try {
      const response = await paymentMethodService.getAll();
      setMethods(response.data || []);
    } catch (error) {
      console.error("Error fetching payment methods:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">Payment Gateways</h1>
            <p className="text-muted-foreground mt-1">Configure and manage available deposit and withdrawal methods.</p>
          </div>
          <Button
            className="rounded-xl gap-2 shadow-sm"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Add New Method
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading payment configurations...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methods.map((m) => (
              <Card key={m._id || m.id} className="border-none shadow-sm hover:shadow-md transition-all group">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
                      {m.name.toLowerCase().includes('card') ? <CreditCard className="w-6 h-6" /> :
                       m.name.toLowerCase().includes('crypto') || m.name.toLowerCase().includes('bitcoin') ? <Coins className="w-6 h-6" /> :
                       <Banknote className="w-6 h-6" />}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-secondary"
                        onClick={() => {
                          setSelectedMethod(m);
                          setFormData({
                            name: m.name,
                            description: m.description,
                            processingTime: m.processingTime || "",
                            minimumAmount: m.minimumAmount?.toString() || "",
                            maximumAmount: m.maximumAmount?.toString() || ""
                          });
                          setIsEditModalOpen(true);
                        }}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-destructive hover:bg-destructive/10"
                        onClick={async () => {
                          if (confirm(`Are you sure you want to delete ${m.name}?`)) {
                            try {
                              await paymentMethodService.delete(m._id || m.id || "");
                              toast.success("Payment method deleted");
                              fetchMethods();
                            } catch (error) {
                              toast.error("Failed to delete payment method");
                            }
                          }
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="mt-4 text-lg">{m.name}</CardTitle>
                  <CardDescription className="line-clamp-2 min-h-[40px]">{m.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 border-t border-border/50 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Processing Time</span>
                    <span className="font-bold text-foreground">{m.processingTime || 'Instant'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Limits</span>
                    <span className="font-bold text-foreground">
                      {m.minimumAmount ? `$${m.minimumAmount}` : 'No Min'} - {m.maximumAmount ? `$${m.maximumAmount}` : 'No Max'}
                    </span>
                  </div>
                  <div className="pt-2 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Active</span>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl h-8 px-4 text-xs font-bold border-border/50 hover:bg-primary hover:text-white hover:border-primary transition-all">Configure</Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card
              className="border-2 border-dashed border-border/50 flex flex-col items-center justify-center p-8 bg-secondary/5 hover:bg-secondary/10 transition-colors cursor-pointer group"
              onClick={() => setIsAddModalOpen(true)}
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-foreground">Custom Gateway</h3>
              <p className="text-xs text-muted-foreground mt-1 text-center px-4">Integrate a new banking or crypto payment provider.</p>
              <Button variant="outline" className="mt-4 rounded-xl border-border/50 font-bold group-hover:bg-background">Create New</Button>
            </Card>
          </div>
        )}

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Add Payment Method</DialogTitle>
              <DialogDescription>
                Configure a new payment gateway for user deposits and withdrawals.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Method Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Visa/Mastercard, Bitcoin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of the method"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="processingTime">Processing Time</Label>
                <Input
                  id="processingTime"
                  placeholder="e.g. Instant, 1-3 Business Days"
                  value={formData.processingTime}
                  onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minAmount">Minimum Amount ($)</Label>
                  <Input
                    id="minAmount"
                    type="number"
                    placeholder="10"
                    value={formData.minimumAmount}
                    onChange={(e) => setFormData({ ...formData, minimumAmount: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAmount">Maximum Amount ($)</Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    placeholder="10000"
                    value={formData.maximumAmount}
                    onChange={(e) => setFormData({ ...formData, maximumAmount: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  if (!formData.name || !formData.description) {
                    return toast.error("Name and Description are required");
                  }
                  setIsSubmitting(true);
                  try {
                    await paymentMethodService.create({
                      ...formData,
                      minimumAmount: formData.minimumAmount ? parseFloat(formData.minimumAmount) : undefined,
                      maximumAmount: formData.maximumAmount ? parseFloat(formData.maximumAmount) : undefined,
                    });
                    toast.success("Payment method created successfully");
                    setIsAddModalOpen(false);
                    setFormData({
                      name: "",
                      description: "",
                      processingTime: "",
                      minimumAmount: "",
                      maximumAmount: ""
                    });
                    fetchMethods();
                  } catch (error) {
                    toast.error("Failed to create payment method");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                disabled={isSubmitting}
                className="rounded-xl min-w-[120px]"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Method"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">Edit Payment Method</DialogTitle>
              <DialogDescription>
                Update the configuration for {selectedMethod?.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Method Name</Label>
                <Input
                  id="edit-name"
                  placeholder="e.g. Visa/Mastercard, Bitcoin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  placeholder="Brief description of the method"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-processingTime">Processing Time</Label>
                <Input
                  id="edit-processingTime"
                  placeholder="e.g. Instant, 1-3 Business Days"
                  value={formData.processingTime}
                  onChange={(e) => setFormData({ ...formData, processingTime: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-minAmount">Minimum Amount ($)</Label>
                  <Input
                    id="edit-minAmount"
                    type="number"
                    placeholder="10"
                    value={formData.minimumAmount}
                    onChange={(e) => setFormData({ ...formData, minimumAmount: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-maxAmount">Maximum Amount ($)</Label>
                  <Input
                    id="edit-maxAmount"
                    type="number"
                    placeholder="10000"
                    value={formData.maximumAmount}
                    onChange={(e) => setFormData({ ...formData, maximumAmount: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  if (!formData.name || !formData.description) {
                    return toast.error("Name and Description are required");
                  }
                  if (!selectedMethod) return;

                  setIsSubmitting(true);
                  try {
                    await paymentMethodService.update(selectedMethod._id || selectedMethod.id || "", {
                      ...formData,
                      minimumAmount: formData.minimumAmount ? parseFloat(formData.minimumAmount) : undefined,
                      maximumAmount: formData.maximumAmount ? parseFloat(formData.maximumAmount) : undefined,
                    });
                    toast.success("Payment method updated successfully");
                    setIsEditModalOpen(false);
                    setFormData({
                      name: "",
                      description: "",
                      processingTime: "",
                      minimumAmount: "",
                      maximumAmount: ""
                    });
                    fetchMethods();
                  } catch (error) {
                    toast.error("Failed to update payment method");
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                disabled={isSubmitting}
                className="rounded-xl min-w-[120px]"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Card className="bg-primary/5 border border-primary/10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck className="w-32 h-32 text-primary" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <ShieldCheck className="w-5 h-5" /> Security & Compliance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-w-3xl relative z-10">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              All payment methods are encrypted using industry-standard <span className="font-bold text-foreground">AES-256 protocols</span>.
              Each transaction undergoes automatic <span className="font-bold text-foreground">AML (Anti-Money Laundering)</span> and
              <span className="font-bold text-foreground">KYC validation</span> checks before processing to ensure platform integrity and regulatory compliance.
            </p>
            <div className="flex gap-4">
              <Button variant="link" className="p-0 h-auto text-primary font-bold hover:no-underline hover:text-primary/80">View Compliance Logs</Button>
              <Button variant="link" className="p-0 h-auto text-primary font-bold hover:no-underline hover:text-primary/80">Gateway Health</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentMethods;
