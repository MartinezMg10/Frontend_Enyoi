'use client'
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Task } from "../interfaces/taskInterface";

interface TaskCardProps {
  enviarDatos: (
    e: React.FormEvent<HTMLFormElement>,
    info: Task
  ) => Promise<void>;
  isOpen: boolean;
  closeModal: () => void;
  alerta: string;
}


const FormModal: React.FC<TaskCardProps> = ({
  enviarDatos,
  isOpen,
  closeModal,
  alerta,
}) => {
  const [info, setInfo] = useState({
    title: "",
    description: "",
    fecha: "",
    state: "Pendiente",
    prioridad: "Alta",
  });



  const handleInputChange = (e: any) => {
    setInfo({
      ...info,

      [e.target.name]: e.target.value,
    });
  };


  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar Tarea"
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
            height: "90vh",
          },
        }}
      >
        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => enviarDatos(e, info)}
        >
          {alerta != "" && <h3 className="from-red-600 bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm">{alerta}</h3>}
          <h3 className="text-2xl font-bold">Add New Task</h3>
          <label className="text-slate-400 font-bold" htmlFor="name">
            Task name
          </label>
          <input
            className="border-[1.5px] border-black p-[10px] rounded-lg font-bold"
            type="text"
            name="title"
            id=""
            placeholder="e.g name"
            onChange={handleInputChange}
            value={info.title}
          />
          <label className="text-slate-400 font-bold" htmlFor="name">
            Description
          </label>
          <textarea
            className="border-[1.5px] border-black p-[10px] rounded-lg font-bold"
            name="description"
            id=""
            cols={20}
            rows={5}
            placeholder="e,g lorem ipsum..."
            onChange={handleInputChange}
            value={info.description}
          ></textarea>
          <label className="text-slate-400 font-bold" htmlFor="state">
            Estado
          </label>
          <select
            className="h-[4vh] bg-white border-[1px] border-black rounded-md "
            name="state"
            onChange={handleInputChange}
            value={info.state}
          >
            <option value="Pendiente"> Pendiente</option>
            <option value="En Desarrollo"> En Desarollo</option>
            <option value="Completada"> Completada</option>
          </select>
          <label className="text-slate-400 font-bold" htmlFor="state">
            Prioridad
          </label>
          <select
            className="h-[4vh] bg-white border-[1px] border-black rounded-md"
            name="prioridad"
            onChange={handleInputChange}
            value={info.prioridad}
          >
            <option value="Alta"> Alta</option>
            <option value="Media"> Media</option>
            <option value="Baja"> Baja</option>
          </select>
          <label className="text-slate-400 font-bold" htmlFor="fecha">
            Fecha
          </label>
          <input
            className="border-[1.5px] p-[5px] border-black rounded-lg font-bold"
            type="text"
            name="fecha"
            placeholder="12/06/2003"
            onChange={handleInputChange}
            value={info.fecha}
          />
          <button
            className="bg-green-400 rounded-2xl w-[100%] h-[4vh] font-bold text-xl text-white text-center"
            type="submit"
          >
            Guardar
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default FormModal;
