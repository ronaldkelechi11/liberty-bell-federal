import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, User } from "lucide-react";
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
import { toast } from "sonner";
import OtpModal from "@/components/auth/OtpModal";
import { authService } from "@/api/auth";
import { setTokens } from "@/api/client";

const loginSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loginData, setLoginData] = useState<LoginFormValues | null>(null);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // =========================
  // LOGIN STEP
  // =========================
  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);

    try {
      const response = await authService.login(values);

      console.log(response);
      
      // If backend already issues token (e.g. admin bypass OTP)
      if (response.access_token) {
        await setTokens(response.access_token);
        localStorage.setItem("user", JSON.stringify(response.user));
        toast.success("Welcome back, Admin.");
        navigate("/admin");
        return;
      }

      // Otherwise require OTP verification
      setUserId(response.userId);
      setLoginData(values);
      setShowOtpModal(true);

      toast.success("Credentials valid. Please verify OTP.");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "Authentication failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // =========================
  // OTP VERIFICATION STEP
  // =========================
  const handleOtpVerify = async (otp: string) => {
    if (!userId) return;

    setIsOtpLoading(true);

    try {
      const response = await authService.verifyLoginOtp({
        userId,
        otp,
      });

      await setTokens(response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));

      toast.success("Identity verified. Welcome back.");

      // Clear sensitive state
      setLoginData(null);
      setUserId(null);
      setShowOtpModal(false);

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
        error.message ||
        "OTP verification failed"
      );
    } finally {
      setIsOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 text-primary-foreground max-w-lg">
          <Link to="/" className="inline-flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <span className="text-primary font-bold text-lg">LB</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">Liberty Bell</span>
          </Link>

          <h2 className="text-4xl font-bold mb-6">
            Welcome back to Secure Banking
          </h2>

          <p className="text-lg opacity-90 leading-relaxed mb-8">
            Access your accounts, manage your finances, and stay on top of your
            goals with industry-leading security.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>

            <h1 className="text-3xl font-bold mb-2">Login</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="johndoe"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Haven't verified your account?{" "}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Verify Email
            </Link>
          </p>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* OTP MODAL */}
      <OtpModal
        isOpen={showOtpModal}
        onClose={() => {}} // Prevent accidental close for banking security
        onVerify={handleOtpVerify}
        emailOrPhone={loginData?.username || "your registered device"}
        loading={isOtpLoading}
      />
    </div>
  );
};

export default Login;
