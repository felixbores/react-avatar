import { imageToBase64 } from "./helpers";

export function loadImage (url) {
    const promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.onload = (e) => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject();
            }
        };
        xhr.onerror = (e) => reject();
        xhr.open("GET", url);
        xhr.responseType = "arraybuffer";
        xhr.send();
    });

    return promise.then(response => imageToBase64(response));
};
