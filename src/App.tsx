import React from 'react';
import './App.css';
import {LoginCard} from "./LoginCard";
import {useLocalStorage} from "usehooks-ts";
import {Button, Fade, Zoom} from "@mui/material";
import {useQueryClient} from "@tanstack/react-query";
import {Logout} from "@mui/icons-material";
import {TransitionGroup} from "react-transition-group";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {SearchPage} from "./pages/SearchPage";
import {NavigationBar} from "./components/NavigationBar";

function App() {

    const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);
    const queryClient = useQueryClient();

    const logout = async () => {
        queryClient.clear();
        setIsAuthenticated(false);
    }

    return (
        <div className="App">
            <Fade in={isAuthenticated}>
                <div><NavigationBar></NavigationBar></div>
            </Fade>
            <TransitionGroup>

                {!isAuthenticated && <Fade in={!isAuthenticated}>
									<div><LoginCard></LoginCard></div>
								</Fade>}
                {isAuthenticated &&

									<Zoom in={isAuthenticated}>
										<div>
                                          <Routes>
                                            <Route path="/" element={<HomePage/>}></Route>
                                            <Route path="/search" element={<SearchPage/>}></Route>
                                          </Routes>
											<Button onClick={logout}><Logout></Logout> Logout</Button>
										</div>
									</Zoom>
                }
            </TransitionGroup>
        </div>
    );
}

export default App;
