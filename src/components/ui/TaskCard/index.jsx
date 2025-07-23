import { Link } from "react-router-dom";
import "./TaskCard.css";
const TaskCard = ({ task, handleTaskDelete }) => {
  return (
    <div className="task-card">
      <h3 className="task-title">{task?.title}</h3>

      <p className="task-detail">
        <strong>Description:</strong> {task?.description}
      </p>
      <p className="task-detail">
        <strong>Priority:</strong> {task?.priority}
      </p>
      <p className="task-detail">
        <strong>Status:</strong> {task?.status}
      </p>

      <div className="task-actions">
        <button
          className="btn delete"
          onClick={() => handleTaskDelete(task?._id)}
        >
          Delete
        </button>
        <Link to={`/update/${task?._id}`}><button className="btn edit">Edit</button></Link>
      </div>
    </div>
  );
};

export default TaskCard;
