export function deg2Rad(deg) {
    return deg * (Math.PI / 180);
}

export function randomID(x = 0) {
    return Date.now()
        .toString()
        .slice(0 - x);
}

export function isMobileDevice() {
    const ua = navigator.userAgent.toLowerCase();
    const isMobileUA =
        /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(ua);

    return isMobileUA;
}
