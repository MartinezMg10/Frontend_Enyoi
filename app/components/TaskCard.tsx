import React from "react";
import { Task } from "../interfaces/taskInterface";

interface TaskCardProps {
  task: Task;
  handleTaskClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, handleTaskClick }) => {
  return (
    <div className="w-[280px]" onClick={() => handleTaskClick(task)}>
      <div className="first:my-5 rounded-lg  bg-white shadow-[#364e7e1a] py-6 px-3 shadow-lg hover:text-green-500 cursor-pointer h-[10vh] w-[15vw]">
        <h3 className="font-bold text-base">{task.title}</h3>
        <p className="font-bold text-slate-600 text-sm">{task.description}</p>
      </div>
    </div>
  );
};

export default TaskCard;
