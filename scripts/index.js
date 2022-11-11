const TOTAL_NUMBER_OF_POKEMON = 895;
const NUMBER_OF_BUTTONS = 4;
const WINNING_BUTTON_BACKGROUND_COLOR = '#1B8E3A';
const DEFAULT_BUTTON_BACKGROUND_COLOR = '#555555';


async function changePokemonButtonColorsToGreen(WINNING_BUTTON_BACKGROUND_COLOR) {
  document.getElementById("pokemon-button1").style.background=WINNING_BUTTON_BACKGROUND_COLOR;
  document.getElementById("pokemon-button2").style.background=WINNING_BUTTON_BACKGROUND_COLOR;
  document.getElementById("pokemon-button3").style.background=WINNING_BUTTON_BACKGROUND_COLOR;
  document.getElementById("pokemon-button4").style.background=WINNING_BUTTON_BACKGROUND_COLOR;
}

async function changePokemonButtonColorsToDefault(DEFAULT_BUTTON_BACKGROUND_COLOR) {
  document.getElementById("pokemon-button1").style.background=DEFAULT_BUTTON_BACKGROUND_COLOR;
  document.getElementById("pokemon-button2").style.background=DEFAULT_BUTTON_BACKGROUND_COLOR;
  document.getElementById("pokemon-button3").style.background=DEFAULT_BUTTON_BACKGROUND_COLOR;
  document.getElementById("pokemon-button4").style.background=DEFAULT_BUTTON_BACKGROUND_COLOR;
}

async function hideLoadingCircle() {
    const loadingCircle = document.getElementById("loading");
    loadingCircle.style.display = "none";
  }

async function getRandomPokemon(amount) {
    const allPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=${TOTAL_NUMBER_OF_POKEMON}`)
        .then(res => res.json());

    const randomPokemon = allPokemon.results
        .sort(() => Math.random() * 2 - 1)
        .slice(0, amount);

    return randomPokemon;
}

async function getWinnerPokemon(pokemonList) {
    const index = Math.floor(pokemonList.length * Math.random())
    const basicWinnerObj = await fetch(pokemonList[index].url).then(res => res.json())
    const id = basicWinnerObj.id;

    const winner = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
    return winner;
}


async function setupGame() {
    const pokemonButtons = document.querySelectorAll('.pokemon-button');
    const randomPokemon = await getRandomPokemon(NUMBER_OF_BUTTONS);
    const winner = await getWinnerPokemon(randomPokemon);
    
    const img = document.getElementById("pokemonOnTheScreen");
    img.src = winner.sprites.front_default;

    changePokemonButtonColorsToDefault(DEFAULT_BUTTON_BACKGROUND_COLOR);
    hideLoadingCircle();

    for (let i = 0; i < pokemonButtons.length; i++) {
        const pokemonButton = pokemonButtons[i];

        const name = randomPokemon[i].name;

        pokemonButton.textContent = name; 
        pokemonButton.addEventListener('click', e => {
            if (name === winner.name) {
                console.log("setupGame() name: " + name);
                alert("You won");
                changePokemonButtonColorsToGreen(WINNING_BUTTON_BACKGROUND_COLOR);
            } else {
                alert("Go home, loser! >:(");
            }
        })
    }
}

function refreshPage() {
    location.reload();
    return false;
}

setupGame();


document.querySelector('.reset-button').addEventListener('click', refreshPage);