
import { title, subtitle } from "@/components/primitives";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

const LandingHero = () => {
	return (
		<div className="container  mx-auto max-w-7xl px-6 flex-grow pt-16">
			<div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 ">
				<div className="inline-block max-w-xl text-center justify-center">
					<span className={title()}>DD.xyz Token Scanner Your&nbsp;</span>
					<span className={title({ color: "yellow" })}>Shield </span>
					<span className={title()}>Against &nbsp;</span>
					<br />
					<span className={title()}> Blockchain Risks.</span>
					<div className={subtitle({ class: "mt-4" })}>Paste any token or wallet address to uncover hidden risks with DD.xyz&apos;s powerful API.</div>
				</div>

				<div className="min-w-[700px] flex items-center gap-2">
					<Input className="w-full" label="Enter Contract Address" type="text" variant="faded" fullWidth size="lg" />
					<Button type="button" color="warning" size="lg" className="py-[32px] min-w-[130px]">
						Scan
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LandingHero;
