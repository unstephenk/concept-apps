type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
};

const products: Product[] = [
  { id: "p1", name: "Keyboard", category: "electronics", price: 100 },
  { id: "p2", name: "Mouse", category: "electronics", price: 50 },
  { id: "p3", name: "Shirt", category: "clothing", price: 25 },
  { id: "p4", name: "Jeans", category: "clothing", price: 75 },
  { id: "p5", name: "Apple", category: "grocery", price: 2 },
];


// Traverse the Products
// create a new temporary map
// add each item to the new map and use the category as the key
// return the values
// Now update the function so each category’s products are sorted from lowest price to highest price

function groupProductsByCategory(products: Product[]): Record<string, Product[]> {

  const productsByCategory: Record<string, Product[]> = {}

  for (const product of products) {
    const { category } = product;

    if (!productsByCategory[category]) {
      productsByCategory[category] = [];
    }

    productsByCategory[category].push(product)

  }

  for (const category in productsByCategory) {
    productsByCategory[category].sort((a,b) => a.price - b.price);
  }

  return productsByCategory
}

async function run() {
  console.log(groupProductsByCategory(products));

  // Wait for 1000 milliseconds (1 second)
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log("1 second has passed!");
}

run();
