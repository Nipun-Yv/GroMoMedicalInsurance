



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={`antialiased h-full w-full
        bg-[url("/WhitePurpleBG.png")] bg-cover `}>
        {/* <Navbar/> */}
        {children}
      </div>
  );
}
