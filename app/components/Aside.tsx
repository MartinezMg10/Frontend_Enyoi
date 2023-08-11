"use client";
import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Aside = () => {
  const [tareaClass, setTareaClass] = useState("");
  const [userClass, setUserClass] = useState("");

  useEffect(() => {
    let currentPath = window.location.pathname;
    setTareaClass(currentPath === "/tareas" ? " bg-green-400 text-white" : "");
    setUserClass(currentPath === "/user" ? " bg-green-400 text-white" : "");
  }, []);

  return (
    <div className="mt-10">
      <aside className="h-[90vh] w-[15vw]">
        <div
          className={`h-[7vh] w-[14vw] text-xl flex items-center cursor-pointer hover:bg-slate-200 hover:text-green-500 rounded-e-full font-bold transition duration-500 ${userClass} `}
        >
          <FontAwesomeIcon className="h-[3vh] pl-2" icon={faUser} />
          <Link className="pl-5" href="/user">
            User
          </Link>
        </div>
        <div
          className={`h-[7vh] w-[14vw] text-xl flex items-center cursor-pointer hover:bg-slate-200 hover:text-green-500 rounded-e-full font-bold transition duration-500 ${tareaClass}`}
        >
          <FontAwesomeIcon className="h-[3vh] pl-2 " icon={faBars} />
          <Link className="pl-5" href="/tareas">
            Tareas
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default Aside;
