const pvzGame = (() => {
    let move = 0;
    const mainScreen = document.querySelector('.mainScreen');
    const plantGrid = document.querySelector('.plantGrid');
    const mainScreenPos = mainScreen.getBoundingClientRect();
    const plantGridPos = plantGrid.getBoundingClientRect();
    const zombieSound = new Audio();
    zombieSound.src = './assets/brainzzz.mp3';
    zombieSound.preload = 'auto';
    const theme = document.getElementById('theme');
    let isStart = false;

    const start = () => {
        const button = document.getElementById('start');
        button.addEventListener('click', ()=>{
            theme.play();
            isStart = true;
        })
    }
    
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
        if(!isStart) return;
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
        if(!isStart) return;
        const peas = document.querySelectorAll('.pea');
        if(peas == null) return;
        peas.forEach(pea => {
            let peaPos = pea.getBoundingClientRect();
            pea.style.left = peaPos.left + 1 + "px"
        });
    }

    const zombieSpawn = () =>{
        if(!isStart) return;

        zombieSound.play();
        const zombie = document.createElement('div');
        let rand = Math.floor(Math.random()*5)*95
        //console.log(rand)
        zombie.classList.add('zombie');
        mainScreen.appendChild(zombie);
        zombie.style.top = plantGridPos.top - 30 + rand + 'px';
        zombie.style.left = plantGridPos.right + 'px'
    }

    const zombieMove = () =>{
        if(!isStart) return;

        const zombies = document.querySelectorAll('.zombie');
        if(zombies == null) return;

        zombies.forEach(zombie => {
            let zombiePos = zombie.getBoundingClientRect();
            zombie.style.left = zombiePos.left - 3 + 'px';
        });
    }

    const checkHit = () =>{
        if(!isStart) return;

        const zombies = document.querySelectorAll('.zombie');
        const peas = document.querySelectorAll('.pea');
        if(zombies == null) return;
        if(peas == null) return;
    
        zombies.forEach(zombie => {
            let zombiePos = zombie.getBoundingClientRect();
            peas.forEach(pea => {
                let peaPos = pea.getBoundingClientRect();
                if(peaPos.left > (mainScreenPos.right-50)){
                    pea.remove();
                }
                if(Math.abs(zombiePos.left - peaPos.left) < 10 && Math.abs(zombiePos.top - peaPos.top) < 50){
                    if(zombie.classList.contains('hit')){
                        zombie.classList.add('hit1');
                        zombie.classList.remove('hit');
                    }else if(zombie.classList.contains('hit1')){
                        zombie.classList.add('hit2');
                        zombie.classList.remove('hit1');
                    }else if(zombie.classList.contains('hit2')){
                        zombie.classList.add('hit3');
                        zombie.classList.remove('hit2');
                    }else if(zombie.classList.contains('hit3')){
                        zombie.classList.add('hit4');
                        zombie.classList.remove('hit3');
                    }else if(zombie.classList.contains('hit4')){
                        zombie.remove();
                    }else{
                        zombie.classList.add('hit');
                    }
                    pea.remove();
                }
            });
        });

    }

    return {spawnGrassGrid, grassClick, cursorImage, options, peashooterShoot, peasMove, zombieSpawn, zombieMove, checkHit, start}

})();

pvzGame.start();
pvzGame.spawnGrassGrid();
pvzGame.grassClick();
pvzGame.cursorImage();
pvzGame.options();
setInterval(pvzGame.peashooterShoot, 2000);
setInterval(pvzGame.checkHit, 5);
setInterval(pvzGame.peasMove, 10);
setInterval(pvzGame.zombieSpawn, 5000)
setInterval(pvzGame.zombieMove, 250);

