import * as yup from "yup";

// Creamos el schema
export const schema = yup.object({
    name: yup
        .string()
        .required("Este campo es requerido")
        .min(2, "Mínimo 2 caracteres")
        .max(15, "Máximo 15 caracteres"),
    lastName: yup
        .string()
        .required("Este campo es requerido")
        .min(2, "Mínimo 2 caracteres")
        .max(15, "Máximo 15 caracteres"),
    email: yup
        .string()
        .required("Este campo es requerido")
        .email("El correo no es válido"),
    address1: yup
        .string()
        .required("Este campo es requerido")
        .min(2, "Mínimo 2 caracteres"),
    address2: yup.string().notRequired(),
    city: yup
        .string()
        .required("Este campo es requerido")
        .min(2, "Mínimo 2 caracteres"),
    state: yup
        .string()
        .required("Este campo es requerido")
        .min(2, "Mínimo 2 caracteres"),
    zipCode: yup
        .string()
        .required("Este campo es requerido")
        .min(2, "Mínimo 2 caracteres"),
    number: yup
        .string()
        .required("Este campo es requerido")
        .matches(
            /^[0-9]{16}$/,
            "El número de la tarjeta debe tener 16 dígitos"
        ),
    nameOnCard: yup.string().required("Este campo es requerido"),
    expDate: yup
        .string()
        .required("Este campo es requerido")
        .matches(
            /^[0-9]{4}$/,
            "la fecha debe ser dos digitos para el MES y dos digitos para el AÑO."
        ),
    cvc: yup
        .string()
        .required("Este campo es requerido")
        .matches(/^[0-9]{3}$/, "el código de seguridad debe tener 3 dígitos"),
});
