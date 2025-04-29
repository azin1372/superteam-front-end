import DefaultLayout from "@/layouts/default";
import ResultLanding from "./result";

export default function IndexPage() {

	return (
		<DefaultLayout>
			<section className="">
				{/* <img alt="pattern"    /> */}
				<ResultLanding />

				{/* <div className="flex gap-3">
					<Link
						isExternal
						className={buttonStyles({
							color: "primary",
							radius: "full",
							variant: "shadow",
						})}
						href={siteConfig.links.docs}
					>
						Documentation
					</Link>
					<Link isExternal className={buttonStyles({ variant: "bordered", radius: "full" })} href={siteConfig.links.github}>
						<GithubIcon size={20} />
						GitHub
					</Link>
				</div> */}

				{/* <div className="mt-8">
					<Snippet hideCopyButton hideSymbol variant="bordered">
						<span>
							Get started by editing <Code color="primary">pages/index.tsx</Code>
						</span>
					</Snippet>
				</div> */}
			</section>
		</DefaultLayout>
	);
}
