import {imgsplit} from '@imgsplit/core';
import "./styles.css";

// source image
const picDom = document.createElement('img');
picDom.classList.add('pic');

document.body.prepend(picDom);

const resultDom = document.querySelector('#app') as HTMLDivElement;

picDom.onload = async () => {

    const resultArr = await imgsplit({
        src: picDom.src,
        items: [
            {x: 48, y: 11, width: 107, height: 180},
            {x: 128, y: 203, width: 112, height: 235},
            {x: 56, y: 460, width: 131, height: 212},
        ]
    }, 256);

    for (let i = 0; i < resultArr.length; i++) {
        const {
            x,
            y,
            width,
            height,
            dataURL
        } = resultArr[i];

        const imgDom = document.createElement('img');
        imgDom.src = dataURL as string;
        imgDom.style.position = 'absolute';
        imgDom.style.left = x + 'px';
        imgDom.style.top = y + 'px';
        imgDom.style.width = width + 'px';
        imgDom.style.height = height + 'px';

        imgDom.style.animation = `show .5s 1 ${i * .2}s both`;

        resultDom.append(imgDom)
    }

};
picDom.src = 'https://imgsplit.github.io/images/example.png';