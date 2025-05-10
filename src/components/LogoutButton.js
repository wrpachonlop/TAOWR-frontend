'use client';

import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function LogoutButton() {
  return (
    <div
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-3 cursor-pointer"
    >
      <FontAwesomeIcon icon={faRightFromBracket} className="ml-2" />
      <span className="text-white text-sm">Log out</span>
    </div>
  );
}
