import {addPart} from './utils';

type UrlPartsActions = {
    [key: string]: (key: string) => void;
}

enum URL_PARTS {
    PROTOCOL = 'protocol',
    HOST = 'host',
    HOSTNAME = 'hostname',
    PORT = 'port',
    PATHNAME = 'pathname',
    SEARCH_PARAMS = 'searchParams',
    HASH = 'hash',
}

const URL_PARTS_REGEX = {
    [URL_PARTS.PROTOCOL]: null,
    [URL_PARTS.HOST]: /^([a-zA-Z0-9][a-zA-Z0-9-_]*[^.])/,
    [URL_PARTS.HOSTNAME]: /\.{1}(([\S][^\]])*)/,
    [URL_PARTS.PORT]: null,
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
    [URL_PARTS.HOSTNAME]: URL_PARTS_TYPE.STRING,
    [URL_PARTS.PORT]: URL_PARTS_TYPE.STRING,
    [URL_PARTS.PATHNAME]: URL_PARTS_TYPE.STRING,
    [URL_PARTS.SEARCH_PARAMS]: URL_PARTS_TYPE.OBJECT,
    [URL_PARTS.HASH]: URL_PARTS_TYPE.STRING,
}

export const generateUrlChunks = (input: string, chunks?: string[]) => {
    try {
        let newUrl: URL = new URL(input);
        const copy = chunks ? chunks.slice() : [];

        const execute = (key: string) => {
            // @ts-ignore
            addPart(copy, key, newUrl[key], URL_PARTS_REGEX[key], URL_PARTS_TYPES[key])
        }

        const urlPartsActions = {
            [URL_PARTS.PROTOCOL]: execute,
            [URL_PARTS.HOST]: execute,
            [URL_PARTS.HOSTNAME]: execute,
            [URL_PARTS.PORT]: execute,
            [URL_PARTS.PATHNAME]: execute,
            [URL_PARTS.SEARCH_PARAMS]: execute,
            [URL_PARTS.HASH]: execute,
        }

        for (const key in URL_PARTS) {
            const chunks: { [name: string]: string } = URL_PARTS;
            const value: string = chunks[key];

            const actions: UrlPartsActions = urlPartsActions;
            const action = actions[value];

            if (action) action(value);
        }

        return copy;
    } catch (err) {
        console.error(input, err);
        return [];
    }
};
