const createNode = ( template ) => {
    const wrapper = document.createElement( 'div' );
    wrapper.innerHTML = template;

    return wrapper.firstElementChild;
};

const getRandomDigit = ( start, end ) => {
    return Math.ceil( Math.random() * ( end - 1 ) ) + start;
};

const createPlayerObject = ( player, name, hp, img, weapon ) => {
    return {
        player,
        name,
        hp,
        img,
        weapon,
        attack() {
            console.log( `${this.name} Fight...` );
        }
    }
};

const createPlayer = ( playerObject ) => {
    const template = (`
        <div class="player${playerObject.player}">
            <div class="progressbar">
                <div class="life" style="width: ${playerObject.hp}%"></div>
                <div class="name">${playerObject.name}</div>
            </div>
            <div class="character">
                <img src="${playerObject.img}" />
            </div>
        </div>
    `);

    const $playerNode = createNode( template );

    playerObject.$playerNode = $playerNode;

    return $playerNode;
};

const showWinTitle = ( player, $container, $actionButton ) => {
    const template = (`
        <div class="winTitle">${player.name} wins</div>
    `);

    $container.appendChild( createNode( template ) );
    $actionButton.disabled = true;
};

const checkWinStatus = ( player1, player2, $container, $actionButton ) => {
    if ( player1.hp === 0 )     
    {
        showWinTitle( player2, $container, $actionButton );
    }
    else if ( player2.hp === 0 )
    {
        showWinTitle( player1, $container, $actionButton );
    }
};

const changeHP = ( playerObject ) => {
    const $playerLife = playerObject.$playerNode.querySelector( '.life' );
    let newHp = playerObject.hp - getRandomDigit( 1, 20 );
    playerObject.hp = newHp < 0 ? 0 : newHp;

    $playerLife.style.width = `${playerObject.hp}%`;
};

const player1 = createPlayerObject(
    1,
    'scorpion',
    100,
    'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    ['gun'],
);
const player2 = createPlayerObject(
    2,
    'kitana',
    100,
    'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    ['knife'],
);

const $arenas = document.querySelector( 'div.arenas' );
const $randomButton = $arenas.querySelector( 'button.button' );

$arenas.appendChild( createPlayer( player1 ) );
$arenas.appendChild( createPlayer( player2 ) );

$randomButton.addEventListener( 'click', () => {
    console.log( '###: Click Random Button' );
    
    changeHP( player1 );
    changeHP( player2 );

    checkWinStatus( player1, player2, $arenas, $randomButton );
} );

