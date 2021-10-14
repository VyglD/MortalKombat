const createNode = ( template ) => {
    const wrapper = document.createElement( 'div' );
    wrapper.innerHTML = template;

    return wrapper.firstElementChild;
};

const createPlayerObject = ( name, hp, img, weapon ) => {
    return {
        name,
        hp,
        img,
        weapon,
        attack() {
            console.log( `${this.name} Fight...` );
        }
    }
};

const createPlayer = ( playerClass, playerObject ) => {
    const template = (`
        <div class="${playerClass}">
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

const player1 = createPlayerObject(
    'scorpion',
    50,
    'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    ['gun']
);
const player2 = createPlayerObject(
    'kitana',
    80,
    'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    ['knife']
);

const $playerNode1 = createPlayer( 'player2', player1 );
const $playerNode2 = createPlayer( 'player2', player2 );

const $arenas = document.querySelector( 'div.arenas' );

$arenas.appendChild( $playerNode1 );
$arenas.appendChild( $playerNode2 );


