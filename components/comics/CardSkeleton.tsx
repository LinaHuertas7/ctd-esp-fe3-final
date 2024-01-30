import {
	Card,
	CardActions,
	CardContent,
	Grid,
	Skeleton,
	Typography,
} from "@mui/material";

const CardSkeleton: React.FC = () => {
	return (
		<Grid item xs={12} sm={6} md={4} lg={3}>
			<Card
				sx={{
					maxWidth: 300,
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Skeleton
					sx={{ bgcolor: "grey.900" }}
					variant="rectangular"
					width={300}
					height={240}
				/>

				<CardContent>
					<Typography
						gutterBottom
						variant="h6"
						fontWeight="bold"
						component="div"
						align="center"
					>
						<Skeleton
							animation="wave"
							height={33}
							width="100%"
							style={{ marginBottom: 6 }}
						/>
						<Skeleton
							animation="wave"
							height={33}
							width="100%"
							style={{ marginBottom: 6 }}
						/>
					</Typography>
				</CardContent>
				<CardActions
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "end",
						margin: "20px",
						marginTop: "auto",
					}}
				>
					<Skeleton animation="wave" width={80} height={60} />
					<Skeleton animation="wave" width={80} height={60} />
				</CardActions>
			</Card>
		</Grid>
	);
};

export default CardSkeleton;