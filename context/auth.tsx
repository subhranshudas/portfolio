import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@portfolio/firebase'
import PageLoader from '@portfolio/components/PageLoader'

export const UserContext: any = createContext({});


/**
 * This HOOK should not be used else where, ALWAYS pick AUTH data down in the
 * component tree from the "UserContext"
 */
function useUserData() {
    const router = useRouter()

    // this will always hold the Firebase Auth data
    const [user, loading, error] = useAuthState(auth)
    
    // const [signOut] = useSignOut(auth)
    const [userData, setUserData] = useState<any>(null)
    const [ unVerifiedUser, setUnVerifiedUser ] = useState<any>(null)

    async function createOrUpdateUserInDb(authUser: any) {
      if (authUser) {
        // Get a reference to the document you want to create
        const userDocRef = doc(db, 'users', authUser.uid)

        // Check if the document already exists
        const docSnap = await getDoc(userDocRef);

        
        // If the document doesn't exist, create it with some initial data
        if (!docSnap.exists()) {
          // this fields are only for the DB
          const newUser = {
            uid: authUser?.uid,
            displayName: authUser?.displayName,
            photoURL: authUser?.photoURL,
            email: authUser?.email,
            phoneNumber: authUser?.phoneNumber
          }

          try {
            await setDoc(userDocRef, newUser)
            setUserData(authUser)
            setUnVerifiedUser(null)
    
          } catch(err) {
            console.error('Error adding document: ', error)
            setUserData(null)
          }
        } else {
          // If the document exist, assign to some local state
          setUserData(authUser)
        }
       
      } else {
          console.log('No User')
      }
    }

    async function handleUnVerifiedEmail(authUser :any) {
      // restrict the user to not use the APP rather 1st verify
        // a. signOut if already signed in ?? not needed as of now
        // signOut()

        // => set the unverified user onto some state for access.
        setUnVerifiedUser(authUser)
          
        // => show a page which tells them to verify from their email
        router.push('/verifyemail')
    }


    useEffect(() => {
      if (user) {
        // if the user is verified then create a DB record and allow access to the APP
        if (user.emailVerified) {
          createOrUpdateUserInDb(user)
        } else {
          handleUnVerifiedEmail(user)
        }
        
      } else {
        setUserData(null)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    // console.log('useUserData: User Data: ', user)
    // console.log('useUserData: unVerifiedUser: ', unVerifiedUser)

    return [ userData, loading, error, unVerifiedUser ]
}



export default function UserContextProvider(props: any) {
    const [authUser, authLoading, authError, unVerifiedUser] = useUserData()

    // console.log('useUserData: User Data: authLoading ==> ', authUser)

    return (
        <UserContext.Provider value={{ authUser, authLoading, authError, unVerifiedUser }}>
            {props.children}

            <PageLoader showLoader={authLoading} />
        </UserContext.Provider>
    )
}