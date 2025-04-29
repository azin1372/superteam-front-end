import { FC } from "react";

const Slider: FC<{ value?: number }> = ({ value = 0 }) => {
	return (
		<div className="flex gap-3 items-center flex-grow">
			<div className="flex-grow h-[6px] bg-gradient-to-r from-teal-300 via-green-100 to-danger-400 relative rounded">
				<div className="absolute transition-all duration-1000 ease-in-out " style={{ left: `${value - 2}%`, top: -21 }}>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 512 512"
						className="text-2xl text-white"
						data-sentry-element="IoCaretDown"
						data-sentry-source-file="BehaviorProfileWidget.tsx"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="m98 190.06 139.78 163.12a24 24 0 0 0 36.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"></path>
					</svg>
				</div>
				<div className="absolute transition-all duration-1000 ease-in-out " style={{ left: `${value - 2}%`, top: 2 }}>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 512 512"
						className="text-2xl text-white"
						data-sentry-element="IoCaretUp"
						data-sentry-source-file="BehaviorProfileWidget.tsx"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M414 321.94 274.22 158.82a24 24 0 0 0-36.44 0L98 321.94c-13.34 15.57-2.28 39.62 18.22 39.62h279.6c20.5 0 31.56-24.05 18.18-39.62z"></path>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default Slider;
