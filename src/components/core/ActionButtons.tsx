import { useStore } from "@nanostores/react"
import { ListRestart, Shuffle, Trash2 } from "lucide-react"
import { players } from "../../store/LuckyRaffleStore"
import { useEffect, useState } from "react";

export const ActionButtons = () => {

	const $players = useStore(players);
	const [hasPlayers, setHasPlauers] = useState(Boolean(!Object.keys($players).length));

	useEffect(() => {
		setHasPlauers(Boolean(!Object.keys($players).length));
	}, [$players])

	return (
		<div className="text-xl my-4">
			<button disabled={hasPlayers} className="button-secondary">
				<Shuffle size={24} />
				Draw One
			</button>
			<div
				className="flex flex-row justify-between items-center gap-5 my-4"
			>
				<button disabled={hasPlayers} className="button-mutted">
					<ListRestart size={24} />
					Start over
				</button>
				<button disabled={hasPlayers} className={`button-mutted ${hasPlayers ? 'text-red-300' : ' text-red-600'}`}>
					<Trash2 size={24} />
					Clear list
				</button>
			</div>
		</div>
	)
}
