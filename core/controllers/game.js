import {renderPlayerList, setResults} from "../helpers/renderers.js";
import {playerList} from "../htmlElements.js";
import {getPlayers} from "../services/player.js";

const HIGHLIGHT_DURATION = 2000;

const selectRandomPlayer = (players) => {
    let playerIs;
    do {
        playerIs = players[Math.floor(Math.random() * players.length)];
    } while (playerIs.selected)
    return playerIs;
}

const hasEveryoneParticipated = (players) => {
    return players.find(player => player.selected === false);
}

export const getRandomPlayer = async () => {
    const players = getPlayers();
    if (players.length <= 0) return;

    renderPlayerList(playerList, players);

    if (!hasEveryoneParticipated(players)) {
        alert('Todos los jugadores ya han participado al menos una vez.');
        return;
    }

    const items = document.querySelectorAll('ol li');

    items.forEach(item => {
        item.classList.remove('highlighted');
    });


    const endTime = Date.now() + HIGHLIGHT_DURATION;

    const highlightInterval = setInterval(() => {
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * items.length);
        } while (players[randomIndex].selected);

        items[randomIndex].classList.add('highlighted');

        setTimeout(() => {
            items[randomIndex].classList.remove('highlighted');
        }, 100);

        if (Date.now() >= endTime) {
            clearInterval(highlightInterval);
        }
    }, 200);

    await new Promise(resolve => setTimeout(resolve, HIGHLIGHT_DURATION + 200));

    const randomPlayer = selectRandomPlayer(players);
    setResults(randomPlayer, players);

}