"use client";
/***** IMPORTS *****/
import { BreadCrumb } from "@/components/common/BreadCrumb";
import { Listings } from "@/components/listings/Listings";
import { Container } from "@mantine/core";
import React, { FC } from "react";

/***** TYPES *****/
interface ForRentProps {}

/***** COMPONENT-FUNCTION *****/
const ForRent: FC<ForRentProps> = (): JSX.Element => {
	// render breadcrumbItems
	const breadcrumbItems = [
		{ title: "Home", href: "/" },
		{ title: "Properties for rent", href: "/forRent" },
	];
	/*** Return statement ***/
	return (
		<Container size="lg" mx="auto" my="xl">
			<BreadCrumb items={breadcrumbItems} />
			<Listings forRent={true} />
		</Container>
	);
};
export default ForRent;