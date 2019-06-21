var gramatica00 = new Object();
gramatica00.producao = "S → aB";
gramatica00.gerador = "aB";
gramatica00.naoTerminal = "S";
gramatica00.producaoInversa = "Ba";

var gramatica01 = new Object();
gramatica01.producao = "-";
gramatica01.gerador = "";
gramatica01.naoTerminal = "";
gramatica01.producaoInversa = "-";

var gramatica02 = new Object();
gramatica02.producao = "S → cC";
gramatica02.gerador = "cC";
gramatica02.naoTerminal = "S";
gramatica02.producaoInversa = "Cc";

var gramatica03 = new Object();
gramatica03.producao = "-";
gramatica03.gerador = "";
gramatica03.naoTerminal = "";
gramatica03.producaoInversa = "-";

var gramatica10 = new Object();
gramatica10.producao = "A → BC";
gramatica10.gerador = "BC";
gramatica10.naoTerminal = "BC";
gramatica10.producaoInversa = "CB";

var gramatica11 = new Object();
gramatica11.producao = "A → bB";
gramatica11.gerador = "bB";
gramatica11.naoTerminal = "A";
gramatica11.producaoInversa = "Bb";

var gramatica12 = new Object();
gramatica12.producao = "A → BC";
gramatica12.gerador = "BC";
gramatica12.naoTerminal = "A";
gramatica12.producaoInversa = "CB";

var gramatica13 = new Object();
gramatica13.producao = "-";
gramatica13.gerador = "";
gramatica13.naoTerminal = "";
gramatica13.producaoInversa = "-";

var gramatica20 = new Object();
gramatica20.producao = "B → aAb";
gramatica20.gerador = "aAb";
gramatica20.naoTerminal = "B";
gramatica20.producaoInversa = "bAa";

var gramatica21 = new Object();
gramatica21.producao = "-";
gramatica21.gerador = "";
gramatica21.naoTerminal = "";
gramatica21.producaoInversa = "-";

var gramatica22 = new Object();
gramatica22.producao = "B → cC";
gramatica22.gerador = "cC";
gramatica22.naoTerminal = "B";
gramatica22.producaoInversa = "Cc";

var gramatica23 = new Object();
gramatica23.producao = "B → ε";
gramatica23.gerador = "ε";
gramatica23.naoTerminal = "B";
gramatica23.producaoInversa = "";

var gramatica30 = new Object();
gramatica30.producao = "C → aB";
gramatica30.gerador = "aB";
gramatica30.naoTerminal = "C";
gramatica30.producaoInversa = "Ba";

var gramatica31 = new Object();
gramatica31.producao = "C → bA";
gramatica31.gerador = "bA";
gramatica31.naoTerminal = "C";
gramatica31.producaoInversa = "Ab";

var gramatica32 = new Object();
gramatica32.producao = "C → c";
gramatica32.gerador = "c";
gramatica32.naoTerminal = "C";
gramatica32.producaoInversa = "c";

var gramatica33 = new Object();
gramatica33.producao = "-";
gramatica33.gerador = "";
gramatica33.naoTerminal = "";
gramatica33.producaoInversa = "-";

var matrizTabela = [
    [gramatica00, gramatica01, gramatica02, gramatica03],
    [gramatica10, gramatica11, gramatica12, gramatica13],
    [gramatica20, gramatica21, gramatica22, gramatica23],
    [gramatica30, gramatica31, gramatica32, gramatica33]
];

var mapaDePosicoes = {
    "S": 0,
    "A": 1,
    "B": 2,
    "C": 3,
    "a": 0,
    "b": 1,
    "c": 2,
    "$": 3
}

var pilha = "$S";
var fila = "acacbb$";
var contador = 1;
var letrasPercoridas = 0;
var sucesso = true;
var executar = true;
var saidaAcao = $(".valoresAcao"); //tabela onde serão escritas as ações realizadas

