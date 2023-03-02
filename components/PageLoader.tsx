import { Spinner, Flex } from "@chakra-ui/react"

export default function PageLoader({ showLoader = false }: any) {

    if (!showLoader) {
        return null
    }

    return (
        <Flex
            align="center"
            justify="center"
            position="fixed"
            left={0}
            top={0}
            right={0}
            bottom={0}
            backgroundColor="rgba(0, 0, 0, 0.5)"
            zIndex={9999}
        >
            <Spinner color="white" size="xl" />
        </Flex>
    )
}