import React from 'react';

function Card({ style, src, name }) {

    return <img src={src} style={style} alt={name} />

}

export default Card;