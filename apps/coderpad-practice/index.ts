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

function groupProductsByCategory(products: Product[]): Record<string, Product[]> {

  const productsByCategory: Record<string, Product[]> = {}

  for (const product of products) {
    const { category } = product;

    if (!productsByCategory[category]) {
      productsByCategory[category] = [];
    }

    productsByCategory[category].push(product)

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


// Two things. First, I still need my reimbursement for the UTA Application Fee. Can you review my notes and let me know what else I could possibly do? I have contacted two different people from UTA and the receipts they gave me were denied. Second, Claire from my last chat recommended I go ahead and purchase the course and ask for reimbursement. How can I ensure that I will get reimbursed?