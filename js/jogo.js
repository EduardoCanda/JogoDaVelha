//array de arrays (bidimensional)
var matrizJogo = {}

//um array com três posições, sendo que cada posição contém um outro array de três posições.
matrizJogo['a'] = {}
matrizJogo['b'] = {}
matrizJogo['c'] = {}

//array na chave A, posição 1, 2 e 3
matrizJogo['a'][1] = 0
matrizJogo['a'][2] = 0
matrizJogo['a'][3] = 0

//array na chave B, posição 1, 2 e 3
matrizJogo['b'][1] = 0
matrizJogo['b'][2] = 0
matrizJogo['b'][3] = 0

//array na chave C, posição 1, 2 e 3
matrizJogo['c'][1] = 0
matrizJogo['c'][2] = 0
matrizJogo['c'][3] = 0

//jogadores na partida
const jogadores = 2

//posições
const linhaA = 'a'
const linhaB = 'b'
const linhaC = 'c'
const coluna1 = 1
const coluna2 = 2
const coluna3 = 3

//rodada inicial
var rodada = 1

function ValidarNomes(nome1, nome2) {
    if (nome1 == '' || nome1 == undefined || nome1 == null) {
        alert('Digite os nomes corretamente!')
        return false
    }

    if (nome2 == '' || nome2 == undefined || nome2 == null) {
        alert('Digite os nomes corretamente!')
        return false
    }

    if (nome1 === nome2) {
        alert('Os nomes não podem ser iguais')
        return false
    }

    return true
}

//quando o DOM estiver carregado, será executado a função
$(document).ready(function () {

    //passando o ID do botão iniciar
    $('#BotaoIniciar').click(function () {

        var jogador1 = $('#NomeJogador1').val()
        var jogador2 = $('#NomeJogador2').val()

        //Validação dos nomes
        if (!ValidarNomes(jogador1, jogador2) == true) { return false }

        //passando os nomes para o palco utilizando JQUERY
        $('#NomeJogador1Palco').html(jogador1)
        $('#NomeJogador2Palco').html(jogador2)

        //passando os nomes para o palco utilizando objeto DOM
        //document.getElementById('NomeJogador1Palco').innerHTML = nome1
        //document.getElementById('NomeJogador2Palco').innerHTML = nome2

        //escodendo a página inicial
        $('#PaginaInicial').hide();

        //exibindo o palco
        $('.areaPalco').show();
    })

    $('.jogada').click(function () {
        //obtendo a posição da div clicada. O "this" faz referência ao evento click.
        var idCampoClicado = this.id

        //evitando que após a posição ser clicada, não tenha possibilidades de clique novamente... ou seja não troque X por bola ou vice e versa.
        $('#' + idCampoClicado).off();
        Jogada(idCampoClicado)
    })

    function Jogada(idCampoClicado) {
        var icone = null
        var ponto = null

        //se o resto for 1
        if ((rodada % jogadores) == 1) {
            icone = 'url("../img/marcacao_1.png")'
            ponto = -1
        } else { //se o resto for 0
            icone = 'url("../img/marcacao_2.png")'
            ponto = 1
        }

        //A cada jogada, a rodada será incrementada
        rodada++

        //alternando ícones de acordo com o ID... (X e bolinha)
        $('#' + idCampoClicado).css('background-image', icone)

        //quebrando a string -> exmeplo: b-1 -> saída b1. b na posição 0 e 1 na posição 1
        var linhaColuna = idCampoClicado.split('-')

        //recebendo a linha e coluna
        matrizJogo[linhaColuna[0]][linhaColuna[1]] = ponto

        VerificarCombinacao()
    }

    function VerificarCombinacao() {

        const linhas = 3
        const colunas = 3

        var pontos = 0

        //verificação na horizontal (linhas), posição A, B e C
        for (var i = 1; i <= linhas; i++) {
            pontos += matrizJogo[linhaA][i]
        }
        Ganhador(pontos)

        pontos = 0
        for (var i = 1; i <= linhas; i++) {
            pontos += matrizJogo[linhaB][i]
        }
        Ganhador(pontos)

        pontos = 0
        for (var i = 1; i <= linhas; i++) {
            pontos += matrizJogo[linhaC][i]
        }
        Ganhador(pontos)

        //verificação na vertical (colunas)
        for (var i = 1; i <= colunas; i++) {
            pontos = 0
            pontos += matrizJogo[linhaA][i]
            pontos += matrizJogo[linhaB][i]
            pontos += matrizJogo[linhaC][i]

            Ganhador(pontos)
        }

        //verificação na diagonal
        pontos = 0
        pontos = matrizJogo[linhaA][coluna1] + matrizJogo[linhaB][coluna2] + matrizJogo[linhaC][coluna3]
        Ganhador(pontos)

        //verificação na diagonal invertida
        pontos = 0
        pontos = matrizJogo[linhaC][coluna3] + matrizJogo[linhaB][coluna2] + matrizJogo[linhaA][coluna1]
        Ganhador(pontos)
    }

    function Ganhador(pontos) {
        var jogador1 = $('#NomeJogador1').val()
        var jogador2 = $('#NomeJogador2').val()

        if (pontos == -3) {
            alert('Jogador ' + jogador1 + ' é o vencedor')

            //desativando o evento click, para impedir os clicks após a vitória
            $('.jogada').off()

            //mostrando a página inicial
            $('#PaginaInicial').show()

            //escodendo o palco
            $('.areaPalco').hide()
        } else if (pontos == 3) {
            alert('Jogador ' + jogador2 + ' é o vencedor')
            $('.jogada').off()
            $('#PaginaInicial').show()
            $('.areaPalco').hide()
        }
    }
})