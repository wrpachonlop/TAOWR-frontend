import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faTruck,
  faUsers,
  faToolbox,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import SidebarItem from './SideBarItem';
import LogoutButton from './LogoutButton';


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
          <SidebarItem icon={faHouse} label="Home" path="/"/>
          <SidebarItem icon={faTruck} label="Trucks" path="/trucks"/>
          <SidebarItem icon={faUsers} label="Employees" path="/employees"/>
          <SidebarItem icon={faToolbox} label="Tools" path="/tools"/>
        </nav>
      </div>
      <LogoutButton /> 
    </div>
  );
}