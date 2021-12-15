import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import Form from './Form'
import ReactModal from 'react-modal'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  // { inputText, handleChange, typingArea, disableInput, handleSubmit, icon, placeholder }

  return (
      <div className="form-widget">
        <div>
          <div className="max-w-sm mx-auto px-5">
            <Form inputText={session.user.email} disableInput/>
          </div>
        </div>
        <div className="max-w-sm mx-auto px-5">
          <Form 
            inputText={username} 
            handleChange={(e) => setUsername(e.target.value)}
            placeholder="Name"
          />        
        </div>
        <div className="max-w-sm mx-auto px-5">
          <Form 
            inputText={website || ''}
            handleChange={(e) => setWebsite(e.target.value)}
            placeholder="Website"
          />        
        </div>
        <div className="mx-auto border-2 border-gray-200 w-6/12 text-center mt-4">
          <button
            className=" text-gray-200"
            onClick={() => updateProfile({ username, website, avatar_url })}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>

        <div className="mx-auto border-2 border-gray-200 w-6/12 text-center mt-4">
          <button className=" text-gray-200" onClick={() => supabase.auth.signOut()}>
            Sign Out
          </button>
        </div>
      </div>
  )
}