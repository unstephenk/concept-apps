import { useEffect, useState } from "react";
import type { User } from "../types/user";

const fetchUsers = async (): Promise<User[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: "u1", name: "Alice Johnson", email: "alice@test.com" },
                { id: "u2", name: "Bob Smith", email: "bob@test.com" },
                { id: "u3", name: "Charlie Davis", email: "charlie@test.com" },
            ]);
        }, 1000);
    });
};

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        const getUsers = async () => {
            setIsLoading(true);
            try {
                const data = await fetchUsers();
                setUsers(data);
                setIsError(false);

            } catch (err) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        getUsers();
    }, []);

    return { users, isLoading, isError };
}