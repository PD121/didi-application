import { useState } from 'react'
import { useLogout } from "../../hooks/useLogout"
import { useLogin } from "../../hooks/useLogin"
import { useAuthContext } from "../../hooks/useAuthContext"

// styles
import styles from './Login.module.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { logout } = useLogout()
  const { login, error, isPending } = useLogin()
  const { user } = useAuthContext();


  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div>
      {!user && (
      <form onSubmit={handleSubmit} className={styles['login-form']}>
        <h1>登入</h1>
        <label>
          <span>電子郵件:</span>
          <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
          />
        </label>
        <label>
          <span>密碼:</span>
          <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
          />
        </label>
        <button className="btn">登錄</button>
        {error && <p>{error}</p>}
      </form>
      )}
      { user && (
      <div id="logged-in">
        <h3>你登錄成功了</h3>
        <button className="btn" onClick={logout}>登出</button>
      </div>
      )}
    </div>
  )
}
