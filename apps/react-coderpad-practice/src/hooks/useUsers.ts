import { useCallback, useEffect, useState } from "react";

import type { User } from "../types/user";

import { getUsers, createUser, deleteUser as deleteUserApi } from "../api/usersApi";


export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    const refetch = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);

        try {
            const data = await getUsers();
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

    const addUser = async (newUser: User) => {
        const createdUser = await createUser(newUser);
        
        setUsers((currentUserSet) => [...currentUserSet, createdUser])
    }

    const deleteUser = async (userId: string) => {
        await deleteUserApi(userId);

        setUsers((currentUserList) =>
            currentUserList.filter((user) => user.id !== userId)
        )


    };

    return { users, isLoading, isError, isEmpty, refetch, addUser, deleteUser };
}