import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import { database } from '../service/firebaseConfig'
import illustrationImg from '../assets/images/illustration.svg'
import logoimg from '../assets/images/logo.svg'
import { Button } from '../components/Button/Button'
import { useAuth } from '../hooks/useAuth'

import '../styles/auth.scss'

export function NewRoom() {
  const history = useHistory()
  const { user } = useAuth()

  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if(newRoom.trim() === '') {
      return 
    }
    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie sals de Q&amp;A ao-vivo</strong>
        <p>Tire as dúdias da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoimg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}