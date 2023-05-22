// sessão
function validarSessaoEmpresa() {
    // aguardar();

    var idEmpresa = sessionStorage.ID_EMPRESA;

    // var b_usuario = document.getElementById("b_usuario");

    // if (email != null && nome != null) {
        // window.alert(`Seja bem-vindo, ${nome}!`);
        // b_usuario.innerHTML = nome;

        // finalizarAguardar();
    // } else {
        // window.location = "../login.html";
    // }
}
function limparSessaoEmpresa() {
    // aguardar();
    sessionStorage.clear();
    // finalizarAguardar();
    window.location = "../login.html";
}