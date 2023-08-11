'use client'
import React, { Fragment, useState } from 'react'
import trello from "../../public/trello.svg";
import Image from "next/image";
import Link from 'next/link';
import google from "../../public/icons8-logo-de-google-48.png";
import facebook from "../../public/icons8-facebook-nuevo-48.png";
import axios from 'axios';

const page = () => {
    const [alerta,setAlerta]=useState("")
    const [stateAlerta,setStateAlerta] = useState(true)
    const [datos, setDatos] = useState({
        email: "",
        password: "",
        newPassword:""
      });
    
      const handleInputChange = (e: any) => {
        setDatos({
          ...datos,
          [e.target.name]: e.target.value,
        });
      };

      const enviarDatos = async (e: any) => {
        e.preventDefault();
      
        const id = localStorage.getItem('id'); 
      
        if ([datos.email, datos.password, datos.newPassword].includes("")) {
          setAlerta("Todos los campos deben estar llenos");
          setStateAlerta(false);
          return;
        }
      
        try {
          const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${id}/change-password`,
            datos
          );
      
          if (res.status === 200) {
            setAlerta("Contraseña cambiada con éxito");
            setStateAlerta(true); 
          }
      
          localStorage.clear();
      
        } catch (error) {
          console.error('Error al cambiar la contraseña:', error);
        }
      };

  return (
    <Fragment>
    <div className="flex flex-col items-center bg-[#f9fafc] w-[100vw] h-[100vh] pt-10">
      <div className="pb-10 flex justify-center text-center items-center gap-0">
        <Image
          className="h-[5vh] w-[4vw] fill-[#279574]"
          src={trello}
          alt="logo"
        />
        <h1 className="text-5xl font-bold text-black">Task</h1>
      </div>
      <div className="flex w-[24vw] h-[55vh] justify-center rounded-[20px] bg-white pt-12 shadow-2xl">
        <div className="flex h-[40vh] w-[20vw] flex-col gap-3">
          {alerta != "" && <h3 className={!setStateAlerta ?"from-red-600 bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm":"from-sky-600 bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm"}>{alerta}</h3> }
          <h1 className="font-bold text-xl mb-5 text-center text-black">
            Cambiar Password
          </h1>
          <form className="flex flex-col gap-3" onSubmit={enviarDatos}>
            {" "}
            <div className="w-[100%]">
              <input
                type="email"
                placeholder="Email Address"
                className="w-[100%]  mb-5 outline-none border-b-2 text-black"
                onChange={handleInputChange}
                name="email"
              ></input>
            </div>
            <div className="w-[100%]">
              <input
                type="password"
                placeholder="Password"
                className="w-[100%]  mb-5 outline-none border-b-2 text-black"
                onChange={handleInputChange}
                name="password"
              ></input>
                <input
                type="password"
                placeholder="New Password"
                className="w-[100%]  mb-5 outline-none border-b-2 text-black"
                onChange={handleInputChange}
                name="newPassword"
              ></input>
            </div>
            <div className="flex flex-col">
              <button
                type="submit"
                className="bg-[#279574] text-white h-[5vh] rounded-xl"
              >
                Cambiar Password
              </button>
              <hr className="border-2 my-5"></hr>
              <Link className="text-[#279574] text-center" href={"/login"}>
              Already have an account?
              </Link>
              <Link
                className="text-[#279574] text-center"
                href={"/registrar"}
              >
                ◦ Sign up to create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Fragment>
  )
}

export default page
