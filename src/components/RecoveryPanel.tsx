
import { Undo2, RefreshCcw, Search, UserCheck2 } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Undo2,
    title: "Disconnect & Isolate",
    desc: "Remove affected systems from the network to stop the spread."
  },
  {
    icon: Search,
    title: "Identify the Strain",
    desc: "Figure out which ransomware has hit to seek relevant advice or decryptors."
  },
  {
    icon: UserCheck2,
    title: "Report & Involve Experts",
    desc: "Contact IT, law enforcement, or security vendors for help."
  },
  {
    icon: RefreshCcw,
    title: "Restore from Backup",
    desc: "Use clean backups and verify they're safe before restoring data."
  }
];

export default function RecoveryPanel() {
  return (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-5 flex items-center gap-2 text-blue-400">
        <Undo2 className="w-8 h-8 text-blue-400" />
        Ransomware Recovery Steps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map(({ icon: Icon, title, desc }) =>
          <div key={title} className="flex items-start gap-3 rounded bg-gray-900 border border-gray-800 p-4">
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
