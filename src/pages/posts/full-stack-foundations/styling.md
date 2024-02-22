---
layout: ../../../layouts/MarkdownCourseLayout.astro
title: 'Styling'
author: 'Some learner on the web'
image:
    url: 'https://raw.githubusercontent.com/ROSORRNT/img-data/main/animals/owl.png'
    alt: 'owl.'
tags: ["astro", "blogging", "learning in public"]
---

[Back to Full Stack Foundation](/posts/workshop-resume/full-stack-foundations)

# Links to Public Files
[links remix doc](https://remix.run/docs/en/main/route/links ) :

````js
export const links: LinksFunction = () => {...}
````
[Link remix doc](https://remix.run/docs/en/main/components/links)

> app/root.tsx
````jsx
import { Links } from "@remix-run/react";

export default function Root() {
  return (
    <html>
      <head>
       * <Links /> *
      </head>
      <body></body>
    </html>
  );
}

````

👨‍💼 First off, we've got an awesome favicon for our site ***in the `public` directory.*** Browsers will request the `/favicon.ico` by default, but we've got a ✨ responsive ✨ 

`public/favicon.svg`

To do this, we'll need to add a `<link>` to 

`app/root.tsx`

**In Remix, you add links to the page by exporting a `links` function:**



```javascript
// ...
import { type LinksFunction } from '@remix-run/node'

export const links: LinksFunction = () => {
	return [
		{
			rel: 'stylesheet',
			// all files in the public directory are served at the root of the site
			href: '/my-stylesheet.css',
		},
	]
}

//...
```

It's important for you to know that Remix puts all the responsibility of what appears in the document on you. The `app/root.tsx` component you export is responsible for everything that appears between `<html>` and `</html>` and **that includes the `<head>` element which contains the links that routes define.** So you need to render the [`<Links />`](https://remix.run/docs/en/main/components/links) element in that component:

```jsx
// ...
import { Links } from '@remix-run/react'

// ...

export default function App() {
	return (
		<html>
			<head>
				<Links />
			</head>
			{/* ... */}
		</html>
	)
}
```

# Asset Import

[Asset Import Remix Doc](https://remix.run/docs/en/main/file-conventions/remix-config#assetsbuilddirectory)

# Global Styles

[ Remix Styling Docs: Regular Stylesheets](https://remix.run/docs/en/main/styling/css#regular-css)

👨‍💼 Every application has *some* stylesheets that need to apply globally throughout the application. In our case, we want to have a special font applied to our app which your co-worker Kellie (🧝‍♀️ hello there 👋) placed in the `public` directory.

🧝‍♂️ Yep, I also added 

`app/styles/font.css`

 which loads the font and gets things ready for use.


```jsx
import fontStylesheetUrl from './styles/font.css'

export const links: LinksFunction = () => {
	return [
		{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
		**{ rel: 'stylesheet', href: fontStylesheetUrl },**
	]
}

export default function App() {
	return (
		<html lang="en">
			<head>
				<Links />
			</head>

```

# Compiling CSS
## PostCSS && Tailwind

👨‍💼 Même si la plupart de nos utilisateurs utilisent des navigateurs modernes, certaines fonctionnalités CSS ne sont pas prises en charge par tous les navigateurs de nos utilisateurs. Pour nous assurer que nos styles fonctionnent pour tout le monde, nous devons compiler notre CSS à l'aide d'un outil appelé PostCSS. Babel est spécifique au JS, tandis que PostCSS est spécifique au CSS.

> tailwind.config.ts :
```json
import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme.js'

export default {
	content: ['./app/**/*.{ts,tsx,jsx,js}'],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'Nunito Sans',
					'Nunito Sans Fallback',
					...defaultTheme.fontFamily.sans,
				],
			},
		},
	},
} satisfies Config
```

📜 You can read more about configuring Tailwind with PostCSS in [the Tailwind docs](https://tailwindcss.com/docs/using-with-preprocessors).

🐨 Now all that's left is for you to create a  `app/styles/tailwind.css`



```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then import this file and include a link tag for it in the `app/root.tsx`
file.

Finally, to test that this worked, you can style the "Hello World" to have a Tailwind class name like `p-8 text-xl`. If you see the text get bigger and more spaced, you're all set!

- 📜 [Remix PostCSS Docs](https://remix.run/docs/en/1.18.0/guides/styling#postcss)
- 📜 [Remix TailwindCSS Docs](https://remix.run/docs/en/1.18.0/guides/styling#tailwind-css)


# Bundling CSS
https://remix.run/docs/en/main/styling/bundling#css-bundling

👨‍💼 Pendant qu'on dev notre app, on aura besoin d'utiliser **une lib de composants** qui nécessite l'ajout de certains CSS. One or two of these are not a big deal, but our `root.tsx` `links` export could get pretty big if we do this for a lot of components.

**Remix's CSS Handling**: Remix simplifies CSS management by automatically bundling CSS files. There are two ways to import CSS:

   - `import stylesheetUrl from './styles1.css'`: This imports the CSS file and assigns its URL to `stylesheetUrl`. You can then use this URL in the `links` export to link the stylesheet.
   - `import './styles2.css'`: This directly imports the CSS file and Remix will bundle it automatically.

**Key Point**: If you import a CSS file directly (like `styles2.css` in the example), without assigning its URL to a variable (like `stylesheetUrl` for `styles1.css`), Remix will automatically bundle this CSS with your application. This method is simpler and avoids cluttering the `root.tsx` with multiple CSS links.




So, Remix allows you to import CSS files that are bundled (réuni) automatically. It's pretty simple:



```javascript
import stylesheetUrl from './styles1.css' // <-- you use the URL in the links export
import './styles2.css' // <-- this will be bundled
```


So, if you just import the CSS file without an "import clause" (the `stylesheetUrl` variable in the example above), it will be bundled for you.

However, we are still responsible for everything on the page between the `<html>` and the `</html>` tags, so if we want the bundled CSS file on the page then we need to make sure we add it to the links. Remix gives us access to that URL through a special package called `@remix-run/css-bundle`:



```js
import './styles2.css'
import './styles3.css'
import { cssBundleHref } from '@remix-run/css-bundle'
```

The contents of `styles2.css` and `styles3.css` will appear within the file that is referenced by `cssBundleHref`. So, we can add that to our `links` export.
```ts
export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: tailwindStylesheetUrl
  },
  {
    rel: "stylesheet",
    href: fontStylesheetUrl
  },
  {
    rel: "stylesheet",
    href: cssBundleHref ?? ''
  }

]
```

📜 [Remix Styling Docs for CSS Bundling](https://remix.run/docs/en/main/guides/styling#css-bundling)

