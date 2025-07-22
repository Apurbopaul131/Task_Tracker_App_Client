import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import z from "zod";
import { addTask, updateTask } from "../../../../features/tasks/taskThunks";
import { isoForInput } from "../../../../uitls/isoFormat";
import "./TaskForm.css";

//validation schmea
const TaskValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((value) => new Date(value) > new Date(), {
      message: "Due date must be in the future",
    }),
  status: z.enum(["Pending", "Completed"]),
  priority: z.enum(["Low", "Medium", "High"]),
});

const TaskForm = ({ mode,defaultTask, onSucess }) => {
    const isEdit = mode === "edit";
    const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(TaskValidationSchema),
    defaultValues: isEdit ? {
      title: defaultTask?.title,
      description: defaultTask?.description,
      dueDate: defaultTask?.dueDate ? isoForInput(new Date(defaultTask.dueDate)) : null,
      status: defaultTask?.status,
      priority: defaultTask?.priority,
    }:{
      title: "",
      description: "",
      dueDate: "",
      status: "Pending",
      priority: "Medium",
    },
  });

  const onSubmit = async(data) => {
    
    const toastId = toast.loading(isEdit ? "Updating Task..": "Creating Task...", {
      position: "top-center",
      style: {
        color:"#4f46e5"
      }
    });
    try{
        
      if(isEdit){
         const res = await dispatch(updateTask({ _id:defaultTask?._id, ...data })).unwrap();
         toast.success(res?.message, {id:toastId,position:"top-center",style:{
            color:"green"
         }})
      }
      else{
        
        const res = await dispatch(addTask(data)).unwrap();
         toast.success(res?.message, {id:toastId,position:"top-center",style:{
            color:"green"
         }})
      }
      //reset form
      reset({
      title: "",
      description: "",
      dueDate: "",
      status: "Pending",
      priority: "Medium",
    });
    onSucess?.() //callbak to access parent
    }
    catch(error){
        console.log(error);
        toast.error("Falid to add Task", {
        id: toastId,
        position: "top-center",
        style: { color: "red" },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-form">
      <h2>{isEdit ? "Update Task" : "Add New Task"}</h2>

      <div className="form-group">
        <label>Title</label>
        <input type="text" {...register("title")} />
        {errors.title && <p className="error">{errors.title.message}</p>}
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea rows={4} {...register("description")} />
        {errors.description && <p className="error">{errors.description.message}</p>}
      </div>

      <div className="form-group">
        <label>Due Date</label>
        <input type="datetime-local" {...register("dueDate")} />
        {errors.dueDate && <p className="error">{errors.dueDate.message}</p>}
      </div>

      <div className="form-group">
        <label>Status</label>
        <select {...register("status")}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select {...register("priority")}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        {isEdit ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;