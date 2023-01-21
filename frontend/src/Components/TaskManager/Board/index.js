import React, { useEffect } from "react";
import Board from "react-trello";
import { useDispatch, useSelector } from "react-redux";
import {
  getLanes,
  createLane,
  deleteLane,
  updateLane,
  dragLane,
  addCard,
  deleteCard,
  updateCard,
  dragCard,
} from "../../../action/taskAction";
import "./index.css";

import AppBar from "@mui/material/AppBar";
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

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function BoardDetail(props) {
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const { getLaneList } = useSelector((state) => state.TaskReducer);
  // const [laneData, setLaneData] = useState(getLanes)
  useEffect(() => {
    dispatch(getLanes());
  }, [dispatch]);

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Task Manager
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          

            <Box sx={{ flexGrow: 0}}>
              <Tooltip title="Open settings" >
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"  />
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {getLaneList ? (
        <Board
          canAddLanes
          className="board_body"
          data={getLaneList}
          editLaneTitle
          editable
          draggable
          onCardAdd={function noRefCheck(card, laneId) {
            dispatch(addCard(laneId, card));
          }}
          onCardDelete={function noRefCheck(cardId, laneId) {
            dispatch(deleteCard(cardId, laneId));
          }}
          onCardUpdate={function noRefCheck(laneId, data) {
            updateCard(laneId, data);
          }}
          onLaneAdd={function noRefCheck(params) {
            dispatch(createLane(params));
          }}
          onLaneUpdate={function noRefCheck(laneId, data) {
            dispatch(updateLane(laneId, data));
          }}
          // onDataChange={(newData) => setLaneData(newData)}
          handleLaneDragEnd={(removedIndex, addedIndex) =>
            dragLane({ removedIndex, addedIndex })
          }
          handleDragEnd={(cardId, sourceLaneId, targetLaneId, position) => {
            dragCard({
              cardId: cardId,
              sourceLaneId: sourceLaneId,
              targetLaneId: targetLaneId,
              position: position,
            });
          }}
          onLaneDelete={(laneId) => dispatch(deleteLane(laneId))}
        />
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default BoardDetail;
