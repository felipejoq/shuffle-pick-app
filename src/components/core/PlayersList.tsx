import { useStore } from "@nanostores/react"
import { players } from "../../store/ShufflePickStore"
import { PlayerItem } from "./PlayerItem";

export const PlayersList = () => {
    const $players = useStore(players);

    return (
        <div className="flex flex-col gap-2">
            {
                !Object.keys($players).length
                    ? 'The list has no records...'
                    : (Object.entries($players).map(([key, player]) => (
                        <PlayerItem key={key} player={player} />
                    )))
            }
        </div>
    )
}
