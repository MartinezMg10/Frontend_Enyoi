"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faEllipsisVertical,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Aside from "../components/Aside";
import EditarInfoModal from "../components/EditarInfoModal";
import { infoUser } from "../interfaces/infoUser";
import redirToLoginNoToken from "../components/redirToLginNoToken";
import trello from "../../public/trello.svg";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [info, setInfo] = useState<infoUser>({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
  });

  isAuthorized();

  useEffect(() => {
    traerDatos();

    let userInfo = localStorage.getItem("userInfo");
    userInfo = `${userInfo}`;
    setInfo(JSON.parse(userInfo));
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeTaskModal = () => {
    setShowModal(false);
  };

  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };

  const enviarDatos = async (e: any, datos: infoUser) => {
    e.preventDefault();

    const id = localStorage.getItem("id");
    console.log(id);

    const res = await axios.patch(
      `http://localhost:3001/api/auth/${id}`,
      datos
    );

    if (res.status === 200) {
      location.reload();
    }
  };
  const toggleSesion = () => {
    localStorage.clear();
    location.href = "http://localhost:3000/login";
  };

  const traerDatos = async () => {
    const res = await axios.get(
      "http://localhost:3001/api/auth/69593512-e5ce-4beb-8fcb-aaab9da58711"
    );
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  };

  function isAuthorized() {
    redirToLoginNoToken();
    return (
      <>
        <h1>hello this is protected</h1>
      </>
    );
  }

  return (
    <Fragment>
      <div className="">
        <div className="w-[100vw] border-2 flex flex-col">
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
          <div className="flex w-[100vw]">
            <div className="w-[15vw]">
              <Aside />
            </div>
            <div className="flex flex-col w-[85vw]  items-center pt-10 bg-slate-50">
              <div className="w-[45vw] rounded-lg bg-slate-100 p-5">
                <div className="text-xl">
                  <h3>Nombre</h3>
                  <p className="text-slate-700">{info.firstName}</p>
                </div>
                <div className="text-xl">
                  <h3>Apellido </h3>
                  <p className="text-slate-700">{info.lastName}</p>
                </div>
                <div className="text-xl">
                  <h3>Email </h3>
                  <p className="text-slate-700">{info.email}</p>
                </div>
                <div className="text-xl flex justify-between">
                  <h3>Cambiar Contraseña</h3>

                  <Link href="/cambiarPassword">
                    <FontAwesomeIcon
                      icon={faAngleRight}
                      className="cursor-pointer"
                    />
                  </Link>
                </div>
                <div className="text-xl flex justify-between">
                  <p className="">Editar</p>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="cursor-pointer"
                    onClick={openModal}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className={
            mostrarFormulario
              ? "bg-[#f1f5f9] flex flex-col gap-3 w-[15vw] fixed top-[10vh] left-[55vw] p-5 rounded-md"
              : "hidden"
          }
        ></div>
      </div>
      <EditarInfoModal
        enviarDatos={enviarDatos}
        isOpen={showModal}
        closeModal={closeTaskModal}
        user={info}
      />
    </Fragment>
  );
};

export default page;
