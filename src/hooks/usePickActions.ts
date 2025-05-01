import { useStore } from "@nanostores/react";
import { getRandomPlayer, players, resetPlayerList, startOverList } from "../store/ShufflePickStore";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const usePickActions = () => {

    const $players = useStore(players);
    const [hasPlayers, setHasPlayers] = useState(Boolean(!Object.keys($players).length));

    useEffect(() => {
        setHasPlayers(Boolean(!Object.keys($players).length));
    }, [$players]);

    const handleDrawOne = () => {
        const result = getRandomPlayer();
        if (!result) toast.success('All players have been picked. Reset the game!');
    }

    const handleStartOver = () => {
        startOverList();
    }

    const handleClearList = () => {
        resetPlayerList()
        toast.info('The list was reset');
    }

    return {
        hasPlayers,
        handleDrawOne,
        handleStartOver,
        handleClearList,
    }
}