$(document).ready(function() {
    $(".insereSentença").click(function() {
        limparCampos();
        $('.executarSentenca').removeAttr('disabled');
        $('.executarTodaSentenca').removeAttr('disabled');

        var sentencaEntrada = $(".sentencaEntrada").val().trim() + "$";
        fila = sentencaEntrada; //adiciona à variavel global fila a sentença digitada
        var quantidade = sentencaEntrada.length;

        //monta a Fila dos caracteres
        for (var i = 0; i < quantidade; i++) {
            var html = "<div class='posicao posicao-" + i + "'>" + sentencaEntrada[i] + "</div>";
            $(".filaCararteres").append(html);
        }
        $('.posicao-0').addClass('letraSublinhada');
    });

    $(".limparTabela").click(function() {
        limparCampos();
    });

    //Gera a Sentenca
    $('.tabela_geradora').click(function() {
        var linha = $(this).data('linha');
        var col = $(this).data('col');

        var posicaoMatrizGeracao = matrizTabela[linha][col];//Acha a posicao na matriz

        //console.log("Gerou: " + posicaoMatrizGeracao["gerador"]);
        //console.log("Nao Terminal: " + posicaoMatrizGeracao["naoTerminal"]);

        var sentencaQueGerou = $('.geracao-gramatica').text().trim();//Sentenca anterior
        var sentencaGerada = sentencaQueGerou.replace(posicaoMatrizGeracao["naoTerminal"], posicaoMatrizGeracao["gerador"]);

        $('.geracao-gramatica').html(sentencaGerada);

        var naoTerminalNaoAchado = false; //nao terminal não encontrado
        for (var i = 0; i < sentencaGerada.length; i++) { //itera por toda a geracao

            if (!naoTerminalNaoAchado) {
                $(".tabela-geracao-gramatica tbody tr").css("background-color", "#EF5350");
            }

            if (sentencaGerada[i] === "S" && !naoTerminalNaoAchado) { //se encontrar o S e o nao terminal ainda nao tenha sido encontrado          
                $("#S").css("background-color", "#66BB6A");
                naoTerminalNaoAchado = true;
            }

            if (sentencaGerada[i] === "A" && !naoTerminalNaoAchado) { //se encontrar o A e o não nao terminal ainda nao tenha sido encontrado
                $("#A").css("background-color", "#66BB6A");
                naoTerminalNaoAchado = true;
            }

            if (sentencaGerada[i] === "B" && !naoTerminalNaoAchado) { //se encontrar o B e o nao terminal ainda nao tenha sido encontrado
                $("#B").css("background-color", "#66BB6A");
                naoTerminalNaoAchado = true;
            }

            if (sentencaGerada[i] === "C" && !naoTerminalNaoAchado) { //se encontrar o C e o nao terminal ainda nao tenha sido encontrado
                $("#C").css("background-color", "#66BB6A");
                naoTerminalNaoAchado = true;
            }
        }

    });

    $('.ok-gerador').click(function() {
        var pegaSentenca = $('.geracao-gramatica').text();
        $('.sentencaEntrada').val(pegaSentenca.trim());
        limparTabelaGeracao();
    });
});

