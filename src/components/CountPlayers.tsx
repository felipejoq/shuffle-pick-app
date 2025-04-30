import { useStore } from "@nanostores/react"
import { players } from "../store/LuckyRaffleStore"

export const CountPlayers = () => {

  const $players = useStore(players);
  
  return (
    <span>{Object.keys($players).length}</span>
  )
}
