import houseOfWaxImage from "./images/house_of_wax.jpg";
import talesOfTerrorImage from "./images/tales_of_terror.jpg";
import theRavenImage from "./images/the_raven.jpg";
import theTinglerImage from "./images/the_tingler.jpg";
import theFlyImage from "./images/the_fly.jpg";
import theBatImage from "./images/the_bat.jpg";
import theatreOfBloodImage from "./images/theatre_of_blood.jpg";
import madhouseImage from "./images/madhouse.jpg";

function About() {
  const featuredMovies = [
    { id: 1, name: "The House of Wax", image: houseOfWaxImage },
    { id: 2, name: "Tales of Terror", image: talesOfTerrorImage },
    { id: 3, name: "The Raven", image: theRavenImage },
    { id: 4, name: "The Tingler", image: theTinglerImage },
    { id: 5, name: "The Fly", image: theFlyImage },
    { id: 6, name: "The Bat", image: theBatImage },
    { id: 7, name: "Theatre of Blood", image: theatreOfBloodImage },
    { id: 8, name: "MadHouse", image: madhouseImage },
  ];

  return (
    <section className="about-page">
      <h2>About Our Movie Portal</h2>
      <p>
        Welcome to the Movie Portal! This application was created as part of the
        WEBD 172 course to showcase React and Express.
      </p>

      <h3>Featured Movies</h3>
      <div className="movie-gallery">
        {featuredMovies.map((movie) => (
          <a
            key={movie.id}
            href={`http://localhost:3000/api/movies/${movie.id}`}
          >
            <img src={movie.image} alt={movie.name} />
          </a>
        ))}
      </div>
    </section>
  );
}

export default About;
