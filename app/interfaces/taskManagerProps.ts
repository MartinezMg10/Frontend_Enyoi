import { Task } from "./taskInterface";

export interface TaskManagerProps{
    tasks: Task[];
    pendientes: Task[];
    desarrollo: Task[];
    completadas: Task[];
  };