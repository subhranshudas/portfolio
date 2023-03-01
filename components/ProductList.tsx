import {
    Box,
    Card,
    GridItem,
    SimpleGrid,
    Text,
    CardBody,
    Image,
    Stack,
    Heading,
    Divider,
    CardFooter,
    ButtonGroup,
    Button,
    useBreakpointValue,
    Flex,
    useDisclosure,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    DrawerHeader,
    DrawerFooter,
    DrawerBody,
    DrawerCloseButton,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Icon
} from '@chakra-ui/react'

import { BsCart3 } from 'react-icons/bs';

import { useState, useRef } from 'react'
import movieList from '../movieList.json'

import axios from 'axios'

function isMovieAlreadyAddedToCart(cartItems: any, movie: any) {
    return cartItems.some((cartItem: any) => cartItem.id === movie.id)
}

export default function ProductList() {
    const [cart, updateCart] = useState<any>([])
    
    const cartCurrency = movieList[0].currency
    const cartGrandTotal = cart.map((cartItem: any) => cartItem.price).reduce((total: any, currentPrice: any) => {
        return total + currentPrice
    }, 0)


    const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure()
  


    const handleAddToCart = (movieSelected: any) => {
        console.log('movieSelected: ', movieSelected)

        if (!isMovieAlreadyAddedToCart(cart, movieSelected)) {
            updateCart(
                (previousCartItems: any) => {
                    return [
                        ...previousCartItems,
                        movieSelected
                    ]
                }
            )

            onCartOpen()
        }
    }

    const removeFromCart = (movieSelected: any) => {
        const newCartItems = cart.filter((cartItem: any) => cartItem.id !== movieSelected.id);
        updateCart(newCartItems)
    }

    const handleCheckout = async () => {
        try {
            await axios.post('/api/checkout_session', {
                items: cart
            })
        } catch (error: any) {
            console.log('handleCheckout: Erorr: ' ,error?.message)
        }
    }

    console.log('CART now: ', cart)

    return (
        <>
            <SimpleGrid
                columns={{
                base: 1,
                md: 2,
                lg: 3
                }}
                spacing={{
                base: 6,
                md: 8,
                lg: 10
                }}
            >
                {movieList.map((movieItem: any) => {
                    return (
                        <ProductCard
                            key={movieItem.id}
                            {...movieItem}
                            handleAddToCart={handleAddToCart}
                            removeFromCart={removeFromCart}
                            isAlreadyAddedToCart={isMovieAlreadyAddedToCart(cart, movieItem)}
                        />
                    )
                })}
            </SimpleGrid>


            <Drawer
                isOpen={isCartOpen}
                placement='right'
                onClose={onCartClose}
                size="lg"
                >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader display="flex" alignItems="center" gap={2}>
                        <Icon as={BsCart3} />
                        Your Cart
                        <Text fontSize="md" fontWeight="thin">(total items: {cart.length})</Text>
                    </DrawerHeader>

                    <DrawerBody>
                        {cart.length > 0 ? (
                            <Stack>
                                {cart.map((itemInCart: any) => {
                                    return (
                                        <Card
                                            key={`cartItem_${itemInCart.id}`}
                                            direction={{ base: 'column', sm: 'row' }}
                                            overflow='hidden'
                                            variant='outline'
                                        >
                                            <Image
                                                objectFit='cover'
                                                maxW={{ base: '100%', sm: '200px' }}
                                                src={itemInCart.image_urls.small}
                                                alt={itemInCart.title}
                                            />

                                            <Stack>
                                                <CardBody>
                                                    <Heading size='md'>{itemInCart.title} ({itemInCart.release_date.split('-')[0]})</Heading>

                                                    <Text py='2' noOfLines={8}>
                                                        {itemInCart.overview}
                                                    </Text>
                                                </CardBody>

                                                <CardFooter justifyContent="space-between">
                                                    <Button variant='solid' colorScheme='red' onClick={() => removeFromCart(itemInCart)}>
                                                        Remove
                                                    </Button>

                                                    <Flex alignItems="center" gap={1}>
                                                        <Text fontSize="xs">{itemInCart.currency}</Text>
                                                        <Text fontWeight="bold">{itemInCart.price}</Text>
                                                    </Flex>
                                                </CardFooter>
                                            </Stack>
                                        </Card>
                                    )
                                })}
                            </Stack>
                        ) : (
                            <Alert status='warning'>
                                <AlertIcon />
                                <AlertTitle>Your Cart is empty!</AlertTitle>
                                <AlertDescription>Please add the products to the cart to checkout</AlertDescription>
                            </Alert>
                        )}
                    </DrawerBody>

                    <DrawerFooter display="flex" justifyContent="space-between">
                        <Flex gap={1} alignItems="center">
                            <Text fontWeight="extrabold">Grand Total: </Text>
                            <Flex alignItems="center" gap={1} color="green">
                                <Text fontSize="xs">{cartCurrency}</Text>
                                <Text fontWeight="bold" fontSize="2xl">{cartGrandTotal}</Text>
                            </Flex>
                        </Flex>
                        <ButtonGroup>
                            <Button variant='outline' mr={3} onClick={onCartClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='blue' onClick={() => handleCheckout()}>Checkout</Button>
                        </ButtonGroup>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
  }

  function ProductCard(props: any) {
    const { handleAddToCart, removeFromCart, ...restProps } = props;

    const moviePosterUrl = useBreakpointValue(
        {
          base: props.image_urls.small,
          md: props.image_urls.large,
        },
        {
          // Breakpoint to use when mediaqueries cannot be used, such as in server-side rendering
          // (Defaults to 'base')
          fallback: props.image_urls.large,
        },
      )

    return (
        <GridItem
            as={Card}
            rounded="md"
            boxShadow="lg"
        >
            <CardBody>
                <Image
                    src={moviePosterUrl}
                    alt={props.title}
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Box>
                        <Heading size='md'>{props.title}</Heading>
                        <Text fontWeight="semibold" color="gray.600">{props.release_date.split('-')[0]}</Text>
                    </Box>
                    
                    <Text noOfLines={6}>
                        {props.overview}
                    </Text>
                </Stack>
            </CardBody>
            <Divider color="gray.200" />
            <CardFooter justifyContent="space-between">
                <ButtonGroup spacing='2'>
                    {props.isAlreadyAddedToCart ? (
                        <Button variant='solid' colorScheme='red' onClick={() => removeFromCart(restProps)}>
                            Remove from cart
                        </Button>
                    ) : (
                        <Button variant='solid' colorScheme='blue' onClick={() => handleAddToCart(restProps)}>
                            Add to cart
                     </Button>
                    )}
                   
                </ButtonGroup>

                <Flex alignItems="center" gap={1}>
                    <Text as="span" fontSize="md">INR</Text>
                    <Text color='blue.800' fontSize='2xl' fontWeight="bold">{props.price}</Text>
                </Flex>
            </CardFooter>
        </GridItem>
    )
  }

