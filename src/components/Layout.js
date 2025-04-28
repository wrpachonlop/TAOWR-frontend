import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
      <div className="mb-8 flex justify-center">
        <Image
          src="/logo.png" // <-- put your image inside the public/ folder
          width={500}
          height={500}
          alt="TAOWR Logo"
          className="rounded-full" // optional: makes it rounded
        />
      </div>
        <nav className="flex flex-col space-y-4">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/tools" className="hover:text-gray-300">Tools</Link>
          <Link href="/employees" className="hover:text-gray-300">Employees</Link>
          <Link href="/trucks" className="hover:text-gray-300">Trucks</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
}
