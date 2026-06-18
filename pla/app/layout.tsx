import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme";
import "./tailwind.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PLA - Assistant Logistique",
  description: "Gestion logistique et budgétaire en mode hors-ligne",
  icons: [
    { rel: "icon", url: "/favicon.svg" },
  ],
};

const themeScript = `
  (function () {
    try {
      var mode = window.localStorage.getItem("pla-color-mode") === "dark" ? "dark" : "light";
      var root = document.documentElement;

      root.classList.toggle("dark", mode === "dark");
      root.dataset.theme = mode;
      root.style.colorScheme = mode;
    } catch (error) {
      document.documentElement.classList.remove("dark");
      document.documentElement.dataset.theme = "light";
      document.documentElement.style.colorScheme = "light";
    }
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-950 transition-colors dark:bg-[#080a0f] dark:text-white">
        <Script id="pla-theme-init" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <ThemeProvider>
          <div className="container-max w-full flex-1">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
