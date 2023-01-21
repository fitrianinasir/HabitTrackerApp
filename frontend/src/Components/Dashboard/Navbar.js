import { Mail, Notifications, Pets, Search } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import profile from '../../asset/profile.jpg'

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const SearchInput = styled("div")(({ theme }) => ({
  width: "30%",
  backgroundColor: "white",
  padding: "0 10px",
  color: "black",
  borderRadius: theme.shape.borderRadius,
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "white",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

function Navbar(props) {
  const [menu, setMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setMenu(true);
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{ display: { xs: "none", sm: "block" }, color: "white" }}
        >
          FTR
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" }, color: "white" }} />

        <SearchInput
          sx={{
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <Search
            sx={{
              display: { xs: "none", md: "block" },
              color: "lightgrey",
              marginTop: "3px",
            }}
          />
          <InputBase placeholder="Search.." />
        </SearchInput>
        <Icons>
          <Badge badgeContent={2} color="error">
            <Mail sx={{ color: "white" }} />
          </Badge>
          <Badge badgeContent={5} color="error">
            <Notifications sx={{ color: "white" }} />
          </Badge>
          <Avatar
            alt="User"
            src={profile}
            id="basic-button"
            aria-controls={menu ? "basic-menu" : undefined}
            aria-aria-haspopup="true"
            aria-aria-expanded={menu ? "true" : undefined}
            onClick={openMenu}
          />
        </Icons>
        <UserBox
          id="basic-button"
          aria-controls={menu ? "basic-menu" : undefined}
          aria-aria-haspopup="true"
          aria-aria-expanded={menu ? "true" : undefined}
          onClick={openMenu}
        >
          <Avatar alt="User" src={profile} />
          <Typography>Fitri</Typography>
        </UserBox>
        <Menu
          id="basic-menu"
          open={menu}
          onClose={() => setMenu(false)}
          MenuListProps={{ "aria-labelledby": "basic-button" }}
          anchorEl={anchorEl}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Log Out</MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
}

export default Navbar;
