import { useContext } from 'react'
import { firebase, auth, database } from './firebaseConfig';
import { AuthContext } from '../App'

const { user, setUser } = useContext(AuthContext);

export default {
  signInWithGoogle: async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
      if (result.user) {
        const { displayName, photoURL, uid } = result.user

        if(!displayName || photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
  }
}