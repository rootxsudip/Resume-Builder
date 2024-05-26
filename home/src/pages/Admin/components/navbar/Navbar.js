const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <h1>Admin Panel</h1>
      <ul style={navListStyle}>
        <li><a href="/logout" style={{color: '#fff',
  textDecoration: 'none'}}>Logout</a></li>
      </ul>
    </nav>
  );
};

const navbarStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const navListStyle = {
  listStyle: 'none',
  display: 'flex',
};

export default Navbar;
