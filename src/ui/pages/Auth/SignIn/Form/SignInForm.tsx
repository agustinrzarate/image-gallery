import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/ui/components/Button/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/components/Form/Form';
import { Input } from '@/ui/components//Input/Input';
import { useAuth } from '../../context/AuthProvider';

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const FormSchema = z.object({
    username: z
      .string()
      .min(1, {
        message: 'Required',
      })
      .refine((value) => /^[a-z]+$/.test(value), {
        message: 'Only lowercase letters are allowed, without special characters',
      }),
    password: z
      .string()
      .min(1, {
        message: 'Required',
      })
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      .refine(validatePassword, {
        message: 'Invalid password',
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function validatePassword(value: string) {
    const username = form.getValues('username');
    const regex = new RegExp(`^${username}123$`) as RegExp;
    return regex.test(value);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    login(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-10">
        <div className=" space-y-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type={showPassword ? 'text' : 'password'} />
                </FormControl>
                <Button
                  variant="ghost"
                  className="absolute top-6 right-0"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <Eye /> : <EyeOff />}
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="px-7">
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
}
