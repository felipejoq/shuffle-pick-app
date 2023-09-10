import './style.css';
import {
    deletePlayerListBtn,
    detailsAddPlayers,
    getRandomPlayerBtn,
    playerList,
    playersForm,
    resetGameBtn
} from "./core/htmlElements.js";
import {convertToArray, getText} from "./core/helpers/convertToArray.js";
import {getPlayers, removePlayer} from "./core/services/player.js";
import {removePlayers, resetGame} from "./core/controls/game.js";
import {renderLastPlayerSelected, renderPlayerList} from "./core/helpers/renderers.js";
import {getRandomPlayer} from "./core/controllers/game.js";

const players = getPlayers();

playersForm.addEventListener('submit', (event) => {
    event.preventDefault();
    for (const element of event.target.children) {
        if (element.id === 'players') {
            const text = getText(element);

            convertToArray(text);

            element.value = '';
            detailsAddPlayers.open = false;
        }
    }

    renderPlayerList(playerList, getPlayers());
});

playerList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        removePlayer(event.target.closest('li').id);
    }
});

getRandomPlayerBtn.addEventListener('click', async () => {
    await getRandomPlayer();
});

resetGameBtn.addEventListener('click', () => {
    resetGame();
});

deletePlayerListBtn.addEventListener('click', () => {
    removePlayers()
});

renderPlayerList(playerList, players);
renderLastPlayerSelected();