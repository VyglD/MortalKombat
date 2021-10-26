import {generateLogs} from "./log.js";
import {createPlayerObject} from "./player.js";
import {playerAttack, enemyAttack, checkGameStatus} from "./game.js";

const $arenas = document.querySelector( 'div.arenas' );
const $formFight = document.querySelector( 'form.control' );

const player1 = createPlayerObject(
    1,
    'SCORPION',
    100,
    'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    ['gun'],
);
const player2 = createPlayerObject(
    2,
    'KITANA',
    100,
    'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
    ['knife'],
);

$arenas.appendChild( player1.$playerNode );
$arenas.appendChild( player2.$playerNode );

const setNewValue = ( typeAction, attackPlayerObject, defencePlayerObject, value = 0 ) => {
    if ( value > 0 )
    {
        defencePlayerObject.changeHP( value );
        defencePlayerObject.renderHp();
    }
    generateLogs( typeAction, attackPlayerObject, defencePlayerObject, value );
};

$formFight.addEventListener( 'submit', ( evt ) => {
    evt.preventDefault();
    const enemyAttackObject = enemyAttack();
    const playerAttackObject = playerAttack( $formFight );

    if ( playerAttackObject.defence !== enemyAttackObject.hit )
    {
        setNewValue( 'hit', player2, player1, enemyAttackObject.value );
    }
    else
    {
        setNewValue( 'defence', player2, player1 );
    }

    if ( enemyAttackObject.defence !== playerAttackObject.hit )
    {
        setNewValue( 'hit', player1, player2, playerAttackObject.value );
    }
    else
    {
        setNewValue( 'defence', player1, player2 );
    }

    checkGameStatus( player1, player2, $arenas, $formFight );
} );

generateLogs( 'start', player1, player2 );