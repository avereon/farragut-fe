import {useQuery} from "@tanstack/react-query";

const succeedAfter = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(true), ms));

export const useLogin = (username: string, password: string) => {

    const query = useQuery({
        queryKey: ["login"],
        queryFn: () => succeedAfter(3000),
        retry: false,
        enabled: false,
    });

    const login = async () => {
        await query.refetch();
    }

    if (query.status === "success") localStorage.setItem("username", username);

    return [query, login] as const;
}

export const useUsername = () => {
    return localStorage.getItem("username");
}