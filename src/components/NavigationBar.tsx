import {Avatar, Box, Button, SwipeableDrawer, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {Home, Logout, ManageAccountsRounded, Person, QuestionAnswer, Search, Upload} from "@mui/icons-material";
import {useLocalStorage} from "usehooks-ts";
import {useQueryClient} from "@tanstack/react-query";
import React, {useState} from "react";
import {GradientDivider} from "./GradientDivider";
import {ApplicationColors} from "../ApplicationColors";

export const NavigationBar = () => {
    const [, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);
    const queryClient = useQueryClient();
    const [showDrawer, setShowDrawer] = useState(false);
    const [username, ,deleteUsername] = useLocalStorage("username", localStorage.getItem("username") ?? "");

    const logout = async () => {
        queryClient.clear();
        setShowDrawer(false);
        deleteUsername();
        setIsAuthenticated(false);
    }

    const toggleDrawer = () => {
        setShowDrawer(!showDrawer);
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
                <Button component={RouterLink} to="/"><Home></Home>Home</Button>
                <Button component={RouterLink} to="/search"><Search></Search>Search</Button>
                <Box sx={{marginLeft: "auto"}}>
                    <Button variant={"outlined"} component={RouterLink} to="/upload"><Upload></Upload>Upload</Button>
                    <Button component={RouterLink} to="/about"><QuestionAnswer></QuestionAnswer> About</Button>
                    <Button onClick={toggleDrawer} color={"secondary"}><Avatar
                        sx={{background: `${ApplicationColors.secondary}`}}>{username[0]}</Avatar></Button>
                </Box>
            </Box>
            <SwipeableDrawer sx={{backdropFilter: "blur(1rem)"}} anchor={"right"} open={showDrawer} onOpen={() => setShowDrawer(true)} onClose={() => setShowDrawer(false)}>
                <GradientDivider></GradientDivider>
                <Box sx={{width: 300, display: "flex", alignItems: "center", gap: 2, justifyContent: "center"}}>
                    <Person color={"secondary"}></Person>
                    <Typography>{username}</Typography></Box>
                <GradientDivider></GradientDivider>
                <Button component={RouterLink} onClick={() => setShowDrawer(false)} to="/preferences" fullWidth={true} sx={{gap: 2}}><ManageAccountsRounded></ManageAccountsRounded>Preferences</Button>
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