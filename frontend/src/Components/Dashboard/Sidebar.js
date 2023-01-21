import {
  AttachMoney,
  Insights,
  ModeNight,
  Settings,
  Task,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Boards from "../TaskManager/Boards";
import MoneyManager from "../MoneyManager";
import HabitTracker from "../HabitTracker";
import Statistics from "../Statistic"
function Sidebar(props) {
  return (
    <Box flex={1} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <Typography variant="h6"  onClick={() => props.setContent(<Statistics />)}>
              Dashboard
            </Typography>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Task />
              </ListItemIcon>
              <ListItemText
                primary="Task Manager"
                onClick={() => props.setContent(<Boards />)}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Insights />
              </ListItemIcon>
              <ListItemText
                primary="Habit Tracker"
                onClick={() => props.setContent(<HabitTracker />)}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AttachMoney />
              </ListItemIcon>
              <ListItemText
                primary="Money Manager"
                onClick={() => props.setContent(<MoneyManager />)}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ModeNight />
              </ListItemIcon>
              <Switch
              // onChange={() => setMode(mode === "light" ? "dark" : "light")}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
