"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
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
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
const LoginForm = () => {
  // states initialization
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setLoading(true);
    try {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    console.log(result);
    if (result?.error) {
      toast("Incorrect username or password");
    }
    if (result?.ok) {
      toast("login succesfull")
      router.push("/home");
    }
    } catch (error) {
      toast.error("Something went wrong at sign-in")
      console.log("Error Occured at sign-in:",error)
    }
    finally{
      setLoading(false)
    }
  };
  return (
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-md mx-auto p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center w-full flex flex-col items-center justify-center">
            <Image src="/logo.png"
            alt=""
            width={100}
            height={100}/>
            <p className="mb-4">Login as an Admin</p>
          </div>
          <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email or Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email or username"
                        {...field}
                        required
                      />
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
                      <Input
                        placeholder="password"
                        {...field}
                        type="password"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col justify-center items-center">
                <Button type="submit" className="px-4 bg-blue-900 hover:cursor-pointer">
                  { loading ? (
                    
                      <div className="flex justify-center items-center">
                        <Loader2 className="animate-spin w-2 h-2 mx-4" />
                      </div>
                    
                  ) : 
                      <span>Login</span>
                  }
                </Button>
              </div>
            </form>
          </Form>
          </div>
          
        </div>
      </div>
    
  );
};

export default LoginForm;