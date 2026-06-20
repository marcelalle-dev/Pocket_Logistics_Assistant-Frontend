import { ThemeToggle } from "@/components/theme";

export const metadata = {
  title: "Assistant Logistique",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors dark:bg-[#0d1b2a] dark:text-slate-100">
      <ThemeToggle className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6" />
      {children}
    </div>
  );
}
