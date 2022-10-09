import React, { useEffect, useState } from "react";
import WebPageView from "./WebPageView";
import MobilePageView from "./MobilePageView";
import Dashboard from "./Dashboard";
import Task from "@mui/icons-material/Task";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Insights from "@mui/icons-material/Insights";
import AttachMoney from "@mui/icons-material/AttachMoney";
import Toolbar from "@mui/material/Toolbar";
import Boards from "../TaskManager/Boards";
import MoneyManager from "../MoneyManager";
import HabitTracker from "../HabitTracker";
import Divider from "@mui/material/Divider";

function Container(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const [content, setContent] = useState();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    console.log("content changed");
  }, [content]);

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem
          key="Dashboard"
          onClick={() => setContent(<Dashboard />)}
          disablePadding
        >
          <ListItemButton>
            <h3>Dashboard</h3>
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem
          key="Task Manager"
          onClick={() => setContent(<Boards />)}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <Task />
            </ListItemIcon>
            <ListItemText primary="Task Manager" />
          </ListItemButton>
        </ListItem>
        <ListItem
          key="Habit Tracker"
          onClick={() => setContent(<HabitTracker />)}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <Insights />
            </ListItemIcon>
            <ListItemText primary="Habit Tracker" />
          </ListItemButton>
        </ListItem>
        <ListItem
          key="Money Manager"
          onClick={() => setContent(<MoneyManager />)}
          disablePadding
        >
          <ListItemButton>
            <ListItemIcon>
              <AttachMoney />
            </ListItemIcon>
            <ListItemText primary="Money Manager" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const isMobile = width <= 768;
  return (
    <div>
      {isMobile ? (
        <MobilePageView />
      ) : (
        <WebPageView drawer={drawer} content={content} />
      )}
    </div>
  );
}

export default Container;
