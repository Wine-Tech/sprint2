var alertas_s5 = [];


// function obterdados(idLocal) {
//     fetch(`/medidas/tempo-real/${idLocal}`)
//         .then(resposta => {

//             if (resposta.ok) {
//                 resposta.json().then(resposta => {

//                     console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

//                     alertar(resposta, idLocal);
//                 });
//             } else {

//                 console.error('Nenhum dado encontrado ou erro na API');
//             }
//         })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
//         });

// }
function alertar_s5(temperatura,umidade, idLocal) {
    
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
        exibirAlerta_s5(temperatura, idLocal, grauDeAviso, grauDeAvisoCor)
        divTempAlerta_s5.style.background = 'rgb(255, 0, 0)'
    }
    else if (temperatura < limiteTemperatura.criticoQuente && temperatura >= limiteTemperatura.alertaQuente) {
        classeTemperatura = 'cor-alerta alerta quente';
        grauDeAviso = 'de ALERTA ALTO quente'
        grauDeAvisoCor = 'cor-alerta alerta quente'
       
        // valorCritico = true
        exibirAlerta_s5(temperatura, idLocal, grauDeAviso, grauDeAvisoCor)
        divTempAlerta_s5.style.background = 'rgb(253, 148, 0)'

    }
    else if (temperatura < limiteTemperatura.alertaQuente && temperatura > limiteTemperatura.alertaFrio) {
        classeTemperatura = 'cor-alerta ideal';
        // valorCritico = false
        removerAlerta_s5(idLocal);
    }
    else if (temperatura <= limiteTemperatura.alertaFrio && temperatura > limiteTemperatura.criticoFrio) {
        classeTemperatura = 'cor-alerta alerta muito frio';
        grauDeAviso = 'de ALERTA BAIXO frio'
        grauDeAvisoCor = 'cor-alerta alerta frio'
        
        // valorCritico = true
        exibirAlerta_s5(temperatura, idLocal, grauDeAviso, grauDeAvisoCor)
        divTempAlerta_s5.style.background = 'rgb(63, 151, 210)';
    }
    else if (temperatura <= limiteTemperatura.criticoFrio) {
        classeTemperatura = 'cor-alerta perigo muito frio';
        grauDeAviso = 'CRÍTICO BAIXO frio'
        grauDeAvisoCor = 'cor-alerta perigo frio'
      
        // valorCritico = true
        exibirAlerta_s5(temperatura, idLocal, grauDeAviso, grauDeAvisoCor)
        divTempAlerta_s5.style.background = 'rgb(54, 44, 238)'
    }



    // verificações da umidade




    if (umidade >= limiteUmidade.criticoUmidadeAlta) {
        classeUmidade = 'cor-alerta perigo muito umido';
        grauDeAviso = 'CRÍTICO ALTO umido'
        grauDeAvisoCor = 'cor-alerta perigo umido'
        // valorCritico = true
        exibirAlerta1_s5( umidade, idLocal, grauDeAviso, grauDeAvisoCor)
        divUmidAlerta_s5.style.background = 'rgb(255, 0, 0)'
        
    }
    else if (umidade < limiteUmidade.criticoUmidadeAlta && umidade >= limiteUmidade.alertaUmidadeAlta) {
        classeUmidade = 'cor-alerta alerta umido';
        grauDeAviso = 'de ALERTA ALTO umido'
        grauDeAvisoCor = 'cor-alerta alerta umido'
        // valorCritico = true
        exibirAlerta1_s5( umidade, idLocal, grauDeAviso, grauDeAvisoCor)
        divUmidAlerta_s5.style.background = 'rgb(253, 148, 0)'
    }
    else if (umidade < limiteUmidade.alertaUmidadeAlta && umidade > limiteUmidade.alertaUmidadeBaixa ) {
        classeUmidade = 'cor-alerta ideal';
        valorCritico = false
        removerAlerta1_s5(idLocal);
    }
    else if (umidade <= limiteUmidade.alertaUmidadeBaixa && umidade > limiteUmidade.criticoUmidadeBaixa) {
        classeUmidade = 'cor-alerta alerta seco';
        grauDeAviso = ' de ALERTA BAIXO seco'
        grauDeAvisoCor = 'cor-alerta alerta seco'
        // valorCritico = true
        exibirAlerta1_s5( umidade, idLocal, grauDeAviso, grauDeAvisoCor)
        divUmidAlerta_s5.style.background = 'rgb(63, 151, 210)'
      
    }
    else if (umidade <= limiteUmidade.criticoUmidadeBaixa) {
        classeUmidade = 'cor-alerta perigo muito seco';
        grauDeAviso = 'CRÍTICO BAIXO seco'
        grauDeAvisoCor = 'cor-alerta perigo seco'
        // valorCritico = true
        exibirAlerta1_s5( umidade, idLocal, grauDeAviso, grauDeAvisoCor)
        divUmidAlerta_s5.style.background = 'rgb(54, 44, 238)'
    }

    // console.log(valorCritico + "VALOR CRITICO")

}



