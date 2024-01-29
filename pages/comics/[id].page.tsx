import * as React from 'react';
import Head from 'next/head'
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { getComic, getComics } from 'dh-marvel/services/marvel/marvel.service';
import { Comic, Icomic } from 'types/index';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';

interface Props {
  comic: Icomic
}

const ComicPage: NextPage<Props> = ({ comic }) => {
  const router = useRouter();

  const handleClickUrlCharacter = (url: string) => {
    const id = getIdCaharacter(url)
    router.push(`/personajes/${id}`);
  };
  const getIdCaharacter = (url: string) => {
    return url.split('/').pop()
  }
  const handleClickBuy = () => {
    const id = String(comic.id)
    router.push(`/checkout/${id}`);
  }

  console.log(comic.characters.items)
  return (
    <>
      <Head>
        <title>Comic {comic.title}</title>
        <meta name='description' content={`Aquí encontrarás el detalle del comic ${comic.title}`} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <BodySingle title={`Detalle del comic`} >
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, m: '10px auto 50px', maxWidth: '1200px' }} >
          <CardMedia
            component='img'
            alt='Portada del comic'
            height='520'
            width='auto'
            image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          />
          <CardContent sx={{ mx: '25px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', padding: '16px' }}>
              <Typography gutterBottom variant='h4' component='div'>
                {comic.title}
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ color: 'slategray' }}>
                {comic?.stock !== 0 ? `Stock disponible: ${comic?.stock} unidades` : 'Sin stock'}
              </Typography>
              <Typography variant='subtitle2' component='div' color='secondary' sx={{ color: 'slategray', textDecoration: 'line-through', mb: '5px', mt:'20px' }}>
                Antes: ${comic.oldPrice}
              </Typography>
              <Typography variant='h6' component='div'>
                Precio: ${comic.price}
              </Typography>
              <Button size='large' variant='contained' disabled={comic.stock <= 0} sx={{ alignSelf: 'start', my: '25px' }} onClick={() => handleClickBuy()}>
                <ShoppingCartIcon sx={{ mr: '10px' }} />
                Comprar
              </Button>
              <Accordion sx={{
                width: '100%', mt: '16px',
              }}>
                <AccordionSummary
                  sx={{
                    backgroundColor: '#e6e6e6e1',
                    boxShadow: '2px 2px 4px #ffffffd1',
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography fontWeight='bold' fontStyle='italic'>Descripción:</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ fontStyle: 'italic', mt: '6px', color:'GrayText'}}>
                  {comic.description ? comic.description : 'No hay una descripción del comic selecionado'}
                </AccordionDetails>
              </Accordion>
              <Accordion sx={{ width: '100%', mt: '16px' }}>
                <AccordionSummary
                  sx={{
                    backgroundColor: '#e6e6e6e1',
                    boxShadow: '2px 2px 4px #ffffffd1',
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography fontWeight='bold' fontStyle='italic'>Personajes:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {comic.characters.items.length > 0 ? (
                    <ul>
                      {comic.characters.items.map((character, index) => (
                        <li key={index} style={{ marginBottom: '0px', fontStyle: 'italic', cursor: 'pointer', color:'darkblue' }} onClick={() => handleClickUrlCharacter(character.resourceURI)}>
                          {character.name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Typography>No hay personajes asociados</Typography>
                  )}
                </AccordionDetails>
              </Accordion>
          </CardContent>
        </Card>
      </BodySingle>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const comics = await getComics()
  const paths = comics.data.results.flatMap((comic: Comic) =>
    ({ params: { id: String(comic.id) } })
  );
  return {
    paths,
    fallback: 'blocking'
  }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = Number(params?.id);
  try {
    const comic = await getComic(id)
    return {
      props: {
        comic,
      },
    };
  } catch (error) {
    console.error('No se pudo obtener el comic', error);
    return {
      props: {
        comic: {},
      }
    }
  }

};

export default ComicPage;