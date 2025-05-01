import { ListPlus } from "lucide-react";
import { addPlayer } from "../../store/ShufflePickStore"
import { useState, type FormEvent } from "react";
import { Toaster, toast } from "sonner";

export const FormInputPlayers = () => {

    const [rawPlayers, setRawPlayers] = useState('');

    const handlePlayers = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!rawPlayers.trim()) {
            toast.info('Please enter at least one participant');
            return;
        }

        const newPlayers = rawPlayers
            .split(/[,\n]/)
            .map((name) => name.trim())
            .filter((name) => name !== "")
            .map(name => `${name.charAt(0).toUpperCase()}${name.slice(1)}`);

        newPlayers.forEach(newPlayer => addPlayer(newPlayer));

        setRawPlayers('');

    }

    return (
        <form onSubmit={handlePlayers} className="flex flex-col gap-4 text-xl">
            <div className="flex flex-col gap-2">
                <label className="text-lg" htmlFor="list-names">Enter the list of participants below, one per line or comma-separated.</label>
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
                <ListPlus size={24} />
                Add players
            </button>
        </form>
    )
}
