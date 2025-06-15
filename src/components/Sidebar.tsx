
import { Link, useLocation } from "react-router-dom";
import { ShieldAlert, BookOpen, ArrowUpCircle, LockKeyhole, Undo2, Bug } from "lucide-react";

const navItems = [
  { label: "What is Ransomware?", icon: BookOpen, to: "/what-is-ransomware" },
  { label: "How It Spreads", icon: ArrowUpCircle, to: "/how-it-spreads" },
  { label: "Encryption Concept", icon: LockKeyhole, to: "/encrypt-concept" },
  { label: "Prevention", icon: ShieldAlert, to: "/prevention" },
  { label: "Recovery", icon: Undo2, to: "/recovery" },
  { label: "Simulate Attack", icon: Bug, to: "/simulate" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 flex-shrink-0 hidden md:flex flex-col bg-gradient-to-b from-red-900 to-black border-r border-border p-4">
      <div className="text-2xl font-bold text-red-400 mb-6 select-none font-mono tracking-widest">
        Ransom<span className="text-white">Aware</span>
      </div>
      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, icon: Icon, to }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all 
              ${location.pathname === to ? "bg-red-700 text-white" : "text-gray-200 hover:bg-red-800"}
            `}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto text-xs text-muted-foreground pt-6 opacity-70">
        <span>For educational use only.<br/>No files are harmed.</span>
      </div>
    </aside>
  );
}
