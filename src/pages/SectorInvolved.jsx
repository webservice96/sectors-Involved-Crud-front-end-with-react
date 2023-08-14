import AddNewSectorInvolved from "../components/AddNewSectorInvolved";
import SectorInvolvedList from "../components/SectorInvolvedList/SectorInvolvedList";
import { useSectorInvolvedData } from "../context/SectorsInvolvedProvider";

function SectorInvolved() {
	const { state: sectors } = useSectorInvolvedData();
	return (
		<>
			<div className="p-4 md:py-8 md:px-0 flex justify-center flex-col md:flex-row gap-8">
				<div
					className={`bg-white p-4 md:p-8 shadow-lg rounded-lg ${
						sectors?.length > 0 ? "md:basis-2/5" : "basis-3/5"
					} `}
				>
					<AddNewSectorInvolved />
				</div>
				{sectors?.length > 0 && (
					<div className="bg-white p-4 md:p-8 shadow-lg rounded-lg md:basis-3/5">
						<SectorInvolvedList sectors={sectors} />
					</div>
				)}
			</div>
		</>
	);
}

export default SectorInvolved;
