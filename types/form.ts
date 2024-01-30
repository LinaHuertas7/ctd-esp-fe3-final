export interface PersonalData {
    customer: Customer;
    card:     Card;
}

export interface Card {
    number:     string;
    cvc:        string;
    expDate:    string;
    nameOnCard: string;
}

export interface Customer {
    name:     string;
    lastname: string;
    email:    string;
    address:  Address;
}

export interface Address {
    address1: string;
    address2: string;
    city:     string;
    state:    string;
    zipCode:  string;
}
export interface Order{
    name:   string,
    image:  string,
    price:  number
}