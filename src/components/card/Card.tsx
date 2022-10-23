import React from 'react';
import './Card.scss';

interface iCard {
    content: React.ReactNode;
    style?: React.CSSProperties;
}

const Card: React.FC<iCard> = ({ content, style }) => {
    return (
        <div className='card' style={style}>
            {content}
        </div>
    )
};

export default Card;
