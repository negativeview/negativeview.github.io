(function() {
    const TICK_SPEED = 10;
    const TICKS_IN_DAY = 24 * 60;

    let currentTime = 0;

    setInterval(
        () => {
            calculateUpdate();
            postUpdate();
        },
        TICK_SPEED
    );

    function calculateUpdate() {
        currentTime += (1 / TICKS_IN_DAY);
        while (currentTime > 1.0) {
            currentTime -= 1.0;
        }
    }

    function postUpdate() {
        postMessage(
            {
                type: 'timeUpdate',
                time: currentTime,
                light: Math.abs(currentTime - 0.5)
            }
        );
    }
})();