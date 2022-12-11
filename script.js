const pvzGame = (() =>{

    const spawnGrassGrid = () =>{
        const plantGrid = document.querySelector('.plantGrid')
        for(let i=0; i<45; i++){
            const grass = document.createElement('div');
            grass.classList.add('grass')
            plantGrid.append(grass)
        }
    }

    return {spawnGrassGrid}

})();

pvzGame.spawnGrassGrid();

document.addEventListener('click', (e)=>{
    console.log(e);

})