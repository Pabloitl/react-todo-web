import { Box, Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import api from "../utils/api";
import { useForm } from "react-hook-form";

const handleCreate = (task) => {
  return api.post("tasks/", task);
};

const handleUpdate = (task) => {
  return api.put(`tasks/${task.id}/`, task);
};

const submitMessages = {
  create: "Send",
  update: "Update",
};

const submitIcon = {
  create: <SendIcon />,
  update: <SyncAltIcon />,
};

const submitType = {
  create: "success",
  update: "primary",
};

const submitActions = {
  create: handleCreate,
  update: handleUpdate,
};

function Form({ type, task, updateList, onComplete = (f) => f }) {
  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      title: task?.title ?? "",
      due: task?.due ?? "",
      description: task?.description ?? "",
    },
  });

  const onSubmit = (data) => {
    reset();
    submitActions[type]({
      id: task?.id,
      title: data.title,
      due: data.due,
      description: data.description,
    }).then(updateList);
    onComplete();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ mt: 1, marginBottom: 2 }}
    >
      <TextField
        margin="normal"
        fullWidth
        label="Title"
        type="text"
          {...register("title", {required: true})}
      />
        <TextField margin="normal" fullWidth type="date" {...register("due", {required: true})} />
      <TextField
        margin="normal"
        fullWidth
        label="Description"
        type="text"
        multiline
        rows={3}
          {...register("description", {required: true})}
      />
      <Button
        type="submit"
        variant="contained"
        color={submitType[type]}
        fullWidth
        endIcon={submitIcon[type]}
      >
        {submitMessages[type]}
      </Button>
    </Box>
  );
}

export default Form;
