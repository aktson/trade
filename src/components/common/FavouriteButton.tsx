/***** IMPORTS *****/
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@firebaseConfig";
import { ActionIcon } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FirebaseError } from "firebase/app";
import { DocumentData, arrayRemove, arrayUnion, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

/***** TYPES *****/
interface FavouriteButtonProps {
	style?: React.CSSProperties;
	variant?: "filled" | "subtle" | "light" | "transparent" | "outline";
	color?: string;
	text?: boolean;
	onClick?: React.MouseEventHandler;
	listingId?: string;
}

/***** COMPONENT-FUNCTION *****/
export const FavouriteButton: FC<FavouriteButtonProps> = ({ text = false, style, variant, color, listingId }): JSX.Element => {
	/*** States ***/
	const [user, setUser] = useState<DocumentData | null>(null);
	const [isFavourite, setIsFavourite] = useState<boolean>(false);

	/*** Variables */
	const router = useRouter();
	const { currentUser } = useAuth();

	useEffect(() => {
		if (!currentUser) return setIsFavourite(false);
		const isFavouriteExist = user?.favourites?.some((item: string) => item === listingId);
		setIsFavourite(isFavouriteExist);
	}, [listingId, user?.favourites, currentUser]);

	/*** Functions */
	const fetchUser = async () => {
		const userId = auth?.currentUser?.uid;
		if (!userId) return;
		try {
			// get referance
			const usersRef = collection(db, "users");
			const userDocRef = doc(usersRef, userId);
			//query documents
			const userDocSnap = await getDoc(userDocRef);

			if (userDocSnap.exists()) {
				const userData = userDocSnap.data();
				setUser(userData);
			} else {
				notifications.show({ message: "User does not exist", color: "red" });
			}
		} catch (error) {
			console.log(error);

			if (error instanceof FirebaseError) {
				notifications.show({ message: error.message, color: "red" });
			} else {
				notifications.show({ message: "An error occurred", color: "red" });
			}
		}
	};
	/*** Effects */
	React.useEffect(() => {
		fetchUser();
	}, [currentUser]);

	const handleOnClick = async () => {
		if (!currentUser) return router.push("/signin");

		try {
			// update in firestore
			const userRef = doc(db, "users", auth?.currentUser?.uid || "");
			if (isFavourite) {
				// const filteredFavourites = user?.favourites.filter((item: string) => item !== listingId) || []; //alternative to arrayRemove remove item from favourite
				await updateDoc(userRef, {
					favourites: arrayRemove(listingId),
				});
				setIsFavourite((prev: boolean) => !prev);
			} else {
				await updateDoc(userRef, {
					favourites: arrayUnion(listingId),
				});
				setIsFavourite((prev: boolean) => !prev);
			}
		} catch (error) {
			console.log(error);
		}
	};

	/*** Return statement ***/
	return (
		<ActionIcon
			variant={variant ? variant : "transparent"}
			onClick={handleOnClick}
			style={{ ...style, width: "max-content", display: "flex", gap: "0.5em" }}
			color={isFavourite ? "red" : color}>
			{text && (isFavourite ? "Favourited" : "Add to favourite")}
			{isFavourite ? <MdFavorite size={22} fill="red" /> : <MdFavoriteBorder size={22} fill={color ? color : "white"} />}
		</ActionIcon>
	);
};
