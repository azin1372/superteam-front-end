import { title, subtitle } from "@/components/primitives";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

const LandingHero = () => {
	return (
		<div className="page-container  mx-auto max-w-7xl px-1 sm:px-2 lg:px-4 xl:px-6 flex-grow pt-3 sm:pt-5 lg:pt-10 xl:pt-16">
			<div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
				<div className="inline-block max-w-[1750px] text-center justify-center">
					<h1 className={title()}>
						<div>DD.xyz Token Scanner &nbsp;</div>
						<span> Your </span>
						<span className={title({ color: "yellow" })}>Shield </span>
						<span>Against Blockchain Risks. &nbsp;</span>
					</h1>
					<div className={subtitle({ class: "mt-6" })}>Paste any token or wallet address to uncover hidden risks with DD.xyz&apos;s powerful API.</div>
				</div>

				<div className="flex flex-wrap md:flex-nowrap items-center gap-2 max-w-[800px] w-full">
					<Input className="w-full" label="Enter Contract Address" type="text" variant="faded" fullWidth size="lg" />
					<Button type="button" color="warning" size="lg" className="md:py-[32px] min-w-[130px] w-full sm:w-auto md:w-auto" >
						Scan
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LandingHero;
