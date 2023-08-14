import { Routes, Route } from "react-router-dom";
import UpdateSectorInvolved from "./pages/UpdateSectorInvolved";
import SectorInvolved from "./pages/SectorInvolved";
import { SectorInvolvedProvider } from "./context/SectorsInvolvedProvider";

function App() {
	return (
		<SectorInvolvedProvider>
			<div className="min-h-screen container mx-auto">
				<Routes>
					<Route path="/" element={<SectorInvolved />} />
					<Route
						path="/sector/:id"
						element={<UpdateSectorInvolved />}
					/>
				</Routes>
			</div>
		</SectorInvolvedProvider>
	);
}

export default App;
