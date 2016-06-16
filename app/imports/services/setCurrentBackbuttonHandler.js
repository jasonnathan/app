// import swipedetect from '/imports/services/swipedetect';

let currentBackbuttonHandler;

const handler = () => {
    if (currentBackbuttonHandler) {
        currentBackbuttonHandler();
    }
};

export default function setCurrentBackbuttonHandler(_handler) {
    currentBackbuttonHandler = _handler;

    if (currentBackbuttonHandler) {
        document.addEventListener('backbutton', handler, false);
        // swipedetect.on('right', handler);
    } else {
        document.removeEventListener('backbutton', handler, false);
        // swipedetect.off('right', handler);
    }
};
