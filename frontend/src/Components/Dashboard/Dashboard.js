import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
function Dashboard(props) {
  const [content, setContent] = useState();
  return (
    <Box>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar setContent={setContent}/>
        <Content content={content} />
      </Stack>
    </Box>
  );
}

export default Dashboard;
