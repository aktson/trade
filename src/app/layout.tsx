import Header from "@/components/layout/Header";
import "./styles/globals.css";
import { Inter } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { ListingsProvider } from "@/context/ListingsContext";
import Notification from "@/components/common/Notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthProvider>
					<ListingsProvider>
						<Header />
						<main>{children}</main>
						<Footer />
						<Notification />
					</ListingsProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
