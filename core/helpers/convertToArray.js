import {getPlayers, setPlayers} from "../services/player.js";
import {alerts} from "./alerts.js";

export const convertToArray = (text) => {
    if (!text) return;
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
    const regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9, \n\r]+$/;
    if (regex.test(content)) {
        return content;
    }

    alerts.info(
        'Requisitos',
        'Ingrese un participante por línea o separado por comas. No se permiten signos especiales, solo letras con o sin tíldes, números. Solo texto.'
    ).then(result => {
        return undefined;
    });
}

const getRandomId = (length = 6) => {
    return Math.random().toString(36).substring(2, length + 2);
};