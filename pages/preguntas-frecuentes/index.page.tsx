import { NextPage } from "next";
import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";

import { Faq } from "types/index";
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import Head from "next/head";
import { getFaqs } from "dh-marvel/services/faqs";
import { faqsData } from "dh-marvel/components/faqs/faqsData";

interface Props {
    faqs: Faq[];
}

const StyledAccordion = styled(Accordion)({
    margin: "10px 0",
    boxShadow: "0px 1px 5px rgba(192, 177, 177, 0.1)",
    borderRadius: "8px",
});

const StyledAccordionSummary = styled(AccordionSummary)({
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd",
    borderRadius: "8px",
    "& .MuiTypography-root": {
        fontWeight: "bold",
    },
});

const StyledAccordionDetails = styled(AccordionDetails)({
    padding: "15px 30px",
});

const FaqsPage: NextPage<Props> = () => {
    return (
        <>
            <Head>
                <title>Preguntas Frecuentes</title>
                <meta
                    name="description"
                    content="Explora las preguntas frecuentes sobre cómics de Marvel: desde cómo comprar hasta detalles sobre tus personajes favoritos."
                />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <BodySingle title={"Preguntas Frecuentes"}>
                {faqsData.map((faq) => (
                    <StyledAccordion key={faq.id}>
                        <StyledAccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-content-${faq.id}`}
                            id={`panel-header-${faq.id}`}
                        >
                            <Typography>{faq.question}</Typography>
                        </StyledAccordionSummary>
                        <StyledAccordionDetails>
                            <Typography>{faq.answer}</Typography>
                        </StyledAccordionDetails>
                    </StyledAccordion>
                ))}
            </BodySingle>
        </>
    );
};

/* export const getStaticProps = async () => {
    const faqs = await getFaqs();
    return {
        props: {
            faqs,
        },
    };
};
 */
export default FaqsPage;