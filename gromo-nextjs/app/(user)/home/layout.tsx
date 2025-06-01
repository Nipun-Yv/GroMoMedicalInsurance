

import Navbar from "@/components/HomeNavbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={`antialiased h-full w-full
        bg-black`}>
        <Navbar/>
        {children}
      </div>
  );
}
