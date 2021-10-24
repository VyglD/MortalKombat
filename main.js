const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const $arenas = document.querySelector( 'div.arenas' );
const $randomButton = $arenas.querySelector( 'button.button' );
const $formFight = document.querySelector( 'form.control' );
const $chat = document.querySelector( '.chat' );

const createNode = ( template ) => {
    const wrapper = document.createElement( 'div' );
    wrapper.innerHTML = template;

    return wrapper.firstElementChild;
};

const getRandomDigit = ( min, max ) => {
    return Math.floor(Math.random() * (max - min) + min);
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

const setGameStep = ( playerObject ) => {
    playerObject.changeHP( getRandomDigit( 1, 20 ) );
    playerObject.renderHp();
};

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

const enemyAttack = () => {
    const hit = ATTACK[getRandomDigit( 0, 3 )];
    const defence = ATTACK[getRandomDigit( 0, 3 )];

    return {
        value: getRandomDigit(1, HIT[hit]),
        hit,
        defence,
    };
}


const playerAttack = () => {
    const attack = {};

    for ( let item of $formFight)
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

const addToChat = ( string ) => {
    const textElement = `<p>${string}</p>`;
    $chat.insertAdjacentHTML( 'afterbegin', textElement );
};

const getTimeString = () => {
    const date = new Date();
    const hours = String( date.getHours() ).padStart( 2, '0' );
    const minutes =  String( date.getMinutes() ).padStart( 2, '0' );

    return `${hours}:${minutes}`;
};

const getActionString = ( type, attackPlayerObject, defencePlayerObject ) => {
    const phrases = logs[type];
    const attackString = phrases[getRandomDigit( 0, phrases.length )]
        .replace( '[playerKick]', attackPlayerObject.name )
        .replace( '[playerDefence]', defencePlayerObject.name );

    return attackString;
};

const generateLogs = ( type, attackPlayerObject, defencePlayerObject, attackValue = '' ) => {
    let text = '';
    
    switch ( type )
    {
        case 'start':
            text = logs[type]
                .replace( '[time]', getTimeString() )
                .replace( '[player1]', attackPlayerObject.name )
                .replace( '[player2]', defencePlayerObject.name )
            break;
        case 'hit':
            const attackString =  getActionString( type, attackPlayerObject, defencePlayerObject );
            text = `${getTimeString()} - ${attackString} -${attackValue} ${defencePlayerObject.hp}/100`;
            break;
        case 'defence':
            const defenceString =  getActionString( type, attackPlayerObject, defencePlayerObject );
            text = `${getTimeString()} - ${defenceString}`;
            break;
        case 'draw':
            text = logs[type];
            break;
        case 'end':
            const phrases = logs[type];
            text = phrases[getRandomDigit( 0, phrases.length )]
                .replace( '[playerWins]', attackPlayerObject.name )
                .replace( '[playerLose]', defencePlayerObject.name );
            break;
    }

    addToChat( text );
};

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
    const playerAttackObject = playerAttack();

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