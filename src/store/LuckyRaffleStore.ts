import { v4 as uuid } from 'uuid'
import { persistentMap } from '@nanostores/persistent'

export type Player = {
    id: string;
    name: string;
    selected: boolean;
}

export const players = persistentMap<Record<string, Player>>('player', {}, {
    encode: JSON.stringify,
    decode: JSON.parse
});

// Actions
export const addPlayer = (name: string, id?: string): void => {
    if (id) {
        const existPlayer = players.get()[id];
        players.setKey(id, {
            ...existPlayer,
            name
        })
    } else {
        const newId = uuid();
        players.setKey(newId, {
            id: newId,
            name,
            selected: false
        });
    }
}

export const editPlayer = (id: string, name: string): void => {
    const playerFound = players.get()[id];

    players.setKey(id, {
        ...playerFound,
        name,
    });
}

export const deletePlayer = (id: string): void => {
    const currentPlayers = Object.assign({}, players.get());
    delete currentPlayers[id];
    players.set(currentPlayers);
}

export const togglePlayerSelected = (id: string): void => {
    const player = players.get()[id];

    players.setKey(id, {
        ...player,
        selected: !player.selected
    });
}