import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative">
			<main className="">{children}</main>
			<footer className="w-full flex items-center justify-center py-3">
				<Link isExternal className="flex items-center gap-1 text-current" href="/https://x.com/0xAzin" title="X">
					<span className="text-default-600">Made with &#x2764; by</span>
					<p className="text-primary">Azin</p>
				</Link>
			</footer>
		</div>
	);
}
