import {createNode} from "./utils.js";

const createPlayerNode = ( playerObject ) => {
    const {player, hp, name, img} = playerObject;

    const template = (`
        <div class="player${player}">
            <div class="progressbar">
                <div class="life" style="width: ${hp}%"></div>
                <div class="name">${name}</div>
            </div>
            <div class="character">
                <img src="${img}" />
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

export {
    createPlayerObject,
};
