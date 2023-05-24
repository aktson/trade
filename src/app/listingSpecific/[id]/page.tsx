"use client";
/***** IMPORTS *****/
import React, { FC, useEffect, useState } from "react";
import { Badge, Button, Container, Divider, Flex, Grid, Stack, Text } from "@mantine/core";
import { auth, db } from "@firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { IListings } from "@/types/types";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { ShareButton } from "@/components/common/ShareButton";
import { ImageSlider } from "@/components/common/ImageSlider";
import { capitalize } from "@/functions/functions";
import { FavouriteButton } from "@/components/common/FavouriteButton";
import { MdBathroom, MdOutlineBedroomChild, MdLocalParking, MdChair } from "react-icons/md";
import Link from "next/link";

/***** TYPES *****/
interface ListingSpecificProps {
	params: { id: string };
}

/***** COMPONENT-FUNCTION *****/
export const ListingSpecific: FC<ListingSpecificProps> = ({ params }): JSX.Element => {
	/*** States */
	const [listing, setListing] = useState<{} | IListings>({} as IListings);
	const [loading, setLoading] = useState<boolean>(false);

	/*** Variables */
	const { id } = params;

	const { title, imgUrls, address, city, price, description, type, bathrooms, bedrooms, parking, furnished, userRef } = listing as IListings;
	/*** Functions */

	async function getListing() {
		try {
			const docRef = doc(db, "listings", id);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setListing(docSnap.data());
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	/*** Effects */
	// fetches single listing
	useEffect(() => {
		getListing();
	}, [id]);

	/*** Return statement ***/
	if (loading)
		return (
			<Container size="lg" mx="auto" my="xl">
				<LoadingSkeleton />{" "}
			</Container>
		);
	return (
		<Container size="md" mx="auto" my="xl">
			{/* image slider  */}
			<ImageSlider imgUrls={imgUrls} />

			{/* favourite and share button */}
			<Flex mt="2em" gap="md">
				<FavouriteButton style={{ padding: "1em" }} variant="outline" color="gray" text={true} />
				<ShareButton />
			</Flex>

			{/* title and price of property */}
			<Flex justify="space-between" align="center" mt="sm">
				<Stack spacing="0">
					<Text size="3rem">
						{title}
						<Badge>{type === "rent" ? "For rent" : "For sale"}</Badge>
					</Text>

					<Text>
						{capitalize(address)}, {capitalize(city)}
					</Text>
				</Stack>
				<Stack>
					<Text size="2rem">NOK {price}</Text>
					{auth?.currentUser?.uid !== userRef && (
						<Link href={`/contact/${userRef}?listingName=${title}&listingLocation=${location}`}>
							<Button>Contact</Button>
						</Link>
					)}
				</Stack>
			</Flex>

			{/* facilities */}
			<Stack mt="3em">
				<Text size="xl" fw={500}>
					Facilities
				</Text>
				<Divider />
				<Grid style={{ maxWidth: "500px" }} gutter="xl">
					<Grid.Col span={6}>
						<Flex justify="space-between">
							<Flex gap="xs">
								<MdBathroom size={18} />
								Bathrooms
							</Flex>
							<Text fw="bold">{bathrooms}</Text>
						</Flex>
					</Grid.Col>
					<Grid.Col span={6}>
						<Flex justify="space-between">
							<Flex gap="xs">
								<MdOutlineBedroomChild />
								Bedrooms
							</Flex>
							<Text fw="bold">{bedrooms}</Text>
						</Flex>
					</Grid.Col>
					<Grid.Col span={6}>
						<Flex justify="space-between">
							<Flex gap="xs">
								<MdChair size={18} />
								Furnished
							</Flex>
							<Text fw="bold">{furnished ? "Yes" : "No"}</Text>
						</Flex>
					</Grid.Col>
					<Grid.Col span={6}>
						<Flex justify="space-between">
							<Flex gap="xs">
								<MdLocalParking size={18} />
								Parking
							</Flex>
							<Text fw="bold">{parking ? "Yes" : "No"}</Text>
						</Flex>
					</Grid.Col>
				</Grid>
			</Stack>

			{/* description of property */}
			<Stack spacing="xs" mt="3em">
				<Text size="xl" fw={500}>
					About Property
				</Text>
				<Divider />
				<Text>{description}</Text>
			</Stack>
		</Container>
	);
};

export default ListingSpecific;