var alertas = [];

function alertar(temperatura,umidade, idLocal) {
    
    // var umidade = resposta[0].umidade;

    console.log("VALOR DA UMIDADE:" + umidade,temperatura,idLocal)
    // console.log(idLocal === resposta[0].fkLocal);// temos que passar o id do galpaão e fk

    var grauDeAviso = '';

    var limiteUmidade =
    {
        // passando os valores de alerta e ideal da umidade
        criticoUmidadeAlta: 60,
        alertaUmidadeAlta: 57,
        idealUmidade: 55,
        alertaUmidadeBaixa: 52,
        criticoUmidadeBaixa: 50

    }
// var temperatura = resposta[0].temperatura;
    var limiteTemperatura = {
        
        criticoQuente: 24,
        alertaQuente: 23,
        ideal: 18,
        alertaFrio: 15,
        criticoFrio: 12
    }

    var classeTemperatura = 'cor-alerta';
    var classeUmidade = 'cor-alerta';

    // verificações das temperaturas passadas nos json acima


    if (temperatura >= limiteTemperatura.criticoQuente) {
        classeTemperatura = 'cor-alerta perigo muito quente';
        grauDeAviso = 'CRÍTICO ALTO quente'
        grauDeAvisoCor = 'cor-alerta perigo quente'
        
        // valorCritico = true
        // console.log(valorCritico + "VALOR CRITICO DENTRO D IF")
        exibirAlerta(temperatura, idLocal, grauDeAviso, grauDeAvisoCor)
        divTempAlerta.style.background = 'rgb(255, 0, 0)'
    }
    else if (temperatura < limiteTemperatura.criticoQuente && temperatura >= limiteTemperatura.alertaQuente) {
        classeTemperatura = 'cor-alerta alerta quente';
        grauDeAviso = 'de ALERTA ALTO quente'
        grauDeAvisoCor = 'cor-alerta alerta quente'
       
        // valorCritico = true
        exibirAlerta(temperatura, idLocal, grauDeAviso, grauDeAvisoCor)
        divTempAlerta.style.background = 'rgb(253, 148, 0)'

    }
    else if (temperatura < limiteTemperatura.alertaQuente && temperatura > limiteTemperatura.alertaFrio) {
        classeTemperatura = 'cor-alerta ideal';
        // valorCritico = false
        removerAlerta(idLocal);
    }
    else if (temperatura <= limiteTemperatura.alertaFrio && temperatura > limiteTemperatura.criticoFrio) {
        classeTemperatura = 'cor-alerta alerta muito frio';
        grauDeAviso = 'de ALERTA BAIXO frio'
        grauDeAvisoCor = 'cor-alerta alerta frio'
        
        // valorCritico = true
        exibirAlerta(temperatura, idLocal, grauDeAviso, grauDeAvisoCor)
        divTempAlerta.style.background = 'rgb(63, 151, 210)';
    }
    else if (temperatura <= limiteTemperatura.criticoFrio) {
        classeTemperatura = 'cor-alerta perigo muito frio';
        grauDeAviso = 'CRÍTICO BAIXO frio'
        grauDeAvisoCor = 'cor-alerta perigo frio'
      
        // valorCritico = true
        exibirAlerta(temperatura, idLocal, grauDeAviso, grauDeAvisoCor)
        divTempAlerta.style.background = 'rgb(54, 44, 238)'
    }



    // verificações da umidade




    if (umidade >= limiteUmidade.criticoUmidadeAlta) {
        classeUmidade = 'cor-alerta perigo muito umido';
        grauDeAviso = 'CRÍTICO ALTO umido'
        grauDeAvisoCor = 'cor-alerta perigo umido'
        // valorCritico = true
        exibirAlerta1( umidade, idLocal, grauDeAviso, grauDeAvisoCor)
        divUmidAlerta.style.background = 'rgb(255, 0, 0)'
        
    }
    else if (umidade < limiteUmidade.criticoUmidadeAlta && umidade >= limiteUmidade.alertaUmidadeAlta) {
        classeUmidade = 'cor-alerta alerta umido';
        grauDeAviso = 'de ALERTA ALTO umido'
        grauDeAvisoCor = 'cor-alerta alerta umido'
        // valorCritico = true
        exibirAlerta1( umidade, idLocal, grauDeAviso, grauDeAvisoCor)
        divUmidAlerta.style.background = 'rgb(253, 148, 0)'
    }
    else if (umidade < limiteUmidade.alertaUmidadeAlta && umidade > limiteUmidade.alertaUmidadeBaixa ) {
        classeUmidade = 'cor-alerta ideal';
        valorCritico = false
        removerAlerta1(idLocal);
    }
    else if (umidade <= limiteUmidade.alertaUmidadeBaixa && umidade > limiteUmidade.criticoUmidadeBaixa) {
        classeUmidade = 'cor-alerta alerta seco';
        grauDeAviso = ' de ALERTA BAIXO seco'
        grauDeAvisoCor = 'cor-alerta alerta seco'
        // valorCritico = true
        exibirAlerta1( umidade, idLocal, grauDeAviso, grauDeAvisoCor)
        divUmidAlerta.style.background = 'rgb(63, 151, 210)'
      
    }
    else if (umidade <= limiteUmidade.criticoUmidadeBaixa) {
        classeUmidade = 'cor-alerta perigo muito seco';
        grauDeAviso = 'CRÍTICO BAIXO seco'
        grauDeAvisoCor = 'cor-alerta perigo seco'
        // valorCritico = true
        exibirAlerta1( umidade, idLocal, grauDeAviso, grauDeAvisoCor)
        divUmidAlerta.style.background = 'rgb(54, 44, 238)'
    }

    // console.log(valorCritico + "VALOR CRITICO")

}

