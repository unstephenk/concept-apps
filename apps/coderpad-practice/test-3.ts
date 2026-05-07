type ActivityEvent = {
    id: string;
    userId: string;
    type: "login" | "logout" | "purchase" | "page_view";
    timestamp: string;
};

const events: ActivityEvent[] = [
    {
        id: "e1",
        userId: "u1",
        type: "login",
        timestamp: "2026-05-01T10:00:00Z",
    },
    {
        id: "e2",
        userId: "u2",
        type: "page_view",
        timestamp: "2026-05-01T10:05:00Z",
    },
    {
        id: "e3",
        userId: "u1",
        type: "purchase",
        timestamp: "2026-05-01T10:10:00Z",
    },
    {
        id: "e4",
        userId: "u2",
        type: "logout",
        timestamp: "2026-05-01T10:03:00Z",
    },
];

function getMostRecentActivityByUser(events: ActivityEvent[]): ActivityEvent[] {
    // create a new user map
    // add the userID as the key
    // compare the existing timestamp
    // if the new timestamp is more recent, replace the timestamp field for that user

    const latestByUser: Record<string, ActivityEvent> = {}

    for (let userEvent of events) {
        const { userId } = userEvent;

        if (!latestByUser[userId]) {
            latestByUser[userId] = userEvent
            continue;
        }

        const currentTime = new Date(userEvent.timestamp).getTime();
        const savedEvent = latestByUser[userId];
        const savedTime = new Date(savedEvent.timestamp).getTime();

        if (currentTime > savedTime) {
            latestByUser[userId].timestamp = userEvent.timestamp
        }
    }


    return Object.values(latestByUser);
}

async function run() {
    console.log(getMostRecentActivityByUser(events));

    // Wait for 1000 milliseconds (1 second)
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("1 second has passed!");
}

run();