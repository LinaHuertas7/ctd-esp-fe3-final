export const getFaqs = async () => {
    const response = await fetch(`${process.env.BASE_URL}api/faqs`)
    const faqs = await response.json()
    return faqs;
}