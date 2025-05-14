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
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}