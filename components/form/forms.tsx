import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Icomic } from "types";
import { postCheckout } from "dh-marvel/services/checkout/postCheckout";
import DatosPersonales from "dh-marvel/components/form/datosPersonales";
import DireccionEntrega from "dh-marvel/components/form/direccionEntrega";
import DatosDelPago from "dh-marvel/components/form/datosDelPago";

const steps = ["Datos personales", "Dirección de entrega", "Datos del pago"];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
	comic: Icomic;
}

export default function CheckoutForms({ comic }: Props) {
	const router = useRouter();
	const { handleSubmit, trigger } = useFormContext();
	const [activeStep, setActiveStep] = React.useState(0);
	const [errorMsg, setErrorMsg] = React.useState("");

	const handleCloseSnackbar = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		setErrorMsg("");
	};

	const onSubmit = async (formData: any) => {
		try {
			const requestData = {
				customer: {
					name: formData.datosPersonales.name,
					lastname: formData.datosPersonales.lastName,
					email: formData.datosPersonales.email,
					address: {
						address1: formData.direccionEntrega.address1,
						address2: formData.direccionEntrega.address2,
						city: formData.direccionEntrega.city,
						state: formData.direccionEntrega.state,
						zipCode: formData.direccionEntrega.zipCode,
					},
				},
				card: {
					number: formData.datosDelPago.number,
					cvc: formData.datosDelPago.cvc,
					expDate: formData.datosDelPago.expDate,
					nameOnCard: formData.datosDelPago.nameOnCard,
				},
			};

			const response = await postCheckout(requestData);

			if (response.ok) {
				localStorage.setItem(
					"personalData",
					JSON.stringify(formData.datosPersonales)
				);
				localStorage.setItem(
					"deliveryAddress",
					JSON.stringify(formData.direccionEntrega)
				);
				localStorage.setItem(
					"comicData",
					JSON.stringify({
						name: comic.title,
						image: comic.thumbnail.path.concat(`.${comic.thumbnail.extension}`),
						price: comic.price,
					})
				);

				router.push("/confirmacion");
			} else {
				setErrorMsg(response.message);
			}
		} catch (error) {
			console.error("Error POST request:", error);
		}
	};

	const handleNextStep = async () => {
		const isFormValid = await triggerFormValidation();
		if (isFormValid) {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	};

	const triggerFormValidation = async () => {
		switch (activeStep) {
			case 0:
				return trigger(["name", "lastName", "email"]);
			case 1:
				return trigger(["address1", "address2", "city", "state", "zipCode"]);
			case 2:
				return trigger(["number", "cvc", "expDate", "nameOnCard"]);
			default:
				return true;
		}
	};

	const handleBackStep = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<Box sx={{ my: "40px" }}>
			<Stepper activeStep={activeStep} alternativeLabel>
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<React.Fragment>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={{ mt: 2, mb: 1 }}>
						{activeStep === 0 && <DatosPersonales />}
						{activeStep === 1 && <DireccionEntrega />}
						{activeStep === 2 && <DatosDelPago />}
					</Box>
					<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
						<Button
							variant="outlined"
							color="inherit"
							disabled={activeStep === 0}
							onClick={handleBackStep}
							sx={{ mr: 1 }}
						>
							Volver
						</Button>
						<Box sx={{ flex: "1 1 auto" }} />
						{activeStep !== 2 && (
							<Button type="button" variant="outlined" onClick={handleNextStep}>
								Siguiente
							</Button>
						)}
						{activeStep === 2 && (
							<Button type="submit" variant="outlined">
								Enviar
							</Button>
						)}
					</Box>
				</form>
			</React.Fragment>
			<Snackbar
				open={!!errorMsg}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity="error"
					sx={{ width: "100%" }}
				>
					{errorMsg}
				</Alert>
			</Snackbar>
		</Box>
	);
}
