const bumblebee = document.getElementById("bumblebee");
let x = 0;
let y = 0;
let speed = 5;
let directionX = 1;
let directionY = 1;
let moving = true;

bumblebee.addEventListener("click", function () {
    moving = false;
    bumblebee.style.display = "none";
    clearInterval(intervalId);
});

// Listen for mouse move events and calculate if the bumblebee is over the mouse
document.addEventListener("mousemove", function (event) {
    if (!moving) return;

    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let bumblebeeRect = bumblebee.getBoundingClientRect();

    // If the bumblebee is over the mouse, change direction
    if (
        mouseX >= bumblebeeRect.left &&
        mouseX <= bumblebeeRect.right &&
        mouseY >= bumblebeeRect.top &&
        mouseY <= bumblebeeRect.bottom
    ) {
        directionX = -directionX;
        directionY = -directionY;
    }
});

// Move the bumblebee in intervals
intervalId = setInterval(function () {
    if (!moving) return;

    x += speed * directionX;
    y += speed * directionY;

    // If the bumblebee hits the edge of the screen, change direction
    if (x + bumblebee.offsetWidth > window.innerWidth || x < 0) {
        directionX = -directionX;
    }

    if (y + bumblebee.offsetHeight > window.innerHeight || y < 0) {
        directionY = -directionY;
    }

    // Update the position of the bumblebee
    bumblebee.style.left = x + "px";
    bumblebee.style.top = y + "px";
}, 20);