# Vitepress Playbook by Tegar Imansyah

This is the *latest* source code of my website that I have created for the umpteenth time, using all different framework you can imagine. Like developers who want to create their own personal website or blog, I also sometimes focus too much on thinking about technical matters rather than the content that I want to present. **STOP**, don't let it be like that again.

So in this repo, I will share my playbook for when it comes to creating a content-first website. This playbook will show you a reproducible step-by-step from 0 to deployment to continue creating a content. 

## Tech stack of choice

1. **Vitepress for web framework**
- It has great default theme for desktop and mobile
- I can write as a markdown, add dynamic component in vue (+ call API), versioning with git and deploy as static website.
- I can costumize homepage, add some blog series, change navbar and sidebar effortlessly
2. **Bun**
- Not sure, but it's *blazingly fast* compare to npm
3. **Umami for web analytics**
- I already have it installed in my VPS
- It's simple, fast, privacy-focused -- so I don't have to create cookie banner
- But I haven't try it with high volume of traffic, may be I want to switch to managed service or using other alternative
4. **Deployment to manage service**
- At first, I love to deploy to my own server. But since last time I can't afford to pay my VPS then the wipe out my data, that's my bad but still it hurt. I still deploy to my own server for container based app though.
- Staticsite hosting is everywhere. Vercel is well-known and have the best DX, but it's free plan are limited to non-commercial project. Now I prefer to use **cloudflare pages**.
5. **Pocketbase for dynamic data**
- Easily create database and url + it's AuthN and AuthZ
- We will talk about this in different playbook

## Reproduce

### Install and Initiate Vitepress.

```bash
$ bunx vitepress init
```

Follow the wizard and choose `Default Theme + Customization` for our theme selection. Here is the generated file and folder

```bash
> tree -a
.
├── .vitepress
│   ├── config.mts
│   └── theme
│       ├── index.ts
│       └── style.css
├── api-examples.md
├── index.md
└── markdown-examples.md

2 directories, 6 files
```

We can run the app using

```
$ bun run docs:dev # bun instead of bunx
```

All the configuration is in `.vitepress.mts` (or `mjs` if use js instead of ts).

### Change Config

**0. See Minimal Configuration**

```js
export default defineConfig({
  title: "",
  description: "",
  themeConfig: {
    nav: [],
    socialLinks: [],
    sidebar: [],
  }
})
```

It's obvious we can change title and description. Other global config is [defined here](https://vitepress.dev/reference/site-config). The themeConfig is related to theme, but since I satisfied with default theme, I will talk about it later how to extend the config. 

**1. Change Content Directory and URL**

```js
export default defineConfig({
    ...
    cleanUrls: true, // remove `.html` in url
    srcDir: './src', // move content to src instead of root dir 
    srcExclude: ["**/$draft*.md", "draft/**/*"], // exclude draft content
    ...
})
```

**2. Navigation**

There is 3 types navigation

```
    nav => navigation link in top navbar
    socialLink => show social icon and link
    sidebar => display navigation in sidebar when open a content
``` 

**TBA**

**3. Add Analytics**

My umami tracking tag is something like this

```html
<script async src="https://umami.is/script.js" data-website-id="tracking-id"></script>
```

and we can add to `config.mjs`

```js
export default defineConfig({
    ...
    head: [
        [ 
          "script", 
          { 
            async: true, 
            src: "https://umami.is/script.js", 
            "data-website-id": "tracking-id" 
          }
        ]
    ],
    ...
})
```

But if we do that, it will trigger the event even in development. So we can change a bit + remove the hard code.

```js
const isProd = process.env.NODE_ENV === 'production'
const umamiTrackingScript = isProd ? [ "script", { async: true, src: process.env.UMAMI_SERVER, "data-website-id": process.env.UMAMI_TRACKING_CODE }] : []

export default defineConfig({
    ...
    head: [
      umamiTrackingScript
    ],
    ...
})
```

### Dynamic Content

**TBA**


