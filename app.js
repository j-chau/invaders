$(document).ready(() => {
    const gameGrid = $(".game-grid div");
    const width = 12;
    const height = 12;

    // aliens
    let alienTraverse = [
        19, 20, 21,
        31, 32, 33
        // 12, 13, 14, 15, 16, 17, 18, 19,
        // 24, 25, 26, 27, 28, 29, 30, 31,
    ]
    for (i = 0; i < alienTraverse.length; i++) {
        alienTraverse.forEach((pos) => {
            gameGrid.eq(pos).addClass("invader");
        });
    }

    let dir = 0;

    let time = 0;
    window.setInterval(function () {
        if (time > 12) return;
        time++;

        const leftEdge = alienTraverse[0] % width;
        const rghtEdge = (alienTraverse[alienTraverse.length - 1] + 1) % (width);
        console.log(`left: ${leftEdge} // right: ${rghtEdge}`);

        if ((rghtEdge === 0) || dir === -1) {
            dir = -1;   // <<
            if (leftEdge === 0) {
                dir = 1;
            }
        } else dir = 1; // >>

        for (let i = 0; i < alienTraverse.length; i++) {
            gameGrid.eq(alienTraverse[i]).removeClass("invader");
            alienTraverse[i] += dir;
        }
        for (let i = 0; i < alienTraverse.length; i++) {
            gameGrid.eq(alienTraverse[i]).addClass("invader");
        }
    }, 900)



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
                break;
            // left Arrow key  <<
            case 37:
                if (spaceshipTraverse % width > 0) spaceshipTraverse--;
                break;
        }
        gameGrid.eq(spaceshipTraverse).addClass("spaceship");
    });
});