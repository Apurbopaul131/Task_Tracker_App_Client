import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddTask from "../pages/AddTask/AddTask";
import TaskList from "../pages/TaskList";
import UpdateTask from "../pages/UpdateTask";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>page not found</div>,
    children: [
      {
        index: true,
        element: <AddTask/>,
      },
      {
        path:"task-list",
        element: <TaskList/>
      },
      {
        path: "update/:id",
        element: <UpdateTask/>
      }
    ],
  },
]);
