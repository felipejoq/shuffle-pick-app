import {v4 as uuid} from 'uuid'
import {persistentAtom, persistentMap} from '@nanostores/persistent'
import {atom} from 'nanostores';

export type Player = {
  id: string;
  name: string;
  selected: boolean;
}

export enum APP_STATE {
  IDLE = "Idle",
  PLAYING = "Playing",
  RESULT = "Result",
  LOADING = "Loading",
}

export const lastPlayerPicked = persistentAtom<Player | null>('last-picked', null, {
  encode: JSON.stringify,
  decode: JSON.parse
});

export const players = persistentMap<Record<string, Player>>('player', {}, {
  encode: JSON.stringify,
  decode: JSON.parse
});

export const app_state = atom<APP_STATE>(APP_STATE.IDLE);

// Actions
export const addPlayer = (name: string, id?: string): void => {
  app_state.set(APP_STATE.LOADING);
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
  app_state.set(APP_STATE.IDLE);
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
  if (id === lastPlayerPicked.get()?.id) {
    lastPlayerPicked.set(null)
  }
  players.set(currentPlayers);
}

export const togglePlayerSelected = (id: string): void => {
  const player = players.get()[id];

  players.setKey(id, {
    ...player,
    selected: !player.selected
  });
}

export const resetPlayerList = (): void => {
  players.set({});
  lastPlayerPicked.set(null)
}

export const setLastPlayerSelected = (player: Player) => {
  lastPlayerPicked.set(player)
}

export const getRandomPlayer = async (): Promise<Player | null> => {
  app_state.set(APP_STATE.PLAYING);

  const idPlayers = Object.keys(players.get());

  const idFiltered = idPlayers.filter(id => !players.get()[id].selected);

  if (!idFiltered.length) {
    app_state.set(APP_STATE.IDLE);
    return null;
  }

  await new Promise(resolve => setTimeout(resolve, Math.floor(
    Math.random() * 2000
  )));

  const playerIdSelected = idFiltered[Math.floor(Math.random() * idFiltered.length)];

  const playerPicked = players.get()[playerIdSelected];

  togglePlayerSelected(playerIdSelected);
  setLastPlayerSelected(playerPicked);

  app_state.set(APP_STATE.RESULT);

  return playerPicked;
}

export const startOverList = () => {
  Object.keys(players.get()).map(id => {
    const player = players.get()[id];
    const playerReset = {
      ...player,
      selected: false,
    }
    players.setKey(id, playerReset)
  });
}