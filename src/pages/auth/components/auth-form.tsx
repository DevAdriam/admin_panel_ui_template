import PrimaryButton from "@/components/custom/PrimaryButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNetwork } from "@/hooks/use-network";
import { useLogin } from "@/store/server/auth/mutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid Email addresss" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be greater than 6" }),
});

export default function AuthForm() {
  const { online } = useNetwork();
  const [isView, setIsView] = useState(false);
  const login = useLogin();

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!online) {
      toast.error("You are not online!");
      return;
    }
    login.mutate(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>Please Enter your email</FormDescription>
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
                  <Input
                    placeholder="shadcn"
                    {...field}
                    type={isView ? "text" : "password"}
                  />
                  {isView ? (
                    <Eye
                      className="absolute right-4 top-[20%] z-10 cursor-pointer text-gray-500"
                      onClick={() => {
                        setIsView(!isView);
                      }}
                    />
                  ) : (
                    <EyeOff
                      className="absolute right-4 top-[20%] z-10 cursor-pointer text-gray-500"
                      onClick={() => setIsView(!isView)}
                    />
                  )}
                </div>
              </FormControl>
              <FormDescription>Please Enter your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <PrimaryButton
          text="Sign In"
          type="submit"
          variant="default"
          onSubmit={() => onSubmit(form.getValues())}
        />
      </form>
    </Form>
  );
}
