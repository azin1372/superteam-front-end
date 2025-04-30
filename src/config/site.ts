export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DD.xyz",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Subscription",
      href: "/subscription",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Subscription Levels",
      href: "/subscription",
    },

  ],
  links: {
    github: "https://github.com/azin1372",
    twitter: "https://x.com/0xAzin",
    docs: "https://heroui.com",
    discord: "https://discord.gg/azinat",
  },
};
