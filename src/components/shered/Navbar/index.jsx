import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="task-container ">
      <div className="task-title">
        <Link to={"/"}><h3>TaskTracker</h3></Link>
      </div>

      <ul className="task-list">
        <Link to={"/"}><li>
          Home
        </li></Link>
        <Link to={"/task-list"}><li>
          Task List
        </li></Link>
      </ul>
    </div>
  );
};

export default Navbar;
