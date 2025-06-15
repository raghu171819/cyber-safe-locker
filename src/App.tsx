
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import SimulateRansomware from "./components/SimulateRansomware";
import DecryptSimulation from "./components/DecryptSimulation";
import WhatIsRansomware from "./components/WhatIsRansomware";
import HowItSpreads from "./components/HowItSpreads";
import EncryptionConcept from "./components/EncryptionConcept";
import PreventionPanel from "./components/PreventionPanel";
import RecoveryPanel from "./components/RecoveryPanel";
import SecurityQuiz from "./components/SecurityQuiz";
import RiskAssessment from "./components/RiskAssessment";
import Glossary from "./components/Glossary";
import FileEncryptor from "./components/FileEncryptor";

const queryClient = new QueryClient();

const App = () => {
  const [showSimulation, setShowSimulation] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen bg-background text-foreground dark">
            <Sidebar />
            <main className="flex-1 p-4 md:p-8">
              <Routes>
                <Route
                  path="/"
                  element={<WhatIsRansomware />}
                />
                <Route
                  path="/simulate"
                  element={
                    <SimulateRansomware
                      open={showSimulation}
                      onClose={() => setShowSimulation(false)}
                      onTrigger={() => setShowSimulation(true)}
                    />
                  }
                />
                <Route path="/decrypt" element={<DecryptSimulation />} />
                <Route path="/what-is-ransomware" element={<WhatIsRansomware />} />
                <Route path="/how-it-spreads" element={<HowItSpreads />} />
                <Route path="/encrypt-concept" element={<EncryptionConcept />} />
                <Route path="/prevention" element={<PreventionPanel />} />
                <Route path="/recovery" element={<RecoveryPanel />} />
                <Route path="/quiz" element={<SecurityQuiz />} />
                <Route path="/risk-assessment" element={<RiskAssessment />} />
                <Route path="/glossary" element={<Glossary />} />
                <Route path="/file-encryptor" element={<FileEncryptor />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
