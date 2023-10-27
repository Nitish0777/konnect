import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {auth?.user ? (
          <IconButton onClick={() => setAuth(false)}>
            <Link
              style={{
                backgroundColor: "#4cceac",
                textDecoration: "none",
                padding: "6px ",
                borderRadius: "10px",
                color: "white",
              }}
              to="/"
            >
              Logout
            </Link>
          </IconButton>
        ) : (
          <>
            <IconButton>
              <Link
                style={{
                  backgroundColor: "#4cceac",
                  textDecoration: "none",
                  padding: "6px ",
                  borderRadius: "10px",
                  color: "white",
                }}
                to={"/signup"}
              >
                Sign Up
              </Link>
            </IconButton>
            <IconButton>
              <Link
                style={{
                  backgroundColor: "#4cceac",
                  textDecoration: "none",
                  padding: "6px ",
                  borderRadius: "10px",
                  color: "white",
                }}
                to={"/signin"}
              >
                Sign In
              </Link>
            </IconButton>
          </>
        )}

        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <Link to="/contacts" style={{ color: "white", marginTop: "3px" }}>
            <NotificationsOutlinedIcon />
          </Link>
        </IconButton>
        <IconButton>
          <Link to="/team" style={{ color: "white", marginTop: "3px" }}>
            <SettingsOutlinedIcon />
          </Link>
        </IconButton>
        <IconButton>
          <Link to="/form" style={{ color: "white", marginTop: "3px" }}>
            <PersonOutlinedIcon />
          </Link>
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;