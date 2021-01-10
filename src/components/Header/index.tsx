import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { pathname } = useLocation();
  return (<Container size={size}>
    <header>
      <img src={Logo} alt="GoFinances" />
      <nav>
        <Link to='/' style={{ borderBottom: pathname === '/' ? '2px solid #FF872C' : '', paddingBottom: 10 }}>Listagem</Link>
        <Link to='/import' style={{ borderBottom: pathname === '/import' ? '2px solid #FF872C' : '', paddingBottom: 10 }}>Importar</Link>
      </nav>
    </header>
  </Container>);
}

export default Header;
