$(document).ready(() => {
    const gameGrid = $(".game-grid div");
    const width = 12;
    const height = 12;

    // aliens
    let alienTraverse = [
        [20, 21, 22],
        [32, 33, 34]
        // 12, 13, 14, 15, 16, 17, 18, 19,
        // 24, 25, 26, 27, 28, 29, 30, 31,
    ]
    for (i = 0; i < alienTraverse.length; i++) {
        alienTraverse[i].forEach((pos) => {
            gameGrid.eq(pos).addClass("invader");
        });
    }
    let time = 0;
    window.setInterval(() => {
        time++;
        if (time > 3) {
            return;
        }
        // alienTraverse.forEach((pos) => {
        // gameGrid.eq(pos).removeClass("invader");
        // gameGrid.eq(pos).addClass("invader");
        // console.log(pos + " // " + (pos + 1));
        // console.log(alienTraverse[pos]);
        // pos is the value in the array, not the position in the array
        // });

        for (i = 0; i < alienTraverse.length; i++) {
            alienTraverse[i].forEach((pos) => gameGrid.eq(pos).removeClass("invader"));

            for (j = 0; j < alienTraverse[i].length; j++) {
                console.log((alienTraverse[i][j] + 1) % width);
                if ((alienTraverse[i][j] + 1) % width > 0) {
                    alienTraverse[i][j]++;
                } else { break }
            }
            alienTraverse[i].forEach((pos) => gameGrid.eq(pos).addClass("invader"));
        }

        console.log("hey");
    }, 1000);




    // spaceship default
    let spaceshipTraverse = (width * height) - (width / 2);
    gameGrid.eq(spaceshipTraverse).addClass("spaceship");

    //spaceship travelling
    $(document).keydown(e => {
        gameGrid.eq(spaceshipTraverse).removeClass("spaceship");
        switch (e.which) {
            // right Arrow key >>
            case 39:
                if ((spaceshipTraverse + 1) % width > 0) spaceshipTraverse++;
                // console.log(spaceshipTraverse + " // " + spaceshipTraverse % width);
                break;
            // left Arrow key  <<
            case 37:
                if (spaceshipTraverse % width > 0) spaceshipTraverse--;
                break;
        }
        gameGrid.eq(spaceshipTraverse).addClass("spaceship");
    });
});