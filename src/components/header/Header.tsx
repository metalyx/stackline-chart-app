import React from 'react';
import { ReactComponent as StackLineSVGRFC } from '../../assets/stackline_logo.svg';
import './Header.scss';

const Header: React.FC = () => {
    return (
        <header className='header'>
            <StackLineSVGRFC className='stacklineLogo' />
        </header>
    )
};

export default Header;
