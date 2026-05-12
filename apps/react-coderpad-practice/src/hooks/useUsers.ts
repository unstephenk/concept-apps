import { useCallback, useEffect, useState } from "react";
import type { User } from "../types/user";

const fetchUsers = async (): Promise<User[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                // { id: "u1", name: "Alice Johnson", email: "alice@test.com" },
                // { id: "u2", name: "Bob Smith", email: "bob@test.com" },
                // { id: "u3", name: "Charlie Davis", email: "charlie@test.com" },
            ]);
        }, 1000);
    });
};

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const refetch = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);

        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch (err) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const isEmpty = users.length === 0;

    return { users, isLoading, isError, isEmpty, refetch };
}