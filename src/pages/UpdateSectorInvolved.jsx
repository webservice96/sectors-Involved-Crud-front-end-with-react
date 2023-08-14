import { Link } from "react-router-dom";
import UpdateSectorInvolvedForm from "../components/UpdateSectorInvolvedForm";

function UpdateSectorInvolved() {
	return (
		<>
			<div className="p-4 md:py-8 md:px-0 flex flex-col justify-center md:flex-row gap-8">
				<div className="bg-white p-4 md:p-8 shadow-lg rounded-lg basis-3/5">
					<div className="text-right">
						<Link
							to="/"
							className="bg-cyan-600 text-white p-2.5 rounded-lg sdasdfsa  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-6"
						>
							Add Sector involved
						</Link>
					</div>
					<UpdateSectorInvolvedForm />
				</div>
			</div>
		</>
	);
}

export default UpdateSectorInvolved;
