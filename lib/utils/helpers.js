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
