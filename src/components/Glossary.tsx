
import { useState } from "react";
import { Search, BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const glossaryTerms = [
  {
    term: "Ransomware",
    definition: "Malicious software that encrypts files or locks computer systems, demanding payment for restoration.",
    category: "Malware"
  },
  {
    term: "Encryption",
    definition: "The process of converting data into a coded format to prevent unauthorized access.",
    category: "Security"
  },
  {
    term: "Phishing",
    definition: "Fraudulent attempts to obtain sensitive information by disguising as trustworthy entities.",
    category: "Attack Methods"
  },
  {
    term: "Malware",
    definition: "Short for malicious software - any software designed to harm, exploit, or gain unauthorized access to systems.",
    category: "Malware"
  },
  {
    term: "Backup",
    definition: "Copies of data stored separately to prevent data loss in case of system failure or attack.",
    category: "Protection"
  },
  {
    term: "Firewall",
    definition: "A security system that monitors and controls network traffic based on predetermined security rules.",
    category: "Protection"
  },
  {
    term: "Social Engineering",
    definition: "Psychological manipulation techniques used to trick people into revealing confidential information.",
    category: "Attack Methods"
  },
  {
    term: "Zero-Day",
    definition: "A software vulnerability that is unknown to security vendors and has no available patch.",
    category: "Vulnerabilities"
  },
  {
    term: "Bitcoin",
    definition: "A cryptocurrency often demanded by ransomware attackers due to its perceived anonymity.",
    category: "Payment"
  },
  {
    term: "Decryption Key",
    definition: "A piece of information used to decrypt encrypted data back to its original form.",
    category: "Security"
  },
  {
    term: "Air Gap",
    definition: "A security measure where a computer is physically isolated from unsecured networks.",
    category: "Protection"
  },
  {
    term: "Patch",
    definition: "A software update designed to fix vulnerabilities or bugs in a program.",
    category: "Security"
  }
];

const categories = ["All", "Malware", "Security", "Attack Methods", "Protection", "Vulnerabilities", "Payment"];

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedTerms, setExpandedTerms] = useState<string[]>([]);

  const filteredTerms = glossaryTerms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleTerm = (term: string) => {
    setExpandedTerms(prev =>
      prev.includes(term)
        ? prev.filter(t => t !== term)
        : [...prev, term]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mt-8"
    >
      <div className="text-center mb-8">
        <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white">Cybersecurity Glossary</h2>
        <p className="text-gray-400 mt-2">Learn the key terms and concepts</p>
      </div>

      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredTerms.map((item, index) => (
          <motion.div
            key={item.term}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
          >
            <button
              onClick={() => toggleTerm(item.term)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="font-semibold text-white text-lg">{item.term}</h3>
                  <span className="text-xs text-blue-400 bg-blue-900 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
              {expandedTerms.includes(item.term) ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            <AnimatePresence>
              {expandedTerms.includes(item.term) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-300 leading-relaxed">
                    {item.definition}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg">No terms found matching your search.</div>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
            }}
            className="mt-4 text-blue-400 hover:text-blue-300 underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </motion.div>
  );
}
