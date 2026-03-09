import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  MoreVertical,
  User as UserIcon,
  Filter,
  ArrowUpDown,
  Lock,
  Unlock,
  CreditCard,
  Ban,
  Mail,
  ShieldAlert,
  History,
  Loader2,
  Wallet
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
import { User, Account, AdminCreditDebitDto, Transaction } from "@/api/types";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const UserAccounts = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isDebitModalOpen, setIsDebitModalOpen] = useState(false);
  const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
  const [isAccountsModalOpen, setIsAccountsModalOpen] = useState(false);
  const [userAccounts, setUserAccounts] = useState<Account[]>([]);
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);
  const [isActionPending, setIsActionPending] = useState(false);

  // Form state
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [newLimit, setNewLimit] = useState("");
  const [newPin, setNewPin] = useState("");
  const [description, setDescription] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  // const fetchUsers = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await adminService.getUsers();
  //     console.log(response.data);
  //     setUsers(response.data || []);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await adminService.getUsers();
        console.log(response.data);

        setUsers(response.data || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenCredit = async (user: User) => {
    const userId = user.id || (user as any)._id;
    setSelectedUser(user);
    setIsCreditModalOpen(true);
    fetchUserAccounts(userId);
  };

  const handleOpenDebit = async (user: User) => {
    const userId = user.id || (user as any)._id;
    setSelectedUser(user);
    setIsDebitModalOpen(true);
    fetchUserAccounts(userId);
  };

  const handleOpenLimit = async (user: User) => {
    const userId = user.id || (user as any)._id;
    setSelectedUser(user);
    setIsLimitModalOpen(true);
    fetchUserAccounts(userId);
  };

  const handleOpenAccounts = async (user: User) => {
    const userId = user.id || (user as any)._id;
    setSelectedUser(user);
    setIsAccountsModalOpen(true);
    fetchUserAccounts(userId);
  };

  const handleOpenTransactions = async (user: User) => {
    const userId = user.id || (user as any)._id;
    setSelectedUser(user);
    setIsTransactionsModalOpen(true);
    setIsActionPending(true);
    try {
      const response = await adminService.getUserTransactions(userId);
      setUserTransactions(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch user transactions");
    } finally {
      setIsActionPending(false);
    }
  };

  const handleFreezeAccount = async (account: Account) => {
    const userId = selectedUser!.id || (selectedUser as any)._id;
    try {
      await adminService.freezeAccount(account.id || account._id);
      toast.success("Account frozen successfully");
      fetchUserAccounts(userId);
    } catch (error) {
      toast.error("Failed to freeze account");
    }
  };

  const handleUnfreezeAccount = async (account: Account) => {
    const userId = selectedUser!.id || (selectedUser as any)._id;
    try {
      await adminService.unfreezeAccount(account.id || account._id);
      toast.success("Account unfrozen successfully");
      fetchUserAccounts(userId);
    } catch (error) {
      toast.error("Failed to unfreeze account");
    }
  };

  const handleUpdateLimit = async () => {
    if (!selectedAccountId || !newLimit) return toast.error("Select account and enter limit");
    setIsActionPending(true);
    try {
      await adminService.updateLimit(selectedAccountId, { limit: parseFloat(newLimit) });
      toast.success("Limit updated successfully");
      setIsLimitModalOpen(false);
      resetActionForm();
    } catch (error) {
      toast.error("Failed to update limit");
    } finally {
      setIsActionPending(false);
    }
  };

  const handleUpdatePin = async () => {
    if (!selectedUser || !newPin) return toast.error("Enter new PIN");
    if (newPin.length !== 4) return toast.error("PIN must be 4 digits");
    setIsActionPending(true);
    const userId = selectedUser.id || (selectedUser as any)._id;
    try {
      await adminService.updateUserTransferPin(userId, { pin: newPin });
      toast.success("Transfer PIN updated successfully");
      setIsPinModalOpen(false);
      resetActionForm();
    } catch (error) {
      toast.error("Failed to update PIN");
    } finally {
      setIsActionPending(false);
    }
  };

  const handleCloseAccount = async (accountId: string) => {
    if (!confirm("Are you sure you want to CLOSE this account? This cannot be undone.")) return;
    try {
      await adminService.closeAccount(accountId);
      toast.success("Account closed successfully");
      fetchUserAccounts(selectedUser!.id);
    } catch (error) {
      toast.error("Failed to close account");
    }
  };

  const fetchUserAccounts = async (userId: string) => {
    try {
      const response = await adminService.getAccounts({ userId });
      setUserAccounts(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch user accounts");
    }
  };

  const handleRequestActionOtp = async () => {
    if (!selectedAccountId) return toast.error("Select an account");
    setIsActionPending(true);
    try {
      await adminService.requestCreditOtp(selectedAccountId);
      setShowOtp(true);
      toast.success("OTP sent to your email");
    } catch (error) {
      toast.error("Failed to request OTP");
    } finally {
      setIsActionPending(false);
    }
  };

  const handleCreditAccount = async () => {
    if (!otp) return toast.error("Enter OTP");
    setIsActionPending(true);
    try {
      await adminService.creditAccount(selectedAccountId, {
        amount: parseFloat(amount),
        description,
        otp
      });
      toast.success("Account credited successfully");
      setIsCreditModalOpen(false);
      resetActionForm();
    } catch (error) {
      toast.error("Credit failed");
    } finally {
      setIsActionPending(false);
    }
  };

  const handleDebitAccount = async () => {
    if (!otp) return toast.error("Enter OTP");
    setIsActionPending(true);
    try {
      await adminService.debitAccount(selectedAccountId, {
        amount: parseFloat(amount),
        description,
        otp
      });
      toast.success("Account debited successfully");
      setIsDebitModalOpen(false);
      resetActionForm();
    } catch (error) {
      toast.error("Debit failed");
    } finally {
      setIsActionPending(false);
    }
  };

  const resetActionForm = () => {
    setSelectedAccountId("");
    setAmount("");
    setNewLimit("");
    setNewPin("");
    setDescription("");
    setOtp("");
    setShowOtp(false);
  };

  return (
    <DashboardLayout isAdmin={true}>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground tracking-tight">User Management</h1>
            <p className="text-muted-foreground mt-1">Monitor users, manage accounts, and handle administrative actions.</p>
          </div>
          <div className="flex gap-3">
            <Button
              className="rounded-xl gap-2 bg-primary hover:bg-primary/90"
              onClick={() => navigate('/register')}
            >
              <UserIcon className="w-4 h-4" /> Create User
            </Button>
          </div>
        </div>

        <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
          <div className="p-4 border-b border-border/50 flex flex-col md:flex-row gap-4 justify-between bg-secondary/5">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search users by name or email..." className="pl-10 rounded-xl bg-background/50 border-border/50" />
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
                <p className="text-sm text-muted-foreground animate-pulse">Fetching system users...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/10 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                      <th className="px-6 py-4">User Details</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Email Status</th>
                      <th className="px-6 py-4">Age/Location</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-sm">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                          No users found in the system.
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id} className="hover:bg-secondary/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20 group-hover:scale-110 transition-transform">
                                {u.profilePicture ? <img src={u.profilePicture} alt={`${u.firstname} ${u.lastname}`} className="w-full h-full object-cover rounded-full" /> : <span>{u.firstname?.[0]}{u.lastname?.[0]}</span>}
                              </div>
                              <div>
                                <p className="font-bold text-foreground">{u.firstname} {u.lastname}</p>
                                <p className="text-xs text-muted-foreground">@{u.username}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant={u.role === 'admin' ? 'default' : 'secondary'} className="rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                              {u.role}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${u.isVerified ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              <span className="text-xs font-medium">{u.isVerified ? 'Verified' : 'Unverified'}</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{u.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-xs font-medium">{u.age} yrs • {u.maritalStatus}</p>
                            <p className="text-[10px] text-muted-foreground">{u.city}, {u.country}</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary transition-colors">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48 rounded-xl p-1 shadow-xl">
                                <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer"><UserIcon className="w-4 h-4" /> View Profile</DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-2 rounded-lg cursor-pointer"
                                  onClick={() => handleOpenTransactions(u)}
                                ><History className="w-4 h-4" /> Transactions</DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-2 rounded-lg cursor-pointer"
                                  onClick={() => handleOpenAccounts(u)}
                                ><Wallet className="w-4 h-4" /> Accounts</DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-2 rounded-lg cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50 dark:focus:bg-emerald-950/30"
                                  onClick={() => handleOpenCredit(u)}
                                >
                                  <CreditCard className="w-4 h-4" /> Credit Account
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-2 rounded-lg cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30"
                                  onClick={() => handleOpenDebit(u)}
                                >
                                  <Ban className="w-4 h-4" /> Debit Account
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-2 rounded-lg cursor-pointer text-blue-600 focus:text-blue-600 focus:bg-blue-50 dark:focus:bg-blue-950/30"
                                  onClick={() => handleOpenLimit(u)}
                                >
                                  <ShieldAlert className="w-4 h-4" /> Update Limit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="gap-2 rounded-lg cursor-pointer text-amber-600 focus:text-amber-600 focus:bg-amber-50 dark:focus:bg-amber-950/30"
                                  onClick={() => {
                                    setSelectedUser(u);
                                    setIsPinModalOpen(true);
                                  }}
                                >
                                  <Lock className="w-4 h-4" /> Reset Transfer PIN
                                </DropdownMenuItem>
                                <DropdownMenuItem className="gap-2 rounded-lg cursor-pointer"><ShieldAlert className="w-4 h-4" /> Reset 2FA</DropdownMenuItem>
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
      </div>

      {/* Credit Modal */}
      <Dialog open={isCreditModalOpen} onOpenChange={(open) => { setIsCreditModalOpen(open); if (!open) resetActionForm(); }}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-emerald-600" /> Credit Account
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {!showOtp ? (
              <>
                <div className="space-y-2">
                  <Label>Select Account</Label>
                  <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                    <SelectTrigger className="rounded-xl h-12">
                      <SelectValue placeholder="Choose account" />
                    </SelectTrigger>
                    <SelectContent>
                      {userAccounts.map(acc => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.type.toUpperCase()} ({acc.accountNumber}) - ${acc.balance.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="rounded-xl h-12"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="Reason for credit"
                    className="rounded-xl h-12"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label>Enter 6-digit OTP</Label>
                <Input
                  placeholder="000000"
                  className="rounded-xl h-12 text-center text-lg tracking-widest font-bold"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              className="w-full h-12 rounded-xl text-lg font-bold"
              disabled={isActionPending}
              onClick={!showOtp ? handleRequestActionOtp : handleCreditAccount}
            >
              {isActionPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {!showOtp ? "Next" : "Confirm Credit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Debit Modal */}
      <Dialog open={isDebitModalOpen} onOpenChange={(open) => { setIsDebitModalOpen(open); if (!open) resetActionForm(); }}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Ban className="w-6 h-6 text-rose-600" /> Debit Account
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {!showOtp ? (
              <>
                <div className="space-y-2">
                  <Label>Select Account</Label>
                  <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                    <SelectTrigger className="rounded-xl h-12">
                      <SelectValue placeholder="Choose account" />
                    </SelectTrigger>
                    <SelectContent>
                      {userAccounts.map(acc => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.type.toUpperCase()} ({acc.accountNumber}) - ${acc.balance.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="rounded-xl h-12"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    placeholder="Reason for debit"
                    className="rounded-xl h-12"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label>Enter 6-digit OTP</Label>
                <Input
                  placeholder="000000"
                  className="rounded-xl h-12 text-center text-lg tracking-widest font-bold"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              className="w-full h-12 rounded-xl text-lg font-bold"
              disabled={isActionPending}
              onClick={!showOtp ? handleRequestActionOtp : handleDebitAccount}
            >
              {isActionPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {!showOtp ? "Next" : "Confirm Debit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Limit Modal */}
      <Dialog open={isLimitModalOpen} onOpenChange={(open) => { setIsLimitModalOpen(open); if (!open) resetActionForm(); }}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-blue-600" /> Update Account Limit
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Select Account</Label>
              <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
                <SelectTrigger className="rounded-xl h-12">
                  <SelectValue placeholder="Choose account" />
                </SelectTrigger>
                <SelectContent>
                  {userAccounts.map(acc => (
                    <SelectItem key={acc.id} value={acc.id}>
                      {acc.type.toUpperCase()} ({acc.accountNumber}) - Limit: ${acc.dailyLimit.toLocaleString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>New Daily Limit</Label>
              <Input
                type="number"
                placeholder="0.00"
                className="rounded-xl h-12"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full h-12 rounded-xl text-lg font-bold"
              disabled={isActionPending}
              onClick={handleUpdateLimit}
            >
              {isActionPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Update Limit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Transactions Modal */}
      <Dialog open={isTransactionsModalOpen} onOpenChange={setIsTransactionsModalOpen}>
        <DialogContent className="sm:max-w-[700px] rounded-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <History className="w-6 h-6 text-primary" /> User Transactions
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {isActionPending ? (
              <div className="flex justify-center py-10"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
            ) : userTransactions.length === 0 ? (
              <p className="text-center py-10 text-muted-foreground">No transactions found for this user.</p>
            ) : (
              <div className="space-y-3">
                {userTransactions.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-3 border rounded-xl">
                    <div>
                      <p className="font-bold text-sm">{t.description}</p>
                      <p className="text-xs text-muted-foreground">{t.createdAt ? format(new Date(t.createdAt), 'MMM dd, yyyy') : 'N/A'}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${t.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {t.type === 'credit' ? '+' : '-'}${t.amount.toLocaleString()}
                      </p>
                      <Badge variant="outline" className="text-[10px] uppercase">{t.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset PIN Modal */}
      <Dialog open={isPinModalOpen} onOpenChange={(open) => { setIsPinModalOpen(open); if (!open) resetActionForm(); }}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Lock className="w-6 h-6 text-amber-600" /> Reset Transfer PIN
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>New 4-Digit PIN</Label>
              <Input
                type="password"
                placeholder="••••"
                className="rounded-xl h-12 text-center text-lg tracking-widest font-bold"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full h-12 rounded-xl text-lg font-bold"
              disabled={isActionPending}
              onClick={handleUpdatePin}
            >
              {isActionPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              Update PIN
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Accounts Modal */}
      <Dialog open={isAccountsModalOpen} onOpenChange={setIsAccountsModalOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Wallet className="w-6 h-6 text-primary" /> User Accounts
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {userAccounts.length === 0 ? (
              <p className="text-center py-10 text-muted-foreground">No accounts found for this user.</p>
            ) : (
              userAccounts.map(acc => (
                <div key={acc.id} className="flex items-center justify-between p-4 border rounded-2xl">
                  <div>
                    <p className="font-bold capitalize">{acc.type} Account</p>
                    <p className="text-sm text-muted-foreground">{acc.accountNumber}</p>
                    <p className="text-lg font-bold mt-1">${acc.balance.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={cn(
                      "uppercase text-[10px]",
                      acc.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'
                    )}>{acc.status}</Badge>
                    {acc.status === 'active' ? (
                      <Button size="sm" variant="outline" className="text-rose-600 border-rose-200" onClick={() => handleFreezeAccount(acc)}>
                        <Lock className="w-3 h-3 mr-1" /> Freeze
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200" onClick={() => handleUnfreezeAccount(acc)}>
                        <Unlock className="w-3 h-3 mr-1" /> Unfreeze
                      </Button>
                    )}
                    <Button size="sm" variant="destructive" className="bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100" onClick={() => handleCloseAccount(acc.id)}>
                      <Ban className="w-3 h-3 mr-1" /> Close
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default UserAccounts;
