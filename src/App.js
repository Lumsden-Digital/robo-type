import './App.css';
import Header from './components/Header'
import Game from './components/Game';
import Auth from './components/Auth'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Account from './components/Account';
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient';
import Profile from './components/Profile';

function App() {

  const [user, setUser] = useState({})
  const [session, setSession] = useState(null)
  const [showModal, setShowModal] = useState(false)
  // const [id, setId] = useState(null)

  useEffect(() => {
    setUser(supabase.auth.user())
  }, [])

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    console.log(`Session: ${session}\nUser: ${user}`)
  }, [])
  
  return (
    <Router>
      <div className="w-screen min-h-screen bg-gray-800 md:px-32 lg:px-80">
      <Header showModal={showModal} setShowModal={setShowModal}/> 
        <Switch>
          <Route exact path="/">
            <Game user={user} supabase={supabase}/>
          </Route>
          <Route exact path="/auth">
            <Auth />
          </Route>
          <Route exact path="/profile">
            {!session ? <Auth /> : <Profile key={session.user.id} session={session} />}
          </Route>
          <Route exact path="/account">
            {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
          </Route>
        </Switch>      
        {!session ? <Auth /> : <Profile key={session.user.id} session={session} showModal={showModal} setShowModal={setShowModal}/>}
      </div>
    </Router>
  );
}

export default App;


