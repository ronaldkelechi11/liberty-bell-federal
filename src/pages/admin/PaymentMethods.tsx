import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, Trash2, Edit2, ShieldCheck, Banknote } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const PaymentMethods = () => {
  const methods = [
    { id: '1', name: 'Credit/Debit Card', description: 'Visa, Mastercard, Amex payments', active: true },
    { id: '2', name: 'Bank Wire', description: 'SWIFT/SEPA transfers', active: true },
    { id: '3', name: 'Bitcoin', description: 'Crypto deposit method', active: false },
  ];

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Payment Methods</h1>
            <p className="text-muted-foreground">Configure available deposit and withdrawal methods.</p>
          </div>
          <Button className="rounded-xl gap-2">
            <Plus className="w-4 h-4" /> Add Method
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {methods.map((m) => (
            <Card key={m.id} className={m.active ? "" : "opacity-60 bg-secondary/20"}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    {m.name.includes('Card') ? <CreditCard className="w-6 h-6" /> : <Banknote className="w-6 h-6" />}
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"><Edit2 className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>
                  </div>
                </div>
                <CardTitle className="mt-4">{m.name}</CardTitle>
                <CardDescription>{m.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4 border-t border-border flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${m.active ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                  <span className="text-xs font-medium uppercase tracking-wider">{m.active ? 'Enabled' : 'Disabled'}</span>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl">Configure</Button>
              </CardContent>
            </Card>
          ))}

          <Card className="border-dashed flex flex-col items-center justify-center p-8 bg-secondary/10">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="font-bold">New Method</h3>
            <p className="text-xs text-muted-foreground mt-1 text-center">Add a new gateway or banking option.</p>
            <Button variant="outline" className="mt-4 rounded-xl">Create New</Button>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" /> Security Gateway
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">All payment methods are encrypted using industry-standard AES-256 protocols. Each transaction undergoes automatic AML (Anti-Money Laundering) checks before processing.</p>
            <Button variant="link" className="p-0 h-auto text-primary font-bold">View Compliance Logs</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentMethods;
