import {useMutation} from "@tanstack/react-query";

export interface LoginCredentials {
    username: string;
    password: string;
}

export const useLogin = () => {

    return useMutation({
        mutationFn: (request: LoginCredentials) => {
            const encodedBody = `username=${encodeURIComponent(request.username)}&password=${encodeURIComponent(request.password)}`;
            const headers = {
                "Accept": "application/octet-stream",
                "Content-Type": "application/octet-stream",
            }

            return fetch("https://farragut.avereon.com/api/auth/login", {
                headers: headers,
                method: "POST",
                body: encodedBody
            })
        },
        retry: false,
    });
}
