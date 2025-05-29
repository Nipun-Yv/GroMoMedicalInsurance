

import Navbar from "@/components/HomeNavbar";
import NavbarRest from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={`antialiased h-full w-full
        bg-black`}>
        <NavbarRest/>
        {children}
      </div>
  );
}
