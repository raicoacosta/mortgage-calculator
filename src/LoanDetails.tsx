import React from 'react';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Grid,
} from '@mui/material';
import MaskedInput from 'react-text-mask';
import { InputBaseComponentProps } from '@mui/material/InputBase';

interface LoanDetailsProps {
  loanAmount: string;
  initialAmount: string;
  annualRate: string;
  months: string;
  additionalMonthlyPayment: string;
  onLoanAmountChange: (value: string) => void;
  onInitialAmountChange: (value: string) => void;
  onAnnualRateChange: (value: string) => void;
  onMonthsChange: (value: string) => void;
  onAdditionalMonthlyPaymentChange: (value: string) => void;
}

const LoanDetails: React.FC<LoanDetailsProps> = ({
  loanAmount,
  initialAmount,
  annualRate,
  months,
  additionalMonthlyPayment,
  onLoanAmountChange,
  onInitialAmountChange,
  onAnnualRateChange,
  onMonthsChange,
  onAdditionalMonthlyPaymentChange
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3} sm={2}>
        <FormControl variant="outlined" margin="normal">
          <InputLabel htmlFor="loan-amount">Monto del Préstamo</InputLabel>
          <OutlinedInput
            id="loan-amount"
            value={loanAmount}
            onChange={(e) => onLoanAmountChange(e.target.value)}
            startAdornment={<InputAdornment position="start">S/</InputAdornment>}
            label="Monto del Préstamo"
            inputComponent={MaskedInput as unknown as React.ComponentType<InputBaseComponentProps>}
            inputProps={{ mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={3} sm={2}>
        <FormControl variant="outlined" margin="normal">
          <InputLabel htmlFor="initial-amount">Monto Inicial</InputLabel>
          <OutlinedInput
            id="initial-amount"
            value={initialAmount}
            onChange={(e) => onInitialAmountChange(e.target.value)}
            startAdornment={<InputAdornment position="start">S/</InputAdornment>}
            label="Monto Inicial"
            inputComponent={MaskedInput as unknown as React.ComponentType<InputBaseComponentProps>}
            inputProps={{ mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={3} sm={2}>
        <FormControl variant="outlined" margin="normal">
          <InputLabel htmlFor="annual-rate">TEA (Tasa de Interés Anual %)</InputLabel>
          <OutlinedInput
            id="annual-rate"
            value={annualRate}
            onChange={(e) => onAnnualRateChange(e.target.value)}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            label="TEA (Tasa de Interés Anual %)"
            inputComponent={MaskedInput as unknown as React.ComponentType<InputBaseComponentProps>}
            inputProps={{ mask: [/\d/, /\d/, '.', /\d/, /\d/] }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={3} sm={2}>
        <FormControl variant="outlined" margin="normal">
          <InputLabel htmlFor="months">Plazo en Meses</InputLabel>
          <OutlinedInput
            id="months"
            value={months}
            onChange={(e) => onMonthsChange(e.target.value)}
            label="Plazo en Meses"
            inputComponent={MaskedInput as unknown as React.ComponentType<InputBaseComponentProps>}
            inputProps={{ mask: [/\d/, /\d/, /\d/] }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={3} sm={2}>
        <FormControl variant="outlined" margin="normal">
          <InputLabel htmlFor="additional-monthly-payment">Monto de Amortización Adicional Mensual</InputLabel>
          <OutlinedInput
            id="additional-monthly-payment"
            value={additionalMonthlyPayment}
            onChange={(e) => onAdditionalMonthlyPaymentChange(e.target.value)}
            startAdornment={<InputAdornment position="start">S/</InputAdornment>}
            label="Monto de Amortización Adicional Mensual"
            inputComponent={MaskedInput as unknown as React.ComponentType<InputBaseComponentProps>}
            inputProps={{ mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] }}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default LoanDetails;
