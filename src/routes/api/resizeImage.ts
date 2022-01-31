import sharp from 'sharp';

const resizeImage = async (
    filename: string,
    width: number,
    height: number
): Promise<void> => {
    await sharp(`./images/full/${filename}.jpg`)
        .resize(width, height)
        .toFile(`./images/thumbnail/${filename}_${width}_${height}.jpg`);
};
export default resizeImage;