function executarPassoaPasso() {
    var topoPilha = pilha.charAt(pilha.length - 1);
    var primeiroCharFila = fila.charAt(0);
    if (primeiroCharFila != 'S' && primeiroCharFila != 'A' && primeiroCharFila != 'B' && primeiroCharFila != 'C') {
        if (topoPilha === "$" && primeiroCharFila === "$") {

            $('.executarSentenca').attr('disabled', 'disabled');
            $('.executarTodaSentenca').attr('disabled', 'disabled');

            var maisUmaLinhaTabela = "<tr>" +
                "<td> " + pilha + " </td>" +
                "<td>" + fila + "</td>" +
                "<td> Aceito em: " + contador + " iterações</td>" +
                "</tr>";
            saidaAcao.append(maisUmaLinhaTabela); //escreve a Acao feita na tabela      
            executar = false;

        } else if (topoPilha === primeiroCharFila) {//Desempilha
            var htmlAcao1 = "<tr>" +
                "<td>" + pilha + "</td>" +
                "<td>" + fila + "</td>" +
                "<td> Lê " + topoPilha + "</td>" +
                "</tr>";
            saidaAcao.append(htmlAcao1); //escreve a Acao feita na tabela

            pilha = pilha.substr(0, pilha.length - 1); //desempilha a pilha
            fila = fila.substr(1, fila.length); //desempilha a fila
            contador++; //Numero de iteracoes

            //Marca a letra que esta na fila
            $('.posicao-' + letrasPercoridas).removeClass('letraSublinhada');
            letrasPercoridas++;
            $('.posicao-' + letrasPercoridas).addClass('letraSublinhada');

        } else {
            var topoPilhaMapa = mapaDePosicoes[topoPilha];
            var primeiroCharFilaMapa = mapaDePosicoes[primeiroCharFila];
            var elementoMatriz = null;
            
            if(topoPilha == 'S' || topoPilha == 'A' || topoPilha == 'B' || topoPilha == 'C'){
                elementoMatriz = matrizTabela[topoPilhaMapa][primeiroCharFilaMapa];
            } 
            
            if ( (topoPilha == '$' && primeiroCharFila != '$') || (elementoMatriz == null) ) {//elementoMatriz = para ver se nao tem caracter que nao existe na gramatica, ex D,F
                var htmlAcao3 = "<tr>" +
                    "<td>" + pilha + "</td>" +
                    "<td>" + fila + "</td>" +
                    "<td> erro em " + contador + " iterações </td>" +
                    "</tr>";
                saidaAcao.append(htmlAcao3);
                $('.executarSentenca').attr('disabled', 'disabled');
                $('.executarTodaSentenca').attr('disabled', 'disabled');
                sucesso = false;
                executar = false;
            } else if (elementoMatriz["producaoInversa"] != "-") {//Monta na coluna da Pilha
                var htmlAcao2 = "<tr>" +
                    "<td>" + pilha + "</td>" +
                    "<td>" + fila + "</td>" +
                    "<td>" + elementoMatriz["producao"] + "</td>" +
                    "</tr>";
                saidaAcao.append(htmlAcao2); //escreve a Acao feita na tabela

                pilha = pilha.substr(0, pilha.length - 1); //desempilha a pilha
                pilha += elementoMatriz["producaoInversa"]; // atribui a regra inversa
                contador++; //Numero de iteracoes
            } else {
                var htmlAcao3 = "<tr>" +
                    "<td>" + pilha + "</td>" +
                    "<td>" + fila + "</td>" +
                    "<td> erro em " + contador + " iterações </td>" +
                    "</tr>";
                saidaAcao.append(htmlAcao3);
                $('.executarSentenca').attr('disabled', 'disabled');
                $('.executarTodaSentenca').attr('disabled', 'disabled');
                sucesso = false;
                executar = false;
            }
        }
        scrollPage();
    } else {
        var htmlAcao5 = "<tr>" +
            "<td>" + pilha + "</td>" +
            "<td>" + fila + "</td>" +
            "<td> erro em " + contador + " iterações </td>" +
            "</tr>";
        saidaAcao.append(htmlAcao5);
        $('.executarSentenca').attr('disabled', 'disabled');
        $('.executarTodaSentenca').attr('disabled', 'disabled');
        sucesso = false;
        executar = false;
    }
}

function executarTudo() {
    var topoPilha = pilha.charAt(pilha.length - 1);
    var primeiroCharFila = fila.charAt(0);

    $('.executarTodaSentenca').attr('disabled', 'disabled');
    $('.executarSentenca').attr('disabled', 'disabled');    
    executarPassoaPasso(); 
        //Este IF eh para quando termina o passo a passo, ai ele constroe a ultima linha
    if (topoPilha === "$" && primeiroCharFila === "$") {
        if ((topoPilha != "$" || primeiroCharFila != "$") && sucesso) {//sucesso era pra nao ficar em loop quando a sentenca acabava

            $('.executarSentenca').attr('disabled', 'disabled');
            $('.executarTodaSentenca').attr('disabled', 'disabled');
            var maisUmaLinhaTabela = "<tr>" +
                "<td> " + pilha + " </td>" +
                "<td>" + fila + "</td>" +
                "<td> Aceito em: " + contador + " iterações</td>" +
                "</tr>";
            saidaAcao.append(maisUmaLinhaTabela);
            executar = false;
        }
    }
    if (executar) {
        setTimeout(executarTudo, 300);
    }
}

function limparTabelaGeracao() {
    $(".tabela-geracao-gramatica tbody tr").css("background-color", "#EF5350");
    $("#S").css("background-color", "#66BB6A");
    $('.geracao-gramatica').html("S");
}

function limparCampos() {
    $('.filaCararteres').html("");
    $('.valoresAcao').html("");
    $('.geracao-gramatica').html("S");
    pilha = "$S";
    sucesso = true;
    contador = 1;
    executar = true;
    letrasPercoridas = 0;
}

function scrollPage() {
    $('body').animate({
        scrollTop: $('body').height()
    }, 10);
}