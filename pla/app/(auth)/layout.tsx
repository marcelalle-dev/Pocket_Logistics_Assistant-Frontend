import { ThemeToggle } from "@/components/theme";

export const metadata = {
  title: "Connexion - PLA",
  description: "Connectez-vous à votre espace logistique PLA.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <ThemeToggle className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6" />
      {children}
    </div>
  );
}
