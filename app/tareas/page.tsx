"use client";
import React, { Fragment, useEffect, useState } from "react";
import Aside from "../components/Aside";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import { Task } from "../interfaces/taskInterface";
import TaskModal from "../components/TaskModal";
import FormModal from "../components/FormModal";
import redirToLoginNoToken from "../components/redirToLginNoToken";
import Image from "next/image";
import trello from "../../public/trello.svg";

const page = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filterBy, setFilterBy] = useState("");
  const [alerta, setAlerta] = useState("");
  const [info, setInfo] = useState({
    title: "",
    description: "",
    fecha: "",
    state: "Pendiente",
    prioridad: "Alta",
  });

  const filteredTasks = tasks.filter((task) => {
    if (filterBy === "fecha") {
      let filteredResult = tasks.sort((a: Task, b: Task) =>
        a.fecha.localeCompare(b.fecha)
      );
      console.log(filteredResult);
    } else if (filterBy === "prioridad") {
    } else if (filterBy === "estado") {
      // Filtrar por estado
      // Implementa tu lógica aquí
    }
    return true;
  });

  isAuthorized();

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const closeTaskModal = () => {
    setSelectedTask(null);
    setShowTaskModal(false);
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleSesion = () => {
    localStorage.clear();
    location.href = "http://localhost:3000/login";
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const enviarDatos = async (e: any, info: Task) => {
    e.preventDefault();

    if (
      [info.title, info.description, info.fecha, info.state,info.prioridad].includes(
        ""
      )
    ) {
      setAlerta("Todos los campos deben estar Llenos")
      return;
    }


    const token = localStorage.getItem("jwt");

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/task`,
      info,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 201) {
      location.reload();
    }
  };

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("jwt");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/task/getallbyuser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  function isAuthorized() {
    redirToLoginNoToken();
    return (
      <>
        <h1>hello this is protected</h1>
      </>
    );
  }
  const completadas: Task[] = [];
  const desarrollo: Task[] = [];
  const pendientes: Task[] = [];

  function taskManager() {
    tasks.forEach((task: Task) => {
      switch (task.state) {
        case "Completada":
          completadas.push(task);
          break;
        case "En Desarrollo":
          desarrollo.push(task);
          break;
        case "Pendiente":
          pendientes.push(task);
          break;
        default:
          console.warn(`Estado desconocido para la tarea: ${task.state}`);
      }
    });
  }

  taskManager();


  return (
    <div className="w-[100vw] flex">
      <div>
        <div className="h-[10vh] w-[100vw] p-5 flex justify-between">
          <div className="flex justify-center text-center items-center gap-2">
            <Image
              className="h-[5vh] w-[4vw] fill-[#279574]"
              src={trello}
              alt="logo"
            />
            <h1 className="text-3xl font-bold text-black">Task</h1>
          </div>
          <div>
            <h2 className="text-4xl font-bold">Plataforma...</h2>
          </div>
          <div className="flex gap-5">
            <button
              className="bg-green-400 rounded-2xl w-[10vw] h-[5vh] font-bold text-xl text-white"
              onClick={openModal}
            >
              + Add new task
            </button>
            <div>
              <FontAwesomeIcon
                className="cursor-pointer h-6"
                icon={faEllipsisVertical}
                onClick={toggleOptions}
              />
              {showOptions && (
                <div className="absolute flex flex-col top-[4vh] right-0 bg-white border rounded-xl my-5 h-[8vh] w-[10vw] pl-5">
                  <button className=" h-[4vh] text-left">Ayuda</button>
                  <button
                    className=" text-red-600 text-left"
                    onClick={toggleSesion}
                  >
                    Cerrar Sesion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="min-h-screen w-[100vw] flex">
          <Aside />
          <div className="flex gap-20">
            <div className="min-h-[90vh] w-[85vw] bg-green-100 flex p-10 gap-20">

              <div className="">
              <select
              className="w-[15vw] h-[4vh] bg-white rounded-md p-2"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="fecha">Fecha</option>
              <option value="prioridad">Prioridad</option>
              <option value="estado">Estado</option>
            </select>
                <p className="text-xl font-bold flex items-center gap-2 mt-[2vh]">
                  <div className="rounded-full w-4 h-4 bg-red-500 "></div>
                  Pendiente
                </p>
                {pendientes.map((task: Task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    handleTaskClick={handleTaskClick}
                  />
                ))}
              </div>
              <div className="">
                <p className="text-xl font-bold flex items-center gap-2 mt-[6vh]">
                  <div className="rounded-full w-4 h-4 bg-sky-500 "></div>En
                  desarollo
                </p>
                {desarrollo.map((task: Task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    handleTaskClick={handleTaskClick}
                  />
                ))}
              </div>
              <div className="">
                <p className="text-xl font-bold flex items-center gap-2 mt-[6vh]">
                  <div className="rounded-full w-4 h-4 bg-green-500 "></div>
                  Completada
                </p>
                {completadas.map((task: Task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    handleTaskClick={handleTaskClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <TaskModal
        task={selectedTask}
        isOpen={showTaskModal}
        closeModal={closeTaskModal}
      />
      <FormModal
        enviarDatos={enviarDatos}
        isOpen={showModal}
        closeModal={closeModal}
        alerta={alerta}
      />
    </div>
  );
};

export default page;
