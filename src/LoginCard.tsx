import {Alert, Button, Card, CircularProgress, Input, InputAdornment, Typography, useMediaQuery} from "@mui/material";
import {GradientDivider} from "./components/GradientDivider";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {Key} from "@mui/icons-material";
import React, {useState} from "react";
import {useLogin} from "./query-hooks/LoginHooks";

export const LoginCard = () => {

    const loginQuery = useLogin();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const isValidated = userName.length > 0 && password.length > 0;
    const shouldSpan = !useMediaQuery("(min-width:600px)");

    const handleSubmit = async () => {
        if (isValidated) await loginQuery.refetch();
    }

    return (
        <header className="App-login">
            <Card sx={{display: "flex", gap: 2, flexDirection: "column", padding: 3, width: shouldSpan ? "85%" : 400}}>
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
                    }} onChange={(event) => setUserName(event.target.value ?? "")} placeholder={"Username"}></Input>
                <Input
                    endAdornment={
                        <InputAdornment position="end">
                            <Key/>
                        </InputAdornment>
                    }
                    onKeyUp={(event) => {
                        if (event.key === "Enter") handleSubmit()
                    }} onChange={(event) => setPassword(event.target.value ?? "")} type={"password"} placeholder={"Password"}></Input>
                {loginQuery.isError && <Alert severity={"error"}>Invalid credentials</Alert>}
                <Button disabled={!isValidated} onClick={handleSubmit}>
                    {loginQuery.isLoading ? <CircularProgress size={20}/> : "Login"}
                </Button>
            </Card>
        </header>
    );
}