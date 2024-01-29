export interface Comics {
    code:            number
    status:          string
    copyright:       string
    attributionText: string
    attributionHTML: string
    etag:            string
    data:            Data
}

export interface Data {
    offset:  number;
    limit:   number;
    total:   number;
    count:   number;
    results: Comic[];
}

export interface Comic {
    id:                 number;
    digitalId:          number;
    title:              string;
    issueNumber:        number;
    variantDescription: string;
    description:        string;
    modified:           string;
    isbn:               string;
    upc:                string;
    diamondCode:        string;
    ean:                string;
    issn:               string;
    format:             string;
    pageCount:          number;
    textObjects:        any[];
    resourceURI:        string;
    urls:               URL[];
    series:             Series;
    variants:           Series[];
    collections:        any[];
    collectedIssues:    Series[];
    dates:              any[];
    prices:             Price[];
    thumbnail:          Thumbnail;
    images:             Thumbnail[];
    creators:           Creators;
    characters:         Characters;
    stories:            Stories;
    events:             Characters;
}

export interface Url {
    type: string
    url:  string
}

export interface Series {
    resourceURI: string;
    name:        string;
}

export interface Icomic extends Comic{
    price: number
    oldPrice: number
    stock: number
}

export interface Creators {
    available:     number;
    collectionURI: string;
    items:         CreatorsItem[];
    returned:      number;
}

export interface CreatorsItem {
    resourceURI: string;
    name:        string;
    role:        string;
}

export interface Variant {
    resourceURI: string
    name:        string
}

export interface Date {
    type: string
    date: string
}

export interface Price {
    type:   string
    price:  number
}

export interface Thumbnail {
    path:       string
    extension:  string
}

export interface Characters {
    available:      number
    collectionURI:  string
    items:          any[]
    returned:       number
}

export interface Stories {
    available:      number
    collectionURI:  string
    items:          storiesItem[]
    returned:       number
}

export interface storiesItem {
    resourceURI:    string
    name:           string
    type:           string
}

export interface Events {
    available:      number
    collectionURI:  string
    items:          any[]
    returned:       number
}