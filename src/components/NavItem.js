import React from 'react'
import { Link } from 'react-router-dom'

const NavItem = ({ label, to }) => {
    return (
        <Link to={to} className="mr-4 mt-3 uppercase">{label}</Link>
    )
}

export default NavItem
