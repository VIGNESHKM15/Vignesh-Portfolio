document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("player");
    const ball = document.getElementById("ball");
    const scoreDisplay = document.getElementById("score");

    let score = 0;

    ball.addEventListener("animationiteration", () => {
        if (isHit()) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
    });

    function isHit() {
        const playerPosition = player.getBoundingClientRect();
        const ballPosition = ball.getBoundingClientRect();

        return (
            ballPosition.bottom >= playerPosition.top &&
            ballPosition.left >= playerPosition.left &&
            ballPosition.right <= playerPosition.right
        );
    }
});
