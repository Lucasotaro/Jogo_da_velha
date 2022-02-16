const celulas = document.getElementsByClassName("celula")

let checarTurno = true

const JOGADOR_X = "X"
const JOGADOR_O = "O"

let combinacoes = [[0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]]


document.addEventListener("click", (event) => {
    if(event.target.matches(".celula")){
       jogar(event.target.id)
    }
});

function jogar(id){
    const celula = document.getElementById(id)
    let turno

    if(checarTurno == true){
        turno = JOGADOR_X
        celula.classList.add("fundoX")
    }

    else if(checarTurno == false){
        turno = JOGADOR_O
        celula.classList.add("fundoO")
    }

    celula.textContent = turno
    celula.classList.add(turno)
    checarVencedor(turno)
}

function checarVencedor(turno){
    let vencedor = combinacoes.some((percorrerArray) => {
        return percorrerArray.every((posicao) => { 
            return celulas[posicao].classList.contains(turno)
        })
    })

    if(vencedor == true){
        encerrarJogo(turno)
    }

    else if(checarEmpate()){
        encerrarJogo()
    }

    else{
        checarTurno = !checarTurno
    }
}


function encerrarJogo(vencedor){

    if(vencedor){
        let p = document.querySelector("p")
        p.innerHTML = "Vencedor: " + vencedor

        document.getElementById("container").style.pointerEvents = "none"

        setTimeout(() => location.reload(), 3000)
    }

    else{
        let p = document.querySelector("p")
        p.innerHTML = "Deu velha"

        setTimeout(() => location.reload(), 3000)
    }
}

function checarEmpate(){

    let X = 0
    let O = 0

    for(posicao in celulas){

        if(!isNaN(posicao)){

            if(celulas[posicao].classList.contains(JOGADOR_X)){
                X++
            }
    
            if(celulas[posicao].classList.contains(JOGADOR_O)){
                O++
                
            }
        }

    }

    if(X + O == 9){
        return true
    }

    else{
        return false
    }
}