export interface ComicAsociate {
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
    variants:           any[];
    collections:        Series[];
    collectedIssues:    any[];
    dates:              DateElement[];
    prices:             Price[];
    thumbnail:          Thumbnail;
    images:             Thumbnail[];
    creators:           Characters;
    characters:         Characters;
    stories:            Stories;
    events:             Characters;
}

export interface Characters {
    available:     number;
    collectionURI: string;
    items:         Series[];
    returned:      number;
}

export interface Series {
    resourceURI: string;
    name:        string;
}

export interface DateElement {
    type: string;
    date: string;
}

export interface Thumbnail {
    path:      string;
    extension: string;
}

export interface Price {
    type:  string;
    price: number;
}

export interface Stories {
    available:     number;
    collectionURI: string;
    items:         Item[];
    returned:      number;
}

export interface Item {
    resourceURI: string;
    name:        string;
    type:        string;
}

export interface URL {
    type: string;
    url:  string;
}