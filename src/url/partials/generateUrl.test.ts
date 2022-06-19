import {generateUrl} from "./generateUrl";

const EMPTY_URL = '';

describe('generateUrl', () => {
    it('return [] if url is empty', () => {
        const generated = generateUrl(EMPTY_URL);
        expect(generated).toStrictEqual([]);
    })
})
