'use client';

import { usePathname } from 'next/navigation';
import LayoutMenu from './Layout';
import { useSession } from 'next-auth/react';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const hideSidebarRoutes = ['/login', '/access-denied'];

  const user = session?.user;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (hideSidebarRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      <LayoutMenu />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {user && (
          <header className="flex items-center justify-end gap-4 px-6 py-4 bg-gray-100">
            <span className="text-sm text-gray-700">{today}</span>
            <span className="text-sm font-semibold text-gray-800">{user.name}</span>
            <img
              src={user.image}
              alt="Profile"
              className="w-9 h-9 rounded-full border"
            />
          </header>
        )}

      <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}