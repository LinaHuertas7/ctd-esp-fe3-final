import md5 from "md5";

const MARVEL_API_URL=process.env.MARVEL_API_URL;
const MARVEL_API_PRIVATE_KEY = process.env.MARVEL_API_PRIVATE_KEY || '';
const MARVEL_API_PUBLIC_KEY = process.env.MARVEL_API_PUBLIC_KEY || '';

const generateAuthenticationString = () => {
    const ts = new Date().getTime();
    const hash =  md5(ts+MARVEL_API_PRIVATE_KEY+MARVEL_API_PUBLIC_KEY)
    return `ts=${ts}&apikey=${MARVEL_API_PUBLIC_KEY}&hash=${hash}`
}

const fetchApi = async (endpoint: string, urlParams?: string) => {
    const authString = generateAuthenticationString();
    const url = `${MARVEL_API_URL}/${endpoint}?${authString}&${urlParams || ''}`
    console.log(url);
    const response = await fetch(url);
    return await response.json();
}

export const getComics = async (offset?: number, limit?: number) => {
    const params = new URLSearchParams();
    if (offset) params.set("offset", `${offset}`);
    if (limit) params.set("limit", `${limit}`);
    return fetchApi("comics", params.toString());
}

export const getComic = async (comicId: number) => {
    const data = await fetchApi(`comics/${comicId}`);
    const results = data.data.results;
    if (results.length > 0) return results[0];
    else return null;
}

export const getCharacter = async (characterId: number) => {
    const data = await fetchApi(`characters/${characterId}`);
    const results = data.data.results;
    if (results.length > 0) return results[0];
    else return null;
}