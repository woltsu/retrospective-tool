import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div style={headerStyles}>
      </div>
    );
  }
}

const headerStyles = {
  height: '60px',
  flexGrow: 0,
  flexShrink: 0,
  backgroundColor: '#323232'
}

export default Header;
