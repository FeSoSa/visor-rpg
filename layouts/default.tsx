import { Head } from "./head";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen border-box bg-black/50 border-box">
      <Head />
      {children}
    </div>
  );
}
