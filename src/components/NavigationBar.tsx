import {Box} from "@mui/material";

export const NavigationBar = () => {
    return (
        <div>
            <Box sx={{top: 0, left: 0, width: "100vw", height: "6vh", background: "black", position: "fixed", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1>Navigation</h1>
            </Box>
        </div>
    );
}