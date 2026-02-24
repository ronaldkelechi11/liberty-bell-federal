import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wallet, CreditCard, Banknote, TrendingUp, Clock, CheckCircle2, AlertCircle, ArrowDownLeft, Loader2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { accountService } from "@/api/accounts";
import { paymentMethodService } from "@/api/payment-methods";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import PaymentMethodModal from "@/components/dashboard/PaymentMethodModal";
import { PaymentMethod } from "@/api/types";

const accountDepositInfo = [
    {
        type: "checking",
        title: "Checking Account",
        methods: ["Bank Transfer (ACH)", "Debit Card", "Wire Transfer"],
        notes: "Fastest way to access deposited funds for everyday transactions.",
        minDeposit: "$0.01",
    },
    {
        type: "savings",
        title: "Savings Account",
        methods: ["Bank Transfer (ACH)", "Debit Card", "Wire Transfer"],
        notes: "Earn interest on your deposits. Ideal for building emergency funds.",
        minDeposit: "$0.01",
    },
    {
        type: "investment",
        title: "Investment Account",
        methods: ["Bank Transfer (ACH)", "Wire Transfer"],
        notes: "Deposits will be held before investment allocation. Wire transfers recommended for large amounts.",
        minDeposit: "$500",
    },
    {
        type: "btc",
        title: "Bitcoin Account",
        methods: ["Wire Transfer", "Bank Transfer (ACH)"],
        notes: "Funds converted to Bitcoin. Bitcoin price fluctuates - ensure you understand crypto risks.",
        minDeposit: "$25",
    },
    {
        type: "current",
        title: "Current/Premium Account",
        methods: ["Bank Transfer (ACH)", "Debit Card", "Wire Transfer"],
        notes: "Premium banking features with priority support. All deposit methods available.",
        minDeposit: "$0.01",
    },
];

const Deposits = () => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: accounts = [], isLoading: accountsLoading } = useQuery({
        queryKey: ["accounts"],
        queryFn: () => accountService.getMyAccounts(),
        throwOnError: false,
    });

    const { data: paymentMethods = [], isLoading: paymentMethodsLoading } = useQuery({
        queryKey: ["payment-methods"],
        queryFn: () => paymentMethodService.getAll(),
        throwOnError: false,
    });

    const handlePaymentMethodClick = (method: PaymentMethod) => {
        setSelectedPaymentMethod(method);
        setIsModalOpen(true);
    };

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-heading font-bold flex items-center gap-2">
                        <ArrowDownLeft className="w-8 h-8 text-primary" />
                        Add Funds to Your Account
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Multiple convenient ways to deposit money into your Liberty Bell accounts
                    </p>
                </div>

                {/* Important Notes */}
                <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                    <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <AlertTitle>Quick Tips</AlertTitle>
                    <AlertDescription className="text-blue-700 dark:text-blue-300">
                        <ul className="list-disc list-inside space-y-1 mt-2">
                            <li>Bank transfers (ACH) are free but take 1-3 business days</li>
                            <li>Debit cards offer instant deposits with a small fee</li>
                            <li>Wire transfers are best for large amounts and international transfers</li>
                            <li>All deposits are covered by FDIC insurance up to $250,000</li>
                        </ul>
                    </AlertDescription>
                </Alert>

                {/* Your Accounts Section */}
                <div>
                    <h2 className="text-2xl font-heading font-bold mb-6">Your Accounts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {accountsLoading ? (
                            <>
                                <Skeleton className="h-32 rounded-2xl" />
                                <Skeleton className="h-32 rounded-2xl" />
                                <Skeleton className="h-32 rounded-2xl" />
                            </>
                        ) : accounts.length > 0 ? (
                            accounts.map((account) => (
                                <Card
                                    key={account.id}
                                    className="border-2 hover:border-primary/50 transition-colors cursor-pointer group"
                                >
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                <Wallet className="w-6 h-6 text-primary" />
                                            </div>
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        </div>
                                        <p className="font-bold capitalize text-lg">
                                            {account.type === "btc" ? "Bitcoin" : account.type} Account
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {account.accountNumber}
                                        </p>
                                        <p className="font-bold text-xl mt-3">
                                            {account.currency === "BTC" ? "₿" : "$"}
                                            {account.balance.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                            })}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Card className="col-span-full">
                                <CardContent className="p-12 text-center">
                                    <p className="text-muted-foreground">No accounts found. Create an account to start depositing.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Deposit Methods */}
                <div>
                    <h2 className="text-2xl font-heading font-bold mb-6">Payment Methods</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paymentMethodsLoading ? (
                            // Loading Animation
                            <>
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <Card className="border-2 h-48 flex items-center justify-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                                <p className="text-sm text-muted-foreground">Loading payment methods...</p>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </>
                        ) : paymentMethods.length > 0 ? (
                            paymentMethods.map((method) => (
                                <motion.div
                                    key={method.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Card
                                        className="border-2 hover:border-primary/50 transition-all cursor-pointer h-48 flex flex-col items-center justify-center gap-4 p-6"
                                        onClick={() => handlePaymentMethodClick(method)}
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                                            <CreditCard className="w-8 h-8 text-primary" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold text-lg">{method.name}</p>
                                            <p className="text-xs text-muted-foreground mt-1">Click to learn more</p>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))
                        ) : (
                            <Card className="col-span-full">
                                <CardContent className="p-12 text-center">
                                    <p className="text-muted-foreground">No payment methods available.</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Account Deposit Information */}
                <div>
                    <h2 className="text-2xl font-heading font-bold mb-6">
                        Deposit Options by Account Type
                    </h2>
                    <div className="space-y-4">
                        {accountDepositInfo.map((info) => (
                            <Card key={info.type} className="border-2">
                                <CardHeader>
                                    <CardTitle className="capitalize">{info.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                                            Accepted Deposit Methods
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {info.methods.map((method) => (
                                                <span
                                                    key={method}
                                                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                                                >
                                                    {method}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-secondary/30 p-4 rounded-xl border border-border">
                                        <p className="text-sm">
                                            <span className="font-semibold">Note:</span> {info.notes}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Minimum Deposit</span>
                                        <span className="font-bold">{info.minDeposit}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Security Note */}
                <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle>Your Deposits Are Protected</AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-300">
                        All deposits are protected by FDIC insurance up to $250,000 per account. Your
                        information is secured with 256-bit SSL encryption and multi-factor authentication.
                    </AlertDescription>
                </Alert>

                <PaymentMethodModal
                    paymentMethod={selectedPaymentMethod}
                    isOpen={isModalOpen}
                    onOpenChange={setIsModalOpen}
                />
            </div>
        </DashboardLayout>
    );
};

export default Deposits;
