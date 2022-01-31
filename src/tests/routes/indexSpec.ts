import supertest from 'supertest';
import app from '../../index';
import { promises as fsPromises } from 'fs';
const superapp = supertest(app);

describe('Endpoint test:', () => {
    it('Gets the test endpoint', async () => {
        const response = await superapp.get(
            '/api/images?filename=fjord&width=300&height=200'
        );
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toEqual('image/jpeg');
        const bufferImage = Buffer.from(
            await fsPromises.readFile('./images/thumbnail/fjord_300_200.jpg')
        );
        expect(response.body).toEqual(bufferImage);
    });

    it('Sends the resized image to the user', async () => {
        const response = await superapp.get(
            '/api/images?filename=fjord&width=300&height=200'
        );
        expect(response.headers['content-type']).toEqual('image/jpeg');
        const bufferImage = Buffer.from(
            await fsPromises.readFile('./images/thumbnail/fjord_300_200.jpg')
        );
        expect(response.body).toEqual(bufferImage);
    });

    it('Tells the user to enter a valid width number in case of wrong width', async () => {
        const response = await superapp.get(
            '/api/images?filename=fjord&width=30a&height=200'
        );
        expect(response.text).toEqual(
            'Please enter a valid width number for the resized image'
        );
    });

    it('Tells the user to enter a valid height number in case of wrong height', async () => {
        const response = await superapp.get(
            '/api/images?filename=fjord&width=300&height=20b'
        );
        expect(response.text).toEqual(
            'Please enter a valid height number for the resized image'
        );
    });

    it('Tells the user to enter valid width and height numbers in case both width and height are wrong', async () => {
        const response = await superapp.get(
            '/api/images?filename=fjord&width=30a&height=20b'
        );
        expect(response.text).toEqual(
            'Please enter valid numbers for the width and height of the resized image'
        );
    });

    it('Handles the case in which the filename does not exist', async () => {
        const response = await superapp.get(
            '/api/images?filename=jord&width=300&height=200'
        );
        expect(response.text).toEqual(
            'Error: You may have entered a filename of an image that does not exist or the image might have failed to process.'
        );
    });
});
