import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "@/styles/globals.css";
import { ToastProvider } from "@heroui/react";
import { Provider } from "./provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Provider>
			<ToastProvider placement="bottom-center" />
			<App />
		</Provider>
	</BrowserRouter>
);
