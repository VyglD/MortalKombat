import {createNode} from "./utils.js";

class Player {
    constructor( {player, name, hp, img} ) {
        this.player = player;
        this.name = name;
        this.hp = hp;
        this.img = img;

        this.$playerNode = this._createPlayerNode();
    }

    elHP() {
        return this.$playerNode.querySelector( '.life' );
    }

    changeHP( hpDiff ) {
        if ( ( this.hp - hpDiff ) < 0 )
        {
            this.hp = 0;
    
            return;
        }
    
        this.hp = this.hp - hpDiff;
    }

    renderHp() {
        this.elHP().style.width = `${this.hp}%`; 
    }
    
    attack() {
        console.log( `${this.name} Fight...` );
    }

    _createPlayerNode() {
        const {player, hp, name, img} = this;

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
    }
}

export {
    Player,
};
