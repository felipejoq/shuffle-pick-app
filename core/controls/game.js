import {detailsAddPlayers, playerList, selectedPlayer} from "../htmlElements.js";
import {getPlayers, setPlayers} from "../services/player.js";
import {renderPlayerList} from "../helpers/renderers.js";

export const resetGame = () => {
    const players = getPlayers();
    const resetPlayers = players.map(player => {
        player.selected = false;
        player.lastResult = false;
        return player;
    });
    selectedPlayer.style.display = 'none';
    setPlayers(resetPlayers);
    renderPlayerList(playerList, players)
}

export const removePlayers = () => {
    setPlayers([]);
    detailsAddPlayers.open = true;
    renderPlayerList(playerList);
}