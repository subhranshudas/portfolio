import { useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import {
    Container,
    Flex,
    Heading,
    Box, 
    Text,
    VStack,
    Divider,
    Select,
    FormControl,
    FormLabel,
    useToast
} from "@chakra-ui/react"
import { UserContext } from "@portfolio/context/auth"
import useIsAdmin from '@portfolio/hooks/useIsAdmin'

import AddMovie from '@portfolio/components/AddMovie'
import { collection, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@portfolio/firebase'

import movieList from '../../movieList.json'



async function addDocumentIfNotExists(movie: any) {
    const productCollectionRef = collection(db, "products")
    const movieDocRef = doc(productCollectionRef, movie.id)

    try {
        const docSnapshot = await getDoc(movieDocRef)

        if (!docSnapshot.exists()) {
            const newMovie = {
                ...movie,
                createdAt: serverTimestamp(),
                lastUpdatedAt: serverTimestamp()
            };

            await setDoc(movieDocRef, newMovie, { merge: true });
            
            console.log("Document created");

        } else {
            throw new Error("Document already exists");
        }
    } catch (error: any) {
        throw new Error(`Error adding document: ${error?.message}`);
    }
}


export default function UserProfile() {
    const { authUser } = useContext<any>(UserContext)
    const isAdminUser = useIsAdmin()
    const router = useRouter()
    const toast = useToast()

    const [template, setTemplate] = useState<any>(movieList[0])

    const handleSelectOnChange = (event: any) => {
        console.log('itemPicked: ', event.target.value)
        const movieSelected = movieList.find((ms) => `${ms.id}` === event.target.value)
        setTemplate(movieSelected)
    }

    const addMovieToDB = async (movie: any) => {
        try {
            await addDocumentIfNotExists(movie)
            toast({
                title: 'Movie Added Successfully!',
                description: `Movie ID - ${movie.id}`,
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: 'top'
            })
        } catch (error: any) {
            console.log('Error happened: ', error?.message)
            toast({
                title: `Error while adding movie ${movie.id}`,
                description: `${movie.original_title}: ${error?.message}`,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
        }
    }

    useEffect(() => {
        if (!authUser) {
            router.replace('/')
        }
    }, [authUser])
    
    return (
        <Container pt="80px" maxWidth="4xl">
            <Box mt="48px">
                <Heading>User Profile Page (WIP)</Heading>

                <Flex flexDirection="column" gap={3} mt="48px">
                    <Flex justifyContent="space-between">
                        <Text fontWeight="bold">User ID: </Text>
                        <Text>{authUser?.uid}</Text>
                    </Flex>

                    <Flex justifyContent="space-between">
                        <Text fontWeight="bold">User Name: </Text>
                        <Text>{authUser?.displayName}</Text>
                    </Flex>

                    <Flex justifyContent="space-between">
                        <Text fontWeight="bold">User Email: </Text>
                        <Text>{authUser?.email}</Text>
                    </Flex>

                    <Flex justifyContent="space-between">
                        <Text fontWeight="bold">Email Verified: </Text>
                        <Text>{JSON.stringify(authUser?.emailVerified)}</Text>
                    </Flex>

                    <Flex justifyContent="space-between">
                        <Text fontWeight="bold">Last Signed In: </Text>
                        <Text>{authUser?.metadata?.lastSignInTime}</Text>
                    </Flex>
                </Flex>
            </Box>

            <Box mt="12" width="100%">
                {isAdminUser ? (
                    <VStack gap={6}>
                        <Heading>ADMIN USER</Heading>

                        <FormControl>
                            <FormLabel htmlFor="template">Pick a movie from the stock</FormLabel>
                            <Select
                                id="template"
                                placeholder='Select a template'
                                defaultValue={movieList[0].id}
                                onChange={handleSelectOnChange}
                                
                            >
                                {movieList.map((templateItem) => {
                                   return (
                                        <option value={templateItem.id} key={`template_keyid_${templateItem.id}`}>
                                            Movie ID: {templateItem.id}
                                        </option>
                                    )
                                })}
                               
                            </Select>
                        </FormControl>

                       
                        <Box width="100%" display="flex" flexDirection="column" gap={4}>
                            <Heading as="h3" fontSize="xl">Add Movie to DB</Heading>
                            <AddMovie onAdd={addMovieToDB} template={template} />
                        </Box>
                    </VStack>
                ) : null}
            </Box>
        </Container>
    )
}
