import { useContext } from "react"
import { Avatar, Button, Flex, Link } from "@chakra-ui/react"
import NextLink from "next/link"
import { UserContext } from "@portfolio/context/auth"

import { auth } from '@portfolio/firebase'
import { useSignInWithGoogle, useSignOut } from 'react-firebase-hooks/auth'


export default function Navbar() {
    const authData: any = useContext(UserContext)
    const [signOut, signOutLoading, signOutError] = useSignOut(auth)

    const [
        signInWithGoogle,
        googleSignedInUser,
        googleSignedInLoading,
        googleSignedInError
    ] = useSignInWithGoogle(auth)

    return (
        <Flex
            role="navigation"
            bg="gray.700"
            width="full"
            p="4"
            position="fixed"
            color="whiteAlpha.900"
            justifyContent="space-between"
            alignItems="center"
            zIndex={100}
        >
            <Flex gap={4}>
                <Link as={NextLink} href="/">Home</Link>
                <Link as={NextLink} href="/about">About</Link>
            </Flex>
            

            {authData.authUser ? (
                <Flex gap={4} alignItems="center">
                    <Avatar
                        name={authData?.authUser?.displayName}
                        src={authData?.authUser?.photoURL}
                        title={authData?.authUser?.displayName}
                        size="sm"
                        cursor="pointer"
                        as={NextLink}
                        href="/userprofile"
                    />
                    <Button colorScheme="red" onClick={() => signOut()}>
                        Logout
                    </Button>
                </Flex>
            ) : (
                <Button colorScheme="blue" onClick={() => signInWithGoogle()}>
                    Login with Google
                </Button>
            )}
        </Flex>
    )
}