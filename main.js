import './style.css';

// HTML Elements
const playersForm = document.getElementById('playersForm');
const playerList = document.getElementById('playerList');
const getRandomPlayerBtn = document.getElementById('getRandomPlayer');
const selectedPlayer = document.getElementById('selectedPlayer');
const resetGameBtn = document.getElementById('resetGame');
const deletePlayerListBtn = document.getElementById('deletePlayerList');
const detailsAddPlayers = document.getElementById('detailsAddPlayers');
const playersCount = document.getElementById('playersCount');
const lastResult = document.getElementById('lastResult');

playersForm.addEventListener('submit', (event) => {
    event.preventDefault();
    for (const element of event.target.children) {
        if (element.id === 'players') {
            const text = getText(element);
            const array = convertToArray(text);
            element.value = '';
            detailsAddPlayers.open = false;
        }
    }

    renderPlayerList(playerList)
});


playerList.addEventListener('click', (event) => {
    if (event.target.type === 'button' || event.target.closest('button').type === 'button') {
        removePlayer(event.target.closest('li').id);
    }
});

getRandomPlayerBtn.addEventListener('click', () => {
    getRandomPlayer();
});

resetGameBtn.addEventListener('click', () => {
    resetGame();
});

deletePlayerListBtn.addEventListener('click', () => {
    removePlayers()
});

const getPlayers = () => {
    return JSON.parse(localStorage.getItem('players')) || [];
}

const setPlayers = (players) => {
    localStorage.setItem('players', JSON.stringify(players));
}

const convertToArray = (text) => {
    let lines = text.split(/\s*,|\n/);
    lines = lines.filter(line => line.trim());
    lines = lines.map(line => {
        return {
            id: getRandomId(),
            name: line,
            selected: false,
            lastResult: false
        }
    });

    lines = [
        ...getPlayers(),
        ...lines
    ];

    setPlayers(lines);

    return lines;
}

const getText = (input) => {
    const content = input.value;
    const regex = /<[^>]+>/;
    if (regex.test(content)) {
        throw new Error('El contenido debe ser solo texto separado por comas o saltos de línea');
    }
    return content;
}

const removePlayer = (id) => {
    console.log('Eliminar player con id:', id)
    const players = getPlayers();
    const index = players.findIndex(player => player.id === id);
    players.splice(index, 1);
    setPlayers(players);
    renderPlayerList(playerList);
}

const renderPlayerList = (element) => {
    element.innerHTML = '';
    const players = getPlayers();

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


const getRandomId = (length = 6) => {
    return Math.random().toString(36).substring(2, length + 2);
};

const selectRandomPlayer = () => {
    const players = getPlayers();
    return players[Math.floor(Math.random() * players.length)];
}

const getRandomPlayer = async () => {
    const players = getPlayers();
    if (players.length <= 0) return;

    renderPlayerList(playerList);

    const hasEveryoneParticipated = players.find(player => player.selected === false);

    if (!hasEveryoneParticipated) {
        alert('Todos los jugadores ya han participado al menos una vez.');
        return;
    }

    let randomPlayer = selectRandomPlayer();

    while (randomPlayer.selected) {
        randomPlayer = selectRandomPlayer();
    }

    const items = document.querySelectorAll('ol li');

    items.forEach(item => {
        item.classList.remove('highlighted');
    });

    const highlightDuration = 2000;
    const endTime = Date.now() + highlightDuration;

    const highlightInterval = setInterval(() => {
        let randomIndex = Math.floor(Math.random() * items.length);

        while (players[randomIndex].selected) {
            randomIndex = Math.floor(Math.random() * items.length);
        }

        items[randomIndex].classList.add('highlighted');

        setTimeout(() => {
            items[randomIndex].classList.remove('highlighted');
        }, 100);

        if (Date.now() >= endTime) {
            clearInterval(highlightInterval);
        }
    }, 200);

    await new Promise(resolve => setTimeout(resolve, highlightDuration+200));

    setResults(randomPlayer, players);

}

const setResults = (randomPlayer, players) => {
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

    console.log(liSelected);
    liSelected.classList.add('highlighted');
    selectedPlayer.style.display = 'block';
    lastResult.style.display = 'block';
    selectedPlayer.innerHTML = `<i class="fa-solid fa-circle-check"></i> Resultado: <strong>${randomPlayer.name}</strong>`;
    lastResult.innerHTML = `<i class="fa-solid fa-circle-info"></i> Último resultado: ${lastPlayer.name}`;
}

const getLastPlayerSelected = () => {
    const players = getPlayers();
    const lastPlayer = players.find(player => player.lastResult === true);
    if (lastPlayer) {
        lastResult.style.display = 'block';
        lastResult.innerHTML = `<i class="fa-solid fa-circle-info"></i> Último resultado: ${lastPlayer.name}`;
    } else {
        lastResult.style.display = 'none';
    }
}

const resetGame = () => {
    const players = getPlayers();
    const resetPlayers = players.map(player => {
        player.selected = false;
        player.lastResult = false;
        return player;
    });
    selectedPlayer.style.display = 'none';
    setPlayers(resetPlayers);
    renderPlayerList(playerList)
}

const removePlayers = () => {
    setPlayers([]);
    detailsAddPlayers.open = true;
    renderPlayerList(playerList);
}

renderPlayerList(playerList);
getLastPlayerSelected();