'use client';

import { usePathname } from 'next/navigation';
import LayoutMenu from './Layout';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();

  const hideSidebarRoutes = ['/login'];

  if (hideSidebarRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen">
      <LayoutMenu />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}