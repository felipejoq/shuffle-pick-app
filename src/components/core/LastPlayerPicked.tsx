import { useStore } from "@nanostores/react"
import { lastPlayerPicked } from "../../store/ShufflePickStore"
import { ArrowBigDown, ArrowBigRight, Crown } from "lucide-react";


export const LastPlayerPicked = () => {

    const $lastPlayerPicked = useStore(lastPlayerPicked);

    return (
        $lastPlayerPicked
            ? (<span className="flex gap-2 items-center text-primary">
                <ArrowBigRight size={24} />
                <Crown size={24} />
                {$lastPlayerPicked.name}
            </span>)
            : "..."
    )
}
