let currentBackbuttonHandler;

const handler = () => {
    if (currentBackbuttonHandler) {
        currentBackbuttonHandler();
    }
};

export default function setCurrentBackbuttonHandler(_handler) {
    currentBackbuttonHandler = _handler;

    if (_handler) {
        document.addEventListener('backbutton', handler, false);
    } else {
        document.removeEventListener('backbutton', handler, false);
    }
};
