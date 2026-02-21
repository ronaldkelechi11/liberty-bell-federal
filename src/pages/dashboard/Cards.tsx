import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, MoreHorizontal, ShieldCheck, Zap, Lock } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { cardService } from "@/api/cards";
import { Skeleton } from "@/components/ui/skeleton";

const Cards = () => {
  const { data: cards = [], isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: () => cardService.getCards(),
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Your Cards</h1>
            <p className="text-muted-foreground">Manage your physical and virtual payment cards.</p>
          </div>
          <Button
            className="rounded-xl gap-2"
            onClick={() => toast.info("Card request feature coming soon!")}
          >
            <Plus className="w-4 h-4" /> Request New Card
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {isLoading ? (
              Array(2).fill(0).map((_, i) => (
                <Skeleton key={i} className="aspect-[1.586/1] md:h-56 rounded-2xl" />
              ))
            ) : cards.length > 0 ? (
              cards.map((card) => (
                <div key={card.id} className="group relative">
                  <Card className={`${card.status === 'active' ? 'bg-primary' : 'bg-zinc-500'} border-none text-white overflow-hidden aspect-[1.586/1] md:aspect-auto md:h-56 shadow-xl transition-transform duration-300 hover:-translate-y-1`}>
                    <CardContent className="p-6 md:p-8 h-full flex flex-col justify-between relative">
                      <div className="absolute top-0 right-0 p-4 opacity-50">
                        <CreditCard className="w-32 h-32 -mr-8 -mt-8" />
                      </div>

                      <div className="flex justify-between items-start relative z-10">
                        <div>
                          <Badge variant="secondary" className="bg-white/20 border-none text-white hover:bg-white/30 mb-2 uppercase text-[10px]">
                            {card.status} Card
                          </Badge>
                          <h3 className="text-lg font-bold">Liberty Platinum</h3>
                        </div>
                        <div className="w-12 h-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-md">
                          <Zap className="w-6 h-6 fill-white" />
                        </div>
                      </div>

                      <div className="relative z-10 mt-auto">
                        <p className="text-xl md:text-2xl font-mono tracking-widest">{card.cardNumber}</p>
                        <div className="flex justify-between items-end mt-6">
                          <div>
                            <p className="text-[10px] uppercase opacity-60">Card Holder</p>
                            <p className="font-bold">{card.cardHolder}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase opacity-60">Expires</p>
                            <p className="font-bold">{card.expiryDate}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-4 flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl flex-1 gap-2"
                      onClick={() => toast.info("Card management coming soon!")}
                    >
                      <ShieldCheck className="w-4 h-4" /> Manage
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl flex-1 gap-2"
                      onClick={() => toast.info(`Card ${card.status === 'active' ? 'freezing' : 'unfreezing'} coming soon!`)}
                    >
                      <Lock className="w-4 h-4" /> {card.status === 'active' ? 'Freeze' : 'Unfreeze'}
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-xl">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border-2 border-dashed rounded-2xl">
                <p className="text-muted-foreground">No cards found.</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-secondary/30">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4">Card Security</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-background rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Online Payments</p>
                        <p className="text-xs text-muted-foreground">Enabled for all cards</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary font-bold"
                      onClick={() => toast.info("Security settings coming soon!")}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">ATM Withdrawals</p>
                        <p className="text-xs text-muted-foreground">Limit: $1,000 / day</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary font-bold"
                      onClick={() => toast.info("Security settings coming soon!")}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-none shadow-sm bg-primary/5">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold">Virtual Cards</h4>
                  <p className="text-xs text-muted-foreground mt-2">Create disposable virtual cards for secure online shopping.</p>
                  <Button
                    variant="link"
                    className="p-0 text-primary mt-2 h-auto"
                    onClick={() => toast.info("Virtual cards coming soon!")}
                  >
                    Create Virtual Card
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-indigo-50">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold">PIN Management</h4>
                  <p className="text-xs text-muted-foreground mt-2">Change your card PIN anytime through our secure portal.</p>
                  <Button
                    variant="link"
                    className="p-0 text-indigo-600 mt-2 h-auto"
                    onClick={() => toast.info("PIN management coming soon!")}
                  >
                    Update PIN
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Cards;
