import { useState, useMemo, useEffect } from "react";
import { accountService } from "@/api/accounts";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronLeft,
  Calendar,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionReceiptModal from "@/components/dashboard/TransactionReceiptModal";
import { Transaction } from "@/api/types";
import { format } from "date-fns";

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await accountService.getAllTransactions();
        setTransactions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // ✅ Safe filtering with null checks
  const filteredTransactions = useMemo(() => {
    const term = searchTerm.toLowerCase();

    return transactions.filter((t) => {
      const description = t.description?.toLowerCase() || "";
      const reference = t.reference?.toLowerCase() || "";
      const category = t.category?.toLowerCase() || "";

      return (
        description.includes(term) ||
        reference.includes(term) ||
        category.includes(term)
      );
    });
  }, [transactions, searchTerm]);

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link to="/dashboard">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>

          <div>
            <h1 className="text-2xl font-heading font-bold">Transactions</h1>
            <p className="text-muted-foreground">
              View and manage all your account activities.
            </p>
          </div>

          <div className="ml-auto">
            <Button
              variant="outline"
              className="rounded-xl gap-2 hidden md:flex"
            >
              <Download className="w-4 h-4" /> Export CSV
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by description, reference..."
              className="pl-10 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              className="rounded-xl gap-2 flex-1 md:flex-none"
            >
              <Calendar className="w-4 h-4" /> Date Range
            </Button>
            <Button
              variant="outline"
              className="rounded-xl gap-2 flex-1 md:flex-none"
            >
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>
        </div>

        {/* Transactions List */}
        <Card className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="divide-y divide-border">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <div className="space-y-2 text-right">
                        <Skeleton className="h-4 w-20 ml-auto" />
                        <Skeleton className="h-3 w-16 ml-auto" />
                      </div>
                    </div>
                  ))}
              </div>
            ) : filteredTransactions.length > 0 ? (
              <div className="divide-y divide-border">
                {filteredTransactions.map((t) => {
                  const amount = Number(t.amount) || 0;
                  const isDebit = t.type === "debit";

                  // ✅ Safe date parsing
                  const formattedDate = t.createdAt
                    ? format(new Date(t.createdAt), "MMM dd, yyyy")
                    : "—";

                  return (
                    <div
                      key={t.id}
                      className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors cursor-pointer"
                      onClick={() => handleTransactionClick(t)}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isDebit
                              ? "bg-red-50 text-red-600"
                              : "bg-green-50 text-green-600"
                          }`}
                        >
                          {isDebit ? (
                            <ArrowUpRight className="w-5 h-5" />
                          ) : (
                            <ArrowDownLeft className="w-5 h-5" />
                          )}
                        </div>

                        <div>
                          <p className="font-medium">
                            {t.description || "Transaction"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formattedDate} • {t.category || "General"}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={`font-bold ${
                            isDebit ? "text-foreground" : "text-green-600"
                          }`}
                        >
                          {isDebit ? "-" : "+"}$
                          {Math.abs(amount).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>

                        <Badge
                          variant="secondary"
                          className="text-[10px] uppercase font-bold px-2 py-0 h-5"
                        >
                          {t.status || "completed"}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  No transactions found matching your criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <TransactionReceiptModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </DashboardLayout>
  );
};

export default Transactions;
