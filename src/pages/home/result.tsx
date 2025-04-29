import { Button, Chip, Divider, Input, Link, Slider, Tooltip, User } from "@heroui/react";
import { title, subtitle } from "@/components/primitives";
import cn from "classnames";
import { useResult } from "./hooks";
import { useSearchParams } from "react-router-dom";
import SliderComponent from "../../components/slider";
import { GithubIcon } from "@/components/icons";
import { BsDiscord, BsEnvelope, BsEnvelopeFill, BsGithub, BsLink, BsLinkedin } from "react-icons/bs";

const ResultLanding = () => {
	const [searchParams] = useSearchParams();
	const { getData, loading, contractAddress, setContractAddress, result, findTopic } = useResult();

	const highestSeverityTag = (result?.issues?.[0]?.tags || []).reduce(
		(max: any, current: any) => {
			return current.severity > max.severity ? current : max;
		},
		(result?.issues?.[0]?.tags || [])?.[0]
	);

	return (
		<>
			<div className="page-container mx-auto max-w-7xl px-1 sm:px-2 lg:px-4 xl:px-6 flex-grow pt-3 sm:pt-5 lg:pt-10 xl:pt-16 mt-2 lg:mt-10 xl:mt-14 top-hero-section">
				<div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
					<div className="inline-block max-w-[1750px] text-center justify-center">
						<h1 className={title()}>
							<div>DD.xyz Token Scanner &nbsp;</div>
							<span> Your </span>
							<span className={title({ color: "yellow" })}>Shield </span>
							<span>Against Blockchain Risks. &nbsp;</span>
						</h1>
					</div>

					<div className="">
						<div className={subtitle({ class: "mt-6" })}>Paste any token or wallet address to uncover hidden risks with DD.xyz&apos;s powerful API.</div>
					</div>
					<div className="flex flex-wrap md:flex-nowrap items-center gap-2 max-w-[800px] w-full ">
						<Input
							onChange={(e) => setContractAddress(e.target.value)}
							defaultValue={searchParams.get("contractAddress") || ""}
							className="w-full"
							label="Enter Contract Address"
							type="text"
							variant="faded"
							fullWidth
							size="lg"
						/>
						<Button isLoading={loading} onPress={() => getData(contractAddress)} type="button" color="warning" size="lg" className="md:py-[32px] min-w-[130px] w-full sm:w-auto md:w-auto">
							Scan
						</Button>
					</div>
				</div>
			</div>
			<div className="page-container !mt-[150px] top-hero-section">
				<User
					className="mb-5"
					avatarProps={{
						src: result?.details?.token_risk?.token_logo,
						className: "border",
					}}
					description={result?.details?.token_risk?.token_name || result?.details?.token_info?.tokenName}
					name={result?.details?.token_risk?.token_symbol || result?.details?.token_info?.symbol}
				/>
				<div className="grid grid-cols-12 gap-3 lg:gap-10 ">
					<div className="col-span-12 lg:col-span-5">
						<div className="thread-card">
							<span className="shadow-bg" style={{ boxShadow: `0px 0px 350px 120px ${interpolateColor(parseInt(result?.overallRisk, 10), 0.8)}` }}></span>
							<h2 className={`text-3xl font-bold `} style={{ color: interpolateColor(parseInt(result?.overallRisk, 10), 1) }}>
								{findTopic()?.name}
								<br /> ({result?.issues?.[0]?.tags?.length} {result?.issues?.length > 1 ? "issues" : "issue"})
							</h2>
						</div>
						<div className="mt-4 ">
							<p className="">{result?.details?.token_info?.description}</p>
							<div className="mt-4 grid grid-cols-2 gap-3">
								{result?.details?.token_info?.github && (
									<Link className="flex gap-2" isExternal href={result?.details?.token_info?.github}>
										<BsGithub size={20} />
										GitHub
									</Link>
								)}
								{result?.details?.token_info?.linkedin && (
									<Link className="flex gap-2" isExternal href={result?.details?.token_info?.linkedin}>
										<BsLinkedin size={20} />
										Linkedin
									</Link>
								)}
								{result?.details?.token_info?.email && (
									<Link className="flex gap-2" isExternal href={result?.details?.token_info?.email}>
										<BsEnvelopeFill size={20} />
										Email
									</Link>
								)}
								{result?.details?.token_info?.website && (
									<Link className="flex gap-2" isExternal href={result?.details?.token_info?.website}>
										<BsLink size={24} />
										Website
									</Link>
								)}
								{result?.details?.token_info?.discord && (
									<Link className="flex gap-2" isExternal href={result?.details?.token_info?.discord}>
										<BsDiscord size={20} />
										Discord
									</Link>
								)}
							</div>
						</div>
					</div>

					<div className="col-span-12 lg:col-span-7">
						<h3 className={`text-2xl font-semibold`} style={{ color: interpolateColor(parseInt(result?.overallRisk, 10), 1) }}>
							{result?.issues?.[0]?.riskScore}
						</h3>

						<div className="mt-5">
							<SliderComponent value={result?.overallRisk || 0} />
						</div>

						<div className="mb-16 mt-12">
							{result?.issues?.[0]?.tags?.map((t: { name: string; description: string; type: string; severity: number; key: string }, i: number) => (
								<div className="mt-4" key={i}>
									<h4 className="font-semibold text-lg">{t?.name}</h4>
									<p>{t.description}</p>
									{result?.issues?.[0]?.tags?.length !== i + 1 && <Divider className="mt-2" />}
								</div>
							))}
						</div>

						{/* <Slider
							classNames={{
								base: "max-w-md gap-3",
								filler: "bg-gradient-to-r from-green-300 to-danger-300 dark:from-danger-900 dark:to-danger-200",
							}}
							label="Overall Risk Score"
							getValue={(val) => `${val} of 100`}

							value={result?.overallRisk || 0}
							step={0.1}
							maxValue={100}
							renderLabel={({ children, ...props }) => (
								<label {...props} className="text-medium flex gap-2 items-center">
									{children}
									<Tooltip className="w-[200px] px-1.5 text-tiny text-default-600 rounded-small" content="The price range you want to search for." placement="right">
				
									</Tooltip>
								</label>
							)}
							renderThumb={({ index, ...props }) => (
								<div
									{...props}
									className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
								>
									<span
										className={cn(
											"transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80",
											index === 0
												? "from-green-200 to-danger-500 dark:from-green-400 dark:to-danger-600" 
												: "from-green-200 to-danger-600 dark:from-green-600 dark:to-danger-800" 
										)}
									/>
								</div>
							)}
							size="md"
						/> */}
					</div>
				</div>
			</div>
		</>
	);
};

function interpolateColor(risk: number, opacity: number) {
	const t = risk / 100;
	const success = { r: 23, g: 201, b: 100 }; // #17c964
	const warning = { r: 245, g: 165, b: 36 }; // #eab308
	const danger = { r: 243, g: 18, b: 96 }; // #ef4444

	let r, g, b;

	if (t <= 0.5) {
		const tScaled = t * 2;

		r = Math.round(success.r + (warning.r - success.r) * tScaled);
		g = Math.round(success.g + (warning.g - success.g) * tScaled);
		b = Math.round(success.b + (warning.b - success.b) * tScaled);
	} else {
		const tScaled = (t - 0.5) * 2;

		r = Math.round(warning.r + (danger.r - warning.r) * tScaled);
		g = Math.round(warning.g + (danger.g - warning.g) * tScaled);
		b = Math.round(success.b + (danger.b - warning.b) * tScaled);
	}

	return `rgba(${r}, ${g}, ${b}, ${opacity} )`;
}

export default ResultLanding;
