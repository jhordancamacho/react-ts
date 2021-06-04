import React, { useState } from "react";

function Weather() {
  const [resultNews, setResultnews] = useState([]);
  var Contenido = "";

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
  return <div className="Weather"></div>;
}

export default Weather;
