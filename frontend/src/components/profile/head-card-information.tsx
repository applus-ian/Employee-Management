'use client';

import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Mail, Phone, Briefcase, Users, UserCheck, KeyRound } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import { updatePasswordSchema, UpdatePasswordInput } from '@/schemas';
import { useUpdatePassword } from '@/hooks/profile/use-update-password';
import toast from 'react-hot-toast';
import type { Area } from 'react-easy-crop';

// For The Profile Avatar
import { useState, useRef, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Camera } from 'lucide-react';

export default function HeadCardInformation() {
  const { user } = useContext(AuthContext);
  const roleNames = user?.roles.map((role) => role.name).join(', ') || 'No roles assigned';

  // For The Profile Avatar
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [open, setOpen] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    width: number;
    height: number;
    x: number;
    y: number;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const updatePassword = useUpdatePassword();

  const onSubmit = (data: UpdatePasswordInput) => {
    updatePassword.mutate(data, {
      onSuccess: () => {
        reset();
        toast.success('Password updated successfully!');
      },
      onError: () => {
        toast.error('Password update failed');
      },
    });
  };

  // For The Profile Avatar
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageDataUrl = URL.createObjectURL(file);
    setImageSrc(imageDataUrl);
    setOpen(true);
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(() => {
    getCroppedImage();
  }, [imageSrc, croppedAreaPixels]);

  const getCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx?.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
    );

    const base64 = canvas.toDataURL('image/jpeg');
    setCroppedImage(base64);
    setOpen(false);
  };

  return (
    <>
      <Card className="h-fit m-5 bg-white shadow-md">
        <CardHeader>
          <div className="flex flex-row items-start w-full">
            <div className="hidden sm:flex flex-col items-center space-y-2">
              <div className="relative w-fit mx-auto mt-4">
                {/* Floating Camera Button */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute top-[6rem] right-[1rem] z-10 bg-white hover:bg-gray-100 border-gray-300 shadow-sm rounded-full"
                >
                  <Camera className="h-4 w-4 text-gray-700" />
                </Button>

                {/* Circular Avatar */}
                <Avatar className="w-[8rem] h-[8rem] rounded-full overflow-hidden mx-5 border-gray-600">
                  <AvatarImage
                    src={croppedImage || '/Superadmin.png'}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </Avatar>

                {/* Hidden file input */}
                <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileChange} className="hidden" />
              </div>

              <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileChange} className="hidden" />

              {/* Modal for cropping */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[600px] h-[600px] p-0 bg-white rounded-lg flex flex-col justify-between">
                  <DialogHeader className="p-4 pt-6">
                    <DialogTitle>Crop your photo</DialogTitle>
                  </DialogHeader>

                  <div className="relative flex-grow m-4 p-5 rounded-md">
                    {imageSrc && (
                      <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="rect"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                      />
                    )}
                  </div>

                  <div className="flex justify-center gap-x-6 p-3">
                    <Button className="w-[10rem] bg-[#EE7A2A] text-white" onClick={showCroppedImage}>
                      Save
                    </Button>
                    <Button
                      className="w-[10rem] border-2 border-[#EE7A2A] bg-white text-[#EE7A2A]"
                      variant="outline"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <CardTitle className="text-2xl text-[#EE7A2A]">
                  {`${user?.employee?.first_name || ''} ${user?.employee?.middle_name || ''} ${user?.employee?.last_name || ''}`}
                </CardTitle>
                <span className="text-sm text-gray-600">({roleNames})</span>
              </div>

              <CardDescription className="pt-3 space-y-2 text-xs">
                <div className="flex items-center">
                  <Mail size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                  {user?.email}
                </div>
                <div className="flex items-center">
                  <Phone size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                  {user?.employee?.phone_number}
                </div>
                <div className="flex items-center">
                  <Briefcase size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                  {user?.employee?.job_position?.title || 'No job position'}
                </div>
                {user?.employee?.manager && (
                  <div className="flex items-center">
                    <UserCheck size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                    Manager: {user.employee.manager.full_name}
                  </div>
                )}
                <div className="flex items-center">
                  <Users size={18} strokeWidth={1.5} className="mr-3 text-muted-foreground" />
                  {user?.employee?.employment_type?.name || 'No employment type'}
                </div>
              </CardDescription>
            </div>

            <div className="ml-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-white text-[#EE7A2A] border-[#EE7A2A] border-2 w-fit flex items-center">
                    <span className="hidden sm:inline">Update Password</span>
                    <KeyRound className="ml-2" />
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader className="pb-5">
                    <DialogTitle>Update Password</DialogTitle>
                  </DialogHeader>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="text-gray-600" htmlFor="current_password">
                        Current Password
                      </label>
                      <Input
                        type="password"
                        id="current_password"
                        className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        {...register('current_password')}
                        placeholder="Enter current password"
                      />
                      {errors.current_password && (
                        <p className="text-red-500 text-sm">{errors.current_password.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-gray-600" htmlFor="new_password">
                        New Password
                      </label>
                      <Input
                        type="password"
                        id="new_password"
                        className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        {...register('new_password')}
                        placeholder="Enter new password"
                      />
                      {errors.new_password && <p className="text-red-500 text-sm">{errors.new_password.message}</p>}
                    </div>

                    <div>
                      <label className="text-gray-600" htmlFor="new_password_confirmation">
                        Confirm Password
                      </label>
                      <Input
                        type="password"
                        id="new_password_confirmation"
                        className="mt-1 p-2 pl-3 w-full rounded-md border border-gray-300 bg-white text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        {...register('new_password_confirmation')}
                        placeholder="Confirm password"
                      />
                      {errors.new_password_confirmation && (
                        <p className="text-red-500 text-sm">{errors.new_password_confirmation.message}</p>
                      )}
                    </div>

                    <div className="flex justify-center pt-4">
                      <Button
                        type="submit"
                        className="bg-[#EE7A2A] text-white w-[10rem]"
                        disabled={updatePassword.isPending}
                      >
                        {updatePassword.isPending ? 'Updating...' : 'Change Password'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}
