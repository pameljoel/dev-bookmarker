import {generateUrlChunks} from "./generateUrlChunks";
import {addPart, createChunk} from "./utils";

const EMPTY_URL = '';
const PROTOCOL_ONLY = 'https://';
const HOST_ONLY = 'https://www';
const HOSTNAME_ONLY = 'https://www.google.com';

const chunks = [
    createChunk('protocol', 'https:', 'string'),

].map(chunk => ({
    chunkClass: chunk.chunkClass,
    chunkType: chunk.chunkType,
    name: chunk.name,
    values: chunk.values.map(obj => ({
        // @ts-ignore
        isAdditionalValue: obj.isAdditionalValue,
        // @ts-ignore
        value: obj.value,
    })),
}))

const prova = addPart([], 'protocol', 'https:', null, 'string');

describe('generateUrl', () => {
    it('return [] if url is empty', () => {
        const generated = generateUrlChunks(EMPTY_URL);
        expect(generated).toStrictEqual([]);
    })

    it('return [] if url has only protocol', () => {
        const generated = generateUrlChunks(PROTOCOL_ONLY);
        expect(generated).toStrictEqual([]);
    })

    // TODO:
    // add testing for all possible chunks

    // it('return [] if url has protocol and host', () => {
    //     const generated = generateUrlChunks(HOST_ONLY);
    //     expect(generated).toEqual(HOST_ONLY);
    //     // expect(generated).toEqual([expect.objectContaining(chunks)]);
    // })
    //
    // it('return [] if url has protocol, host, hostname', () => {
    //     const generated = generateUrlChunks(HOSTNAME_ONLY);
    //     expect(generated).toStrictEqual([]);
    // })
})
