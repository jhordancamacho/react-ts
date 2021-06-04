import React, { Fragment, KeyboardEvent, useState } from "react";
import lupa from "../images/lupa.png";
import News from "./News";
import "./search.css";

function Search() {
  const [Contenido, setContenido] = useState("");
  const [resultNews, setResultnews] = useState([]);

  const enterPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      let x: string = Contenido.replace(/ |<>/g, "-");
      fetch(
        "https://newsapi.org/v2/everything?q={x}&apiKey=939167e7872649b9a97697a91db03fce"
      )
        .then((Response) => Response.json())
        .then((data) => setResultnews(data.articles));
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
