import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Navbar as HeroUINavbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { TwitterIcon, GithubIcon, DiscordIcon, HeartFilledIcon, SearchIcon } from "@/components/icons";
import { Logo } from "@/components/icons";
import LOGO from "../../src/asset/logo.png"


import { UserButton } from "@civic/auth/react";
import { FC, useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";

export const Navbar: FC<{ setHistoryModal: any; isSubscribed?: boolean }> = ({ setHistoryModal, isSubscribed }) => {
	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["command"]}>
					K
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
			type="search"
		/>
	);

	return (
		<>
			<HeroUINavbar maxWidth="xl" position="sticky">
				<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
					<NavbarBrand className="gap-3 max-w-fit">
						<Link className="flex justify-start items-center gap-1" color="foreground" href="/">
							<img src={LOGO} alt="logo" style={{ height : 80 }} />
						</Link>
					</NavbarBrand>
					<div className="hidden lg:flex gap-4 justify-start ml-2">
						{siteConfig.navItems.map((item) => (
							<NavbarItem key={item.href}>
								<Link className={clsx(linkStyles({ color: "foreground" }), "data-[active=true]:text-primary data-[active=true]:font-medium")} color="foreground" href={item.href}>
									{item.label}
								</Link>
							</NavbarItem>
						))}
					</div>
				</NavbarContent>

				<NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
					<NavbarItem className="hidden sm:flex gap-2">
						<Link isExternal href={siteConfig.links.twitter} title="Twitter">
							<TwitterIcon className="text-default-500" />
						</Link>
						<Link isExternal href={siteConfig.links.discord} title="Discord">
							<DiscordIcon className="text-default-500" />
						</Link>
						<Link isExternal href={siteConfig.links.github} title="GitHub">
							<GithubIcon className="text-default-500" />
						</Link>
						<ThemeSwitch />
					</NavbarItem>
					<NavbarItem className="hidden lg:flex">{!isSubscribed ? <Button color="default">Free Plan</Button> : <Button color="secondary">Subscribed!</Button>}</NavbarItem>
					<NavbarItem className="hidden md:flex">
						{/* <UserButton className="text-sm font-normal flex items-center justify-center !bg-transparent text-default-600 dark:text-white !text-[#FFB457] rounded-lg py-3 h-[38px] border-hidden" style={{ borderRadius : 12 ,  border : '1px solid rgba(255, 180, 87 , 0.5)' }}  /> */}
						<Button onPress={() => setHistoryModal(true)}>History Scan</Button>
					</NavbarItem>
				</NavbarContent>

				<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
					<Link isExternal href={siteConfig.links.github}>
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
					<NavbarMenuToggle />
				</NavbarContent>

				<NavbarMenu>
					{searchInput}
					<div className="mx-4 mt-2 flex flex-col gap-2">
						{siteConfig.navMenuItems.map((item, index) => (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link color={index === 2 ? "primary" : index === siteConfig.navMenuItems.length - 1 ? "foreground" : "foreground"} href="#" size="lg">
									{item.label}
								</Link>
							</NavbarMenuItem>
						))}
					</div>
				</NavbarMenu>
			</HeroUINavbar>
		</>
	);
};
