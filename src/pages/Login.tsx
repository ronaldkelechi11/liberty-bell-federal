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

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await authService.login(values);

      if (values.username === 'admin@libertybellfederal' && response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        toast.success("Identity verified! Welcome back.");
        navigate("/dashboard");
        return;
      }

      setUserId(response.userId);
      setLoginData(values);
      setShowOtpModal(true);
      toast.success("Credentials valid! Please verify OTP.");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerify = async (otp: string) => {
    if (!userId) return;
    setIsOtpLoading(true);
    try {
      const response = await authService.verifyLoginOtp({
        userId,
        otp
      });

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      toast.success("Identity verified! Welcome back.");
      setShowOtpModal(false);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "OTP verification failed");
    } finally {
      setIsOtpLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side: Illustration/Text */}
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

          <h2 className="text-4xl font-heading font-bold mb-6">Welcome back to Secure Banking</h2>
          <p className="text-lg opacity-90 leading-relaxed mb-8">
            Access your accounts, manage your finances, and stay on top of your goals with our industry-leading security features.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div className="text-2xl font-bold mb-1">99.9%</div>
              <div className="text-sm opacity-80">Uptime Reliability</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div className="text-2xl font-bold mb-1">256-bit</div>
              <div className="text-sm opacity-80">AES Encryption</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">LB</span>
              </div>
              <span className="font-heading text-2xl font-bold text-foreground tracking-tight">Liberty Bell</span>
            </Link>
          </div>

          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-3xl font-heading font-bold mb-2">Login</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
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
                        <Input placeholder="johndoe" className="pl-10" {...field} />
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <div className="flex gap-4">
                        <Link to="/verify-email" className="text-xs text-primary hover:underline font-medium">
                          Verify email?
                        </Link>
                        <Link to="#" className="text-xs text-primary hover:underline font-medium">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full btn-glow" size="lg" loading={isLoading}>
                Sign In
              </Button>
            </form>
          </Form>

          <p className="text-center mt-8 text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onVerify={handleOtpVerify}
        emailOrPhone={loginData?.username || "your registered device"}
        loading={isOtpLoading}
      />
    </div>
  );
};

export default Login;
