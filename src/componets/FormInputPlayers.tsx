import { addPlayer } from "../store/LuckyRaffleStore"
import { useState, type FormEvent } from "react";

export const FormInputPlayers = () => {

    const [rawPlayers, setRawPlayers] = useState('');

    const handlePlayers = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!rawPlayers.trim()) return;

        const newPlayers = rawPlayers
            .split(/[,\n]/)
            .map((name) => name.trim())
            .filter((name) => name !== "")
            .map(name => `${name.charAt(0).toUpperCase()}${name.slice(1)}`)

        newPlayers.forEach(newPlayer => {
            addPlayer(newPlayer);
        });

        setRawPlayers('');
    }

    return (
        <form onSubmit={handlePlayers} className="flex flex-col gap-4 text-xl">
            <div className="flex flex-col gap-2">
                <label htmlFor="list-names">
                    Ingrese la lista de participantes a continuación uno por
                    línea o separados por coma.
                </label>
                <textarea
                    onChange={(event) => setRawPlayers(event.target.value)}
                    value={rawPlayers}
                    className="min-h-[100px] w-full border-1 border-gray-100 shadow px-5 py-5 rounded-xl"
                    rows={3}
                    cols={50}
                    placeholder="Ej: Juan, María, Pedro"
                    id="list-names"></textarea>
            </div>
            <button
                className="button-primary"
            >
                Agregar participantes
            </button>
        </form>
    )
}
