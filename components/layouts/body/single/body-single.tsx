import * as React from "react";
import { FC, PropsWithChildren } from "react";
import Container, { ContainerProps } from "@mui/material/Container";
import { Stack, Typography } from "@mui/material";

interface BodySingleProps extends PropsWithChildren {
	title?: string;
	containerProps?: ContainerProps;
}

const BodySingle: FC<BodySingleProps> = ({
	title,
	containerProps,
	children,
}: BodySingleProps) => {
	return (
		<Container maxWidth="xl" {...containerProps}>
			<Stack direction={"column"} display={"flex"} justifyContent={"center"}>
				{title && (
					<Typography
						variant={"h2"}
						mt={4}
						mb={5}
						textAlign={"center"}
						fontSize={28}
						fontWeight={600}
						fontFamily={"inherit, sans-serif"}
					>
						{title}
					</Typography>
				)}
				{children}
			</Stack>
		</Container>
	);
};
export default BodySingle;
