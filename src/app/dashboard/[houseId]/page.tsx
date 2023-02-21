"use client";
import { useEffect, useState } from "react";
import {
	doc,
	getDoc,
	getDocs,
	query,
	collection,
	DocumentData,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import useAuth from "@/hooks/useAuth";
import NameCard from "@/components/NameCard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

interface IProps {
	params: { houseId: string };
}

const HouseDetail = ({ params: { houseId } }: IProps) => {
	const { user } = useAuth();
	const [tenants, setTenants] = useState<DocumentData[]>([]);
	const [houseInfo, setHouseInfo] = useState<DocumentData>({
		houseId: "",
		houseName: "",
		location: "",
	});

	useEffect(() => {
		const fetchHouseInfo = async (
			userId: string | undefined,
			houseId: string
		) => {
			const docSnap = await getDoc(
				doc(db, `rent-manager/${userId}/house/${houseId}`)
			);
			if (docSnap.exists()) {
				setHouseInfo(docSnap.data());
			}
		};

		const fetchTenants = async (
			houseId: string,
			userId: string | undefined
		) => {
			let dbTenants: DocumentData[] = [];
			const q = query(
				collection(db, `rent-manager/${userId}/house/${houseId}/tenants`)
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				dbTenants.push(doc.data());
			});
			setTenants(dbTenants);
		};
		fetchHouseInfo(user?.uid, houseId);
		fetchTenants(houseId, user?.uid);
	}, [user]);

	return (
		<div className="py-10 max-w-2xl mx-auto">
			<div className="w-[80%] text-center bg-white drop-shadow-xl py-4 rounded-2xl mx-auto">
				<h1>{houseInfo.houseName}</h1>
				<p className="align-middle pt-2">
					<span className="pr-1 text-zinc-500">
						<LocationOnIcon />
					</span>
					{houseInfo.location}
				</p>
			</div>
			<div className="w-[80%] mx-auto py-20">
				<h2>
					<span className="pr-2">
						<PeopleAltIcon />
					</span>
					Rentees
				</h2>
				<ul>
					{tenants.map((tenant) => {
						return <NameCard key={tenant.tenantId} name={tenant.tenantName} />;
					})}
				</ul>
			</div>
		</div>
	);
};

export default HouseDetail;
