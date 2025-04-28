import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/home/index";
import DocsPage from "@/pages/docs";

function App() {
	return (
		<div className="pattern">
			<Routes>
				<Route element={<IndexPage />} path="/" />
				<Route element={<DocsPage />} path="/docs" />
			</Routes>
		</div>
	);
}

export default App;
