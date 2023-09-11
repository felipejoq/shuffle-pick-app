import {detailsAddPlayers, playerList, selectedPlayer} from "../htmlElements.js";
import {getPlayers, setPlayers} from "../services/player.js";
import {renderPlayerList} from "../helpers/renderers.js";
import {alerts} from "../helpers/alerts.js";

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
    alerts.question(
        'Borrar jugadores',
        '¿Quiere borrar la lista completa de jugadores? Esta acción es irreversible.',
        'Sí, borrar')
        .then(result => {
                if (result.isConfirmed) {
                    setPlayers([]);
                    detailsAddPlayers.open = true;
                    renderPlayerList(playerList, []);
                }
            }
        );

}