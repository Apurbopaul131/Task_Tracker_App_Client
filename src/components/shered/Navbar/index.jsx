import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="task-container ">
      <div className="task-title">
        <h3>TaskTracker</h3>
      </div>

      <ul className="task-list">
        <li>Add Task</li>
        <li>Task</li>
      </ul>
    </div>
  );
};

export default Navbar;
