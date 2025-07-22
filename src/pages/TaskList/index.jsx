import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import TaskCard from "../../components/ui/TaskCard";
import { deleteTask, fetchTasks } from "../../features/tasks/taskThunks";
import "./TaskList.css";

const TaskList = () => {
    const dispatch = useDispatch();
    const {list,loading} = useSelector(state => state.tasks);
    
    useEffect(()=>{
        dispatch(fetchTasks());
    },[dispatch])
    //handle delete
    const handleTaskDelete = async(taskId) => {
        const toastId = toast.loading("Deleting...", {
    position: "top-center",
    style: { color: "#4f46e5" },
  });

  try {
    const result = await dispatch(deleteTask(taskId)).unwrap();
    // Show success message
    toast.success(result?.message || "Task deleted successfully", {
      id: toastId,
      position: "top-center",
      style: { color: "green" },
    });
  } catch (error) {
    // Show error message
    toast.error(error?.message || "Failed to delete task", {
      id: toastId,
      position: "top-center",
      style: { color: "red" },
    });
  }
    
  };
    if(loading){
        return <p className="loading-spinner">loading...</p>
    }
    return (
        <div className="view-task-container">
            {list.length > 0 && list.map(singleList=> <TaskCard key={singleList?._id}
            task={singleList} handleTaskDelete={handleTaskDelete}></TaskCard>)}
        </div>
    );
};

export default TaskList;