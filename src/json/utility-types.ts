import { Product } from "./produto";

const product1: Readonly<Product> = {
    name: 'Pair of Socks',
    amountInStock: 100,
    unitValue: 5,
}

const productAllOptional: Partial<Product> = {
    unitValue: 20
}

const productAllRequired: Required<Product> ={
    name: 'Jacket',
    amountInStock: 30,
    unitValue: 180,
    barCode: '1234567890123'
}

const productOmitStockAndBarCode: Omit<Product, 'amountInStock' | 'barCode'> = {
    name: 'Shorts',
    unitValue: 80
}

const productOnlyNameAndValue: Pick<Product, 'name' | 'unitValue'> = {
    name: 'Shorts',
    unitValue: 80
}