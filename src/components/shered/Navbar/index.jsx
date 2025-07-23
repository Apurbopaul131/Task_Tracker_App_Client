import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="task-container ">
      <div className="task-title">
        <Link to={"/"}><h3>TaskTracker</h3></Link>
      </div>

      <ul className="task-list">
        <NavLink to={"/"} className={({isActive})=> isActive ? "active" : "inactive" }><li>
          Home
        </li></NavLink>
         <NavLink to={"/task-list"} className={({isActive})=> isActive ? "active" : "inactive" }><li>
           Task List
        </li></NavLink>
        {/* <Link to={"/task-list"}><li>
          Task List
        </li></Link> */}
      </ul>
    </div>
  );
};

export default Navbar;
