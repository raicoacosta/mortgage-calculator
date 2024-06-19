import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
} from '@mui/material';
import LoanDetails from './LoanDetails';
import Results from './Results';
import PaymentSchedule from './PaymentSchedule';

const MortgageCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [initialAmount, setInitialAmount] = useState<string>('');
  const [annualRate, setAnnualRate] = useState<string>('');
  const [months, setMonths] = useState<string>('');
  const [additionalMonthlyPayment, setAdditionalMonthlyPayment] = useState<string>('');
  const [additionalPayment, setAdditionalPayment] = useState<number[]>([]);

  const handleLoanAmountChange = (value: string) => {
    setLoanAmount(value);
  };

  const handleInitialAmountChange = (value: string) => {
    setInitialAmount(value);
  };

  const handleAnnualRateChange = (value: string) => {
    setAnnualRate(value);
  };

  const handleMonthsChange = (value: string) => {
    setMonths(value);
  };

  const handleAdditionalMonthlyPaymentChange = (value: string) => {
    setAdditionalMonthlyPayment(value);
  };

  const handleAdditionalPaymentChange = (index: number, value: number) => {
    const newAdditionalPayments = [...additionalPayment];
    newAdditionalPayments[index] = value;
    setAdditionalPayment(newAdditionalPayments);
  };

  const handleAddAdditionalPayment = (index: number) => {
    const newAdditionalPayments = [...additionalPayment];
    newAdditionalPayments[index] = 0;
    setAdditionalPayment(newAdditionalPayments);
  };

  const handleRemoveAdditionalPayment = (index: number) => {
    const newAdditionalPayments = [...additionalPayment];
    newAdditionalPayments.splice(index, 1);
    setAdditionalPayment(newAdditionalPayments);
  };

  const loanAmountValue = isNaN(parseFloat(loanAmount)) ? 0 : parseFloat(loanAmount);
  const initialAmountValue = isNaN(parseFloat(initialAmount)) ? 0 : parseFloat(initialAmount);
  const annualRateValue = isNaN(parseFloat(annualRate)) ? 0 : parseFloat(annualRate);
  const monthsValue = isNaN(parseInt(months)) ? 0 : parseInt(months);
  const additionalMonthlyPaymentValue = isNaN(parseFloat(additionalMonthlyPayment)) ? 0 : parseFloat(additionalMonthlyPayment);

  const calculateMonthlyRate = (annualRate: number) => {
    return annualRate / 100 / 12;
  };

  const calculateMonthlyPayment = (loanAmount: number, monthlyRate: number, months: number) => {
    return (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  };

  const monthlyRate = calculateMonthlyRate(annualRateValue);
  const effectiveLoanAmount = loanAmountValue - initialAmountValue;
  const monthlyPayment = calculateMonthlyPayment(effectiveLoanAmount, monthlyRate, monthsValue);
  const totalPaymentWithoutAdditional = monthlyPayment * monthsValue;
  const totalInterestWithoutAdditional = totalPaymentWithoutAdditional - effectiveLoanAmount;

  let remainingBalance = effectiveLoanAmount;
  let totalInterestWithAdditional = 0;
  let totalPaymentWithAdditional = 0;
  let monthsSaved = 0;

  const paymentSchedule = Array.from({ length: monthsValue }, (_, index) => {
    const additional = additionalPayment[index] || 0;
    const interestPayment = parseFloat((remainingBalance * monthlyRate).toFixed(2));
    const principalPayment = parseFloat((monthlyPayment - interestPayment + additionalMonthlyPaymentValue + additional).toFixed(2));
    totalInterestWithAdditional += interestPayment;
    totalPaymentWithAdditional += parseFloat((monthlyPayment + additionalMonthlyPaymentValue + additional).toFixed(2));
    remainingBalance -= principalPayment;

    if (remainingBalance <= 0 && monthsSaved === 0) {
      monthsSaved = index + 1;
    }

    return {
      month: index + 1,
      monthlyPayment: monthlyPayment.toString(),
      interestPayment: interestPayment.toString(),
      principalPayment: principalPayment.toString(),
      additionalPayment: additional.toString(),
      remainingBalance: Math.max(remainingBalance, 0).toString(), // Ensure remaining balance doesn't go negative
    };
  });

  if (monthsSaved === 0) {
    monthsSaved = monthsValue;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Calculadora de Crédito Hipotecario
      </Typography>
      <Box sx={{ my: 2 }}>
        <LoanDetails
          loanAmount={loanAmount}
          initialAmount={initialAmount}
          annualRate={annualRate}
          months={months}
          additionalMonthlyPayment={additionalMonthlyPayment}
          onLoanAmountChange={handleLoanAmountChange}
          onInitialAmountChange={handleInitialAmountChange}
          onAnnualRateChange={handleAnnualRateChange}
          onMonthsChange={handleMonthsChange}
          onAdditionalMonthlyPaymentChange={handleAdditionalMonthlyPaymentChange}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Results
          monthlyPayment={monthlyPayment}
          monthlyRate={monthlyRate}
          totalInterestWithoutAdditional={totalInterestWithoutAdditional}
          totalPaymentWithoutAdditional={totalPaymentWithoutAdditional}
          totalInterestWithAdditional={totalInterestWithAdditional}
          totalPaymentWithAdditional={totalPaymentWithAdditional}
          monthsSaved={monthsValue - monthsSaved}
        />
      </Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Cronograma de Pagos</Typography>
        <PaymentSchedule
          paymentSchedule={paymentSchedule}
          additionalPayment={additionalPayment}
          onAdditionalPaymentChange={handleAdditionalPaymentChange}
          onAddAdditionalPayment={handleAddAdditionalPayment}
          onRemoveAdditionalPayment={handleRemoveAdditionalPayment}
        />
      </Box>
    </Container>
  );
};

export default MortgageCalculator;
