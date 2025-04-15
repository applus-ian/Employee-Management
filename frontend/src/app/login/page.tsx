'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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
        <Card className="w-full max-w-md rounded-xl border-0">
          <CardContent className="space-y-6">
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

            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#1F2828] text-white border-0"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#1F2828] text-white border-0"
                />
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

              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">Login</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
