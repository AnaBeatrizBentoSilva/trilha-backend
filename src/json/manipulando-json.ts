import products from "./produtos.json";
import { writeFileSync } from "node:fs";
import path from "node:path";

const productJson = JSON.stringify([
  {
    name: "Pair of Socks",
    amountInStock: 100,
    unitValue: 5,
  },
  {
    name: "T-Shirt",
    amountInStock: 500,
    unitValue: 45,
  },
], null, 0);

const fileOutPath = path.join(__dirname, "generated-products.json");
const productsJson = JSON.parse(productJson)

writeFileSync(fileOutPath, productJson)

console.log(productsJson);
products.forEach((product) => console.log(product.name));
