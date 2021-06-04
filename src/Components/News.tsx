import { useEffect, useState, KeyboardEvent } from "react";
import "./news.css";
import lupa from "../images/lupa.png";

function News() {
  const [Contenido, setContenido] = useState("");
  const [Noticias, setNoticias] = useState([]);
  const [Clima, setClima] = useState([]);
  const temp = 0;

  function Insertar_Datos(Ciudad: String) {
    let date_ob = new Date();
    let e =
      date_ob.getFullYear() +
      "-" +
      (date_ob.getMonth() + 1) +
      "-" +
      date_ob.getDate() +
      " " +
      date_ob.getHours() +
      ":" +
      date_ob.getMinutes() +
      ":" +
      date_ob.getSeconds();
    return fetch("https://localhost:44303/api/busqueda", {
      method: "POST",
      body: JSON.stringify({
        Ciudad: Ciudad,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((response) => response.json());
  }

  const enterPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      let x = Contenido.replace(/ |<>/g, "-");
      console.log(x);
      fetch(
        "https://newsapi.org/v2/everything?q=" +
          x +
          "&apiKey=939167e7872649b9a97697a91db03fce"
      )
        .then((Response) => Response.json())
        .then((data) => setNoticias(data.articles));
      let y: String = Contenido.replace(/ |<>/g, "%");
      // fetch(
      //   "http://api.weatherstack.com/current?access_key=9ca7c652e41d3139bb7d93f1b4f2335a&query=" +
      //     y
      // )
      //   .then((Response) => Response.json())
      //   .then((data) => setClima(data.current.temperature));
      // console.log(Clima);
      Insertar_Datos(Contenido);
    }
  };

  useEffect(() => {
    fetch(
      "http://newsapi.org/v2/top-headlines?country=co&apiKey=939167e7872649b9a97697a91db03fce&languaje=es"
    )
      .then((Response) => Response.json())
      .then((data) => setNoticias(data.articles));
  }, []);

  return (
    <div className="news">
      <div className="weather">
        {/* <h4>Latitud:</h4>
        <p className="lat">{Clima.location.lat}</p>
        <h4>longitud</h4>
        <p className="lon">{item.lon}</p>
        <h4>hora local</h4>
        <p className="date">{item.localtime}</p>*/}

        <h4>temperatura</h4>
        <p className="temperature">{Number}</p>
        {/* <img src={item.current.weather_icons} alt="lupa de busqueda" /> */}
      </div>

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
      {Noticias.map((item: any) => (
        <div className="card">
          <div className="banner">
            <p className="source">{item.source.name}</p>
            <img className="banner-img" src={item.urlToImage} alt="imagen" />
          </div>
          <div className="character">
            <h2 className="title">{item.title}</h2>
            <p className="description">{item.description}</p>
            <a className="link" href={item.url} target="_blank">
              Ver más
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default News;
