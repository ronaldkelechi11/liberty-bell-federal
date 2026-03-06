import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { authService } from "@/api/auth";

const verifyEmailSchema = z.object({
  _id: z.string().min(1, "User ID is required"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      _id: searchParams.get("_id") || "",
      otp: "",
    },
  });

  const onSubmit = async (values: VerifyEmailFormValues) => {
    setIsLoading(true);
    try {
      await authService.verifyEmail(values);
      toast.success("Email verified successfully! You can now log in.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-6">
      <div className="w-full max-w-md bg-card border border-border rounded-3xl shadow-xl p-8">
        <div className="mb-8">
          <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Login
          </Link>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4">
            <Mail className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-heading font-bold mb-2">Verify Your Email</h1>
          <p className="text-muted-foreground">Enter your User ID and the 6-digit code sent to your email.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your User ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <InputOTPGroup className="gap-2">
                          <InputOTPSlot index={0} className="w-12 h-12 text-lg border-2 rounded-md" />
                          <InputOTPSlot index={1} className="w-12 h-12 text-lg border-2 rounded-md" />
                          <InputOTPSlot index={2} className="w-12 h-12 text-lg border-2 rounded-md" />
                          <InputOTPSlot index={3} className="w-12 h-12 text-lg border-2 rounded-md" />
                          <InputOTPSlot index={4} className="w-12 h-12 text-lg border-2 rounded-md" />
                          <InputOTPSlot index={5} className="w-12 h-12 text-lg border-2 rounded-md" />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full btn-glow" size="lg" loading={isLoading}>
              Verify Email
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmail;
