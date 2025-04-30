import { useStore } from "@nanostores/react"
import { ListRestart, Shuffle, Trash2 } from "lucide-react"
import { players, resetPlayerList, togglePlayerSelected } from "../../store/LuckyRaffleStore"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CustomToast } from "../shared/CustomToast"

export const ActionButtons = () => {

	const $players = useStore(players);
	const [hasPlayers, setHasPlayers] = useState(Boolean(!Object.keys($players).length));

	useEffect(() => {
		setHasPlayers(Boolean(!Object.keys($players).length));
	}, [$players]);

	const handleDrawOne = () => {
		const idPlayers = Object.keys($players);
		const randomIdPlayer = idPlayers[Math.floor(Math.random() * idPlayers.length)];

		togglePlayerSelected($players[randomIdPlayer].id);

		console.log($players[randomIdPlayer]);
		
	}

	const handleStartOver = () => {
		console.log('handleStartOver');
	}

	const handleClearList = () => {
		const reset = () => {
			resetPlayerList()
			toast.info('The list was reset');
		}

		toast.custom((t) => (
			<CustomToast message={"Clear Player List?"} t={t} callback={reset} />
		), { duration: Infinity });
	}

	return (
		<>
			<div className="text-xl my-4">
				<button
					onClick={handleDrawOne}
					disabled={hasPlayers}
					className="button-secondary"
				>
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
					<button
						disabled={hasPlayers}
						className={`button-mutted ${hasPlayers ? 'text-red-300' : ' text-red-600'}`}
						onClick={handleClearList}
					>
						<Trash2 size={24} />
						Clear list
					</button>
				</div>
			</div>
		</>
	)
}
