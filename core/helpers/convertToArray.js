import {getPlayers, setPlayers} from "../services/player.js";

export const convertToArray = (text) => {
    let lines = text.split(/\s*,|\n/);
    lines = lines.filter(line => line.trim());
    lines = lines.map(line => {
        return {
            id: getRandomId(),
            name: line,
            selected: false,
            lastResult: false
        }
    });

    lines = [
        ...getPlayers(),
        ...lines
    ];

    setPlayers(lines);

    return lines;
}

export const getText = (input) => {
    const content = input.value;
    const regex = /<[^>]+>/;
    if (regex.test(content)) {
        throw new Error('El contenido debe ser solo texto separado por comas o saltos de línea');
    }
    return content;
}

const getRandomId = (length = 6) => {
    return Math.random().toString(36).substring(2, length + 2);
};