import React from 'react';
import './Badge.scss';

interface iBadge {
    text: string;
}

const Badge: React.FC<iBadge> = ({ text }) => {
    return (
        <div className='badge'>
            {text}
        </div>
    )
};

export default Badge;
