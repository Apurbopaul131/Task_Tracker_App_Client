import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TaskForm from "../../components/shered/Navbar/TaskForm";
import { fetchTask } from "../../features/tasks/taskThunks";

const UpdateTask = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {list,loading} = useSelector(state => state.tasks);
    console.log(list);
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(fetchTask(id));
    },[dispatch,id])
    if(loading){
        return <p className="loading-spinner">loading...</p>
    }
    return (
        <div>
            {
                !loading && <TaskForm mode={"edit"} defaultTask={list} onSucess={()=>navigate("/task-list")}></TaskForm>
            }
        </div>
    );
};

export default UpdateTask;