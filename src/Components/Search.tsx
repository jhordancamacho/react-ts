//import React, { Fragment, useState } from "react";
import lupa from "../images/lupa.png";
import "./search.css";
//const [Contenido, setContenido] = useState("");

function Search() {
  return (
    <div className="search">
      <input
        name="barra de busqueda"
        placeholder="Inicia tu busqueda"
        autoFocus
      />
      <img src={lupa} alt="lupa de busqueda" />
    </div>
  );
}

export default Search;
