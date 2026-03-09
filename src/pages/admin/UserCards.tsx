import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  ArrowUpDown,
  CreditCard,
  Lock,
  Unlock,
  Trash2,
  Loader2,
  ShieldCheck,
  MoreVertical,
  User as UserIcon
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { adminService } from "@/api/admin";
import { Card as CardType } from "@/api/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const UserCards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCards = async () => {
    setIsLoading(true);
    try {
      const response = await adminService.getCards();
      setCards(response.data || []);
    } catch (error) {
      console.error("Error fetching admin cards:", error);
      toast.error("Failed to fetch user cards");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleToggleFreeze = async (card: CardType) => {
    const newStatus = card.status === 'active' ? 'frozen' : 'active';
    try {
      await adminService.updateCard(card.id || card._id, { status: newStatus });
      toast.success(`Card ${newStatus === 'frozen' ? 'frozen' : 'activated'} successfully`);
      fetchCards();
    } catch (error) {
      toast.error(`Failed to ${newStatus === 'frozen' ? 'freeze' : 'activate'} card`);
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm("Are you sure you want to PERMANENTLY DELETE this card? This action cannot be undone.")) return;
    try {
      await adminService.deleteCard(cardId);
      toast.success("Card deleted successfully");
      fetchCards();
    } catch (error) {
      toast.error("Failed to delete card");
    }
  };

  const filteredCards = cards.filter(card =>
    card.cardHolder?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.cardNumber?.includes(searchQuery)
  );

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">User Card Management</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage all issued physical and virtual cards across the platform.</p>
          </div>
          <div className="flex gap-3">
             <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl flex items-center gap-2 border border-primary/20">
                <CreditCard className="w-4 h-4" />
                <span className="font-bold">{cards.length} Issued Cards</span>
             </div>
          </div>
        </div>

        <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
          <div className="p-4 border-b border-border/50 flex flex-col md:flex-row gap-4 justify-between bg-secondary/5">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by cardholder or number..."
                className="pl-10 rounded-xl bg-background/50 border-border/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl gap-2 h-9 border-border/50">
                <Filter className="w-4 h-4" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl gap-2 h-9 border-border/50">
                <ArrowUpDown className="w-4 h-4" /> Sort
              </Button>
            </div>
          </div>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground animate-pulse">Fetching issued cards...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      <th className="px-6 py-4">Cardholder Details</th>
                      <th className="px-6 py-4">Card Number / Type</th>
                      <th className="px-6 py-4">Expiry / CVV</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-sm">
                    {filteredCards.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                          {searchQuery ? "No cards matching your search." : "No issued cards found in the system."}
                        </td>
                      </tr>
                    ) : (
                      filteredCards.map((card) => (
                        <tr key={card.id || card._id} className="hover:bg-secondary/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-border">
                                <UserIcon className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div>
                                <p className="font-bold text-foreground">{card.cardHolder}</p>
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Platinum Holder</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <p className="font-mono text-xs font-bold text-foreground">
                                {card.cardNumber.replace(/\d(?=\d{4})/g, "*")}
                              </p>
                              <div className="flex items-center gap-1.5 mt-1">
                                <Badge variant="outline" className="text-[9px] uppercase font-bold py-0 h-4 border-slate-200">
                                  {card.type}
                                </Badge>
                                <span className="text-[10px] text-muted-foreground">Virtual Debit</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-xs font-medium">{card.expiryDate}</span>
                              <span className="text-[10px] text-muted-foreground font-mono">CVV: {card.cvv}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                             <Badge className={cn(
                               "rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                               card.status === 'active' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'
                             )}>
                               {card.status}
                             </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-xl">
                                <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer">
                                  <ShieldCheck className="w-4 h-4" /> Card Analytics
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className={cn(
                                    "gap-2 rounded-lg cursor-pointer",
                                    card.status === 'active' ? "text-amber-600 focus:text-amber-600" : "text-emerald-600 focus:text-emerald-600"
                                  )}
                                  onClick={() => handleToggleFreeze(card)}
                                >
                                  {card.status === 'active' ? (
                                    <><Lock className="w-4 h-4" /> Freeze Card</>
                                  ) : (
                                    <><Unlock className="w-4 h-4" /> Unfreeze Card</>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-2 rounded-lg cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30"
                                  onClick={() => handleDeleteCard(card.id || card._id)}
                                >
                                  <Trash2 className="w-4 h-4" /> Terminate Card
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-primary/5 border border-primary/10">
                <CardHeader>
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary" /> Card Compliance
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        All cards are issued following strict PCI-DSS guidelines. Administrators can monitor usage patterns to detect and prevent fraudulent activities in real-time.
                    </p>
                </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-secondary/20 border border-border/50">
                <CardHeader>
                    <CardTitle className="text-sm font-bold flex items-center gap-2">
                        <Lock className="w-4 h-4 text-muted-foreground" /> Security Protocol
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Freezing a card immediately suspends all pending authorizations and prevents new transactions from being processed until the card is manually unfrozen by an administrator or the user.
                    </p>
                </CardContent>
            </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserCards;
