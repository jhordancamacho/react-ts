import { useEffect, useState, KeyboardEvent } from "react"; //HOOKS y evento del teclado
import "./news.css";
import lupa from "../images/lupa.png"; //imagen que va en la barra de busqueda

function News() {
  const [Contenido, setContenido] = useState(""); //estado para la barra de busqueda
  const [Noticias, setNoticias] = useState([]); //estado para las noticias que se mostraran
  const [Clima, setClima] = useState([]); //estado para los datos que devuelve la api del clima

  //insertar datos en la BD de sql server
  function Insertar_Datos(Ciudad: String) {
    return fetch("https://localhost:44303/api/busqueda", {
      //ruta local generada por VS en asp.net
      method: "POST",
      body: JSON.stringify({
        Ciudad: Ciudad,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((response) => response.json());
  }

  const enterPress = (event: KeyboardEvent) => {
    //funcion para capturar los datos de la busqueda
    if (event.key === "Enter") {
      //comprueba que el boton oprimido sea enter
      let x = Contenido.replace(/ |>/g, "-"); //remplazamos los espacios por guiones para que sea enviado y entendido por la api
      if (x !== "") {
        //si presiona enter y contiene algo, realiza la busqueda
        fetch(
          "https://newsapi.org/v2/everything?q=" +
            x + //enviamos la busqueda con los espacios ya remplazados
            "&apiKey=939167e7872649b9a97697a91db03fce"
        )
          .then((Response) => Response.json())
          .then((data) => setNoticias(data.articles)); //enviammos los resultados al estado Noticias para que sean visiblis
        Insertar_Datos(Contenido); //enviamos los datos buscados a la BD

        fetch(
          "https://api.weatherbit.io/v2.0/current?key=a1c2595efa9540a89bf3ac474243cb60&city=" +
            x //si la busqueda es una ciudad se almacenara en el estado y posteriormente se mostrara
        )
          .then((Response) => Response.json())
          .then((data) => setClima(data.data));
      } else {
        //en caso contrario de que la busqueda este vacia se vuelven a mostrar las noticias principales
        fetch(
          "http://newsapi.org/v2/top-headlines?country=co&apiKey=939167e7872649b9a97697a91db03fce&languaje=es"
        )
          .then((Response) => Response.json())
          .then((data) => setNoticias(data.articles));
      }
    }
  };

  useEffect(() => {
    fetch(
      "http://newsapi.org/v2/top-headlines?country=co&apiKey=939167e7872649b9a97697a91db03fce&languaje=es" //cargamos las noticias principales
    )
      .then((Response) => Response.json())
      .then((data) => setNoticias(data.articles));
  }, []);

  return (
    <div className="news">
      {/* tarjetadonde se mostraran los detalles del clima */}
      <div className="weather">
        {Clima.map(
          (
            item: any,
            index //hacemos un map a los datos que nos devuelve la api para mostrarlos
          ) => (
            <div className="tarjet-weather" key={index}>
              <div className="weather-text">
                <h4 className="ciudad">{item.city_name}</h4>
                <h4 className="temperatura">{item.temp}°C</h4>
                <p className="obtenido">
                  <b>Ultima vez: </b>
                  {item.ob_time}
                </p>
                <p className="humedad">
                  <b>Humedad: </b>
                  {item.rh} %
                </p>
              </div>
              <img
                src={
                  "https://www.weatherbit.io/static/img/icons/" +
                  item.weather.icon +
                  ".png"
                }
                alt={item.weather.description}
              ></img>
            </div>
          )
        )}
      </div>

      {/* barra de busqueda */}
      <div className="search">
        <input
          value={Contenido}
          onChange={({ target: { value } }) => setContenido(value)} //le pasamos al estado contenido los datos que estan en la barra de busqueda
          onKeyDown={enterPress} //asiganamos el evento para saber cuando se presione la tecla enter
          name="barra de busqueda"
          placeholder="Inicia tu busqueda"
          autoFocus //para que al cargar la pagina el cursor este en el input listo para escribir
        />
        <img src={lupa} alt="lupa de busqueda" />
      </div>

      {/* espacio para las noticias buscadas o de la navegacion principal */}
      {Noticias.map((item: any, index) => (
        <div className="card" key={index}>
          <div className="banner">
            <p className="source">{item.source.name}</p>
            <img className="banner-img" src={item.urlToImage} alt="imagen" />
          </div>
          <div className="character">
            <h2 className="title">{item.title}</h2>
            <p className="description">{item.description}</p>
            <a
              className="link"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              Ver más
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default News;
