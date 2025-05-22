"use client";

import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarItem({ icon, label, active, path }) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === path;

  const handleClick = () => {
    router.push(path);
  };

  return (
     <div
      onClick={handleClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 ${
        isActive ? "bg-[#C42E82] text-white font-semibold" : "hover:bg-gray-800"
      }`}
    >
      <FontAwesomeIcon icon={icon} className="text-lg" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
