const Jimp = require("jimp");

const ORIGINAL_IMAGE =
    "D:\\projects\\github.com\\nodejs-task-2\\nodejs-task-2\\upload\\upload_dced15920820ef436097de3d7a7b87eb.png";

const LOGO = "https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Australian_Defence_Force_Academy_coat_of_arms.svg/1200px-Australian_Defence_Force_Academy_coat_of_arms.svg.png";

const LOGO_MARGIN_PERCENTAGE = 2;

const FILENAME = "test.jpg";

const main = async () => {
    const [image, logo] = await Promise.all([
        Jimp.read(ORIGINAL_IMAGE),
        Jimp.read(LOGO)
    ]);

    logo.resize(image.bitmap.width / 10, Jimp.AUTO);

    const xMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;
    const yMargin = (image.bitmap.width * LOGO_MARGIN_PERCENTAGE) / 100;

    const X = image.bitmap.width - logo.bitmap.width - xMargin;
    const Y = image.bitmap.height - logo.bitmap.height - yMargin;

    return image.composite(logo, X, Y, [
        {
            mode: Jimp.BLEND_SCREEN,
            opacitySource: 0.1,
            opacityDest: 1
        }
    ]);
};

main().then(image => image.write(FILENAME));

