grid_size = 20;
tile_count = 20;

window.onload = () => {
    canvas = document.body.getElementsByClassName("canvas")[0];
    console.log(canvas);
    canvas.width = grid_size * tile_count;
    canvas.height = grid_size * tile_count;

    document.addEventListener("keydown", keyPressed);
    context = canvas.getContext("2d");
    setInterval(game, 1000 / 15);
}
x = y = 10;
d_x = 1;
d_y = 0;
a_x = a_y = 15;
trail = [];
size = 5;

const game = () => {
    x += d_x;
    y += d_y;
    if (x < -1 || x > tile_count ||
        y < -1 || y > tile_count )
    {
        x = 10;
        y = 10;
        d_x = 1;
        d_y = 0;
        size = 5;
        trail = [];
    }

    context.fillStyle = "#222222";
    context.fillRect(0, 0, canvas.width, canvas.height);


    context.fillStyle = "lime";
    for (let i = 0; i < trail.length; i++) {
        context.fillRect(
            trail[i].x * grid_size,
            trail[i].y * grid_size,
            grid_size - 2,
            grid_size - 2
        );

        if (trail[i].x === x && trail[i].y === y) {
            x = y = 10;
            d_x = 1;
            d_y = 0;
            size = 5;
            trail = [];
        }
    }

    context.fillStyle = "white";
    context.fillRect(x * grid_size, y * grid_size, grid_size - 2, grid_size - 2);

    context.fillStyle = "red";
    context.fillRect(a_x * grid_size, a_y * grid_size, grid_size - 2, grid_size - 2);

    trail.push({
        x: x,
        y: y
    });

    while (trail.length > size) {
        trail.shift();
    }

    if (a_y === y && a_x === x) {
        size++;
        a_x = Math.floor(Math.random() * tile_count);
        a_y = Math.floor(Math.random() * tile_count);
    }
}

const keyPressed = e => {
    if (e.keyCode == 37 && d_x != 1) {
        d_x = -1;
        d_y = 0;
    }
    if (e.keyCode == 38 && d_y != 1) {
        d_x = 0;
        d_y = -1;
    }if (e.keyCode == 39 && d_x != -1) {
        d_x = 1;
        d_y = 0;
    }if (e.keyCode == 40 && d_y != -1) {
        d_x = 0;
        d_y = 1;
    }
    if(e.keyCode == 32)
    {
        size++;
    }
}