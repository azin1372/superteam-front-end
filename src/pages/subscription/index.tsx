import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";

export default function SubscriptionPage() {
	return (
		<DefaultLayout>
			<div className="page-container ">
				<h1 className={title()}>Subscription Levels</h1>
				<h2 className="text-xl font-semibold mt-16">Unlock the Power of Scanning!</h2>
				<div className="leading-7">
					<p>With our platform, you can perform scans effortlessly and tap into cutting-edge features.</p>
					<p>
						<span>Free Users:</span> Run up to <span>10 scans daily</span> for free.
					</p>
					<p>
						<span>Wallet-Connected Users:</span> Connect your wallet to unlock <span>100 scans</span> per connection.
					</p>
					<h3 className="text-xl font-semibold mt-6">Why Connect Your Wallet?</h3>
					<ul style={{ listStyleType: "revert" }} className="pl-4">
						<li>Access more scans</li>
						<li>Faster, smoother performance</li>
						<li>Secure connection powered by Web3</li>
					</ul>
				</div>

				<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
					<div className="inline-block w-full text-center justify-center">
						<Table aria-label="Example static collection table">
							<TableHeader>
								<TableColumn>Subscription Level</TableColumn>
								<TableColumn>Daily Scan Limit</TableColumn>
							</TableHeader>
							<TableBody>
								<TableRow key="1">
									<TableCell>Free Users</TableCell>
									<TableCell>10</TableCell>
								</TableRow>
								<TableRow key="2">
									<TableCell>Authenticate + Wallet-Connected Users</TableCell>
									<TableCell>&#8734;</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</section>
			</div>
		</DefaultLayout>
	);
}
