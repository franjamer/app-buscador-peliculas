import { useState } from "react"

export const BuscadorPeliculas = () => {

  const urlBase = 'https://api.themoviedb.org/3/search/movie';
  const API_KEY = `fa92ad5a3a46031728d5c0ad7b5fe40a`;
  const [busqueda, setBusqueda] = useState('');
  const [peliculas, setPeliculas] = useState([]);


  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPeliculas();
  }
  const fetchPeliculas = async () => {
    try {
      const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`);
      const data = await response.json();
      
      if (data.results) {
        setPeliculas(data.results); // Asegúrate de que estás asignando data.results, que es la matriz de películas
      } else {
        setPeliculas([]); // Si no hay resultados, asigna una matriz vacía
      }
      
    } catch (error) {
      console.error('Ha ocurrido un error:', error)
    }

  }
  return (
    <div className="container">
      <h1 className="title">Buscador de Películas</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe una película"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
      <div className="movie-list">
        {peliculas.map((pelicula) => {
          return (
            <div key={pelicula.id} className="movie-card">

              <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
              <h2>{pelicula.title}</h2>
              <p>{pelicula.overview}</p>
            </div>
          );
        })}
      </div>
    </div>
  )
}
