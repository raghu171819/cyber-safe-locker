
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatIsRansomware() {
  return (
    <motion.section
      className="max-w-2xl mx-auto mt-8 mb-10 animate-fade-in"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <ShieldAlert className="w-8 h-8 text-red-400" />
        <h2 className="text-2xl font-bold text-white tracking-tight">What is Ransomware?</h2>
      </div>
      <p className="text-lg text-gray-300 leading-relaxed mb-6">
        <b>Ransomware</b> is a type of malicious software that locks access to your files or device, demanding a ransom payment for their release. Victims are often shown alarming messages claiming their data has been encrypted.
      </p>
      <ul className="list-disc text-gray-300 pl-6 space-y-1">
        <li><b>Disrupts access:</b> You’re locked out of important documents and files.</li>
        <li><b>Demands payment:</b> Usually requests cryptocurrency (like Bitcoin) for "decryption".</li>
        <li><b>Often spreads rapidly:</b> Through phishing, social engineering, and vulnerable software.</li>
      </ul>
      <div className="mt-8 p-3 rounded bg-gray-900 border-l-4 border-red-500 text-xs text-red-300">
        <span>
          <b>Disclaimer:</b> This simulation is for educational purposes only. No files or data are ever encrypted or accessed.
        </span>
      </div>
    </motion.section>
  );
}
