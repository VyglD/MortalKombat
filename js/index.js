import {getRandomDigit} from "./utils.js";

const $parent = document.querySelector('.parent');
const $player = document.querySelector('.player');

const INDEX_PLAYER_ATTRIBUTE = 'data-index-player';

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        if (Array.isArray(className)) {
            className.forEach(item => {
                $tag.classList.add(item);
            })
        } else {
            $tag.classList.add(className);
        }

    }

    return $tag;
}

function createEmptyPlayerBlock() {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

async function init() {
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');

    const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());

    let imgSrc = null;
    createEmptyPlayerBlock();

    let player1Selected = false;

    players.forEach(item => {
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');

        el.setAttribute( INDEX_PLAYER_ATTRIBUTE, item.id );

        el.addEventListener('mousemove', () => {
            if (!player1Selected && imgSrc === null) {
                imgSrc = item.img;
                const $img = createElement('img');
                $img.src = imgSrc;
                $player.appendChild($img);
            }
        });

        el.addEventListener('mouseout', () => {
            if (!player1Selected && imgSrc) {
                imgSrc = null;
                $player.innerHTML = '';
            }
        });

        el.addEventListener('click', () => {
            if ( !player1Selected )
            {
                //TODO: Мы кладем нашего игрока в localStorage что бы потом на арене его достать.
                // При помощи localStorage.getItem('player1'); т.к. в localStorage кладется строка,
                // то мы должны ее распарсить обратным методом JSON.parse(localStorage.getItem('player1'));
                // но это уже будет в нашем классе Game когда мы инициализируем игроков.
                localStorage.setItem('player1', JSON.stringify(item));

                player1Selected = true;
    
                el.classList.add('active');
                el.classList.add( 'disabled' );
    
                const $players = Array.from( $parent.querySelectorAll( 'div.character:not(.disabled)') );
                const $enemyEl = $players[getRandomDigit( 0, $players.length )];
                $enemyEl.classList.add('active');
                $enemyEl.classList.add('active-enemy');

                players.find( ( player ) => player.id == $enemyEl.getAttribute( INDEX_PLAYER_ATTRIBUTE ) );
                const enemyPlayer = players.find( ( player ) => player.id == $enemyEl.getAttribute( INDEX_PLAYER_ATTRIBUTE ) );
                
                const $enemyimg = createElement('img');
                $enemyimg.src = enemyPlayer.img;
                document.querySelector('.enemy').appendChild( $enemyimg );
                
                localStorage.setItem( 'player2', JSON.stringify( enemyPlayer ) );
    
                $players.forEach( ( $player ) => $player.classList.add( 'disabled' ) );
    
                setTimeout(() => {
                    window.location.pathname = 'arenas.html'
                }, 1000);
            }
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();
