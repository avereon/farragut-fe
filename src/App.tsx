import {LoginCard} from "./LoginCard";
import {useLocalStorage} from "usehooks-ts";
import {Fade, Zoom} from "@mui/material";
import {TransitionGroup} from "react-transition-group";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {SearchPage} from "./pages/SearchPage";
import {NavigationBar} from "./components/NavigationBar";
import {About} from "./pages/About";
import {Preferences} from "./pages/Preferences";
import {UploadPage} from "./pages/UploadPage";
import {AccountPage} from "./pages/AccountPage";

function App() {

    const [isAuthenticated] = useLocalStorage("isAuthenticated", false);

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
												<Route path="/about" element={<About/>}></Route>
												<Route path="/preferences" element={<Preferences/>}></Route>
												<Route path="/userinformation" element={<AccountPage/>}></Route>
												<Route path="/upload" element={<UploadPage/>}></Route>
											</Routes>
										</div>
									</Zoom>
                }
            </TransitionGroup>
        </div>
    );
}

export default App;
