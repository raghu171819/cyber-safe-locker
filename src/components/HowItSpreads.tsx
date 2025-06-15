
import { MailWarning, Globe, Download, Link } from "lucide-react";
import { motion } from "framer-motion";

const methods = [
  {
    icon: MailWarning,
    title: "Phishing Emails",
    desc: "Fake emails tricking users into clicking malicious links or downloading infected attachments."
  },
  {
    icon: Download,
    title: "Drive-by Downloads",
    desc: "Malicious sites automatically download malware when you visit or interact with them."
  },
  {
    icon: Globe,
    title: "Remote Hacking",
    desc: "Attackers exploit network vulnerabilities to gain access and deploy ransomware."
  },
  {
    icon: Link,
    title: "Malicious Links",
    desc: "Dangerous links on compromised websites, social media, or chat apps."
  }
];

export default function HowItSpreads() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-8 animate-fade-in"
    >
      <h2 className="text-2xl font-bold mb-5 text-red-400 flex items-center gap-2">
        <MailWarning className="w-8 h-8 text-red-400" />
        Common Ways Ransomware Spreads
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {methods.map(({ icon: Icon, title, desc }) =>
          <div key={title} className="p-4 rounded bg-gray-900 border border-gray-700 flex items-start gap-3">
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
