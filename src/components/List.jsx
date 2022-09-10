import api from "../utils/api";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import Form from "./Form";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WarningIcon from "@mui/icons-material/Warning";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

function TasksList({ tasks, updateList = (f) => f }) {
  const [selectedId, setSelectedId] = useState(-1);
  const handleDelete = (id) => () => {
    api.delete(`tasks/${id}`).then(() => updateList());
  };

  const clearSelection = () => setSelectedId(-1);

  const handleSelection = (id) => () => {
    if (selectedId === id) {
      clearSelection();
      return;
    }

    setSelectedId(id);
  };

  return (
    <List>
      {tasks.map((task) => (
        <Card variant="outlined" key={task.id}>
          <ListItem onClick={handleSelection(task.id)} button>
            <ListItemAvatar>
              {task.delayed ? (
                <WarningIcon color="warning" />
              ) : (
                <AccessTimeIcon color="primary" />
              )}
            </ListItemAvatar>
            <ListItemText primary={task.title} secondary={task.due} />
            <ListItemSecondaryAction>
              <Button onClick={handleDelete(task.id)}>
                <DeleteIcon color="error" />
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          {selectedId === task.id && (
            <Box sx={{ padding: 5 }}>
              <Form
                type="update"
                task={task}
                updateList={updateList}
                onComplete={clearSelection}
              />
            </Box>
          )}
        </Card>
      ))}
    </List>
  );
}

export default TasksList;
