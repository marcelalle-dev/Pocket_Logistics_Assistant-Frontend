const CubeIcon = () => (
  <svg
    className="w-7 h-7"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

interface AuthLogoProps {
  showOfflineBadge?: boolean;
  subtitle?: string;
}

export default function AuthLogo({
  showOfflineBadge = false,
  subtitle = "Connectez-vous pour accéder à vos données",
}: AuthLogoProps) {
  return (
    <div className="flex flex-col items-center text-center mb-7">
      <div
        className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-3.5"
        style={{
          background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
          boxShadow: "0 4px 20px rgba(37,99,235,0.35)",
        }}
      >
        <CubeIcon />
      </div>

      <h1 className="text-[1.45rem] font-bold text-slate-100 tracking-tight">
        Assistant Logistique
      </h1>

      <p className="text-xs text-slate-500 mt-1">{subtitle}</p>

      {showOfflineBadge && (
        <span className="inline-flex items-center gap-1.5 bg-green-950 text-green-400 text-[0.72rem] font-semibold px-3 py-1 rounded-full mt-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          Mode hors-ligne disponible
        </span>
      )}
    </div>
  );
}
