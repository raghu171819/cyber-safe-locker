
import { useState } from "react";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const quizQuestions = [
  {
    question: "What should you do if you receive a suspicious email attachment?",
    options: [
      "Open it immediately to see what it is",
      "Forward it to friends to check if it's legitimate", 
      "Delete it without opening",
      "Scan it with antivirus first"
    ],
    correct: 2,
    explanation: "Never open suspicious attachments. Delete them immediately to avoid potential malware."
  },
  {
    question: "How often should you backup your important files?",
    options: [
      "Once a year",
      "Only when I remember",
      "Regularly (daily/weekly)",
      "Never, cloud storage is enough"
    ],
    correct: 2,
    explanation: "Regular backups (daily or weekly) ensure you can recover from ransomware attacks."
  },
  {
    question: "What is the best response if your computer gets infected with ransomware?",
    options: [
      "Pay the ransom immediately",
      "Disconnect from internet and contact IT support",
      "Try to remove it yourself",
      "Ignore it and keep working"
    ],
    correct: 1,
    explanation: "Isolate the system and get professional help. Never pay ransoms as it encourages attackers."
  },
  {
    question: "Which of these makes you MORE vulnerable to ransomware?",
    options: [
      "Using updated antivirus software",
      "Clicking links in unknown emails",
      "Regular software updates",
      "Strong, unique passwords"
    ],
    correct: 1,
    explanation: "Clicking suspicious links is a common way ransomware spreads. Always verify sources first."
  }
];

export default function SecurityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
  };

  if (quizComplete) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto mt-8 text-center"
      >
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">Quiz Complete!</h2>
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
          <div className="text-4xl font-bold text-green-400 mb-2">{percentage}%</div>
          <div className="text-lg text-gray-300 mb-4">
            You scored {score} out of {quizQuestions.length} questions correctly!
          </div>
          <div className="text-sm text-gray-400 mb-6">
            {percentage >= 80 ? "Excellent! You're well-prepared against ransomware." :
             percentage >= 60 ? "Good job! Consider reviewing the prevention tips." :
             "Keep learning! Review the educational sections to improve your security knowledge."}
          </div>
          <button
            onClick={resetQuiz}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mx-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </button>
        </div>
      </motion.div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto mt-8"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Security Quiz</h2>
          <div className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-6">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                showResult
                  ? index === question.correct
                    ? "bg-green-900 border-green-500 text-green-100"
                    : index === selectedAnswer
                    ? "bg-red-900 border-red-500 text-red-100"
                    : "bg-gray-800 border-gray-600 text-gray-300"
                  : selectedAnswer === index
                  ? "bg-blue-900 border-blue-500 text-blue-100"
                  : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                {showResult && index === question.correct && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
                {showResult && index === selectedAnswer && index !== question.correct && (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-blue-900 rounded-lg border border-blue-600"
          >
            <div className="text-blue-100 text-sm">{question.explanation}</div>
            <button
              onClick={nextQuestion}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "View Results"}
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
