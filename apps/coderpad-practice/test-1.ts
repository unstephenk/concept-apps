// Nice. Now imagine some orders have invalid totals, like 0, negative numbers, or NaN. How would you update your function to ignore invalid orders?
// Good. Now add one more requirement: return the customer summaries sorted by totalSpent from highest to lowest.

type Order = {
    id: string;
    customerId: string;
    total: number;
};

type CustomerSummary = {
    customerId: string;
    orderCount: number;
    totalSpent: number;
};

const orders: Order[] = [
    { id: "o1", customerId: "c1", total: 25 },
    { id: "o2", customerId: "c2", total: 50 },
    { id: "o3", customerId: "c1", total: 75 },
    { id: "o3", customerId: "c1", total: NaN },
    { id: "o3", customerId: "c1", total: -100 },
    { id: "o3", customerId: "c1", total: 0 },
    { id: "o4", customerId: "c1", total: 100 },
    { id: "o4", customerId: "c1", total: 200 },
    { id: "o4", customerId: "c1", total: 50 },
];


function summarizeOrdersByCustomer(orders: Order[]): CustomerSummary[] {

    let tempMap: Record<string, CustomerSummary> = {}

    for (const order of orders) {
        const { customerId, total } = order

        if (!Number.isFinite(total) || total <= 0) {
            console.log(`total: ${total} was skipped`)
            continue;
        }

        if (!tempMap[customerId]) {
            // Initialize the summary for this customer
            tempMap[customerId] = {
                customerId,
                orderCount: 0,
                totalSpent: 0
            };
        }

        tempMap[customerId].orderCount += 1;
        tempMap[customerId].totalSpent += total;

    }

    return Object.values(tempMap).sort((a,b) => b.totalSpent - a.totalSpent)

}

async function run() {
    console.log(summarizeOrdersByCustomer(orders));

    // Wait for 1000 milliseconds (1 second)
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("1 second has passed!");
}

run();