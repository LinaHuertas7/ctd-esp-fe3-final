import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ErrorMessage } from "@hookform/error-message";
import { CustomTextField } from "./Inputs/CustomTextField";
import { useFormContext } from "react-hook-form";
import FormGroup from "@mui/material/FormGroup";
import { Grid, Paper } from "@mui/material";

export default function DatosPersonales() {
	const {
		control,
		formState: { errors },
		trigger,
	} = useFormContext();

	return (
		<Container maxWidth="md">
			<Typography align="center" variant="h5" sx={{ mb: 2 }}>
				Ingresa tus datos personales.
			</Typography>

			<Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
				<FormGroup>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								name="name"
								label="Nombre"
								type="text"
								control={control}
								defaultValue=""
								onChange={() => {
									trigger("name");
								}}
							/>
							<Typography variant="caption" color="error">
								<ErrorMessage errors={errors} name="name" />
							</Typography>
						</Grid>

						<Grid item xs={12} sm={6}>
							<CustomTextField
								name="lastName"
								label="Apellido"
								type="text"
								control={control}
								defaultValue=""
								onChange={() => {
									trigger("lastName");
								}}
							/>
							<Typography variant="caption" color="error">
								<ErrorMessage errors={errors} name="lastName" />
							</Typography>
						</Grid>

						<Grid item xs={12}>
							<CustomTextField
								name="email"
								label="E-Mail"
								type="email"
								control={control}
								defaultValue=""
								onChange={() => {
									trigger("email");
								}}
							/>
							<Typography variant="caption" color="error">
								<ErrorMessage errors={errors} name="email" />
							</Typography>
						</Grid>
					</Grid>
				</FormGroup>
			</Paper>
		</Container>
	);
}
