import React from 'react';
import { useContext, useEffect, useState, ComponentType } from 'react';
import { AuthContext } from '@/context/AuthContext'; // Auth context
import { useRouter } from 'next/navigation';

export default function withAuth<T extends WithAuthProps>(Component: ComponentType<T>) {
  return function ProtectedRoute(props: T) {
    const { user, loading } = useContext(AuthContext);
    const [mounted, setMounted] = useState(false); // Track if component is mounted
    const router = useRouter();

    // Use useEffect to ensure this is only checked client-side
    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) {
      // Prevent rendering on the server side and wait for hydration
      return null;
    }

    // If still loading, show a loading spinner or return nothing
    if (loading) {
      return (
        <div className="absolute left-0 right-0 top-0 bottom-0 flex space-x-4 justify-center items-center">
          <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="h-4 w-4 bg-white rounded-full animate-bounce" />
        </div>
      );
    }

    // If user is not authenticated, redirect to login or show a fallback
    if (!user) {
      router.push('/login'); // Redirect to login page
      return null;
    }

    // If user is authenticated, render the protected component
    return <Component {...props} />;
  };
}
