/* eslint-disable react/prop-types */
import SectorItem from "./SectorItem";

function SectorInvolvedList({ sectors }) {
	return (
		<>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white shadow-lg rounded-lg  divide-y divide-gray-200">
					<thead className="bg-green-300">
						<tr>
							<th className="py-2 px-4">Name</th>
							<th className="py-2 px-4">Sectors</th>
							<th className="py-2 px-4">Agree</th>
							<th className="py-2 px-4">Actions</th>
						</tr>
					</thead>
					<tbody className="text-gray-700">
						{sectors?.map((sector) => (
							<SectorItem key={sector._id} sector={sector} />
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default SectorInvolvedList;
