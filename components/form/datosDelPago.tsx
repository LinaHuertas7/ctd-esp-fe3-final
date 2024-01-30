import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ErrorMessage } from '@hookform/error-message';
import { CustomTextField } from './Inputs/CustomTextField';
import { useFormContext } from 'react-hook-form';
import FormGroup from '@mui/material/FormGroup';

export default function DatosDelPago() {
    const { control, formState: { errors }, trigger } = useFormContext();

    return (
        <Container maxWidth="md">
            <Typography align="center" variant="h5" sx={{ mb: 2 }}>
                Ingresa los datos de Pago.
            </Typography>

            {['number', 'nameOnCard', 'expDate', 'cvc'].map((field) => (
                <FormGroup key={field} sx={{ mb: 2 }}>
                    <CustomTextField
                        name={field}
                        label={getFieldLabel(field)}
                        type={getFieldType(field)}
                        control={control}
                        defaultValue=""
                        onChange={(e) => {
                            trigger(field);
                        }}
                    />
                    <Typography variant="caption" color="error">
                        <ErrorMessage errors={errors} name={field} />
                    </Typography>
                </FormGroup>
            ))}
        </Container>
    );
}

function getFieldLabel(fieldName: string): string {
    switch (fieldName) {
        case 'number':
            return 'Número de tarjeta';
        case 'nameOnCard':
            return 'Nombre como aparece en la tarjeta';
        case 'expDate':
            return 'Fecha de expiración';
        case 'cvc':
            return 'Código de seguridad';
        default:
            return '';
    }
}

function getFieldType(fieldName: string): string {
    return fieldName === 'cvc' ? 'password' : 'text';
}