var alertas = [];

function alertar(resposta, idLocal) {
    var temp = resposta[0].temperatura;
    var umi = resposta[0].umidade;
    console.log(idLocal === resposta[0].fkLocal);// temos que passar o id do galpaão e fk

    var grauAviso = '';

    var limiteUmidade =
    {
        alertaUmidadeCritica:60,
        alertaUmidade:59,
        idealUmidade:55,
        alertaUmidade2:52,
        alertaTemperaturaCritica:50

    }

    var limiteTemperatura = {

        alertaCriticoQuente:24,
        quente: 23,
        ideal:18,
        alertaFrio1:15.15,
        alertaCriticoFrio:12
    }
    
    var classeTemperatura = 'cor-alerta';
    // var classeUmidade = 'cor-alerta';

    // verificações das temperaturas passadas nos json acima
    if (temp >= limiteTemperatura.alertaCriticoQuente) {
        classeTemperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limiteTemperatura.alertaCriticoQuente && temp >= limiteTemperatura.muitoQuente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limiteTemperatura.quente && temp > limiteTemperatura.alertaCriticoFrio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(idLocal);
    }
    else if (temp <= limiteTemperatura.alertaFrio1 && temp > limite.alertaCriticoFrio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, idLocal, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.alertaCriticoFrio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, idLocal, grauDeAviso, grauDeAvisoCor)
    }

   

    // verificações da umidade
    // if (umi >= limites.muito_quente) {
    //     classeUmidade = 'cor-alerta perigo-quente';
    //     grauDeAviso = 'perigo quente'
    //     grauDeAvisoCor = 'cor-alerta perigo-quente'
    //     exibirAlerta(umi, idLocal, grauDeAviso, grauDeAvisoCor)
    // }
    // else if (umi < limites.muito_quente && umi >= limites.quente) {
    //     classeUmidade = 'cor-alerta alerta-quente';
    //     grauDeAviso = 'alerta quente'
    //     grauDeAvisoCor = 'cor-alerta alerta-quente'
    //     exibirAlerta(temp, idLocal, grauDeAviso, grauDeAvisoCor)
    // }
    // else if (umi < limites.quente && umi > limites.frio) {
    //     classeUmidade = 'cor-alerta ideal';
    //     removerAlerta(idLocal);
    // }
    // else if (umi <= limites.frio && umi > limites.muito_frio) {
    //     classeUmidade = 'cor-alerta alerta-frio';
    //     grauDeAviso = 'alerta frio'
    //     grauDeAvisoCor = 'cor-alerta alerta-frio'
    //     exibirAlerta(umi, idLocal, grauDeAviso, grauDeAvisoCor)
    // }
    // else if (umi <= limites.muito_frio) {
    //     classeUmidade = 'cor-alerta perigo-frio';
    //     grauDeAviso = 'perigo frio'
    //     grauDeAvisoCor = 'cor-alerta perigo-frio'
    //     exibirAlerta(umi, idLocal, grauDeAviso, grauDeAvisoCor)
    // }

    
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

function removerAlerta(idLocal) {
    alertas = alertas.filter(item => item.idLocal != idLocal);
    exibirCards();
}

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idLocal, temp, grauDeAviso, grauDeAvisoCor }) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Aquário ${idLocal} está em estado de ${grauDeAviso}!</h3>
    <small>Temperatura ${temp}.</small>   
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}