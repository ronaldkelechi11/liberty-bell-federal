import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authService } from "@/api/auth";
import { Mail } from "lucide-react";

const resendSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ResendFormValues = z.infer<typeof resendSchema>;

interface ResendVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResendVerificationModal = ({ isOpen, onClose }: ResendVerificationModalProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const form = useForm<ResendFormValues>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ResendFormValues) => {
    setIsLoading(true);
    try {
      const response = await authService.resendVerification(values);
      toast.success(response.message || "Verification code sent to your email.");
      onClose();
      // Redirect to the verification page with the userId
      navigate(`/verify-email?userId=${response.userId}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to resend verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-heading font-bold text-center">Resend Verification</DialogTitle>
          <DialogDescription className="text-center">
            Enter your email address and we'll send you a new verification code.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full btn-glow" loading={isLoading}>
              Send Verification Code
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ResendVerificationModal;
