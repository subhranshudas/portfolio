import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Box, Container, Heading, Text } from '@chakra-ui/react'
import ProductList from '@portfolio/components/ProductList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Subhranshu Das</title>
        <meta name="description" content="Portfolio site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        as="main"
        maxWidth="container.xl"
        minHeight="100vh"
        p={["6", "8"]}
        pt={0}
      >
        <LandingBanner />
        <ProductAd />

        <ProductList />
      </Container>
    </>
  )
}


function LandingBanner() {
  return (
    <Box
      bg="rgb(0, 0, 0)"
      backgroundImage="/bannerBg.jpeg"
      height="100vh"
      border="1px dotted green"
      display="flex"
      position="relative"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bgColor="rgb(0, 0, 0, 0.5)"
        zIndex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        pt="6"
        px="12"
      >
         <Text
          color="whiteAlpha.900"
          fontSize="4xl"
          zIndex={2}
        >
          {"Screw Netflix, Disney, Hulu and the rest!"}
        </Text>

        <Text
          color="whiteAlpha.900"
          fontSize="xl"
          zIndex={2}
        >
          Welcome to the 
          <Text as="span" fontSize="3xl" backdropBlur="4xl" color="blue.300"> Portal, </Text>
          where time is an illusion...
        </Text>
      </Box>
    </Box>
  )
}

function ProductAd() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      my="10"
    >
      <Heading
          color="gray.900"
          zIndex={2}
        >
          {'Now buy these fake ass products'}
      </Heading>
    </Box>
  )
}

