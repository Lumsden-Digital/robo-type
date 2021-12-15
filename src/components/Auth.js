import { useState, useRef} from 'react'
import { supabase } from '../supabaseClient'
import Form from './Form'


export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const typingArea = useRef(null)

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleLogin = async (email) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    // <div className="row flex flex-center">
    //   <div className="col-6 form-widget">
    //     <h1 className="header">Supabase + React</h1>
    //     <p className="description">Sign in via magic link with your email below</p>
        
    //     <div>
    //       <button
    //         onClick={(e) => {
    //           e.preventDefault()
    //           handleLogin(email)
    //         }}
    //         className={'button block'}
    //         disabled={loading}
    //       >
    //         {loading ? <span>Loading</span> : <span>Send magic link</span>}
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="max-w-sm mx-auto px-5 my-4">
      <p className="font-body text-gray-200">Sign in via magic link with your email below</p>
      <Form 
          inputText={email}
          handleChange={handleChange}
          typingArea={typingArea}
          disableInput={false}
          handleSubmit={handleLogin}
          placeholder="your email"
          icon="submit"
        />
    </div>
  )
}