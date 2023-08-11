"use client";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import google from "../../public/icons8-logo-de-google-48.png";
import facebook from "../../public/icons8-facebook-nuevo-48.png";
import trello from "../../public/trello.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Formulario = () => {
  const [datos, setDatos] = useState({
    email: "",
    password: "",
  });
  const [alerta, setAlerta] = useState("")
  const router = useRouter();

  const handleInputChange = (e: any) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const enviarDatos = async (e: any) => {
    e.preventDefault();
  
    if ([datos.email, datos.password].includes("")) {
      setAlerta("Por favor llene todos los datos");
      return;
    }
  
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        datos
      );
      if (res.status === 201) {
        router.push("/tareas");
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        localStorage.setItem("jwt", res.data.token);
        localStorage.setItem("id", res.data.id);
      } else if (res.status === 401) {
        setAlerta("Datos incorrectos");
      } else {
        console.error("Respuesta no esperada:", res);
        setAlerta("Ocurrió un error en la solicitud");
      }
    } catch (error) {
      console.error("Datos incorrectos", error);
      setAlerta("Datos incorrectos");
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
        <div className="flex w-[24vw] h-[70vh] justify-center rounded-[20px] bg-white pt-12 shadow-2xl">
          <div className="flex h-[40vh] w-[20vw] flex-col gap-3">
            {alerta != "" && <h3 className="from-red-600 bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm">{alerta}</h3>}
            <h1 className="font-bold text-xl mb-5 text-center text-black">
              Login
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
              </div>
              <div className="flex flex-col">
                <button
                  type="submit"
                  className="bg-[#279574] text-white h-[5vh] rounded-xl"
                >
                  Enviar
                </button>
                <h2 className="text-slate-400 font-bold text-center my-5">
                  - O R -
                </h2>
                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex">
                    <div className="h-[40px] w-[100%] border-[2px] flex flex-nowrap justify-center">
                      <Link
                        href={"#"}
                        className="flex text-xs items-center text-black"
                      >
                        <Image
                          className="h-[30px] w-[30px] mr-2"
                          src={google}
                          alt="google"
                        />{" "}
                        Sign up with Google
                      </Link>
                    </div>
                  </div>
                  <div>
                    <div className="h-[40px] w-[100%] border-[2px] flex flex-nowrap justify-center">
                      <Link
                        href={"#"}
                        className="flex text-xs items-center text-black"
                      >
                        <Image
                          className="h-[30px] w-[30px] mr-2 "
                          src={facebook}
                          alt="google"
                        />
                        Sign up with Facebook
                      </Link>
                    </div>
                  </div>
                </div>
                <hr className="border-2 my-5"></hr>
                <Link className="text-[#279574] text-center" href={"#"}>
                  ¿Can't login?
                </Link>
                <Link
                  className="text-[#279574] text-center"
                  href={"http://localhost:3000/registrar"}
                >
                  ◦ Sign up to create an account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default function Login() {
  return <Formulario />;
}
