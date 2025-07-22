import { createSlice } from "@reduxjs/toolkit";
import { addTask, deleteTask, fetchTasks, updateTask } from "./taskThunks";

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
      // FETCH
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
        console.log(action);
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
        const idx = state.list.findIndex((t) => t._id === action.payload._id);
        if (idx !== -1) state.list[idx] = action.payload;
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
