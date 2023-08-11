"use client";
import React, { Fragment, useState } from "react";
import Modal from "react-modal";
import { Task } from "../interfaces/taskInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import FormModal from "./FormModal";
import axios from "axios";

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  closeModal: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, closeModal }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alerta, setAlerta] = useState("");

  let prioridad = "bg-sky-400 text-white";

  if (task?.prioridad === "Alta") {
    prioridad = "bg-red-400 text-white";
  } else if (task?.prioridad === "Baja") {
    prioridad = "bg-green-400 text-white";
  }

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeTaskModal = () => {
    setShowModal(false);
  };

  const enviarDatos = async (e: any, info: Task) => {
    e.preventDefault();

    if([info.title, info.description, info.fecha, info.state,info.prioridad].includes(
      ""
    )){
      setAlerta("Datos invalido, Porfavor llene todos los datos")
      return
    }


    const res = await axios.patch(
      `http://localhost:3001/api/task/${task.id}`,
      info
    );



    if (res.status === 200) {
      location.reload();
    }
  };

  const deleteTask = async () => {
    const res = await axios.delete(`http://localhost:3001/api/task/${task.id}`);

    if (res.status === 200) {
      location.reload();
    }
  };

  return (
    <Fragment>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Tarea Detallada"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "20px",
            width: "25vw",
            height: "55vh",
          },
        }}
      >
        {task && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold mb-5">{task.title}</h2>
              <FontAwesomeIcon
                className=" h-[3vh]"
                icon={faEllipsisVertical}
                onClick={toggleOptions}
              />
              {showOptions && (
                <div className="absolute flex flex-col top-[4vh] right-0 bg-white border rounded-xl my-8 h-[8vh] w-[10vw] pl-5">
                  <button className=" h-[4vh] text-left" onClick={openModal}>
                    Editar
                  </button>
                  <button
                    className=" text-red-600 text-left"
                    onClick={deleteTask}
                  >
                    Eliminar Tarea
                  </button>
                </div>
              )}
            </div>
            <p className="mb-5">{task.description}</p>
            <label className="text-slate-400 font-bold" htmlFor="state">
              Estado
            </label>
            <div className="h-[5vh] bg-slate-100 p-2 font-bold">
              <h3>{task.state}</h3>
            </div>
            <label className="text-slate-400 font-bold" htmlFor="prioridad">
              Prioridad
            </label>
            <div className={`h-[5vh] p-2 font-bold ${prioridad}`}>
              <h3>{task.prioridad}</h3>
            </div>
            <label className="text-slate-400 font-bold">
              Fecha
            </label>
            <div className="h-[5vh] p-2 font-bold ">
              <h3>{task.fecha}</h3>
            </div>
          </div>
        )}
      </Modal>
      <FormModal
        enviarDatos={enviarDatos}
        isOpen={showModal}
        closeModal={closeTaskModal}
        alerta={alerta}
      />
    </Fragment>
  );
};

export default TaskModal;
