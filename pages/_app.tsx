import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '@portfolio/components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
