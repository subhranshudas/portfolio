import { useEffect, useMemo, useState } from "react"
import {
    Stack,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Radio, RadioGroup,
    Select
} from "@chakra-ui/react"
import { useForm, useController } from 'react-hook-form'


const calculateDefaultValues = (template: any) => {
    return {
        docId: `${template?.id}`,
        adult: template?.adult ? 'true' : 'false',
        overview: template?.overview,
        popularity: `${template?.popularity}`,
        release_date: template?.release_date,
        title: template?.title,
        vote_average: `${template?.vote_average}`,
        vote_count: `${template?.vote_count}`,
        original_title: template?.original_title,
        original_language: template?.original_language,
        image_urls_small: template?.image_urls.small,
        image_urls_large: template?.image_urls.large,
        price: `${template?.price}`,
        currency: template?.currency,
        product_type: template?.product_type,
    }
}

export default function AddMovie({ onAdd, template }: any) {

    const defaultValues = useMemo(() => {
        return calculateDefaultValues(template)
    }, [template])

    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ defaultValues: defaultValues })

    async function onSubmit(formValues: any) {

        /**
         * VERY IMPORTANT IN REAL APP, always have a format & casing checker before calling this
         */

        onAdd({
            id: formValues?.docId,
            adult: formValues?.adult === 'true',
            overview: formValues?.overview,
            popularity: parseFloat(formValues?.popularity),
            release_date: formValues?.release_date,
            title: formValues?.title,
            vote_average: parseFloat(formValues?.vote_average),
            vote_count: parseInt(formValues?.vote_count),
            original_title: formValues?.original_title,
            original_language: formValues?.original_language,
            image_urls: {
              small: formValues?.image_urls_small,
              large: formValues?.image_urls_large,
            },
            price: parseInt(formValues?.price),
            currency: formValues?.currency,
            product_type: formValues?.product_type,
        })      
    }

    const { field } = useController({
        name: "adult",
        control,
        defaultValue: defaultValues.adult ? 'true' : 'false'
      })

    useEffect(() => {
        reset(calculateDefaultValues(template))
    }, [reset, template])


    return (
        <Box
            py={{ base: '8', sm: '8' }}
            px={{ base: '5', sm: '10' }}
            bg="white"
            boxShadow="lg"
            borderRadius="xl"
        >
            <Stack spacing="6">
                <Stack as="form" spacing="5" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormControl
                        isRequired
                        isInvalid={!!errors.docId}
                    >
                        <FormLabel htmlFor="docId">Movie ID</FormLabel>
                        <Input
                            id="docId"
                            type="text"
                            {...register('docId', {
                                required: 'Document ID is required',
                            })}
                        />

                        {errors?.docId ? (
                            <FormErrorMessage>
                                {errors?.docId?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>


                    <FormControl
                        isRequired
                        isInvalid={!!errors}
                    >
                        <FormLabel htmlFor="adult">Is Adult?</FormLabel>
                        <RadioGroup {...field}>
                            <Stack direction='row'>
                                <Radio value='true' {...register('adult', { required: 'Adult is required' })}>True</Radio>
                                <Radio value='false' {...register('adult', { required: 'Adult is required' })}>False</Radio>
                            </Stack>
                        </RadioGroup>

                        {errors?.adult ? (
                            <FormErrorMessage>
                                {errors?.adult?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>

                    <FormControl
                        isRequired
                        isInvalid={!!errors.overview}
                    >
                        <FormLabel htmlFor="overview">Overview</FormLabel>
                        <Input
                            id="overview"
                            type="text"
                            {...register('overview', {
                                required: 'Overview is required',
                            })}
                        />

                        {errors?.overview ? (
                            <FormErrorMessage>
                                {errors?.overview?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>

                    <FormControl
                        isRequired
                        isInvalid={!!errors.popularity}
                    >
                        <FormLabel htmlFor="popularity">Popularity</FormLabel>
                        <Input
                            id="popularity"
                            type="text"
                            {...register('popularity', {
                                required: 'Popularity is required',
                            })}
                        />

                        {errors?.popularity ? (
                            <FormErrorMessage>
                                {errors?.popularity?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>


                    <FormControl
                        isRequired
                        isInvalid={!!errors.release_date}
                    >
                        <FormLabel htmlFor="release_date">Release Date (YYYY-MM-DD)</FormLabel>
                        <Input
                            id="release_date"
                            type="text"
                            {...register('release_date', {
                                required: 'Release Date is required',
                            })}
                        />

                        {errors?.release_date ? (
                            <FormErrorMessage>
                                {errors?.release_date?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>


                    <FormControl
                        isRequired
                        isInvalid={!!errors.title}
                    >
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                            id="title"
                            type="text"
                            {...register('title', {
                                required: 'Title is required',
                            })}
                        />

                        {errors?.title ? (
                            <FormErrorMessage>
                                {errors?.title?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>

                    <FormControl
                        isRequired
                        isInvalid={!!errors.vote_average}
                    >
                        <FormLabel htmlFor="vote_average">Vote Average</FormLabel>
                        <Input
                            id="vote_average"
                            type="text"
                            {...register('vote_average', {
                                required: 'Vote Average is required',
                            })}
                        />

                        {errors?.vote_average ? (
                            <FormErrorMessage>
                                {errors?.vote_average?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>

                    <FormControl
                        isRequired
                        isInvalid={!!errors.vote_count}
                    >
                        <FormLabel htmlFor="vote_count">Vote Count</FormLabel>
                        <Input
                            id="vote_count"
                            type="text"
                            {...register('vote_count', {
                                required: 'Vote Count is required',
                            })}
                        />

                        {errors?.vote_count ? (
                            <FormErrorMessage>
                                {errors?.vote_count?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>

                    <FormControl
                        isRequired
                        isInvalid={!!errors.original_title}
                    >
                        <FormLabel htmlFor="original_title">Original Title</FormLabel>
                        <Input
                            id="original_title"
                            type="text"
                            {...register('original_title', {
                                required: 'Original Title is required',
                            })}
                        />

                        {errors?.original_title ? (
                            <FormErrorMessage>
                                {errors?.original_title?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>

                    <FormControl
                        isRequired
                        isInvalid={!!errors.original_language}
                    >
                        <FormLabel htmlFor="original_language">Original Language</FormLabel>
                        <Input
                            id="original_language"
                            type="text"
                            {...register('original_language', {
                                required: 'Original Language is required',
                            })}
                        />

                        {errors?.original_language ? (
                            <FormErrorMessage>
                                {errors?.original_language?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>

                    <FormControl
                        isRequired
                        isInvalid={!!errors.image_urls_small}
                    >
                        <FormLabel htmlFor="image_urls_small">Image URL small</FormLabel>
                        <Input
                            id="image_urls_small"
                            type="text"
                            {...register('image_urls_small', {
                                required: 'Image URL small is required',
                            })}
                        />

                        {errors?.image_urls_small ? (
                            <FormErrorMessage>
                                {errors?.image_urls_small?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>

                    <FormControl
                        isRequired
                        isInvalid={!!errors.image_urls_large}
                    >
                        <FormLabel htmlFor="image_urls_large">Image URL large</FormLabel>
                        <Input
                            id="image_urls_large"
                            type="text"
                            {...register('image_urls_large', {
                                required: 'Image URL large is required',
                            })}
                        />

                        {errors?.image_urls_large ? (
                            <FormErrorMessage>
                                {errors?.image_urls_large?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>

                    <FormControl
                        isRequired
                        isInvalid={!!errors.price}
                    >
                        <FormLabel htmlFor="price">Price</FormLabel>
                        <Input
                            id="price"
                            type="text"
                            {...register('price', {
                                required: 'Price is required',
                            })}
                        />

                        {errors?.price ? (
                            <FormErrorMessage>
                                {errors?.price?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>


                    <FormControl
                        isRequired
                        isInvalid={!!errors.currency}
                    >
                        <FormLabel htmlFor="currency">Currency</FormLabel>
                        <Input
                            id="currency"
                            type="text"
                            {...register('currency', {
                                required: 'Price is required',
                            })}
                        />

                        {errors?.currency ? (
                            <FormErrorMessage>
                                {errors?.currency?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>


                    <FormControl
                        isRequired
                        isInvalid={!!errors.product_type}
                    >
                        <FormLabel htmlFor="product_type">Product Type</FormLabel>
                            <Select
                                placeholder='Select Product Type'
                                {...register('product_type', {
                                    required: 'Product Type is required',
                                })}
                            >
                                <option value='movie'>Movie</option>
                            </Select>

                        {errors?.product_type ? (
                            <FormErrorMessage>
                                {errors?.product_type?.message?.toString()}
                            </FormErrorMessage>
                        ) : null}
                    </FormControl>

                    <Button type="submit" colorScheme="blue">Add Movie</Button>
                </Stack>
            </Stack>
        </Box>
    )
}