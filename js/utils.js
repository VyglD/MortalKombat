const createNode = ( template ) => {
    const wrapper = document.createElement( 'div' );
    wrapper.innerHTML = template;

    return wrapper.firstElementChild;
};

const getRandomDigit = ( min, max ) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const getTimeString = () => {
    const date = new Date();
    const hours = String( date.getHours() ).padStart( 2, '0' );
    const minutes =  String( date.getMinutes() ).padStart( 2, '0' );

    return `${hours}:${minutes}`;
};

export {
    createNode,
    getRandomDigit,
    getTimeString,
};