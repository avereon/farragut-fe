import {Alert, Button, Card, CircularProgress, Input, InputAdornment, Typography, useMediaQuery} from "@mui/material";
import {GradientDivider} from "./components/GradientDivider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {Key} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useLogin} from "./query-hooks/LoginHooks";
import {useLocalStorage} from "usehooks-ts";

export const LoginCard = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const loginMutation = useLogin();
    const isValidated = username.trim().length > 0 && password.trim().length > 0;
    const shouldSpan = !useMediaQuery("(min-width:600px)");
    const [, setIsAuthenticated] = useLocalStorage("isAuthenticated", localStorage.getItem("isAuthenticated") ?? false);
    const [, setDisplayName] = useLocalStorage("username", localStorage.getItem("username") ?? false);
    const authed = loginMutation.isSuccess && loginMutation.data;

    const handleSubmit = async () => {
        if (isValidated) {
            loginMutation.mutate({username, password});
            setDisplayName(username);
        }
    }

    useEffect(() => {
        if (authed) setIsAuthenticated(true);
    }, [authed, setIsAuthenticated]);

    return (
        <Card sx={{transform: "translate(-50%, -50%)", left: "50%", top: "50%", position: "fixed", display: "flex", gap: 2, flexDirection: "column", padding: 3, width: shouldSpan ? "85%" : 400}}>
            <Typography>Login to your account</Typography>
            <GradientDivider></GradientDivider>
            <Input
                endAdornment={
                    <InputAdornment position="end">
                        <AccountCircle/>
                    </InputAdornment>
                }
                onKeyUp={(event) => {
                    if (event.key === "Enter") handleSubmit()
                }} onChange={(event) => setUsername(event.target.value ?? "")} placeholder={"Username"}></Input>
            <Input
                endAdornment={
                    <InputAdornment position="end">
                        <Key/>
                    </InputAdornment>
                }
                onKeyUp={(event) => {
                    if (event.key === "Enter") handleSubmit()
                }} onChange={(event) => setPassword(event.target.value ?? "")} type={"password"} placeholder={"Password"}></Input>
            {loginMutation.isError && <Alert severity={"error"}>Invalid credentials</Alert>}
            <Button disabled={!isValidated} onClick={handleSubmit}>
                {loginMutation.isPending ? <CircularProgress size={20}/> : "Login"}
            </Button>
        </Card>
    );
}