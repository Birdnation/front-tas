import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthConext";
import Checklogin from "../../hooks/useCheckLogin";
import Header from "../../components/globals/Header";
import { Loader } from "rsuite";
import CrearSolicitud from "../../components/Forms/CrearSolicitud";
import SideNav from "../../components/globals/SideNav";

const Crear_Solicitud = () => {
  const router = useRouter();
  const { signIn, checkLogin } = useContext(AuthContext);
  const [isLoged, setIsLoged] = useState(true);
  const [nameUser, setNameUser] = useState("");
  const [idUser, setIdUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [rolUser, setRolUser] = useState("");

  useEffect(() => {
    async function verificar() {
      const verificacion = await Checklogin();
      if (verificacion === "error conexion") {
        router.push("/");
      } else if (verificacion.rol) {
        if (verificacion.rol === "administrador") {
          router.push("/panel");
          return;
        }
        checkLogin(verificacion.rol);
        signIn(verificacion.rol, verificacion.id);
        setIdUser(verificacion.id);
        setNameUser(verificacion.name);
        setEmailUser(verificacion.email);
        setRolUser(verificacion.rol);
        setIsLoged(false);
      } else if (verificacion.message) {
        router.push("/");
      }
    }
    verificar();
  }, []);

  return (
    <>
      {isLoged ? (
        <Loader size="lg" backdrop content="Cargando..." vertical />
      ) : (
        <>
          <SideNav>
            <Header
              rolUser={rolUser}
              nameUser={nameUser}
              title={null}
              divider={null}
            ></Header>
            <CrearSolicitud></CrearSolicitud>
          </SideNav>
        </>
      )}
    </>
  );
};

export default Crear_Solicitud;
