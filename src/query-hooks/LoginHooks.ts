import {useState} from "react";
import {useQuery} from "@tanstack/react-query";

const failAfter = (ms: number) => new Promise((_, reject) => setTimeout(() => reject(), ms));

export const useLogin = () => {

    return useQuery({
        queryKey: ["login"],
        queryFn: () => failAfter(3000),
        retry: false,
        enabled: false,
    })

}