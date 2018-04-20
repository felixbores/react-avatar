import * as colors from "./colors";
import { colorPalette as defaultColorPalette, avatarBgColor as defaultAvatarBgColor } from "./defaultValues";

export function imageToBase64 (data) {
    const uInt8Array = new Uint8Array(data);
    let i = uInt8Array.length;
    let bStr = new Array(uInt8Array.length);

    while (i--) {
        bStr[i] = String.fromCharCode(uInt8Array[i]);
    }

    const base64 = window.btoa(bStr.join(""));

    return `data:image/png;base64,${base64}`;
}

export function initials (_name) {
    let name = _name
        ? typeof _name === "string" ? _name : ""
        : "";

    if (!name) {
        return "";
    }

    return name.split(" ").slice(0, 2).map(str => str.trim().charAt(0)).join("");
}

export function createCancelablePromise (promise) {
    let isCanceled = false;
    let resolveCancelPromise;

    const cancelPromise = new Promise((resolve) => {
        resolveCancelPromise = resolve;
    });

    const cancelablePromise = Promise.race([cancelPromise, promise])
        .then(data => ({ data, promiseWasCanceled: isCanceled }))
        .catch(error => Promise.reject({ error, promiseWasCanceled: isCanceled }));

    const cancel = () => {
        isCanceled = true;
        resolveCancelPromise();
    };

    return { promise: cancelablePromise, cancel };
}

function randomColor (colorPalette, name, initials) {
    const strSource = name || initials;

    if (!strSource || strSource.length <= 0) {
        return defaultAvatarBgColor;
    }

    let charCodeSum = 0;

    for (let index = 0; index < strSource.length; index++) {
        charCodeSum += strSource.charCodeAt(index);
    }

    return colorPalette[charCodeSum % colorPalette.length];
}

export function calculateColor (randomColorsProp, name, initials) {
    let colorPalette = null;

    if (typeof randomColorsProp === "string") {
        colorPalette = colors[randomColorsProp];
    } else if (Array.isArray(randomColorsProp)) {
        colorPalette = randomColorsProp;
    } else if (randomColorsProp) {
        colorPalette = colors[defaultColorPalette];
    }

    return colorPalette
        ? randomColor(colorPalette, name, initials) || defaultAvatarBgColor
        : defaultAvatarBgColor;
}
