import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { ComicAsociate } from 'types/comicAsosiate';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
    comic: ComicAsociate;
}

const ComicCard: React.FC<Props> = ({ comic }) => {
    console.log('comic', comic)
    return (
        <Card sx={{ display: 'flex', maxWidth: 600, m: 2, backgroundColor:'#FAFAFA' }}>
            <CardMedia
                component="img"
                alt="Imagen del Cómic"
                height="250"
                width="auto"
                image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle1" component="div" sx={{ ml: 2 }}>
                    {comic.title}
                </Typography>
                <Accordion sx={{ mt: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="description-content" id="description-header">
                        <Typography variant="body2">Descripción</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{comic.description}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ mt: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="creators-content" id="creators-header">
                        <Typography variant="body2">Creadores</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {comic.creators.items.length > 0 ? (
                            <ul>
                                {comic.creators.items.map((item, index: number) => (
                                    <li key={index}>
                                        <Typography>{`${item.name}`}</Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography>No hay creadores disponibles</Typography>
                        )}
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    );
};

export default ComicCard;