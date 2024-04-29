import React from 'react';
import './App.css';
import {LoginCard} from "./LoginCard";
import {useLocalStorage} from "usehooks-ts";
import {Button, Typography} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";

function App() {

    const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);
    const queryClient = useQueryClient();

    const logout = async () => {
        await queryClient.setQueryData(["login"], false);
        setIsAuthenticated(false)
        window.location.reload();
    }

    return (
        <div className="App">
            {!isAuthenticated && <LoginCard></LoginCard>}
            {isAuthenticated &&
							<div>
								<Typography>
									Welcome, user
								</Typography>
								<Button onClick={logout}>Logout</Button>
							</div>
            }
        </div>
    );
}

export default App;
