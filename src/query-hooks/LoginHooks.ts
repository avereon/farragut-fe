import {useQuery} from "@tanstack/react-query";

const succeedAfter = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(true), ms));

export const useLogin = () => {

    return useQuery({
        queryKey: ["login"],
        queryFn: () => succeedAfter(3000),
        retry: false,
        enabled: false,
    });
}
