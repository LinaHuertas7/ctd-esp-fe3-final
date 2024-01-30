import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import CardComic from "dh-marvel/components/comics/Card";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import {
	getCharacter,
	getComicsAsociate,
} from "dh-marvel/services/marvel/marvel.service";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Comic } from "types";
import { Character } from "types/character";

interface Props {
	personaje: Character;
	comics: Comic[];
}

const CharacterPage: NextPage<Props> = ({ personaje, comics }) => {
	return (
		<>
			<Head>
				<title>Personaje - {personaje.name}</title>
				<meta
					name="description"
					content={`Detalle del personaje ${personaje.name}`}
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<BodySingle title={"Detalle del Personaje"}>
				<Grid container spacing={6} mb={6}>
					<Grid item xs={12} md={6}>
						<Card sx={{ maxWidth: "100%", height: "100%" }}>
							<CardMedia
								component="img"
								alt="Imagen del Personaje"
								height="auto"
								width="auto"
								image={`${personaje.thumbnail.path}.${personaje.thumbnail.extension}`}
							/>
							<CardContent>
								<Typography gutterBottom variant="h4" component="div">
									{personaje.name}
								</Typography>
								{personaje.description === null ||
								personaje.description === "" ? (
									<Typography gutterBottom variant="body1" component="div">
										No hay una descripción disponible del personaje seleccionado
									</Typography>
								) : (
									<Typography gutterBottom variant="body1" component="div">
										<b>Descripción: </b> {personaje.description}
									</Typography>
								)}
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography
							gutterBottom
							variant="h5"
							mb={3}
							fontWeight="bold"
							component="div"
						>
							Otros comics de {personaje.name}
						</Typography>
						<Grid container spacing={2} mx="auto">
							{comics.map((comic) => (
								<Grid key={comic.id} item xs={12} sm={6} md={6} lg={4}>
									<CardComic comic={comic} />
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</BodySingle>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const id = Number(params?.id);
	const personaje = await getCharacter(id);
	const comics = await getComicsAsociate(id);
	return {
		props: {
			personaje,
			comics,
		},
	};
};

export default CharacterPage;
