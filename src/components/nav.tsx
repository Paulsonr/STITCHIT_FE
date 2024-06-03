import React from "react";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  isLoggedIn: boolean;
  profileImageUrl?: string;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, profileImageUrl }) => {
  return (
    <nav className="bg-white-100 p-2 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="text-white text-lg font-bold">
          <Image
            src="/images/icons/logo_trans.png"
            alt="Logo"
            width={150}
            height={100}
          />
        </Link>
      </div>
      <div className="flex items-center">
        {isLoggedIn && (
          <Link href="/profile" className="flex items-center">
            <Image
              src={profileImageUrl || "/default-profile.png"}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
