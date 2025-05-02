'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { Eye, EyeClosed } from 'lucide-react';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormInputs } from '@/schemas';

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);

  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { loginMutation } = authContext;
  const [showPassword, setShowPassword] = useState(false);
  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  // Handle login form submission
  const onSubmit = async (data: LoginFormInputs) => {
    setErrorMessage(null); // Reset error message

    try {
      await loginMutation.mutateAsync(data); // Call the login API
      router.push('/dashboard');
    } catch (error: unknown) {
      // If API sends a global error message
      const message = (error as Error)?.message || 'Something went wrong.';
      setErrorMessage(message);
    }
  };

  // List of images for the slider
  const images = [
    '/applus-image1.png',
    '/applus-image3.png',
    '/applus-image4.png',
    '/applus-image5.png', // Add as many images as you like
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Change image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // 3 seconds per image
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[70%_30%]">
      {/* Left Side - Image Slider (hidden on mobile) */}
      <div className="hidden md:block relative w-full h-full overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt="Applus team"
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
        />
      </div>

      {/* Right Side - Form */}
      <div className="relative flex items-center justify-center px-4 py-8 sm:px-0 sm:py-10 md:px-8 md:py-12 overflow-hidden bg-white">
        <Card className="w-full max-w-md shadow-none border-none">
          <CardContent className="space-y-6 border-none">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <img
                  src="/logo-applus.png"
                  alt="Applus team"
                  className="w-[70%] md:w-[50%] h-auto object-contain drop-shadow-md"
                />
              </div>
              <h2 className="text-2xl font-bold text-black">Welcome back!</h2>
              <p className="text-sm text-gray-700">Please enter your details.</p>
            </div>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>} {/* Display error message */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="login-form">
              {/* Email Input */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register('email')}
                    type="email"
                    // placeholder='Enter your email'
                    className="bg-[#1F2828] text-white border-0 focus:bg-[#1F2828] focus:ring-0 autofill:bg-[#1F2828]"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      // placeholder='Enter your password'
                      className="bg-[#1F2828] text-white border-0 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                    >
                      {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked: boolean) => setRememberMe(checked)}
                      className="border-2 border-[#1F2828] accent-white"
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember for 30 days
                    </Label>
                  </div>
                  <a href="#" className="text-sm text-orange-600 underline hover:text-orange-700">
                    Forgot password?
                  </a>
                </div>

                {/* Login Button with Bouncing Dots */}
                <Button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {loginMutation.isPending ? <Spinner /> : 'Login'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
