import "./App.css";
import { useState, useEffect } from "react";
import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import Form from "./components/Form";
import TasksList from "./components/List";
import api from "./utils/api";
import AssignmentIcon from "@mui/icons-material/Assignment";

function App() {
  const [tasks, setTasks] = useState([]);

  const populateList = () => {
    api
      .get("tasks/")
      .then(({ data }) => setTasks(data))
      .catch();
  };

  useEffect(() => {
    populateList();
  }, []);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={3} sx={{ padding: 5 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="h1" variant="h5" align="center">
              Create new task
            </Typography>
            <AssignmentIcon color="primary" />
          </Box>
          <Form type="create" updateList={populateList} />

          <Divider>
            <Chip label="TODO" />
          </Divider>

          <TasksList tasks={tasks} updateList={populateList} />
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
