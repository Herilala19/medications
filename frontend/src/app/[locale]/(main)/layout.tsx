import "@/styles/globals.scss";
import { Footer, Header } from "@/components";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
