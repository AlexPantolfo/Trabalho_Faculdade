const form = document.getElementById('video')
const token = sessionStorage.getItem("token");

let params = new URLSearchParams(window.location.search);
const id = params.get("id");


$(function () {
    fetch(`http://localhost:3000/getVideo/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not reach the API: " + response.statusText);
            }
        }).then((data) => {
            if (data.video) {
                document.getElementById("link").value = data.video.link;
                document.getElementById("titulo").value = data.video.titulo;
                document.getElementById("descricao").value = data.video.descricao;
            }
        }).catch((error) => {
        });
});

form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form)

    //const url = "https://backend-trab-faculdade.vercel.app/login";
    const url = `http://localhost:3000/editVideo/${id}`;

    const data = Object.fromEntries(formData)

    const other_params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "authorization": token
        },
        body: JSON.stringify(data),
    };

    fetch(url, other_params)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Could not reach the API: " + response.statusText);
            }
        }).then(() => {
            document.getElementById("modal-content").innerHTML += `<div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Vídeo editado com sucesso</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <p>Voltando para visualização dos videos.</p>
        </div>
        <div class="modal-footer">
            <button type="button" id="confirm-button" class="btn btn-primary"
                data-dismiss="modal">Ok</button>
        </div>`;

            $('#myModal').modal('show')

            $('#confirm-button').on('click', function () {
                window.location.replace('videos.html');
            });
        }).catch((error) => {
            document.getElementById("modal-content").innerHTML += `<div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Atenção</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <p>Provavelmente o vídeo em questão já foi cadastrado anteriormente. Caso não tenha sido contate o Administrador</p>
        </div>
        <div class="modal-footer">
            <button type="button" id="confirm-button" class="btn btn-primary"
                data-dismiss="modal">Ok</button>
        </div>`;

            $('#myModal').modal('show')

            $('#confirm-button').on('click', function () {
                window.location.replace('videos.html');
            });
        });
})