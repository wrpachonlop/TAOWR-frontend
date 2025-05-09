import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faTruck,
  faUsers,
  faToolbox,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between h-screen w-60 bg-black text-white py-8 px-6">
      {/* Top Section */}
      <div>
        <div className="flex justify-center mb-10">
          <img src="/images/logo.png" alt="Logo" className="w-24 h-auto" />
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-4">
          <SidebarItem icon={faHouse} label="Home" active/>
          <SidebarItem icon={faTruck} label="Trucks" />
          <SidebarItem icon={faUsers} label="Employees" />
          <SidebarItem icon={faToolbox} label="Tools" />
        </nav>
      </div>

      {/* Bottom Section - Logout */}
      <div className="flex items-center gap-3 cursor-pointer">
  
        <FontAwesomeIcon icon={faRightFromBracket} className="ml-2" />
        <span className="text-white text-sm">Log out</span>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer transition-all duration-200 ${
        active ? 'bg-[#C42E82] text-white font-semibold' : 'hover:bg-gray-800'
      }`}
    >
      <FontAwesomeIcon icon={icon} className="text-lg" />
      <span className="text-sm">{label}</span>
    </div>
  );
}