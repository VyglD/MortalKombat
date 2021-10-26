import {logs} from "./constans.js";
import {getRandomDigit, getTimeString} from "./utils.js";

const $chat = document.querySelector( '.chat' );

const addToChat = ( string ) => {
    const textElement = `<p>${string}</p>`;
    $chat.insertAdjacentHTML( 'afterbegin', textElement );
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

export {
    generateLogs,
};
