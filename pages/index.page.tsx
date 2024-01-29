import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { Grid, Pagination, Stack } from '@mui/material';
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import { Comics } from 'types/comics';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CardComic from 'dh-marvel/components/comics/Card';
interface Props {
    comics: Comics;
}

const ITEMS_LIMIT = 12;


const Index: NextPage<Props> = ({ comics }) => {

    const router = useRouter();
    const [page, setPage] = useState(1);
    const handlChangesPage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        router.push(`/?page=${value}`);
    };

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name='description' content='Comics de Marvel' />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BodySingle title={'Comics Universo Marvel'}>
                <Stack spacing={2} direction='row' alignItems='center' justifyContent='center' sx={{ mx: 'auto', backgroundColor: '#ece4e4cc', borderRadius: '10px', padding: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', }} >
                    <Pagination count={Math.ceil(comics?.data?.total / ITEMS_LIMIT)} showFirstButton showLastButton onChange={handlChangesPage} color='primary' size='large' page={page}/>
                </Stack>
                <Box sx={{ flexGrow: 2, m: '40px auto 60px' }}>
                    <Grid container spacing={{ xs: 2, md: 2 }}>
                        {comics?.data?.results.map((comic) => (
                            <Grid item key={comic.id} xs={12} sm={6} md={4} lg={3} >
                                <CardComic comic={comic} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </BodySingle>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ res, query }) => {
    const { page } = query;
    const offset = (Number(page) - 1) * ITEMS_LIMIT;
    const comics = await getComics(offset, ITEMS_LIMIT);

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );

    return {
        props: {
            comics,
        },
    };
};

export default Index;