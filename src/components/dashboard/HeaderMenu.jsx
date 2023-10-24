import "../Components.css";
import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import { logout } from "../../stores/logout";
import { selectedNavbarBtn } from "../../helpers/navbarHelper";

const pages = ["Play", "My Pokemon list", "All Pokemons"];
const settings = [
  "Play",
  "My Pokemon list",
  "All Pokemons",
  "Settings",
  "Logout",
];
const username = localStorage.getItem("username");

export default function HeaderMenu() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setSearchValue(window.location.search.slice(7));
  }, [window.location.search]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function goTo(option) {
    if (option === "Logout") {
      await logout(navigate);
      navigate("/login");
    } else {
      if (option === "Play") option = "dashboard";
      option = option.toLowerCase().replaceAll(" ", "-");
      navigate(`/${option}`);
    }
  }

  function logoClasses() {
    if (window.location.pathname !== "/dashboard")
      return "hover-pointer navbar-button";
    else return "hover-not-allowed";
  }

  function menuClasses(page) {
    if (!selectedNavbarBtn(page)) return "menu-btn";
  }

  function navbarClasses(page) {
    if (selectedNavbarBtn(page)) return "navbar-btn-underline";
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") searchPokemons();
  };

  function searchPokemons() {
    if (searchValue) navigate(`/search?value=${searchValue}`);
  }

  return (
    <AppBar position="absolute" className="header">
      {
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div
              className={`logo-div ${logoClasses()}`}
              onClick={() => goTo("dashboard")}
            >
              <div className="logo" />
            </div>
            <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => goTo(page)}
                  sx={{ my: 2 }}
                  className={`ml-1 mr-1 navbar-button ${navbarClasses(page)}`}
                  disabled={selectedNavbarBtn(page)}
                >
                  <Typography className="color-black">
                    <b>{page}</b>
                  </Typography>
                </Button>
              ))}
            </Box>
            <Box className="mr-1">
              <Input
                placeholder="Search Pokemons"
                value={searchValue}
                size="small"
                onChange={(value) => setSearchValue(value.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Box>
            <Box>
              <Tooltip title="Open menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={username?.toUpperCase()}
                    src="/static/images/avatar/2.jpg"
                    className="avatar"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((page) => (
                  <MenuItem key={page} onClick={() => goTo(page)}>
                    <Button
                      className={menuClasses(page)}
                      disabled={selectedNavbarBtn(page)}
                    >
                      {page}
                    </Button>
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
