import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '@portfolio/components/Navbar'
import UserContextProvider from '@portfolio/context/auth'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserContextProvider>
    </ChakraProvider>
  )
}
