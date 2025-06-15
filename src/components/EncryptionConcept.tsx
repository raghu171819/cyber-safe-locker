
import { LockKeyhole, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function EncryptionConcept() {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-red-400 flex items-center gap-2">
        <LockKeyhole className="w-8 h-8 text-red-400" />
        How Ransomware Encrypts Data (Concept)
      </h2>
      <div className="flex flex-col gap-6">
        <Step
          icon={<CheckCircle className="w-6 h-6 text-green-400" />}
          label="File Discovery"
          desc="Ransomware scans your device for valuable/targeted files (e.g., documents, photos)."
        />
        <NextArrow />
        <Step
          icon={<LockKeyhole className="w-6 h-6 text-yellow-300" />}
          label="Encryption"
          desc="Files are encrypted using complex keys so you can no longer access them."
        />
        <NextArrow />
        <Step
          icon={<XCircle className="w-6 h-6 text-red-400" />}
          label="Ransom Note"
          desc="A warning appears, demanding payment for a unique 'decryption key.'"
        />
      </div>
    </motion.section>
  );
}

function Step({ icon, label, desc }) {
  return (
    <div className="flex items-start gap-3 bg-gray-900 rounded p-4 border border-gray-800">
      <div>{icon}</div>
      <div>
        <div className="font-semibold text-white mb-1">{label}</div>
        <div className="text-gray-300 text-sm">{desc}</div>
      </div>
    </div>
  );
}

function NextArrow() {
  return (
    <div className="flex justify-center text-gray-500 mt-1 mb-1">
      <ArrowRight className="w-5 h-5" />
    </div>
  );
}
