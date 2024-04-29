import {Box, Link} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

export const NavigationBar = () => {
    return (
        <div>
            <Box sx={{top: 0, left: 0, width: "100vw", height: "6vh", background: "black", position: "fixed", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Link component={RouterLink} to="/">Home</Link>
                <Link component={RouterLink} to="/search">Search</Link>
            </Box>
        </div>
    );
}