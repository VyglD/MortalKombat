const createNode = ( template ) => {
    const wrapper = document.createElement( 'div' );
    wrapper.innerHTML = template;

    return wrapper.firstElementChild;
};

const getRandomDigit = ( start, end ) => {
    return Math.ceil( Math.random() * ( end - 1 ) ) + start;
};

const createReloadButton = () => {
    const template = (`
        <div class="reloadWrap">
            <button class="button">Restart</button>
        </div>
    `);

    const $reloadButton = createNode( template );

    $reloadButton.addEventListener( 'click', () => {
        window.location.reload();
    } );

    return $reloadButton;
};

const createPlayerNode = ( playerObject ) => {
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

    return createNode( template );
};

const changeHP = function( hpDiff ) {
    if ( ( this.hp - hpDiff ) < 0 )
    {
        this.hp = 0;

        return;
    }

    this.hp = this.hp - hpDiff;
};

const elHP = function() {
    return this.$playerNode.querySelector( '.life' );
};

const renderHp = function() {
    this.elHP().style.width = `${this.hp}%`; 
};

const createPlayerObject = ( player, name, hp, img, weapon ) => {
    const playerObject = {
        player,
        name,
        hp,
        img,
        weapon,
        attack() {
            console.log( `${this.name} Fight...` );
        },
        changeHP,
        elHP,
        renderHp,
    };

    playerObject.$playerNode = createPlayerNode( playerObject );

    return playerObject;
};

const showResultText = ( player, $container, $actionButton ) => {
    let template = '<div class="resultTitle">draw</div>';

    if ( player )
    {
        template = (`
            <div class="winTitle">${player.name} wins</div>
        `);
    }

    $container.appendChild( createNode( template ) );
    $actionButton.replaceWith( createReloadButton() );
};

const checkGameStatus = ( player1, player2, $container, $actionButton ) => {
    if ( player1.hp === 0 && player1.hp < player2.hp )
    {
        showResultText( player2, $container, $actionButton );
    }
    else if ( player2.hp === 0 && player2.hp < player1.hp )
    {
        showResultText( player1, $container, $actionButton );
    }
    else if ( player1.hp === 0 && player2.hp === 0 )
    {
        showResultText( null, $container, $actionButton );
    }
};

const setGameStep = ( playerObject ) => {
    playerObject.changeHP( getRandomDigit( 1, 20 ) );
    playerObject.renderHp();
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

$arenas.appendChild( player1.$playerNode );
$arenas.appendChild( player2.$playerNode );

$randomButton.addEventListener( 'click', () => {
    console.log( '###: Click Random Button' );
    
    setGameStep( player1 );
    setGameStep( player2 );

    checkGameStatus( player1, player2, $arenas, $randomButton );
} );

