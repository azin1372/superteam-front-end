import { Link, Slider, Tooltip, User } from "@heroui/react";
import cn from "classnames";

const ResultLanding = () => {
	return (
		<div className="page-container mt-8">
			<User
				className="mb-5"
				avatarProps={{
					src: "https://avatars.githubusercontent.com/u/30373425?v=4",
				}}
				description={
					<Link isExternal href="https://x.com/jrgarciadev" size="sm">
						@jrgarciadev
					</Link>
				}
				name="Junior Garcia"
			/>
			<div className="grid grid-cols-12 gap-3 ">
				<div className="col-span-12 lg:col-span-5">
					<div className="thread-card">
						<h2 className="text-danger text-3xl font-bold">
							Malicious Address
							<br /> (3 issues)
						</h2>
					</div>
				</div>

				<div className="col-span-12 lg:col-span-7">
					<Slider
						classNames={{
							base: "max-w-md gap-3",
							filler: "bg-gradient-to-r from-green-300 to-danger-300 dark:from-green-500 dark:to-danger-300",
						}}
						defaultValue={100}
						formatOptions={{ style: "currency", currency: "USD" }}
						label="Price Range"
						maxValue={1000}
						renderLabel={({ children, ...props }) => (
							<label {...props} className="text-medium flex gap-2 items-center">
								{children}
								<Tooltip className="w-[200px] px-1.5 text-tiny text-default-600 rounded-small" content="The price range you want to search for." placement="right">
									<span className="transition-opacity opacity-80 hover:opacity-100">{/* <InfoIcon /> */}</span>
								</Tooltip>
							</label>
						)}
						renderThumb={({ index, ...props }) => (
							<div {...props} className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing">
								<span
									className={cn(
										"transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
										index === 0
											? "from-green-200 to-danger-500 dark:from-green-400 dark:to-danger-600" // first thumb
											: "from-green-200 to-danger-600 dark:from-green-600 dark:to-danger-800" // second thumb
									)}
								/>
							</div>
						)}
						size="md"
						step={10}
					/>
				</div>
			</div>
		</div>
	);
};

export default ResultLanding;
