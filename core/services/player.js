import {playerList} from "../htmlElements.js";
import {renderPlayerList} from "../helpers/renderers.js";

export const getPlayers = () => {
    return JSON.parse(localStorage.getItem('players')) || [];
}

export const setPlayers = (players) => {
    localStorage.setItem('players', JSON.stringify(players));
}

export const removePlayer = (id) => {
    const players = getPlayers();
    const index = players.findIndex(player => player.id === id);
    players.splice(index, 1);
    setPlayers(players);
    renderPlayerList(playerList, players);
}