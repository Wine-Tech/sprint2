var alertas = [];

function alertar(resposta, idLocal) {
    var temp = resposta[0].temperatura;
    var umi = resposta[0].umidade;

    console.log("VALOR DA UMIDADE:" + umi)
    console.log(idLocal === resposta[0].fkLocal);// temos que passar o id do galpaão e fk

    var grauAviso = '';

    var limiteUmidade =
    {
        // passando os valores de alerta e ideal da umidade
        alertaUmidadeCritica: 60,
        alertaUmidade: 57,
        idealUmidade: 55,
        alertaUmidade2: 52,
        alertaCriticoUmidadeAlta: 50

    }

    var limiteTemperatura = {
        // passando os valores de alerta e ideal da temperatura
        alertaCriticoQuente: 24,
        quente: 23,
        ideal: 18,
        alertaFrio1: 15.15,
        alertaCriticoFrio: 12
    }

    var classeTemperatura = 'cor-alerta';
    var classeUmidade = 'cor-alerta';

    // verificações das temperaturas passadas nos json acima
    if (temp >= limiteTemperatura.alertaCriticoQuente) {
        classeTemperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        // valorCritico = true
        // console.log(valorCritico + "VALOR CRITICO DENTRO D IF")
        exibirAlerta(temp, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limiteTemperatura.alertaCriticoQuente && temp >= limiteTemperatura.quente) {
        classeTemperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        // valorCritico = true
        exibirAlerta(temp, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limiteTemperatura.quente && temp > limiteTemperatura.alertaFrio1) {
        classeTemperatura = 'cor-alerta ideal';
        // valorCritico = false
        removerAlerta(idLocal);
    }
    else if (temp <= limiteTemperatura.alertaFrio1 && temp > limite.alertaCriticoFrio) {
        classeTemperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        // valorCritico = true
        exibirAlerta(temp, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limiteTemperatura.alertaCriticoFrio) {
        classeTemperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        // valorCritico = true
        exibirAlerta(temp, idLocal, grauDeAviso, grauDeAvisoCor)
    }



    // verificações da umidade
    if (umi >= limiteUmidade.alertaUmidadeCritica) {
        classeUmidade = 'cor-alerta perigo-muito umido';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        // valorCritico = true
        exibirAlerta1( umi, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (umi < limiteUmidade.alertaUmidadeCritica && umi >= limiteUmidade.alertaUmidade) {
        classeUmidade = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        // valorCritico = true
        exibirAlerta1( umi, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (umi < limiteUmidade.alertaUmidade && umi > limiteUmidade.alertaUmidade2 ) {
        classeUmidade = 'cor-alerta ideal';
        valorCritico = false
        removerAlerta1(idLocal);
    }
    else if (umi <= limiteUmidade.alertaUmidade2 && umi > limiteUmidade.alertaCriticoUmidadeAlta) {
        classeUmidade = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        // valorCritico = true
        exibirAlerta1( umi, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (umi <= limiteUmidade.alertaCriticoUmidadeAlta) {
        classeUmidade = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        // valorCritico = true
        exibirAlerta1( umi, idLocal, grauDeAviso, grauDeAvisoCor)
    }

    // console.log(valorCritico + "VALOR CRITICO")

}



function exibirAlerta(temp, idLocal, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idLocal == idLocal);

    if (indice >= 0) {
        alertas[indice] = { idLocal, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idLocal, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();

    // Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
    // que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}
function exibirAlerta1(umi, idLocal, grauDeAviso, grauDeAvisoCor) {
    var indice2 = alertas.findIndex(item => item.idLocal == idLocal);

    if (indice2 >= 0) {
        alertas[indice2] = { idLocal, umi, grauDeAviso, grauDeAvisoCor}
    } else {
        alertas.push({ idLocal, umi, grauDeAviso, grauDeAvisoCor});
    }
    exibirCards1()
}

function removerAlerta(idLocal) {
    alertas = alertas.filter(item => item.idLocal != idLocal);
    exibirCards();
}
function removerAlerta1(idLocal) {
    alertas = alertas.filter(item => item.idLocal != idLocal);
    exibirCards1();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}
function exibirCards1() {
    alerta1.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem1 = alertas[i];
        alerta1.innerHTML += transformarEmDiv2(mensagem1);
    }
}

function transformarEmDiv({ idLocal, temp, grauDeAviso, grauDeAvisoCor }) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Local ${idLocal} está em estado de ${grauDeAviso}!</h3>
    <small>Temperatura ${temp}.</small>  
    
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}
function transformarEmDiv2({idLocal, umi,grauDeAviso,grauDeAvisoCor}) {
    return `<div class="mensagem-alarme1">
    <div class="informacao"> 
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Local ${idLocal} está em estado de ${grauDeAviso}!</h3>
    <small>Umidade ${umi}.</small>  
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}