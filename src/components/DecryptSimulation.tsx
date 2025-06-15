
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const DUMMY_KEY = "SAFEKEY123";

export default function DecryptSimulation() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle"|"progress"|"success"|"failure">("idle");
  const [showCelebration, setShowCelebration] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("progress");
    setTimeout(() => {
      if (input.trim().toUpperCase() === DUMMY_KEY) {
        setStatus("success");
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      } else {
        setStatus("failure");
      }
    }, 1300);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">Enter Decryption Key</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-xs flex flex-col gap-3 mb-5">
        <input
          className="rounded p-3 border border-input bg-background text-lg text-center font-mono"
          value={input}
          onChange={e => { setInput(e.target.value); setStatus("idle"); }}
          placeholder="Enter Key..."
          disabled={status === "progress" || status === "success"}
        />
        <button type="submit"
          className="bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-400 transition disabled:opacity-60"
          disabled={input.length < 4 || status === "progress" || status === "success"}
        >Decrypt</button>
      </form>
      {status === "progress" && (
        <motion.div
          className="w-56 h-4 bg-gray-800 rounded mt-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute left-0 top-0 h-full bg-green-400 rounded"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </motion.div>
      )}
      {status === "success" && (
        <motion.div
          className="flex flex-col items-center mt-8"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1.05 }}
        >
          <Check className="w-16 h-16 text-green-500 animate-bounce mb-4" />
          <div className="text-2xl font-bold text-green-400">Files successfully decrypted!</div>
          <div className="mt-4">
            <button className="underline text-yellow-500"
              onClick={() => window.location.assign("/simulate")}
            >Reset Simulation</button>
          </div>
        </motion.div>
      )}
      {status === "failure" && (
        <motion.div className="flex flex-col items-center mt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <X className="w-14 h-14 text-red-400 mb-2" />
          <div className="text-lg text-red-300 font-semibold">Invalid key. Try again!</div>
        </motion.div>
      )}
      <div className="mt-10 text-xs text-muted-foreground opacity-60">
        <span>This is a simulation. No real decryption occurs.</span>
      </div>
      {showCelebration && (
        <motion.div
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
          animate={{
            opacity: [0.6, 0, 0.5],
            y: [0, -10, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ repeat: 1, duration: 2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-green-300 via-yellow-200 to-pink-300 opacity-60 rounded-lg blur-md" />
        </motion.div>
      )}
    </div>
  );
}