function exibirAlerta(temperatura, idLocal, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idLocal == idLocal);
    console.log('cheguei',indice);
    if (indice >= 0) {
        alertas[indice] = { idLocal, temperatura, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idLocal, temperatura, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();

    // Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
    // que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function exibirAlerta1(umidade, idLocal, grauDeAviso, grauDeAvisoCor) {
    var indice2 = alertas.findIndex(item => item.idLocal == idLocal);
    console.log('cheguei',indice2);
    if (indice2 >= 0) {
        alertas[indice2] = { idLocal, umidade, grauDeAviso, grauDeAvisoCor}
    } else {
        alertas.push({ idLocal, umidade, grauDeAviso, grauDeAvisoCor});
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
        divNotificacao.innerHTML = `
        <div class="notific">Alerta!<br> Existem armazéns que precisam de atenção.<br>Clique nesta notificação para visualizar
        <div class="alarme-sino"></div><div>`
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function exibirCards1() {
    alerta1.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem1 = alertas[i];
        divNotificacao.innerHTML = `
        <div class="notific">Alerta!<br> Existem armazéns que precisam de atenção.<br>Clique nesta notificação para visualizar
        <div class="alarme-sino"></div><div>`
        alerta1.innerHTML += transformarEmDiv2(mensagem1);
    }
}

function transformarEmDiv({ idLocal, temperatura, grauDeAviso, grauDeAvisoCor }) {
    return `<div id="divTempAlerta" class="mensagem-alarme">
    <div id="infTempAlerta" class="informacao">
   
     <h3>Sensor ${idLocal} do ARM1 está em estado ${grauDeAviso}!</h3>
    <small>Temperatura ${temperatura}.</small>  
    
    </div>
    </div>`;
}

function transformarEmDiv2({idLocal, umidade,grauDeAviso,grauDeAvisoCor}) {
    return `<div id="divUmidAlerta" class="mensagem-alarme1">
    <div id="infUmidAlerta" class="informacao"> 
   
     <h3>Sensor ${idLocal} do ARM1 está em estado ${grauDeAviso}!</h3>
    <small>Umidade ${umidade}.</small>  
    </div>
    </div>`;
}