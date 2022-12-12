const pvzGame = (() => {
    let move = 0;
    const mainScreen = document.querySelector('.mainScreen');
    const plantGrid = document.querySelector('.plantGrid');
    const mainScreenPos = mainScreen.getBoundingClientRect();
    const plantGridPos = plantGrid.getBoundingClientRect();
    
    const spawnGrassGrid = () => {
        plantGrid.style.top = mainScreenPos.top + 60 + 'px'
        plantGrid.style.left = mainScreenPos.left + 240 + 'px'
        for (let i = 0; i < 45; i++) {
            const grass = document.createElement('div');
            grass.classList.add('grass')
            plantGrid.append(grass)
        }
    }

    const cursorImage = () => {
        document.addEventListener('mousemove', (e) => {
            if (move == 0) return;
            const divFollow = document.querySelector('.follow');
            divFollow.style.top = e.clientY - 40 + 'px';
            divFollow.style.left = e.clientX - 40 + 'px';
        })
    }

    const grassClick = () => {
        const grass = document.querySelectorAll('.grass');
        grass.forEach(g => {
            g.addEventListener('click', () => {
                const divFollow = document.querySelector('.follow');
                if (g.classList.contains('peashooter') || g.classList.contains('sunflower')) return;
                if (divFollow.classList.contains('peashooter')) {
                    g.classList.add('peashooter');
                } else if (divFollow.classList.contains('sunflower')) {
                    g.classList.add('sunflower');
                }
                move = 0;
                divFollow.remove();
            })
        });
    }

    const options = () => {
        const options = document.querySelector('.options');
        options.addEventListener('click', (e) => {
            if (!e.target.classList.contains('plant')) return;
            const divFollow = document.createElement('div');
            const body = document.querySelector('.body');
            divFollow.classList.add('follow')
            divFollow.style.position = 'absolute';
            body.append(divFollow);
            divFollow.classList.add(e.target.classList[0]);
            move = 1;
        });
    };

    const peashooterShoot = () =>{
        const peashooters = document.querySelectorAll('.peashooter');
        if(peashooters == null) return;

        peashooters.forEach(peashooter => {
            if(peashooter.classList.contains('plant'))return;
            if(peashooter.classList.contains('follow'))return;

            let peaPos = peashooter.getBoundingClientRect();
            const pea = document.createElement('div');
            pea.classList.add('pea');
            mainScreen.appendChild(pea);
            pea.style.top = peaPos.top + 'px';
            pea.style.left = peaPos.left + 30 + 'px';
        });
    }

    const peasMove = () =>{
        const peas = document.querySelectorAll('.pea');
        if(peas == null) return;
        peas.forEach(pea => {
            let peaPos = pea.getBoundingClientRect();
            pea.style.left = peaPos.left + 1 + "px"
        });
    }

    const zombieSpawn = () =>{
        const zombie = document.createElement('div');
        zombie.classList.add('zombie');
        mainScreen.appendChild(zombie);
        zombie.style.top = plantGridPos.top 
    }

    return {spawnGrassGrid, grassClick, cursorImage, options, peashooterShoot, peasMove, zombieSpawn}

})();

pvzGame.spawnGrassGrid();
pvzGame.grassClick();
pvzGame.cursorImage();
pvzGame.options();
setInterval(pvzGame.peashooterShoot, 2000);
setInterval(pvzGame.peasMove, 10);


window.addEventListener('click', (e)=>{
    console.log(e.clientX)
})