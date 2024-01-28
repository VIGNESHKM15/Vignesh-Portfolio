function hitBall() {
    const ball = document.createElement("div");
    ball.className = "ball";
    document.body.appendChild(ball);

    const startBottom = document.getElementById("bat").offsetTop + 50;
    const endBottom = document.getElementById("ground").offsetTop;
    const duration = 1000; // in milliseconds

    ball.style.bottom = startBottom + "px";

    ball.animate([
        { bottom: startBottom + "px" },
        { bottom: endBottom + "px" }
    ], {
        duration: duration,
        easing: "linear",
        fill: "forwards"
    });

    setTimeout(() => {
        document.body.removeChild(ball);
    }, duration);
}
