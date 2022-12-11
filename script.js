const pvzGame = (() => {
    let move = 0;

    const spawnGrassGrid = () => {
        const plantGrid = document.querySelector('.plantGrid')
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

    const peashooter = () =>{
        const peas = document.querySelectorAll('.pea');
        if(peas == null) return;

        peas.forEach(pea => {
            let peaPos = pea.getBoundingClientRect();

        });
    }

    return { spawnGrassGrid, grassClick, cursorImage,options }

})();

pvzGame.spawnGrassGrid();
pvzGame.grassClick();
pvzGame.cursorImage();
pvzGame.options();

