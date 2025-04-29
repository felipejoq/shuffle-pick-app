import { v4 as uuid } from 'uuid'
import { persistentMap } from '@nanostores/persistent'

export type Player = {
    id: string;
    name: string;
    selected: boolean;
}

export const players = persistentMap<Record<string, Player>>('playersList', {}, {
    encode: JSON.stringify,
    decode: JSON.parse
});

// Actions
export function addPlayer(name: string, id?: string): void {
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

export const togglePlayerSelected = (id: string): void => {
    const player = players.get()[id];

    players.setKey(id, {
        ...player,
        selected: !player.selected
    });
}