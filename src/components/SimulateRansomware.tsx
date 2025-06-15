
import { useEffect, useRef, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import ransomNote from "@/data/ransomNote.json";
import { motion, AnimatePresence } from "framer-motion";

export default function SimulateRansomware({ open, onClose, onTrigger }: {
  open: boolean,
  onClose: () => void,
  onTrigger: () => void
}) {
  const [locked, setLocked] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      setLocked(true);
      setTimer(300);
      intervalRef.current = window.setInterval(() => {
        setTimer((t) => t > 0 ? t - 1 : 0);
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [open]);

  if (!open) {
    return (
      <button
        onClick={onTrigger}
        className="bg-red-800 text-white px-6 py-3 rounded-lg shadow-md text-lg font-bold hover:bg-red-700 transition mx-auto block mt-12"
      >
        Simulate Attack
      </button>
    );
  }

  // Format timer
  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");

  return (
    <AnimatePresence>
      {locked && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex flex-col items-center justify-center
            text-center px-6"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="max-w-lg w-full relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-red-300 hover:text-white transition"
              aria-label="Close lock screen"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center py-10">
              <AlertCircle className="w-16 h-16 text-red-500 animate-pulse mb-4" />
              <motion.h1
                className="font-bold text-3xl md:text-4xl text-red-400 mb-3 ransom-glitch"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {ransomNote.title}
              </motion.h1>
              <motion.p
                className="text-white text-lg mb-2 font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {ransomNote.body}
              </motion.p>
              <div className="mt-6 mb-2">
                <span className="text-sm text-red-200">Time Left to Decrypt:</span>
                <span className="text-2xl font-mono ml-3 text-yellow-400 drop-shadow animate-pulse">{minutes}:{seconds}</span>
              </div>
              <div className="text-lg text-red-50 font-bold mb-4">{ransomNote.ransomDemand}</div>
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <button
                  onClick={() => window.location.assign("/decrypt")}
                  className="bg-gray-900 text-yellow-400 font-semibold py-3 rounded hover:bg-gray-700 transition tracking-wide border border-yellow-500"
                >
                  Enter Decryption Key
                </button>
                <button
                  className="bg-red-700 text-white font-semibold py-3 rounded hover:bg-red-600 transition tracking-wide"
                  disabled
                >
                  Pay Now
                </button>
                <button
                  className="text-xs underline text-gray-400 hover:text-white"
                  onClick={onClose}
                >
                  Reset Simulation
                </button>
              </div>
            </div>
          </div>
          <style>{`
            .ransom-glitch {
              text-shadow: 2px 0 red, -2px 0 #333;
              letter-spacing: 0.05em;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
