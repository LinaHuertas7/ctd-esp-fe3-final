import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Comic } from 'types/index';
import { useRouter } from 'next/router';

interface Props {
    comic: Comic;
}

const CardComic: FC<Props> = ({ comic }) => {
    const router = useRouter();

    const handlePathBuy = () => {
        const id = String(comic.id)
        router.push(`/checkout/${id}`);
    };

    return (
        <Card key={comic.id} sx={{ maxWidth: 300, height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardMedia component='img' sx={{ height: 240, objectFit: 'cover' }} image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} title={comic.title} alt={`Comic ${comic.title}`} />
            <CardContent sx={{ height: '100%' }}>
                <Typography gutterBottom variant='h6' fontWeight='bold' component='div' align='center'>
                    {comic.title}
                </Typography>
            </CardContent>
            <CardActions
                style={{ display: 'flex', justifyContent: 'space-between', alignItems:'end', margin: '20px',  }} >
                <Button variant='outlined' size='medium' href={`/comics/${comic.id}`} > Detalle </Button>
                <Button variant='contained' size='medium' onClick={handlePathBuy} > Comprar </Button>
            </CardActions>
        </Card>
    );
};

export default CardComic;
