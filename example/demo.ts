import {imgsplit} from '@imgsplit/core';
import "./styles.css";

// source image
const picDom = document.createElement('img');
picDom.classList.add('pic');

document.body.prepend(picDom);

const resultDom = document.querySelector('#app') as HTMLDivElement;

picDom.onload = async () => {
    // Split the image by a height of 128px
    const resultArr = await imgsplit(picDom.src, 128);
    for (let i = 0; i < resultArr.length; i++) {
        const {dataURL} = resultArr[i];

        const imgDom = document.createElement('img');
        imgDom.src = dataURL as string;

        imgDom.style.animation = `show .5s 1 ${i * .2}s both`;

        resultDom.append(imgDom)
    }

};
picDom.src = 'https://imgsplit.github.io/images/example.png';