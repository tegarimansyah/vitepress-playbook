import { defineConfig } from 'vitepress'
import sidebars from './navigation/sidebars'
import navs from './navigation/navs'
import socials from './navigation/socials'

const isProd = process.env.NODE_ENV === 'production'
const umamiTrackingScript = isProd ? [ "script", { async: true, src: process.env.UMAMI_SERVER, "data-website-id": process.env.UMAMI_TRACKING_CODE }] : []

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tegar Imansyah",
  description: "Software, Cloud, DevOps Enthusiast",

  cleanUrls: true, // remove `.html` in url
  srcDir: './src', // move content to src instead of root dir 
  srcExclude: ["**/$draft*.md", "draft/**/*"], // exclude draft content
  
  head: [
    umamiTrackingScript,
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: navs,
    sidebar: sidebars,
    socialLinks: socials
  }
})
