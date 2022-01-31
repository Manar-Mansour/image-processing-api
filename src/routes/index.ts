import express from 'express';
import fs from 'fs';
import path from 'path';

import isDigitsOnly from '../utilities/isDigitsOnly';
import resizeImage from './api/resizeImage';

const routes = express.Router();

routes.get('/images', async (req, res) => {
    const imageFilename: string = req.query.filename as unknown as string;
    const imageWidth: string = req.query.width as unknown as string;
    const imageHeight: string = req.query.height as unknown as string;
    //imgPath is the path of the resized image if the image exists, we will use it to check for the existance of a resized image before we try any conversion
    const imgPath = path.join(
        __dirname,
        `../../images/thumbnail/${imageFilename}_${imageWidth}_${imageHeight}.jpg`
    );
    //Detect if the user entered a string that contains characters for width or height or both and send an appropriate message in each case
    if (!isDigitsOnly(imageWidth) && !isDigitsOnly(imageHeight)) {
        res.send(
            'Please enter valid numbers for the width and height of the resized image'
        );
    } else if (!isDigitsOnly(imageHeight)) {
        res.send('Please enter a valid height number for the resized image');
    } else if (!isDigitsOnly(imageWidth)) {
        res.send('Please enter a valid width number for the resized image');
    } else {
        //check if a resized file already exists with the requested size in the query
        if (!fs.existsSync(imgPath)) {
            try {
                //If no resized file already exists, then do the resizing and send the resized file
                await resizeImage(
                    imageFilename as string,
                    parseInt(imageWidth),
                    parseInt(imageHeight)
                );
                res.status(200).sendFile(imgPath);
            } catch (error) {
                //handle error in case of failed image resizing or in case the requested filename doesn't exist
                res.send(
                    'Error: You may have entered a filename of an image that does not exist or the image might have failed to process.'
                );
            }
        } else {
            //else if a resized file already exists for the requested image then send it
            res.status(200).sendFile(imgPath);
        }
    }
});

export default routes;
