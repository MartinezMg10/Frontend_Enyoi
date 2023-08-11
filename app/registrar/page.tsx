"use client";
import { Fragment, useState } from "react";
import axios from "axios";
import Link from "next/link";
import google from "../../public/icons8-logo-de-google-48.png";
import facebook from "../../public/icons8-facebook-nuevo-48.png";
import trello from "../../public/trello.svg";
import Image from "next/image";
import Alerta from "../components/Alerta";

const Formulario = () => {
  const [datos, setDatos] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [alerta, setAlerta] = useState<{ error: boolean; msg: string }>({ error: false, msg: "" });
  const regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

  const handleInputChange = (e: any) => {
    setDatos({
      ...datos,

      [e.target.name]: e.target.value,
    });
  };

  const enviarDatos = (e: any) => {
    e.preventDefault();

    if (
      [datos.firstName, datos.email, datos.lastName, datos.password].includes(
        ""
      )
    ) {
      setAlerta({
        msg: "Todos los campos son requeridos",
        error: true,
      });
      return;
    }

    if (datos.password.length < 6) {
      setAlerta({
        msg: "El Password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }

    if (!regex.test(datos.password)) {
      setAlerta({
        msg: "El Password tiene que tener 1 mayuscula y un numero",
        error: true,
      });
      return;
    }

    axios
      .post("http://localhost:3001/api/auth/register", datos)

      .then(function (response) {
        console.log(response);
        if (response.status == 201) {
          setAlerta({
            msg: "usuario creado",
            error: false,
          });
          setDatos({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          });
        }
      })

      .catch(function (error) {
        console.log(error);
      });

    console.log(datos);
  };

  const { msg } = alerta;
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
        <div className="flex w-[24vw] h-[75vh] justify-center rounded-[20px] bg-white pt-12 shadow-2xl">
          <div className="flex h-[40vh] w-[20vw] flex-col gap-3">
            {msg && <Alerta alerta={alerta} />}
            <h1 className="font-bold text-xl  text-black">Create Account</h1>
            <div className="flex gap-2">
              <div className="h-[40px] w-[50%] border-[1.5px] flex flex-nowrap justify-center">
                <Link
                  href={"#"}
                  className="flex text-xs items-center  text-black"
                >
                  <Image
                    className="h-[30px] w-[30px] mr-2"
                    src={google}
                    alt="google"
                  />{" "}
                  Sign up with Google
                </Link>
              </div>
              <div className="h-[40px] w-[50%] border-[1.5px] flex flex-nowrap justify-center">
                <Link
                  href={"#"}
                  className="flex text-xs items-center  text-black"
                >
                  <Image
                    className="h-[30px] w-[30px] mr-2"
                    src={facebook}
                    alt="google"
                  />
                  Sign up with Facebook
                </Link>
              </div>
            </div>
            <div className="flex my-5 justify-center">
              <h2 className="text-slate-400 font-bold">- O R -</h2>
            </div>
            <form className="flex flex-col gap-3" onSubmit={enviarDatos}>
              {" "}
              <div className="w-[100%]">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-[100%] mb-5 outline-none border-b-2 text-black"
                  onChange={handleInputChange}
                  name="firstName"
                  value={datos.firstName}
                ></input>
              </div>
              <div className="w-[100%]">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-[100%]  mb-5 outline-none border-b-2 text-black"
                  onChange={handleInputChange}
                  name="lastName"
                  value={datos.lastName}
                ></input>
              </div>
              <div className="w-[100%]">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-[100%]  mb-5 outline-none border-b-2 text-black"
                  onChange={handleInputChange}
                  name="email"
                  value={datos.email}
                ></input>
              </div>
              <div className="w-[100%]">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-[100%]  mb-5 outline-none border-b-2 text-black"
                  onChange={handleInputChange}
                  name="password"
                  value={datos.password}
                ></input>
              </div>
              <div className="mb-2">
                <p className="text-sm">
                  By clicking Continue below, you agree to Atlassian's{" "}
                  <Link className="text-[#0052cc] underline" href={"#"}>
                    Atlassian Cloud Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link className="text-[#0052cc] underline" href={"#"}>
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-col">
                <button
                  type="submit"
                  className="bg-[#279574] text-white h-[5vh] rounded-xl"
                >
                  Enviar
                </button>
                <p className="text-slate-400 pt-3">
                  Already have an account?
                  <Link
                    className="text-[#279574]"
                    href={"/login"}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default function Registrar() {
  return <Formulario />;
}
