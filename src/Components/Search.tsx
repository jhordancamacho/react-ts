import React, { Fragment, KeyboardEvent, useState } from "react";
import lupa from "../images/lupa.png";
import "./search.css";

function Search() {
  const apiBas =
    "https://newsapi.org/v2/everything?q=nueva-york&apiKey=939167e7872649b9a97697a91db03fce";
  const [Contenido, setContenido] = useState("");

  const enterPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log("do validate  " + Contenido);
    }
  };

  return (
    <div className="search">
      <input
        value={Contenido}
        onChange={({ target: { value } }) => setContenido(value)}
        onKeyDown={enterPress}
        name="barra de busqueda"
        placeholder="Inicia tu busqueda"
        autoFocus
      />
      <img src={lupa} alt="lupa de busqueda" />
    </div>
  );
}

export default Search;
