
import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const assessmentQuestions = [
  {
    question: "How often do you update your operating system?",
    options: [
      { text: "Automatically/Immediately", score: 3 },
      { text: "Weekly", score: 2 },
      { text: "Monthly", score: 1 },
      { text: "Rarely/Never", score: 0 }
    ]
  },
  {
    question: "Do you use antivirus software?",
    options: [
      { text: "Yes, premium with real-time protection", score: 3 },
      { text: "Yes, free antivirus", score: 2 },
      { text: "Sometimes", score: 1 },
      { text: "No", score: 0 }
    ]
  },
  {
    question: "How do you handle email attachments?",
    options: [
      { text: "Scan all attachments, verify sender", score: 3 },
      { text: "Only open from known contacts", score: 2 },
      { text: "Open most attachments", score: 1 },
      { text: "Open everything", score: 0 }
    ]
  },
  {
    question: "How often do you backup your important files?",
    options: [
      { text: "Daily automated backups", score: 3 },
      { text: "Weekly backups", score: 2 },
      { text: "Monthly or occasionally", score: 1 },
      { text: "Never", score: 0 }
    ]
  },
  {
    question: "What type of passwords do you use?",
    options: [
      { text: "Unique, complex passwords with 2FA", score: 3 },
      { text: "Different passwords for important accounts", score: 2 },
      { text: "A few different passwords", score: 1 },
      { text: "Same password everywhere", score: 0 }
    ]
  }
];

export default function RiskAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const totalScore = answers.reduce((sum, score) => sum + score, 0);
  const maxScore = assessmentQuestions.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getRiskLevel = () => {
    if (percentage >= 80) return { level: "Low Risk", color: "green", icon: CheckCircle };
    if (percentage >= 60) return { level: "Medium Risk", color: "yellow", icon: AlertTriangle };
    return { level: "High Risk", color: "red", icon: AlertTriangle };
  };

  if (showResults) {
    const risk = getRiskLevel();
    const RiskIcon = risk.icon;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto mt-8"
      >
        <div className="text-center mb-8">
          <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Risk Assessment Results</h2>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 text-center">
          <RiskIcon className={`w-16 h-16 mx-auto mb-4 text-${risk.color}-400`} />
          <div className="text-3xl font-bold text-white mb-2">{percentage}%</div>
          <div className={`text-xl font-semibold text-${risk.color}-400 mb-4`}>
            {risk.level}
          </div>
          
          <div className="text-gray-300 mb-6">
            {percentage >= 80 && "Excellent! Your security practices are strong. Keep up the good work!"}
            {percentage >= 60 && percentage < 80 && "Good security practices, but there's room for improvement."}
            {percentage < 60 && "Your security practices need attention. Consider implementing the recommendations below."}
          </div>

          <div className="text-left space-y-3 mb-6">
            <h3 className="font-semibold text-white text-center mb-4">Recommendations:</h3>
            {percentage < 80 && (
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-blue-400 mt-0.5" />
                  Enable automatic updates for your operating system and software
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-blue-400 mt-0.5" />
                  Use reputable antivirus software with real-time protection
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-blue-400 mt-0.5" />
                  Set up automated daily backups to multiple locations
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-blue-400 mt-0.5" />
                  Use a password manager with unique, complex passwords
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-blue-400 mt-0.5" />
                  Be extremely cautious with email attachments and links
                </div>
              </div>
            )}
          </div>

          <button
            onClick={resetAssessment}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Retake Assessment
          </button>
        </div>
      </motion.div>
    );
  }

  const question = assessmentQuestions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-8"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Security Risk Assessment</h2>
          <div className="text-sm text-gray-400">
            {currentQuestion + 1} of {assessmentQuestions.length}
          </div>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-6">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.score)}
              className="w-full text-left p-4 rounded-lg border border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
