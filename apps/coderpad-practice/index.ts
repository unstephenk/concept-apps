type User = {
    id: string;
    name: string;
    email: string;
};

const users: User[] = [
    { id: "u1", name: "Alice", email: "alice@test.com" },
    { id: "u2", name: "Bob", email: "bob@test.com" },
    { id: "u3", name: "Charlie", email: "alice@test.com" },
    { id: "u4", name: "Dana", email: "dana@test.com" },
    { id: "u5", name: "Eve", email: "bob@test.com" },
];

function findDuplicateEmails(users: User[]): string[] {

    let emailCounts: Record<string, number> = {}
    let duplicateEmails: string[] = [];

    for (const user of users) {
        const { id, name, email } = user

        emailCounts[email] = + 1
        console.log(`Added a duplicate email`)
    }

    for (const email in emailCounts) {
        if (emailCounts[email] > 1) {
            duplicateEmails.push(email);
        }
    }

    return duplicateEmails;

}


async function run() {
    console.log(findDuplicateEmails(users));

    // Wait for 1000 milliseconds (1 second)
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("1 second has passed!");
}

run();