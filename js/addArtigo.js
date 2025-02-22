const form = document.getElementById('artigo')
const token = sessionStorage.getItem("token");

form.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(form)

    const url = "https://backend-trabalho-faculdade.herokuapp.com/addAnexo";
    //const url = "http://localhost:3000/addAnexo";

    const data = Object.fromEntries(formData)

    const other_params = {
        method: "POST",
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
            <h5 class="modal-title" id="exampleModalLongTitle">Artigo adicionado com sucesso</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <p>Voltando para visualização dos artigos.</p>
        </div>
        <div class="modal-footer">
            <button type="button" id="confirm-button" class="btn btn-primary"
                data-dismiss="modal">Ok</button>
        </div>`;

            $('#myModalArtigo').modal('show')

            $('#confirm-button').on('click', function () {
                window.location.replace('artigos.html');
            });
        }).catch((error) => {
            document.getElementById("modal-content").innerHTML += `<div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Atenção</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <p>Provavelmente o artigo em questão já foi cadastrado anteriormente. Caso não tenha sido contate o Administrador</p>
        </div>
        <div class="modal-footer">
            <button type="button" id="confirm-button" class="btn btn-primary"
                data-dismiss="modal">Ok</button>
        </div>`;

            $('#myModal').modal('show')

            $('#confirm-button').on('click', function () {
                window.location.replace('artigos.html');
            });
        });
})