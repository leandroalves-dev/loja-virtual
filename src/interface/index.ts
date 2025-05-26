import type { Timestamp } from "firebase/firestore";

export interface Products{
    id: number;
    title: string;
    description: string;
    category: string;
    emphasis: boolean;
    sale: boolean;
    qtda: number;
    price: number;
    tags: string[];
    rating: number;
    imagem: string;
    discount: number;
}

export interface Cep{
    address: string;
    cep: string;
    logradouro: string;
    complement: string;
    cpf: string; 
    neighborhood: string;
    localidade: string;
    dateBirth: string;
    email: string;
    name: string;
    lastname: string;
    estado: string;
    n: string;
    uf: string;
    ibge: string;
    gia: string;
    phone: string;
    ddd: string;
    siafi: string;
    ref?: string;
    imagem?: string;
}
export interface ListComments{
    id: string;
    name: string;
    message: string;
    rating: number;
    imagem?: string;
    createdAt: Timestamp;
    userId: string;
    productId: number
}
export interface CartItem {
    id: number;
    title: string;
    price: number;
    imagem: string;
    quantity: number;
    totalQuantity: number
}

export interface Order {
    id: string;
    name: string;
    items: Array<{
        id: string;
        title: string;
        price: number;
        quantity: number;
        imagem: string;
    }>;
    total: number;
    createdAt: Timestamp;
}