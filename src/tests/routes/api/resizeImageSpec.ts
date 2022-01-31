import resizeImage from '../../../routes/api/resizeImage';
import fs from 'fs';
describe('Image processing test', () => {
    it('expects the resizeImage function to output the resized image in the thumbnail folder if given the right query', async () => {
        await resizeImage('fjord', 300, 200);
        const imgPath = './images/thumbnail/fjord_300_200.jpg';
        expect(fs.existsSync(imgPath)).toBeTruthy;
    });
});
