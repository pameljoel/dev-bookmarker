import {appendChunk} from './utils';
import {Chunks} from "../../type";

type UrlPartsActions = {
    [key: string]: (key: string) => void;
}

export enum URL_PARTS {
    PROTOCOL = 'protocol',
    HOST = 'host',
    PATHNAME = 'pathname',
    SEARCH_PARAMS = 'searchParams',
    HASH = 'hash',
}

const URL_PARTS_REGEX = {
    [URL_PARTS.PROTOCOL]: null,
    [URL_PARTS.HOST]: null,
    [URL_PARTS.PATHNAME]: null,
    [URL_PARTS.SEARCH_PARAMS]: null,
    [URL_PARTS.HASH]: null,
}

const URL_PARTS_TYPE = {
    STRING: 'string',
    OBJECT: 'object',
}

const URL_PARTS_TYPES = {
    [URL_PARTS.PROTOCOL]: URL_PARTS_TYPE.STRING,
    [URL_PARTS.HOST]: URL_PARTS_TYPE.STRING,
    [URL_PARTS.PATHNAME]: URL_PARTS_TYPE.STRING,
    [URL_PARTS.SEARCH_PARAMS]: URL_PARTS_TYPE.OBJECT,
    [URL_PARTS.HASH]: URL_PARTS_TYPE.STRING,
}

export const createChunks = (input: string, chunks: Chunks) => {
    const minCharacters = 5;
    const notMinCharacters = !input || input.length < minCharacters;

    try {
        if (notMinCharacters) return [];

        let newUrl: URL = new URL(input);
        console.log('newUrl', { newUrl })
        const copy = chunks ? chunks.slice() : [];

        const execute = (key: string) => {
            // @ts-ignore
            appendChunk(copy, key, newUrl[key], URL_PARTS_REGEX[key], URL_PARTS_TYPES[key])
        }

        const urlPartsActions = {
            [URL_PARTS.PROTOCOL]: execute,
            [URL_PARTS.HOST]: execute,
            [URL_PARTS.PATHNAME]: execute,
            [URL_PARTS.SEARCH_PARAMS]: execute,
            [URL_PARTS.HASH]: execute,
        }

        for (const key in URL_PARTS) {
            const chunks: { [name: string]: string } = URL_PARTS;
            const value: string = chunks[key];

            const actions: UrlPartsActions = urlPartsActions;
            console.log('chunks', {chunks, value, actions });
            const action = actions[value];

            if (action) action(value);
        }

        return copy;
    } catch (err) {
        console.warn(input, { err });
        return [];
    }
};
