'use client'
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { infoUser } from "../interfaces/infoUser";

interface TaskCardProps {
  enviarDatos: (
    e: React.FormEvent<HTMLFormElement>,
    info: infoUser
  ) => Promise<void>;
  isOpen: boolean;
  closeModal: () => void;
  user: infoUser;
}

const EditarInfoModal: React.FC<TaskCardProps> = ({
  enviarDatos,
  isOpen,
  closeModal,
  user,
}) => {
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });

  const handleInputChange = (e: any) => {
    setInfo({
      ...info,

      [e.target.name]: e.target.value,
    });
  };

/*   useEffect(() => {
    if (user) {
      setInfo(user);
    }
  }, [user]);
 */
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
          <h3 className="text-2xl font-bold">Editar informacion personal</h3>
          <label className="text-slate-400 font-bold" htmlFor="name">
            First Name
          </label>
          <input
            className="border-[1.5px] border-black p-[10px] rounded-lg font-bold"
            type="text"
            name="firstName"
            id=""
            placeholder="e.g name"
            onChange={handleInputChange}
            /* value={user.firstName} */
          />
          <label className="text-slate-400 font-bold" htmlFor="name">
            Last Name
          </label>
          <input
            className="border-[1.5px] border-black p-[10px] rounded-lg font-bold"
            type="text"
            name="lastName"
            id=""
            placeholder="e.g name"
            onChange={handleInputChange}
            /* value={user.lastName} */
          />
          <label className="text-slate-400 font-bold" htmlFor="state">
            Email
          </label>
          <input
            className="border-[1.5px] border-black p-[10px] rounded-lg font-bold"
            type="text"
            name="email"
            id=""
            placeholder="e.g name"
            onChange={handleInputChange}
            /* value={user.email} */
          />
          <label className="text-slate-400 font-bold" htmlFor="state">
            Image
          </label>
          <input
            className="border-[1.5px] border-black p-[10px] rounded-lg font-bold"
            type="text"
            name="image"
            id=""
            placeholder="e.g name"
            onChange={handleInputChange}
            /* value={user.image} */
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

export default EditarInfoModal;
