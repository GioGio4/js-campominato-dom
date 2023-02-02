// TRACCIA//
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. 
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, 
// perciò nell'array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati 
// - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. 
// Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile 
// di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Errata corrige: rendere le caselle "non cliccabili" e far finire la partita è un superbonus, 
// non è richiesto dalla consegna!
// Al termine della partita il software deve comunicare il punteggio, 
// cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba.
//---------------------------------- BONUS//-------------------------------
// SUPERBONUS 1
// Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.
// SUPERBONUS 2
// Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.
// -----------------------------------------------------------------------------//


/************************************************
 *                                              *
 *                 ON LOAD                      *
 *                                              *
************************************************/

const btn_play_game = document.getElementById("btn-play-game");
//Variabile per controllare il punteggio del giocatore
let user_score = 0;

const game_over_el = document.getElementById("game-over");
// Creiamo un array (Bombs) che contiene al suo interno 16 numeri generati casualmente (mai ripetuti tra loro) da 1 a 100.
const bombs_list = [];

while (bombs_list.length < 16) {

    let random_number;
    random_number = Math.floor(Math.random() * 100) + 1;

    if (!bombs_list.includes(random_number)) {

        bombs_list.push(random_number);
    }

}


/************************************************
 *                                              *
 *               EVENT LISTENER                 *
 *                                              *
************************************************/

// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
btn_play_game.addEventListener(
    "click",
    function () {
        user_score = 0;
        game_over_el.classList.remove("d-block");
        const grid_el = document.getElementById("grid");
        create_grid(grid_el);
    }
)




/************************************************
 *                                              *
 *                 FUNCTION                     *
 *                                              *
 ************************************************/


//Creiamo una funzione che genera dei DIV con classe .square da inserire nella grid
function create_grid(grid) {

    grid.innerHTML = ("");
    //Generiamo un ciclo che riproduca la funzione per 100 volte
    for (let i = 0; i < 100; i++) {


        // Creaiamo un div
        const square_el = document.createElement("div");

        // Aggiungiamo al DIV la classe Square
        square_el.classList.add("square");

        // Inseriamo il div nella GRID
        grid.append(square_el);

        //Generiamo una sequenza di numeri da 1 a 100 che andranno inseriti dentro ogni Square (in HTML)
        square_el.append(i + 1);


        square_el.addEventListener(
            "click",
            function () {
                // SE l'utente clicca su ogni cella, se il numero NON è presente nella lista Bombe
                //  la cella si colora di celeste 
                if (!bombs_list.includes(parseInt(this.innerHTML))) {
                    square_el.classList.add("active");

                    // L'utente clicca su una cella celeste (Il contatore user-score aumenta di 1)
                    user_score += 1;

                    //SE l'utente clicca su tutte le celle celesti (senza prendere una bomba), stampa HAI VINTO
                    if ((user_score + bombs_list.length) == 100) {
                        alert("HAI VINTO")

                    }

                    // ALTRIMENTI la cella si colora di ROSSO e il gioco si interrompe
                } else {
                    const user_score_el = document.getElementById("user-score");
                    square_el.classList.add("bombs");
                    game_over_el.classList.add("d-block");
                    user_score_el.innerHTML = (parseInt(user_score));
                }

            }
        )

    }

}