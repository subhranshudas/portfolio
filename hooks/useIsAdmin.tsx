import { useEffect, useState } from "react"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@portfolio/firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export default function useIsAdmin() {
    const [user, loading, error] = useAuthState(auth)
    const [isAdmin, setIsAdmin] = useState(false)

    async function checkForAdmin(authUser: any) {       
        try {
            const userDocRef = doc(db, 'users', authUser.uid)

            // Check if the document already exists
            const docSnap = await getDoc(userDocRef)

            if (docSnap.exists()) {
                const loogedInUserData = docSnap.data()
                setIsAdmin(loogedInUserData.role === 'admin')
            }
        } catch(err) {
            setIsAdmin(false)
        }
    }

    useEffect(() => {
         // This can optimize the performance, avoid unnecessary calls
        if (user && user.emailVerified) {
           checkForAdmin(user)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])


    return isAdmin
}