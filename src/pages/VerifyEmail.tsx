import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
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
  userId: z.string().min(1, { message: "User ID is required" }),
  otp: z.string().length(6, { message: "OTP must be 6 digits" }),
});

type VerifyEmailValues = z.infer<typeof verifyEmailSchema>;

const VerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<VerifyEmailValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      userId: "",
      otp: "",
    },
  });

  const onSubmit = async (values: VerifyEmailValues) => {
    setIsLoading(true);
    try {
      await authService.verifyEmail(values);
      toast.success("Email verified successfully! You can now login.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-primary-foreground max-w-lg">
          <Link to="/" className="inline-flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <span className="text-primary font-heading font-bold text-lg">LB</span>
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight">Liberty Bell</span>
          </Link>

          <h2 className="text-4xl font-heading font-bold mb-6">Verify Your Account</h2>
          <p className="text-lg opacity-90 leading-relaxed mb-8">
            Complete your registration by verifying your email address. This ensures your account remains secure and accessible.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Login
            </Link>
            <h1 className="text-3xl font-heading font-bold mb-2">Email Verification</h1>
            <p className="text-muted-foreground">Enter your User ID and the 6-digit code sent to your email</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User ID</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Enter your User ID" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="w-full">Verification Code</FormLabel>
                    <FormControl>
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
    </div>
  );
};

export default VerifyEmail;
