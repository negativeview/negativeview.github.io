(function() {
    const TICK_SPEED = 1000;

    setInterval(
        () => {
            calculateUpdate();
            postUpdate();
        },
        TICK_SPEED
    );

    function calculateUpdate() {

    }

    function postUpdate() {
        postMessage(
            {
                type: 'update'
            }
        );
    }
})();