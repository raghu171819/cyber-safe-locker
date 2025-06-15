
import { ShieldCheck, Backup, UserCheck, Virus } from "lucide-react";
import { motion } from "framer-motion";

const techniques = [
  {
    icon: ShieldCheck,
    title: "Use Antivirus & Firewalls",
    desc: "Install trusted antivirus and keep your firewall enabled to block threats."
  },
  {
    icon: UserCheck,
    title: "Stay Aware",
    desc: "Be cautious with links, attachments, and unknown senders."
  },
  {
    icon: Backup,
    title: "Regular Backups",
    desc: "Keep offline and cloud backups of important files to reduce impact."
  },
  {
    icon: Virus,
    title: "Keep Software Updated",
    desc: "Patch your OS and apps to close security holes exploited by attackers."
  }
];

export default function PreventionPanel() {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-5 text-green-400 flex items-center gap-2">
        <ShieldCheck className="w-8 h-8 text-green-400" />
        How to Prevent Ransomware
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {techniques.map(({ icon: Icon, title, desc }) =>
          <div key={title} className="flex items-start gap-3 bg-gray-900 rounded border border-gray-700 p-4">
            <Icon className="w-7 h-7 text-yellow-400 mt-1" />
            <div>
              <div className="font-semibold text-white mb-1">{title}</div>
              <div className="text-gray-300 text-sm">{desc}</div>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
}
