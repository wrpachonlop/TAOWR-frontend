'use client';

import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faUsers, faToolbox } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const router = useRouter();

  const cards = [
    { icon: faTruck, label: 'Trucks', route: '/trucks' },
    { icon: faUsers, label: 'Employees', route: '/employees' },
    { icon: faToolbox, label: 'Tools', route: '/tools' },
  ];

  return (
    <div className="h-full flex items-center justify-center p-8 sm:p-20">
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
        {cards.map(({ icon, label, route }, idx) => (
         <button
          key={idx}
          onClick={() => router.push(route)}
          className="w-48 h-72 rounded-xl bg-black text-white shadow-[8px_8px_15px_0px_rgba(255,0,150,0.6)] flex flex-col items-center justify-center gap-4 transition-transform hover:scale-105 active:scale-95 focus:outline-none"
        >
          {/* Icon on top */}
          <FontAwesomeIcon icon={icon} size="3x" />

          {/* Label below */}
          <span className="text-xl font-semibold">{label}</span>
        </button>
        ))}
      </div>
    </div>
  );
}
