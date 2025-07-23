import { createSlice } from "@reduxjs/toolkit";
import {
  addTask,
  deleteTask,
  fetchTask,
  fetchTasks,
  updateTask,
} from "./taskThunks";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    statusCode: null,
    loading: false,
    message: null,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch All Task
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const { message, data, statusCode } = action.payload;
        state.loading = false;
        state.list = data;
        state.message = message;
        state.statusCode = statusCode;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.statusCode = 404;
      })

      //Fetch single Task
      .addCase(fetchTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        const { data, message, statusCode } = action.payload;
        state.list = data;
        (state.message = message), (state.statusCode = statusCode);
        state.loading = false;
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.statusCode = 404;
      })
      // ADD
      .addCase(addTask.fulfilled, (state, action) => {
        const { data, message, statusCode } = action.payload;
        state.list.push(data);
        state.message = message;
        state.statusCode = statusCode;
      })

      // UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        console.log(action.payload);
        state.list = action.payload.data;
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
        // const idx = state.list.findIndex((t) => t._id === action.payload._id);
        // if (idx !== -1) state.list[idx] = action.payload;
      })

      // DELETE
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { message, id, statusCode } = action.payload;
        console.log("from slice", statusCode);
        state.list = state.list.filter((t) => t._id !== id);
        state.message = message;
        state.statusCode = statusCode;
      });
  },
});

export default taskSlice.reducer;
