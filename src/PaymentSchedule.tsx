import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface PaymentScheduleProps {
  paymentSchedule: {
    month: number;
    monthlyPayment: string;
    interestPayment: string;
    principalPayment: string;
    additionalPayment: string;
    remainingBalance: string;
  }[];
  additionalPayment: number[];
  onAdditionalPaymentChange: (index: number, value: number) => void;
  onAddAdditionalPayment: (index: number) => void;
  onRemoveAdditionalPayment: (index: number) => void;
}

const formatCurrency = (value: number) => {
  if (isNaN(value)) {
    return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(0);
  }
  return new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(value);
};

const PaymentSchedule: React.FC<PaymentScheduleProps> = ({
  paymentSchedule,
  additionalPayment,
  onAdditionalPaymentChange,
  onAddAdditionalPayment,
  onRemoveAdditionalPayment
}) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mes</TableCell>
            <TableCell>Cuota Mensual</TableCell>
            <TableCell>Pago de Interés</TableCell>
            <TableCell>Pago de Principal</TableCell>
            <TableCell>Abono Adicional</TableCell>
            <TableCell>Saldo Restante</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentSchedule.map((payment, index) => {
            if (parseFloat(payment.remainingBalance) <= 0) {
              return null; // Skip rendering the row if remainingBalance is zero or negative
            }
            return (
              <TableRow key={index}>
                <TableCell>{payment.month}</TableCell>
                <TableCell>{formatCurrency(parseFloat(payment.monthlyPayment))}</TableCell>
                <TableCell>{formatCurrency(parseFloat(payment.interestPayment))}</TableCell>
                <TableCell>{formatCurrency(parseFloat(payment.principalPayment))}</TableCell>
                <TableCell>
                  {typeof additionalPayment[index] !== 'undefined' ? (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        type="number"
                        value={additionalPayment[index] || 0}
                        onChange={(e) => onAdditionalPaymentChange(index, parseFloat(e.target.value))}
                        margin="none"
                        variant="outlined"
                        size="small"
                        style={{ width: '70%' }}
                      />
                      <IconButton
                        onClick={() => onRemoveAdditionalPayment(index)}
                        size="small"
                        color="secondary"
                      >
                        <RemoveIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <IconButton
                      onClick={() => onAddAdditionalPayment(index)}
                      size="small"
                      color="primary"
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell>{formatCurrency(parseFloat(payment.remainingBalance))}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentSchedule;
