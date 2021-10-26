import {generateLogs} from "./log.js";
import {createNode, getRandomDigit} from "./utils.js";
import {HIT, ATTACK} from "./constans.js"

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

const showResultText = ( winPlayer, losePlayer, $container, $actionButton ) => {
    let template = '<div class="resultTitle">draw</div>';

    if ( winPlayer && losePlayer )
    {
        template = (`
            <div class="winTitle">${winPlayer.name} wins</div>
        `);
        generateLogs( 'end', winPlayer, losePlayer );
    }
    else
    {
        generateLogs( 'draw' );
    }

    $container.appendChild( createNode( template ) );
    $actionButton.replaceWith( createReloadButton() );
};

const checkGameStatus = ( player1, player2, $container, $actionButton ) => {
    if ( player1.hp === 0 && player1.hp < player2.hp )
    {
        showResultText( player2, player1, $container, $actionButton );
    }
    else if ( player2.hp === 0 && player2.hp < player1.hp )
    {
        showResultText( player1, player2, $container, $actionButton );
    }
    else if ( player1.hp === 0 && player2.hp === 0 )
    {
        showResultText( null, null, $container, $actionButton );
    }
};

const enemyAttack = () => {
    const hit = ATTACK[getRandomDigit( 0, 3 )];
    const defence = ATTACK[getRandomDigit( 0, 3 )];

    return {
        value: getRandomDigit(1, HIT[hit]),
        hit,
        defence,
    };
}

const playerAttack = ( $gameForm ) => {
    const attack = {};

    for ( let item of $gameForm)
    {
        if ( item.checked && item.name === 'hit' )
        {
            attack.value = getRandomDigit( 1, HIT[item.value] );
            attack.hit = item.value;
        }

        if ( item.checked && item.name === 'defence' )
        {
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
};

export {
    playerAttack,
    enemyAttack,
    checkGameStatus,
};