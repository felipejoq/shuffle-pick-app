import React from "react";
import { useInputEditable } from "../../hooks/useInputEditable";
import type { Player } from "../../store/ShufflePickStore";
import {CircleUser, Delete} from 'lucide-react';

interface Props {
    player: Player;
}

export const PlayerItem: React.FC<Props> = ({ player }) => {

    const { id, name } = player;

    const {
        isEditable,
        nameText,
        handleInputChange,
        handleInputBlur,
        handleDoubleClick,
        handleKeyDown,
        handleOnFocus,
        handleDeletePlayer,
    } = useInputEditable({ id, name, editable: false });

    return (
        <div className="flex flex-row justify-between items-center gap-2">
            <div onDoubleClick={handleDoubleClick} className={`pill-player transition-all ${player.selected ? "bg-green-200 text-gray-600" : "bg-gray-500 text-white"}`}>
            <CircleUser size={24} />
                {
                    isEditable
                        ? (<input
                            autoFocus={isEditable}
                            onFocus={handleOnFocus}
                            className="w-full bg-gray-200 text-gray-600"
                            value={nameText}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            onKeyDown={handleKeyDown}
                        />)
                        : (<span className="line-clamp-1">{name}</span>)
                }
            </div>

            <button className="bg-red-400 hover:bg-red-500 text-white rounded-2xl px-4 py-2" type="button" onClick={handleDeletePlayer}>
                <Delete size={24} />
            </button>
        </div>
    )
}
