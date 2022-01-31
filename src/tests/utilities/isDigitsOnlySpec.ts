import isDigitsOnly from '../../utilities/isDigitsOnly';

describe('Test the isDigitsOnly function in the utilities', () => {
    it('expects isDigitsOnly to be truthy for an input string that contains digits only', async () => {
        expect(isDigitsOnly('300')).toBeTruthy;
    });
    it('expects isDigitsOnly to be falsy for an input string that contains letters only', async () => {
        expect(isDigitsOnly('afd')).toBeFalsy;
    });
    it('expects isDigitsOnly to be falsy for an input string that contains a mix of letters and numbers', async () => {
        expect(isDigitsOnly('3dd4')).toBeFalsy;
    });
});
