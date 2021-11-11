
let option = 'movie';
let contPage = 1;
let totalPage;

function elegir() {
    option = document.getElementById("selector").value;
}

function filtrar(contPage) {
   
    let entrada = document.getElementById("buscador").value;
    let url = '';
    switch (option) {
        case "movie":
            url = 'http://www.omdbapi.com/?apikey=b2933037&s=' + entrada + '&page=' + contPage + '&type=movie';
            break;
        case "series":
            url = 'http://www.omdbapi.com/?apikey=b2933037&s=' + entrada + '&page=' + contPage + '&type=series';
            break;

        default:
            url = 'http://www.omdbapi.com/?apikey=b2933037&s=' + entrada + '&page=' + contPage + '&type=movie';
            break;
    }

    fetch(url)

        .then(response => response.json())

        .then(data => {
            totalPage = data.totalResults / 10;
            (totalPage>1)?document.getElementById("buttonPage").style.visibility="visible":document.getElementById("buttonPage").style.visibility="hidden";

            document.getElementById("aki").innerHTML = "";
            for (var i = 0; i < data.Search.length; i++) {
                console.log(data)
                let poster = '';
                (data.Search[i].Poster == 'N/A') ? poster = "cartelera.jpg" : poster = data.Search[i].Poster;
                document.getElementById("aki").innerHTML += '<br><div id="aki"' + i + ' class="col-sm-12 col-md-4 mb-3 d-flex"><div class="card text-center border border-dark" ><div class="card-header bg-warning">' + data.Search[i].Title + '</div><div class="card-body"> <img src="' + poster + '" onclick="buscar(\'' + data.Search[i].Title + '\')" width="100%" /></div><div class="card-footer bg-ligth">' + data.Search[i].Year + '</div></div></div><br>';
                document.getElementById("cartel").style.display = "none";
            }

        })

        .catch(err => {
            console.log(err);
            swal("Oups!", "No existe ese titulo...", "info");

        });

}

function buscar(id) {
    document.getElementById("modal").style.display = "block";
    const url1 = 'http://www.omdbapi.com/?apikey=b2933037&t=' + id;
    fetch(url1)

        .then(response => response.json())

        .then(data => {
            console.log(data)

            document.getElementById("title").innerHTML = data.Title;
            document.getElementById("plot").innerHTML = data.Plot;
            document.getElementById("year").innerHTML = "Anio de estreno: " + data.Year;
            document.getElementById("actores").innerHTML = "Actores: " + data.Actors;

        })

}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function nextPage() {
    contPage++;
    filtrar(contPage);
}

function prevPage() {
    if (contPage > 1) {
        contPage--;
        filtrar(contPage);
    }
}
function contPageCero() {
    contPage = 1;
}
