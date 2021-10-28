import {Player} from "./player.js";
import {generateLogs} from "./log.js";
import {createNode, getRandomDigit} from "./utils.js";
import {HIT, ATTACK} from "./constans.js"

class Game {
    constructor() {
        this.$arenas = document.querySelector( 'div.arenas' );
        this.$formFight = document.querySelector( 'form.control' );
        this.$reloadButton = this._createReloadButton();

        this.player1 = new Player({
            player: 1,
            name: 'SCORPION',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
        });
        this.player2 = new Player({
            player: 2,
            name: 'KITANA',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
        });

        this._handleSubmit = this._handleSubmit.bind( this );
    }

    start() {
        this.$arenas.appendChild( this.player1.$playerNode );
        this.$arenas.appendChild( this.player2.$playerNode );

        this.$formFight.addEventListener( 'submit', this._handleSubmit );

        generateLogs( 'start',  this.player1,  this.player2 );
    }

    _setNewValue ( typeAction, attackPlayerObject, defencePlayerObject, value = 0 ) {
        if ( value > 0 )
        {
            defencePlayerObject.changeHP( value );
            defencePlayerObject.renderHp();
        }
        generateLogs( typeAction, attackPlayerObject, defencePlayerObject, value );
    }

    _handleSubmit( evt )
    {
        evt.preventDefault();
        const enemyAttackObject = this._enemyAttack();
        const playerAttackObject = this._playerAttack();
    
        if ( playerAttackObject.defence !== enemyAttackObject.hit )
        {
            this._setNewValue( 'hit', this.player2, this.player1, enemyAttackObject.value );
        }
        else
        {
            this._setNewValue( 'defence', this.player2, this.player1 );
        }
    
        if ( enemyAttackObject.defence !== playerAttackObject.hit )
        {
            this._setNewValue( 'hit', this.player1, this.player2, playerAttackObject.value );
        }
        else
        {
            this._setNewValue( 'defence', this.player1, this.player2 );
        }
    
        this._checkGameStatus();
    }

    _checkGameStatus = () => {
        const {hp: hp1} = this.player1;
        const {hp: hp2} = this.player2;


        if ( hp1 === 0 && hp1 < hp2 )
        {
            this._showResultText( this.player2, this.player1 );
        }
        else if ( hp2 === 0 && hp2 < hp1 )
        {
            this._showResultText( this.player1, this.player2 );
        }
        else if ( hp1 === 0 && hp2 === 0 )
        {
            this._showResultText( null, null );
        }
    }
    
    _showResultText( winPlayer, losePlayer ) {
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

        this.$arenas.appendChild( createNode( template ) );
        this.$formFight.replaceWith( this.$reloadButton );
    }
    
    _enemyAttack() {
        const hit = ATTACK[getRandomDigit( 0, 3 )];
        const defence = ATTACK[getRandomDigit( 0, 3 )];

        return {
            value: getRandomDigit(1, HIT[hit]),
            hit,
            defence,
        };
    }

    _playerAttack() {
        const attack = {};

        for ( let $item of this.$formFight )
        {
            if ( $item.checked && $item.name === 'hit' )
            {
                attack.value = getRandomDigit( 1, HIT[$item.value] );
                attack.hit = $item.value;
            }

            if ( $item.checked && $item.name === 'defence' )
            {
                attack.defence = $item.value;
            }

            $item.checked = false;
        }

        return attack;
    }

    _createReloadButton() {
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
    }
}

export {
    Game,
};