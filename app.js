


// STRETCH GOALS
// - increase speed after every drop down

$(document).ready(() => {
    const gameGrid = $(".game-grid div");
    const width = 12;
    const height = 12;

    // aliens
    let alienTraverse = [
        16, 17, 18, 19, 20, 21,
        28, 29, 30, 31, 32, 33
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
    window.setInterval(() => {
        // escape condition for testing
        if (time > 12) return;
        time++;

        // find the conditions when the invaders are at the edge
        const leftEdge = alienTraverse[0] % width;
        const rghtEdge = (alienTraverse[alienTraverse.length - 1] + 1) % width;

        // if the invaders are at the edge, move down
        if ((rghtEdge === 0 && dir === 1) || (leftEdge === 0 && dir === -1)) {
            dir = width;
            // if the right edge has been reached, or the invaders are already moving <<, move <<
        } else if (rghtEdge === 0 || dir === -1) {
            dir = -1;   // <<
            // when the invaders reach the left edge, reverse direction >>
            if (leftEdge === 0) {
                dir = 1;
            }
            // if the invaders are not at the right edge, and are not already moving <<, move >>
        } else dir = 1; // >>

        // removes all the invaders from the grid; increment the positions accordingly
        for (let i = 0; i < alienTraverse.length; i++) {
            gameGrid.eq(alienTraverse[i]).removeClass("invader");
            alienTraverse[i] += dir;
        }
        // adds the invaders back onto the grid in their new spot
        for (let i = 0; i < alienTraverse.length; i++) {
            gameGrid.eq(alienTraverse[i]).addClass("invader");
        }
    }, 900);

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

        // on [spacebar] shoot laser
        if (e.which === 32) {
            let laser = spaceshipTraverse - 12;
            gameGrid.eq(laser).addClass("laser");

            time = 0;
            const shootLaster = setInterval(() => {
                gameGrid.eq(laser).removeClass("laser");
                laser -= 12;
                if (laser <= 0) {
                    clearInterval(shootLaster);
                } else {
                    gameGrid.eq(laser).addClass("laser");
                }
            }, 30);
        }
    });

}); // document ready