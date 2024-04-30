import {Avatar, Box, Button, SwipeableDrawer, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {Home, Logout, ManageAccountsRounded, MenuOutlined, Navigation, Person, QuestionAnswer, Search, Upload} from "@mui/icons-material";
import {useLocalStorage} from "usehooks-ts";
import {useQueryClient} from "@tanstack/react-query";
import React, {useState} from "react";
import {GradientDivider} from "./GradientDivider";
import {ApplicationColors} from "../ApplicationColors";
import {BrowserView, MobileView} from "react-device-detect";

export const NavigationBar = () => {
    const [, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);
    const queryClient = useQueryClient();
    const [showUserDrawer, setShowUserDrawer] = useState(false);
    const [showNavigationDrawer, setShowNavigationDrawer] = useState(false);
    const [username, , deleteUsername] = useLocalStorage("username", localStorage.getItem("username") ?? "");

    const logout = async () => {
        queryClient.clear();
        setShowUserDrawer(false);
        deleteUsername();
        setIsAuthenticated(false);
    }

    const toggleUserDrawer = () => {
        setShowUserDrawer(!showUserDrawer);
    }

    const toggleNavigationDrawer = () => {
        setShowNavigationDrawer(!showUserDrawer);
    }

    return (
        <div>
            <Box sx={{
                top: 0,
                left: 0,
                width: "100vw",
                height: 50,
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(1rem)",
                position: "fixed",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <BrowserView style={{
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: 50,
                    position: "fixed",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Button component={RouterLink} to="/"><Home></Home>Home</Button>
                    <Button component={RouterLink} to="/search"><Search></Search>Search</Button>
                    <Box sx={{marginLeft: "auto"}}>
                        <Button variant={"outlined"} component={RouterLink} to="/upload"><Upload></Upload>Upload</Button>
                        <Button component={RouterLink} to="/about"><QuestionAnswer></QuestionAnswer>About</Button>
                        <Button onClick={toggleUserDrawer} color={"secondary"}><Avatar
                            sx={{background: `${ApplicationColors.secondary}`}}>{username[0]}</Avatar></Button>
                    </Box>
                </BrowserView>

                <MobileView style={{
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: 50,
                    position: "fixed",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Button onClick={toggleNavigationDrawer}><MenuOutlined></MenuOutlined></Button>
                    <Button sx={{marginLeft: "auto"}} onClick={toggleUserDrawer} color={"secondary"}><Avatar
                        sx={{background: `${ApplicationColors.secondary}`}}>{username[0]}</Avatar></Button>

                    <SwipeableDrawer sx={{backdropFilter: "blur(1rem)"}} anchor={"left"} open={showNavigationDrawer} onOpen={() => setShowNavigationDrawer(true)}
                                     onClose={() => setShowNavigationDrawer(false)}>
                        <GradientDivider></GradientDivider>
                        <Box sx={{width: 300, display: "flex", alignItems: "center", gap: 2, justifyContent: "center"}}>
                            <Navigation color={"secondary"}></Navigation>
                            <Typography>Navigation</Typography></Box>
                        <GradientDivider></GradientDivider>
                        <Button onClick={() => setShowNavigationDrawer(false)} component={RouterLink} to="/"><Home></Home>Home</Button>
                        <GradientDivider></GradientDivider>
                        <Button onClick={() => setShowNavigationDrawer(false)} component={RouterLink} to="/search"><Search></Search>Search</Button>
                        <GradientDivider></GradientDivider>
                        <Button onClick={() => setShowNavigationDrawer(false)} component={RouterLink} to="/upload"><Upload></Upload>Upload</Button>
                        <GradientDivider></GradientDivider>
                        <Button onClick={() => setShowNavigationDrawer(false)} component={RouterLink} to="/about"><QuestionAnswer></QuestionAnswer>About</Button>
                        <GradientDivider></GradientDivider>

                    </SwipeableDrawer>


                </MobileView>
            </Box>

            <SwipeableDrawer sx={{backdropFilter: "blur(1rem)"}} anchor={"right"} open={showUserDrawer} onOpen={() => setShowUserDrawer(true)} onClose={() => setShowUserDrawer(false)}>
                <GradientDivider></GradientDivider>
                <Box sx={{width: 300, display: "flex", alignItems: "center", gap: 2, justifyContent: "center"}}>
                    <Person color={"secondary"}></Person>
                    <Typography>{username}</Typography></Box>
                <GradientDivider></GradientDivider>
                <Button component={RouterLink} onClick={() => setShowUserDrawer(false)} to="/userinformation" fullWidth={true}
                        sx={{gap: 2}}><ManageAccountsRounded></ManageAccountsRounded>Account</Button>
                <GradientDivider></GradientDivider>
                <Button component={RouterLink} onClick={() => setShowUserDrawer(false)} to="/preferences" fullWidth={true}
                        sx={{gap: 2}}><ManageAccountsRounded></ManageAccountsRounded>Preferences</Button>
                <GradientDivider></GradientDivider>
                <Box sx={{marginTop: "auto"}}>
                    <GradientDivider color={ApplicationColors.secondary}></GradientDivider>
                    <Button fullWidth={true} onClick={logout} color={"secondary"} sx={{gap: 2}}><Logout></Logout>Logout</Button>
                    <GradientDivider color={ApplicationColors.secondary}></GradientDivider>
                </Box>
            </SwipeableDrawer>
        </div>
    );
}