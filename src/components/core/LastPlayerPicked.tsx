import {useStore} from "@nanostores/react"
import {APP_STATE, app_state, lastPlayerPicked} from "../../store/ShufflePickStore"
import {ArrowBigRight, Crown, Loader2Icon} from "lucide-react";


export const LastPlayerPicked = () => {

  const $lastPlayerPicked = useStore(lastPlayerPicked);
  const $appState = useStore(app_state);

  return (
    $lastPlayerPicked
      ? (<span className="flex gap-2 items-center text-primary-500">
                <ArrowBigRight size={24}/>
        {
          $appState === APP_STATE.PLAYING
            ? (<><Loader2Icon size={24} className="animate-spin"/> Sorteando...</>)
            : (<><Crown size={24}/> {$lastPlayerPicked.name}</>)
        }
            </span>)
      : "..."
  )
}