function exibirAlerta_s5(temperatura, idLocal, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas_s5.findIndex(item => item.idLocal == idLocal);
    console.log('cheguei',indice);
    if (indice >= 0) {
        alertas_s5[indice] = { idLocal, temperatura, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas_s5.push({ idLocal, temperatura, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards_s5();

    // Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
    // que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}
function exibirAlerta1_s5(umidade, idLocal, grauDeAviso, grauDeAvisoCor) {
    var indice2 = alertas_s5.findIndex(item => item.idLocal == idLocal);
    console.log('cheguei',indice2);
    if (indice2 >= 0) {
        alertas_s5[indice2] = { idLocal, umidade, grauDeAviso, grauDeAvisoCor}
    } else {
        alertas_s5.push({ idLocal, umidade, grauDeAviso, grauDeAvisoCor});
    }
    exibirCards1_s5()
}

function removerAlerta_s5(idLocal) {
    alertas_s5 = alertas_s5.filter(item => item.idLocal != idLocal);
    exibirCards_s5();
}
function removerAlerta1_s5(idLocal) {
    alertas_s5 = alertas_s5.filter(item => item.idLocal != idLocal);
    exibirCards1_s5();
}

function exibirCards_s5() {
    alerta4.innerHTML = '';

    for (var i = 0; i < alertas_s5.length; i++) {
        var mensagem2 = alertas_s5[i];
        divNotificacao.innerHTML = `
        <div class="notific">Alerta!<br> Existem armazéns que precisam de atenção.<br>Clique nesta notificação para visualizar
        <div class="alarme-sino"></div><div>`
        alerta4.innerHTML += transformarEmDiv_s5(mensagem2);
    }
}
function exibirCards1_s5() {
    alerta5.innerHTML = '';

    for (var i = 0; i < alertas_s5.length; i++) {
        var mensagem3 = alertas_s5[i];
        divNotificacao.innerHTML = `
        <div class="notific">Alerta!<br> Existem armazéns que precisam de atenção.<br>Clique nesta notificação para visualizar
        <div class="alarme-sino"></div><div>`
        alerta5.innerHTML += transformarEmDiv2_s5(mensagem3);
    }
}

function transformarEmDiv_s5({idLocal, temperatura, grauDeAviso, grauDeAvisoCor}) {
    return `<div id="divTempAlerta_s5" class="mensagem-alarme">
    <div id="infTempAlerta_s5" class="informacao">
   
     <h3>Sensor ${idLocal} do ARM2 está em estado ${grauDeAviso}!</h3>
    <small>Temperatura ${temperatura}.</small>  
    
    </div>
    </div>`;
}
function transformarEmDiv2_s5({idLocal, umidade,grauDeAviso,grauDeAvisoCor}) {
    return `<div id="divUmidAlerta_s5" class="mensagem-alarme1">
    <div id="infUmidAlerta_s5" class="informacao"> 
   
     <h3>Sensor ${idLocal} do ARM2 está em estado ${grauDeAviso}!</h3>
    <small>Umidade ${umidade}.</small>  
    </div>
    </div>`;
}

// function obterdados(fkSensor) {
//     fetch(`/medidas/tempo-real/${fkSensor}`)
//         .then(resposta => {

//             if (resposta.ok) {
//                 resposta.json().then(resposta => {
//                     alertar(resposta[0].temperatura,resposta[0].umidade, fkSensor);
//                     console.log('TESTE',resposta[0].temperatura,resposta[0].umidade, fkSensor);
//                     console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

//                     var dados = {
//                         temperatura: resposta[0].temperatura,
//                         umidade: resposta[0].umidade
//                     }
//                     // alertar(resposta[0].umidade, idLocal);

//                 });
//             } else {

//                 console.error('Nenhum dado encontrado ou erro na API');
//             }
//         })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
//         });
// }
