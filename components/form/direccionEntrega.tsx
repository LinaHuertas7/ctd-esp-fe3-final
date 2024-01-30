import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ErrorMessage } from "@hookform/error-message";
import { CustomTextField } from "./Inputs/CustomTextField";
import { useFormContext } from "react-hook-form";
import FormGroup from "@mui/material/FormGroup";
import { Grid, Paper } from "@mui/material";

export default function DireccionEntrega() {
	const {
		control,
		formState: { errors },
		trigger,
	} = useFormContext();

	return (
		<Container maxWidth="md">
			<Paper elevation={3} sx={{ padding: 2, mb: 2 }}>
				<Typography align="center" variant="h5" sx={{ mb: 2 }}>
					Ingresa tus datos de entrega.
				</Typography>

				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<FormGroup>
							<CustomTextField
								name="address1"
								label="Dirección"
								type="text"
								control={control}
								defaultValue=""
								onChange={() => {
									trigger("address1");
								}}
							/>
							<Typography variant="caption" color="error">
								<ErrorMessage errors={errors} name="address1" />
							</Typography>
						</FormGroup>
					</Grid>

					<Grid item xs={12} md={6}>
						<FormGroup>
							<CustomTextField
								name="address2"
								label="Departamento, piso, etc"
								type="text"
								control={control}
								defaultValue=""
								onChange={() => {
									trigger("address2");
								}}
							/>
							<Typography variant="caption" color="error">
								<ErrorMessage errors={errors} name="address2" />
							</Typography>
						</FormGroup>
					</Grid>

					<Grid item xs={12} md={6}>
						<FormGroup>
							<CustomTextField
								name="city"
								label="Ciudad"
								type="text"
								control={control}
								defaultValue=""
								onChange={() => {
									trigger("city");
								}}
							/>
							<Typography variant="caption" color="error">
								<ErrorMessage errors={errors} name="city" />
							</Typography>
						</FormGroup>
					</Grid>

					<Grid item xs={12} md={6}>
						<FormGroup>
							<CustomTextField
								name="state"
								label="Provincia"
								type="text"
								control={control}
								defaultValue=""
								onChange={() => {
									trigger("state");
								}}
							/>
							<Typography variant="caption" color="error">
								<ErrorMessage errors={errors} name="state" />
							</Typography>
						</FormGroup>
					</Grid>

					<Grid item xs={12} md={12}>
						<FormGroup>
							<CustomTextField
								name="zipCode"
								label="Código postal"
								type="text"
								control={control}
								defaultValue=""
								onChange={() => {
									trigger("zipCode");
								}}
							/>
							<Typography variant="caption" color="error">
								<ErrorMessage errors={errors} name="zipCode" />
							</Typography>
						</FormGroup>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
}
