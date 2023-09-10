import {detailsAddPlayers, lastResult, playersCount, selectedPlayer} from "../htmlElements.js";
import {getPlayers, setPlayers} from "../services/player.js";

export const renderPlayerList = (element, players) => {
    element.innerHTML = '';

    if (players.length > 0) detailsAddPlayers.open = false;

    let html = '<ol>';
    players.forEach((player) => {
        html += `
                    <li class="${player.selected ? 'has-been-selected' : ''}" id="${player.id}">
                        <span>${player.name}</span>
                        <button class="btn-danger" type="button">
                            x
                        </button>
                    </li>
                `;
    });
    html += '</ol>';
    playersCount.textContent = `(${players.length})`;
    element.innerHTML = html;
}

export const setResults = (randomPlayer, players) => {
    const liSelected = document.getElementById(randomPlayer.id);

    let lastPlayer = undefined;

    const newPlayers = players.map(player => {
        if (player.id === randomPlayer.id) {
            player.selected = true;
            player.lastResult = true;
            lastPlayer = player;
            return player;
        }
        player.lastResult = false;
        return player;
    });

    setPlayers(newPlayers);

    liSelected.classList.add('highlighted');
    selectedPlayer.style.display = 'block';
    lastResult.style.display = 'block';
    selectedPlayer.innerHTML = `<i class="fa-solid fa-circle-check"></i> Resultado: <strong>${randomPlayer.name}</strong>`;
    lastResult.innerHTML = `<i class="fa-solid fa-circle-info"></i> Último resultado: ${lastPlayer.name}`;
}

export const renderLastPlayerSelected = () => {
    const players = getPlayers();
    const lastPlayer = players.find(player => player.lastResult === true);
    if (lastPlayer) {
        lastResult.style.display = 'block';
        lastResult.innerHTML = `<i class="fa-solid fa-circle-info"></i> Último resultado: ${lastPlayer.name}`;
    } else {
        lastResult.style.display = 'none';
    }
}