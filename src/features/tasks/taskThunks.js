import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://task-tracker-app-server.vercel.app/api/v1/task";

// Fetch all tasks
export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
  const res = await axios.get(BASE_URL);
  return res?.data;
});

// Fetch single task
export const fetchTask = createAsyncThunk("task/fetchTask", async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res?.data;
});
// Add a new task
export const addTask = createAsyncThunk("task/addTask", async (task) => {
  const res = await axios.post(BASE_URL, task);
  return res.data;
});

// Update task by ID
export const updateTask = createAsyncThunk("task/updateTask", async (task) => {
  const res = await axios.put(`${BASE_URL}/${task._id}`, task);
  return res.data;
});

// Delete task by ID
export const deleteTask = createAsyncThunk("task/deleteTask", async (id) => {
  console.log(id);
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return {
    ...res.data,
    id,
  };
});
