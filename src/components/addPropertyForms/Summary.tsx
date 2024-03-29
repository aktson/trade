/***** IMPORTS *****/
import { Button, Flex, LoadingOverlay, Stack, Text } from "@mantine/core";
import React, { FC, useState } from "react";
import { MdChevronLeft, MdPublish } from "react-icons/md";
import { SummaryItem } from "./SummaryItem";
import Image from "next/image";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { usePropertyFormData } from "@/store/propertyFormStore";
import { useAddListingMutation } from "@/hooks/listingHooks/useAddListingMutation";

/***** COMPONENT-FUNCTION *****/
export const Summary: FC = (): JSX.Element | null => {
	/*** States */
	const [isSubmitting, setIsSubmitting] = useState(false);

	/*** Variables */
	const addListingsMutation = useAddListingMutation();
	const { formData, prevStep, reset } = usePropertyFormData((state) => ({
		formData: state.formData,
		prevStep: state.prevStep,
		reset: state.reset,
	}));

	/** Submits formdata and adds new document to "listings"
	 * @param {fields} <IListings> fields
	 * @return {void}
	 */
	async function handleFormSubmit(event: React.FormEvent) {
		event.preventDefault();
		setIsSubmitting(true);
		try {
			await addListingsMutation.mutateAsync({ formData });
			reset();
		} catch (error) {
			console.log(error);
			if (error instanceof FirebaseError) {
				notifications.show({ message: error.message, color: "red" });
			} else {
				notifications.show({ message: "An error occurred", color: "red" });
			}
		} finally {
			setIsSubmitting(false);
		}
	}

	/*** Return statement ***/
	return (
		<form onSubmit={handleFormSubmit}>
			<Stack spacing="sm" my="xl">
				<Text component="h2">Property Details</Text>
				<Flex gap="md">
					<SummaryItem label="Type" text={formData?.type} />
					<SummaryItem label="Heading" text={formData?.title} />
				</Flex>
				<SummaryItem label="Description" text={formData?.description} />
				<Flex gap="md">
					<SummaryItem label="Address" text={formData?.address} />
					<SummaryItem label="City" text={formData?.city} />
				</Flex>
			</Stack>
			<Stack spacing="sm" mb="xl">
				<Text component="h2">Facilities</Text>
				<SummaryItem label="Price" text={formData?.price} />

				<Flex gap="md">
					<SummaryItem label="Parking" text={formData?.parking ? "Yes" : "No"} />
					<SummaryItem label="Furnished" text={formData?.furnished ? "Yes" : "No"} />
				</Flex>
				<Flex gap="md">
					<SummaryItem label="Bedrooms" text={formData?.bedrooms} />
					<SummaryItem label="Bathrooms" text={formData?.bathrooms} />
				</Flex>
			</Stack>
			<Stack spacing="sm" mb="xl">
				<Text component="h2">Images</Text>
				<Flex gap="md" wrap="wrap">
					{formData?.imgUrls?.map((image) => {
						return (
							<figure key={image} style={{ position: "relative", boxShadow: "2px 2px 16px rgba(0,0,0,0.2)" }}>
								<Image src={image} alt={"just a image"} width={150} height={150} />
							</figure>
						);
					})}
				</Flex>
			</Stack>
			<Flex justify="flex-end" gap="sm">
				<Button type="button" onClick={() => prevStep()} leftIcon={<MdChevronLeft size={18} />}>
					Previous
				</Button>
				<Button type="submit" rightIcon={<MdPublish size={18} />}>
					Publish
				</Button>
			</Flex>
			<LoadingOverlay visible={isSubmitting} overlayBlur={1} />
		</form>
	);
};
