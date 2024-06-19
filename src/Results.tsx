import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface ResultsProps {
  monthlyPayment: number;
  monthlyRate: number;
  totalInterestWithoutAdditional: number;
  totalPaymentWithoutAdditional: number;
  totalInterestWithAdditional: number;
  totalPaymentWithAdditional: number;
  monthsSaved: number;
}

const formatCurrency = (value: number) => {
  if (isNaN(value)) {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(0);
  }
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);
};

const useStyles = makeStyles({
  container: {
    marginTop: '20px',
  },
  title: {
    marginBottom: '10px',
  },
  resultItem: {
    marginBottom: '5px',
  },
});

const Results: React.FC<ResultsProps> = ({
  monthlyPayment,
  monthlyRate,
  totalInterestWithoutAdditional,
  totalPaymentWithoutAdditional,
  totalInterestWithAdditional,
  totalPaymentWithAdditional,
  monthsSaved
}) => {
  const classes = useStyles();

  const totalSavings = totalInterestWithoutAdditional - totalInterestWithAdditional;

  return (
    <div className={classes.container}>
      <Typography variant="h6" className={classes.title}>Resultados</Typography>
      <Typography className={classes.resultItem}>Cuota Mensual: {formatCurrency(monthlyPayment)}</Typography>
      <Typography className={classes.resultItem}>TEA Mensual: {(monthlyRate * 100).toFixed(2)}%</Typography>
      <Typography className={classes.resultItem}>Total Intereses sin Abonos Adicionales: {formatCurrency(totalInterestWithoutAdditional)}</Typography>
      <Typography className={classes.resultItem}>Total a Pagar sin Abonos Adicionales: {formatCurrency(totalPaymentWithoutAdditional)}</Typography>
      <Typography className={classes.resultItem}>Total Intereses con Abonos Adicionales: {formatCurrency(totalInterestWithAdditional)}</Typography>
      <Typography className={classes.resultItem}>Total a Pagar con Abonos Adicionales: {formatCurrency(totalPaymentWithAdditional)}</Typography>
      <Typography className={classes.resultItem}>Total Ahorrado con Abonos Adicionales: {formatCurrency(totalSavings)}</Typography>
      <Typography className={classes.resultItem}>Meses Ahorrados con Abonos Adicionales: {monthsSaved} meses</Typography>
    </div>
  );
};

export default Results;
