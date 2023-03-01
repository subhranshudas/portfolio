import { Flex, Link } from "@chakra-ui/react"
import NextLink from "next/link"



export default function Navbar() {
    return (
        <Flex
            role="navigation"
            bg="gray.700"
            width="full"
            p="4"
            position="fixed"
            color="whiteAlpha.900"
            justifyContent="space-between"
            zIndex={100}
        >
            <Link as={NextLink} href="/">Home</Link>
            <Link as={NextLink} href="/about">About</Link>
        </Flex>
    )
}