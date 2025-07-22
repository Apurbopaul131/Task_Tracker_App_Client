import TaskForm from "../../components/shered/Navbar/TaskForm";

const AddTask = () => {
    return (
        <div>
            <TaskForm mode={"create"} defaultTask={null}/>
        </div>
    );
};

export default AddTask;