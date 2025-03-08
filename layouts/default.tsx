import { Head } from "./head";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen border-box bg-neutral-900/75 border-box  backdrop-blur-sm">
      <Head />
      {children}
    </div>
  );
}
