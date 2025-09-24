import React, { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { Banknote, TrendingUp, Calendar } from "lucide-react";
import { MOCK_TRANSACTIONS, MOCK_ACCOUNTS } from "../../data/mockData";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const LoanPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [loanAmount, setLoanAmount] = useState(0);
  const [tenureYears, setTenureYears] = useState(1);
  const [interestRate, setInterestRate] = useState(7.5);
  const [showIdModal, setShowIdModal] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  // Financial calculations
  const monthlyIncome = MOCK_TRANSACTIONS.filter(
    (t) => t.category === "Income"
  ).reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = MOCK_TRANSACTIONS.filter(
    (t) => t.amount < 0
  ).reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const savings = MOCK_ACCOUNTS.filter((a) => a.type === "Savings").reduce(
    (sum, a) => sum + a.balance,
    0
  );

  const disposableIncome = monthlyIncome - monthlyExpenses;
  const maxLoan = disposableIncome * 40;
  const estimatedYears = Math.ceil(maxLoan / (disposableIncome * 12));

  const bankDetails = {
    name: "HDFC Bank",
    branch: "Connaught Place, Delhi",
    accountNo: "XXXX-4321",
  };

  const creditScore = 782;
  const creditPercent = (creditScore / 900) * 100;

  // Correct EMI calculation using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
  const calculateEMI = (principal: number, annualRate: number, years: number) => {
    const N = years * 12; // Total number of months
    const R = annualRate / 12 / 100; // Monthly interest rate

    if (R === 0) {
      const emi = principal / N;
      return { emi, totalPayable: principal, totalInterest: 0 };
    }

    const numerator = principal * R * Math.pow(1 + R, N);
    const denominator = Math.pow(1 + R, N) - 1;
    const emi = numerator / denominator;

    const totalPayable = emi * N;
    const totalInterest = totalPayable - principal;

    return { emi, totalPayable, totalInterest };
  };

  const generateApplicationId = () => {
    const id = "LN-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    setApplicationId(id);
    setShowIdModal(true);
    setShowModal(false);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Loan Eligibility</h2>

      {/* Bank Details */}
      <Card className="p-6 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Banknote className="text-blue-400" /> Bank Details
        </h3>
        <div className="mt-3 text-gray-300 space-y-1">
          <p>Bank: {bankDetails.name}</p>
          <p>Branch: {bankDetails.branch}</p>
          <p>Account No: {bankDetails.accountNo}</p>
        </div>
      </Card>

      {/* Credit Score */}
      <Card className="p-6 flex flex-col items-center justify-center shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
          <TrendingUp className="text-green-400" /> Credit Score
        </h3>
        <div className="w-32 h-32">
          <CircularProgressbar
            value={creditPercent}
            text={`${creditScore}`}
            styles={buildStyles({
              textColor: "#ffffff",
              pathColor: creditScore > 750 ? "#22c55e" : "#eab308",
              trailColor: "#374151",
            })}
          />
        </div>
        <p className="text-gray-400 mt-3">out of 900</p>
      </Card>

      {/* Loan Suggestion */}
      <Card className="p-6 shadow-lg bg-gradient-to-br from-slate-800 to-slate-900">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Calendar className="text-purple-400" /> Loan Suggestion
        </h3>
        <div className="mt-3 space-y-1 text-gray-300">
          <p>Monthly Income: ₹{monthlyIncome.toFixed(2)}</p>
          <p>Monthly Expenses: ₹{monthlyExpenses.toFixed(2)}</p>
          <p>Savings: ₹{savings.toFixed(2)}</p>
        </div>

        <p className="text-gray-300 mt-4">
          Based on your financials, you may be eligible for a loan up to:
        </p>
        <p className="text-2xl font-bold text-blue-400 mt-2">
          ₹{maxLoan.toLocaleString("en-IN")}
        </p>
        <p className="text-gray-300 mt-2">
          Estimated Payoff Time: {estimatedYears} years (with safe EMI)
        </p>

        <div className="mt-6">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-2 rounded-xl shadow-md transition"
            onClick={() => setShowModal(true)}
          >
            Apply for Loan
          </Button>
        </div>
      </Card>

      {/* Loan Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg p-6 space-y-4 relative">
            <h3 className="text-2xl font-bold text-white">Loan Application</h3>
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <div className="space-y-3 text-gray-200">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 rounded bg-slate-700 text-white"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-2 rounded bg-slate-700 text-white"
              />
              <input
                type="text"
                placeholder="ID Proof (e.g., PAN, Aadhaar)"
                className="w-full p-2 rounded bg-slate-700 text-white"
              />
              <input
                type="text"
                placeholder={`Linked Bank Account: ${bankDetails.accountNo}`}
                className="w-full p-2 rounded bg-slate-700 text-white"
                disabled
              />
              <input
                type="number"
                placeholder="Loan Amount"
                className="w-full p-2 rounded bg-slate-700 text-white"
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                max={maxLoan}
              />
              <input
                type="number"
                placeholder="Tenure (Years)"
                className="w-full p-2 rounded bg-slate-700 text-white"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Interest Rate %"
                className="w-full p-2 rounded bg-slate-700 text-white"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                min={6}
                max={9}
                step={0.1}
              />

              {/* Display EMI, Total Interest, Total Payable */}
              {loanAmount > 0 && tenureYears > 0 && (() => {
                const { emi, totalPayable, totalInterest } = calculateEMI(
                  loanAmount,
                  interestRate,
                  tenureYears
                );
                return (
                  <>
                    <p className="text-gray-300">Monthly EMI: ₹{emi.toFixed(2)}</p>
                    <p className="text-gray-300">Total Interest Payable: ₹{totalInterest.toFixed(2)}</p>
                    <p className="text-gray-300 font-semibold mt-1">Total Amount Payable: ₹{totalPayable.toFixed(2)}</p>
                  </>
                );
              })()}

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={generateApplicationId}
              >
                Submit Application
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Application ID Modal */}
      {showIdModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-sm p-6 space-y-4 relative text-center">
            <h3 className="text-2xl font-bold text-white">Application Submitted!</h3>
            <p className="text-gray-300">Your unique loan application ID is:</p>
            <p className="text-3xl font-bold text-blue-400">{applicationId}</p>
            <p className="text-gray-400">
              Share this ID with your bank to track your application.
            </p>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => setShowIdModal(false)}
            >
              Close
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoanPage;
