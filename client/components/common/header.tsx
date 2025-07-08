import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <nav className="container">
      <div>
        <Link href="/">Qtezy</Link>
      </div>
    </nav>
  );
}

export default Header;