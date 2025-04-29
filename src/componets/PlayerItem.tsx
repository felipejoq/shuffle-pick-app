import type { Player } from "../store/LuckyRaffleStore"

export const PlayerItem = ({ name }: Partial<Player>) => {
    return (
        <div className="flex flex-row justify-between items-center bg-primary text-white px-3 py-1 rounded-2xl font-extralight">
            <div>
                x
            </div>
            <p className="line-clamp-1">{name}</p>
            <div>Edit</div>
        </div>
    )
}
