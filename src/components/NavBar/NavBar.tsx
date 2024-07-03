import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static" sx={{mb: 2}}>
      <Toolbar>
        <Typography component={NavLink} to={'/'} variant="h6" sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}>
          Quotes Central
        </Typography>

        <Button component={NavLink} to="/" color="inherit">Quotes</Button>
        <Button component={NavLink} to="/new-quote" color="inherit">Submit new quote</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;