'use client';

import { useEffect, useState } from 'react';
import { useLocalizedNavigation } from '@/utils/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { navigate, getLocalizedPath, currentLocale } = useLocalizedNavigation();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Decode JWT to check if user is admin
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.user?.isAdmin) {
        navigate('/');
        return;
      }
      setIsAuthenticated(true);
    } catch (error) {
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken'); // Also remove authToken for consistency
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated && !pathname?.includes('/')) {
    return null;
  }

  // Don't show layout on login page
  if (pathname?.includes('/admin/login')) {
    return <>{children}</>;
  }

  const navLinks = [
    { href: getLocalizedPath('/admin'), label: 'Dashboard', icon: '📊' },
    { href: getLocalizedPath('/admin/users'), label: 'Users', icon: '👥' },
    { href: getLocalizedPath('/admin/payments'), label: 'Payments', icon: '💳' },
    { href: getLocalizedPath('/admin/files'), label: 'Files', icon: '📁' },
    { href: getLocalizedPath('/admin/coupons'), label: 'Coupons', icon: '🎫' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">PDFEZY Admin</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === link.href
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}

