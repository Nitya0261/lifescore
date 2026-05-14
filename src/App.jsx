import React, { useEffect, useRef, lazy, Suspense } from "react";
import { initThreeBackground } from "./ThreeBackground.js";
import Topbar from "./components/Topbar";
import Navbar from "./components/Navbar";
import NewsTicker from "./components/NewsTicker";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Markets from "./pages/Markets";
import Economy from "./pages/Economy";
import Crypto from "./pages/Crypto";
import RealEstate from "./pages/RealEstate";
import SavingMoney from "./pages/SavingMoney";
import Investing from "./pages/Investing";
import Debt from "./pages/Debt";
import Retirement from "./pages/Retirement";
import SideIncome from "./pages/SideIncome";
import Tools from "./pages/Tools";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import BlogPost from "./pages/BlogPost";
import ArticleDetail from "./pages/ArticleDetail";

// Lazy-loaded routes
const SIPCalculator = lazy(() => import("./pages/tools/SIPCalculator"));
const CompoundInterest = lazy(() => import("./pages/tools/CompoundInterest"));
const RetirementNumber = lazy(() => import("./pages/tools/RetirementNumber"));
const NetWorthTracker = lazy(() => import("./pages/tools/NetWorthTracker"));
const TaxEstimator = lazy(() => import("./pages/tools/TaxEstimator"));
const BudgetTracker = lazy(() => import("./pages/dashboard/BudgetTracker"));
const SavedContent = lazy(() => import("./pages/dashboard/SavedContent"));
const CreditCards = lazy(() => import("./pages/recommendations/CreditCards"));
const HighYieldSavings = lazy(() => import("./pages/recommendations/HighYieldSavings"));
const AuthorProfile = lazy(() => import("./pages/AuthorProfile"));
const GlossaryIndex = lazy(() => import("./pages/GlossaryIndex"));
const GlossaryTerm = lazy(() => import("./pages/GlossaryTerm"));
const ComparisonPage = lazy(() => import("./pages/ComparisonPage"));
const IraVs401k = lazy(() => import("./pages/compare/IraVs401k"));
const EtfVsMutualFund = lazy(() => import("./pages/compare/EtfVsMutualFund"));
const FindAdvisor = lazy(() => import("./pages/FindAdvisor"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));

import AIChatbot from "./components/AIChatbot";
import XPToast from "./components/XPToast";
import ExitIntentPopup from "./components/ExitIntentPopup";
import ReadingProgressBar from "./components/ReadingProgressBar";
import AuthModal from "./components/AuthModal";
import { useAuth } from "./context/AuthContext";

const AppContent = ({ canvasRef }) => {
  const { authModalOpen, toggleAuthModal } = useAuth();
  
  return (
    <Router>
      <AuthModal isOpen={authModalOpen} onClose={() => toggleAuthModal(false)} />
      <canvas id="bg-canvas" ref={canvasRef}></canvas>
      <div id="root-content" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <ReadingProgressBar />
        <Topbar />
        <Navbar />
        <NewsTicker />
        
        <main style={{ flex: 1 }}>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/economy" element={<Economy />} />
              <Route path="/crypto" element={<Crypto />} />
              <Route path="/real-estate" element={<RealEstate />} />
              <Route path="/saving-money" element={<SavingMoney />} />
              <Route path="/investing" element={<Investing />} />
              <Route path="/debt" element={<Debt />} />
              <Route path="/retirement" element={<Retirement />} />
              <Route path="/side-income" element={<SideIncome />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/sip-calculator" element={<SIPCalculator />} />
              <Route path="/tools/compound-interest" element={<CompoundInterest />} />
              <Route path="/tools/retirement-number" element={<RetirementNumber />} />
              <Route path="/tools/net-worth" element={<NetWorthTracker />} />
              <Route path="/tools/tax-estimator" element={<TaxEstimator />} />
              <Route path="/dashboard/budget" element={<BudgetTracker />} />
              <Route path="/dashboard/saved" element={<SavedContent />} />
              <Route path="/recommendations/cards" element={<CreditCards />} />
              <Route path="/recommendations/savings" element={<HighYieldSavings />} />
              <Route path="/author/:id" element={<AuthorProfile />} />
              <Route path="/glossary" element={<GlossaryIndex />} />
              <Route path="/glossary/:term" element={<GlossaryTerm />} />
              <Route path="/compare" element={<IraVs401k />} />
              <Route path="/compare/roth-ira-vs-401k" element={<IraVs401k />} />
              <Route path="/compare/etf-vs-mutual-fund" element={<EtfVsMutualFund />} />
              <Route path="/compare/:slug" element={<ComparisonPage />} />
              <Route path="/advisor" element={<FindAdvisor />} />
              <Route path="/article/:slug" element={<ArticleDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <AIChatbot />
        <XPToast />
        <ExitIntentPopup />
      </div>
    </Router>
  );
};


const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
    <div className="spinner-border text-teal" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      return initThreeBackground(canvasRef.current);
    }
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent canvasRef={canvasRef} />
      </AuthProvider>
    </ThemeProvider>
  );
}
