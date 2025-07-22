import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>page not found</div>,
    children: [
      {
        index: true,
        element: <div>Welcome to the Event Management Application</div>,
      },
      {
        path:"update",
        element: <div>update document</div>
      }
    ],
  },
]);
