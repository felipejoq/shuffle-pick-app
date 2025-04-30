import { ListRestart, Shuffle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { CustomToast } from "../shared/CustomToast"
import { usePickActions } from "../../hooks/usePickActions";

export const ActionButtons = () => {


	const {
		hasPlayers,
		handleDrawOne,
		handleStartOver,
		handleClearList,
	} = usePickActions();

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
					<button
						onClick={handleStartOver}
						disabled={hasPlayers}
						className="button-mutted"
					>
						<ListRestart size={24} />
						Start over
					</button>
					<button
						disabled={hasPlayers}
						className={`button-mutted ${hasPlayers ? 'text-red-300' : ' text-red-600'}`}
						onClick={() => {
							toast.custom((t) => (
								<CustomToast message={"Clear Player List?"} t={t} callback={handleClearList} />
							), { duration: Infinity });
						}}
					>
						<Trash2 size={24} />
						Clear list
					</button>
				</div>
			</div>
		</>
	)
}
