import "./Dashboard.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "@mui/icons-material/Link";
import { useNavigate } from "react-router-dom";
import { logout } from "../../stores/logout";

const pages = ["Play", "My Pokemon list", "All Pokemons"];
const settings = ["Play", "My Pokemon list", "All Pokemons", "Logout"];
const username = localStorage.getItem("username");

export default function HeaderMenu() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function goTo(option) {
    if (option === "Logout") {
      await logout(navigate);
      navigate("/login");
    } else {
      option = option.toLowerCase().replace(" ", "-");
      navigate(`/${option}`);
    }
  }

  return (
    <AppBar position="absolute" className="header">
      {
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div
              className="logo hover-pointer"
              onClick={() => goTo("dashboard")}
            />
            <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => goTo(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box>
              <Tooltip title="Open options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={username?.toUpperCase()}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((page) => (
                  <MenuItem key={page} onClick={() => goTo(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      }
    </AppBar>
  );
}
