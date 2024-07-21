document.addEventListener("DOMContentLoaded", () => {
   
    const filmDetailsUrl = id => `http://localhost:3000/films/${id}`;

    const filmsList = document.getElementById("films");
    const poster = document.getElementById("poster");
    const title = document.getElementById("title");
    const runtime = document.getElementById("runtime");
    const showtime = document.getElementById("showtime");
    const description = document.getElementById("description");
    const availableTickets = document.getElementById("available-tickets");
    const buyTicketButton = document.getElementById("buy-ticket");

    let selectedFilm = null;

    function fetchFilms() {
        fetch("http://localhost:3000/films")
            .then(response => response.json())
            .then(films => {
                films.forEach(film => {
                    const li = document.createElement("li");
                    li.classList.add("film", "item");
                    li.textContent = film.title;
                    li.addEventListener("click", () => {
                        displayFilmDetails(film);
                    });
                    filmsList.appendChild(li);
                });
                // Display the first film details
                if (films.length > 0) {
                    displayFilmDetails(films[0]);
                }
            });
    }

    function displayFilmDetails(film) {
        selectedFilm = film;
        poster.src = film.poster;
        title.textContent = film.title;
        runtime.textContent = film.runtime;
        showtime.textContent = film.showtime;
        description.textContent = film.description;
        updateAvailableTickets();
    }

    function updateAvailableTickets() {
        const ticketsAvailable = selectedFilm.capacity - selectedFilm.tickets_sold;
        availableTickets.textContent = ticketsAvailable;
        buyTicketButton.disabled = ticketsAvailable === 0;
    }

    buyTicketButton.addEventListener("click", () => {
        if (selectedFilm && selectedFilm.tickets_sold < selectedFilm.capacity) {
            selectedFilm.tickets_sold++;
            updateAvailableTickets();
        }
    });

    fetchFilms();
});
