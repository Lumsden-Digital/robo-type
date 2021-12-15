import React from 'react'
import { Link } from 'react-router-dom'
import NavItem from './NavItem'
import { supabase } from '../supabaseClient'

const Header = ({ showModal, setShowModal }) => {

    const user = supabase.auth.user()

    console.log(user)

    return (
        <div className="bg-gray-800 px-6 py-4 w-full flex justify-between items-center">
            <div>
                <Link to="/"><h1 className=" text-left text-7xl font font-title text-gray-200 uppercase">robo-type</h1></Link>
            </div>
            <div className="bg-gray-200 mb-3 w-10 h-10 rounded-full cursor-pointer">
                <img src="https://avatars.dicebear.com/api/bottts/lumsdenr.svg" alt="avatar" className="rounded-full w-full h-full" onClick={() => setShowModal(!showModal)}/>
            </div>
        </div>
    )
}

export default Header
