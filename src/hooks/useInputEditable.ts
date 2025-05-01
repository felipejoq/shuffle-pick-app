import { useState, type ChangeEvent, type FocusEventHandler, type KeyboardEvent } from "react";
import { deletePlayer, editPlayer } from "../store/ShufflePickStore";

interface InitialSateHook {
    id: string;
    name: string;
    editable: boolean;
}

export const useInputEditable = ({ id, name, editable }: InitialSateHook) => {

    const [isEditable, setIsEditable] = useState(editable);
    const [nameText, setNameText] = useState(name);

    const handleDoubleClick = () => {
        setIsEditable(true);
    }

    const handleInputBlur = () => {
        setIsEditable(false);
        if (!nameText.trim()) {
            setNameText(name);
            return;
        }

        editPlayer(id, nameText);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNameText(event.target.value);
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setIsEditable(false);
            if (!nameText.trim()) {
                setNameText(name);
                return;
            }
            setNameText(nameText);
            editPlayer(id, nameText);
        } else if (event.key === "Escape") {
            setIsEditable(false);
            setNameText(name);
        }
    }

    const handleOnFocus: FocusEventHandler<HTMLInputElement> = (event) => {
        event.target.select();
    }

    const handleDeletePlayer = () => {
        deletePlayer(id)
    }

    return {
        isEditable,
        nameText,
        handleDoubleClick,
        handleInputBlur,
        handleInputChange,
        handleKeyDown,
        handleOnFocus,
        handleDeletePlayer,
    }
}