'use client';

import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Side - Form */}
      <div className="relative flex items-center justify-center p-8 overflow-hidden bg-orange-500">
        {/* Light rays or glow effect */}
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-white opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-yellow-100 opacity-10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/3 left-1/2 w-[200px] h-[200px] bg-white opacity-10 rounded-full blur-2xl animate-pulse" />

        <Card className="w-full max-w-md backdrop-blur-lg rounded-xl shadow-xl z-10">
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <img
                  src="/logo-applus.png"
                  alt="Applus team"
                  className="w-[70%] h-[auto] object-contain drop-shadow-md"
                />
              </div>
              <h2 className="text-2xl font-bold text-orange-600">Welcome back!</h2>
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
                  className="bg-white text-black"
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
                  className="bg-white text-black"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked: boolean) => setRememberMe(checked)}
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
      {/* Right Side - Image */}
      <div className="relative">
        <img src="/login-image.png" alt="Applus team" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
