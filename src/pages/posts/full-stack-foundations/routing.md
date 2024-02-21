# Routing

[Back to Full Stack Foundation](/posts/full-stack-foundations)

## Intro

###  Le web

Uniform Resource Locator
* 📜 [What is a URL](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL)


L'URL est ce qui nous permet de naviguer vers différentes pages du Web. Il permet aux utilisateurs de mettre en <> et de partager ces pages entre eux. Par conséquent, l’utilisation de l’URL comme **mécanisme principal de stockage de l’état** => courante et souvent nécessaire pour une bonne UX.

L'ancre (la partie qui suit `#`) est utilisée pour *créer un lien vers des éléments spécifiques d'une page* via leur id (lorsque l'utilisateur ouvre son navigateur, il fait automatiquement défiler jusqu'à cet élément sur la page). On ne taff pas souvent avec cette partie de l'URL.

Ce qui nous occupe le plus ce sont les chemins d'accès (pathname) et les paramètres (parameters).

Le pathname se divise en "segments" (segments), séparés par `/`. 

Ces segments, ces pathname, ces chemins d'accès, peuvent aussi **mémoriser des états**, comme dans `/users/123` où `123` est l'ID de l'utilisateur. 
L'état stocké dans l'url pour cette App : un user est *connecté* à l'App, et ce user est *tel user* (user: 123)

Donc, si on veut afficher le profil d'un user spécifiQ, on utilise le pathname, le chemin d'accès `/users/123`, où `123` permet de find le user en question. Le segment d'identification de l'utilisateur (user's ID segment) on l'appel souvent "*route parameter*".

Remix exemple with ` useParams` :

Returns an object of key/value pairs **of the *dynamic params* from the current URL** that were matched by the routes. Child routes inherit all params from their parent routes.

```tsx
import { useParams } from "@remix-run/react";

function SomeComponent() {
  const params = useParams();
  // ...
}
```

Assuming a route like `routes/posts/$postId.tsx` is **matched** by `/posts/123` => `params.postId` will be `"123"`.


🦉 Pour éviter lesz confusions on va appeller  :

* "route parameters" : "params"
* the bit after the `?` : "query params" or "search params."


### Navigation

To navigate around the web, we use `<a>` tags ("a" is short for "anchor", please don't ask why it's not called "link" 🤷‍♂️). For example, si on veut créer un lien vers la page de profil de l'utilisateur :

```html
<a href="/users/123">User Profile</a>
```

> You can also navigate to other pages on the web **using a `<form>` tag**. For example, if we wanted to search for users, we could use the following:

```tsx
<form action="/users/search" method="GET">
	<input type="text" name="=Lucy" />
	<button type="submit">Search</button>
</form>
```

Ca prendra la valeur de l'input et l'ajoutera à l'URL en tant que query params ( `?q=...`). L'attribut `method` indique au navigateur d'utiliser la méthode HTTP `GET` au moment du `submit`

   **Attribut `action`** : La valeur de l'attribut `action` (e.g "/users/search"), indique au navigateur où envoyer les données récupérées quand le formulaire est submit.
   
####    In remix

Pour faciliter la navigation, Remix fournit [un component `<Link>`](https://remix.run/docs/en/main/components/link) => créer des liens ( `<a>`) vers d'autres pages de votre app sans déclencher de refresh de la page.

Remix dispose également d'un composant intégré [`<Form>`](https://remix.run/docs/en/main/components/form)qui améliore la gestion des formulaires par le navigateur. 


### Routers

Most web applications use what is called a *"router"* **to associate specific code with the URL segment**.

This allows us to both organize our code, and optimize it for loading performance (to ensure we only load the code that is necessary based on what our user needs on a specific route). 

Routers are also often used to help load the data that will be used on the page. **The Router typically allows you to define certain URL segments as "params"** which can be any value, and the Router will *parse* the URL (and those params), and execute the code that has been configured for that specific URL (passing along the params to the code). This is what allows GitHub to load a specific repository when you visit `https://github.com/epicweb-dev/full-stack-foundations` for example. Route params are often represented by a `:` in the URL, for example: `https://github.com/:username/:repo`. **This tells the router that the `username` and `repo` segments are params**, and that they can be any value.


[Awesome visualization of how routes in the file system map to the URL 
](https://interactive-remix-routing-v2.netlify.app/)

**URL** : Navigateur/Browser ;
**Matched Route** : file system ;
**Layout** : rendu JSX ;

| URL                        | Matched Route                   | Layout / View                    |
| -------------------------- | ------------------------------- | ------------------------- |
| `/`                        | `app/routes/_index.tsx`         | `app/root.tsx`            |
| `/login`                   | `app/routes/_auth.login.tsx`    | `app/routes/_auth.tsx`    |
| `/register`                | `app/routes/_auth.register.tsx` | `app/routes/_auth.tsx`    |
| `/concerts/salt-lake-city` | `app/routes/concerts.$city.tsx` | `app/routes/concerts.tsx` |

### 

👨‍💼 We got our first user! His name is "Kody" 🐨 so we're going to build Kody's user profile page and his notes pages (his username is "kody"). Users in this app have profile pages and can make notes. So, we want to have the following routes:

1. `/users/kody` - Kody's profile page
2. `/users/kody/notes` - Kody's list of notes
3. `/users/kody/notes/some-note-id` - A specific note <br>
So we need in our code base : <br>
`/users/:username/notes/:note-id`

Ce qui suit est très important quant à comment on aborde les problème, comment en pense '*in Remix*' 

> **From a layout perspective**, we want the profile page to take up the full screen. 
> 
> The notes page should also take up the full screen, but the specific note should be **nested** inside the notes page.

*  The `.` in `users.kody` tells to separate the `users` and `kody` by a `/`. So `users.kody` becomes `users/kody`.  
*  The `+` in `users+/kody` does the same thing, except it allows you to use a **folder** *instead of an extra-long-filename-etc*. **That's the only difference**. 
 
In this case, **because we know we're going to have several routes qui vont partir de `/users`**, I think it makes the most sense to use the `users+/` directory approach.

`app/routes/users+/kody.tsx` *map to the URL* ``/users/kody``

"Kody" should be displayed on the page. One fun fact, you'll also notice the Epic Notes logo in the **header** and the **footer** are on the page as well, even though you didn't render those yourself. That's because you're actually **already using nested routing!** The route you just created is nested inside 

`app/root.tsx`



Now, let's create the notes parent route. All the notes will be **'URL Nested'** 

URL Nested ça veut dire qu'elle ne sont pas **'Layout Nested'**

Concrètement ça veut dire que la ressources ```users/kody/notes```, est bien nested dans l'URL ```
/users/kody``` (on accède bien par là aux notes de *ce* user)

Par contre, ces notes ne seront pas layout nested : quand on va acceder à l'URL users/kody on aura pas accès *visuellement* aux notes de Kody, mais à sa page utilisateur
On va accédera donc à un nouveau Layout, à une page spécialement dédiée aux note via /users/kody/notes

**Won't want to be "Layout Nested ==> so *add* an underscore (`_`) to the filename.**

`app/routes/users+/kody_+/notes.tsx`

The `<h1>` of "Notes" should be displayed on the page, but the "Kody" from the previous route should not be displayed. That's because we're not using layout nesting here thanks to the `_` in the filename.

Great, now let's create the route for a specific note. This one will be nested inside the notes route. For this, I don't think it's very useful to have another folder of nesting, so instead of the `+/` syntax for a directory, we'll just add `notes.` to the filename.

So let's create `app/routes/users+/kody_+/notes.some-note-id.tsx`

Super, now let's go to [`/users/kody/notes/some-note-id`](http://localhost:5640/02/01/problem?pathname=%2Fusers%2Fkody%2Fnotes%2Fsome-note-id)

Uh oh! We still just have "Notes" on the screen!? But the URL has our `/some-note-id` in it.

Pourtant ``npx remix routes`` nous donne ça :

```jsx
<Routes>
  <Route file="root.tsx">
    <Route index file="routes/index.tsx" />
    <Route path="users/kody/notes" file="routes/users+/kody_+/notes.tsx">
      <Route index file="routes/users+/kody_+/notes.index.tsx" />
#       <Route path="some-note-id" file="routes/users+/kody_+/notes.some-note-id.tsx" /> 
    </Route>
  </Route>
</Routes>
```

So the routes are definitely right there. What's going on? Well, remember that we're *nesting* our routes. And we wouldn't want Remix to just stick the UI for each nested route one below the other (un peu comme le ferait le layout Flow en css...).

As the developer, we want to control *where* the nesting actually happens. The parent contains the child which contains the grandchild etc. **So what we need is to have the parent (`/users/kody/notes`) to tell Remix where to put the child** (`/users/kody/notes/some-note-id`). 
And we do this **using the `<Outlet />` component**.


``app/routes/parent.tsx`` :
```tsx 

export default function Parent() {
	return (
		<div>
			<h1>Parent</h1>
			<Outlet />
		</div>
	)
}
```

``app/routes/parent.child.tsx`` :
```tsx

export default function Child() {
	return <h2>Child</h2>
}
```
### Resume 

Your best friend is the `npx remix routes` command which will help you figure out how your routes are structured based on your file structure.

The key concepts are:

1. Layout Nesting
2. URL Nesting

Once you nail those two concepts, then routing in Remix will be much more straightforward.

## Resource Routes

🦉 So far, every HTTP request we make to our app's routes *will result in UI*:

- `/` - Home page
- `/users/koko` - Profile page
- `/users/koko/notes` - Notes page
- `/users/koko/notes/noteId` - Note page

But there are **lots of use cases for URLs that don't return UI**. For example:

- `/api/users` - Get a list of users
- `/healthcheck` - Get a report of the health of the application
- `/images/some-image-id` - Get an image <br>
others use cases :
- Dynamically generating social images for blog posts or other pages
- JSON API that reuses server-side code with the Remix UI
- Dynamically generating PDFs
- Webhooks for other services like Stripe or GitHub
- a CSS file that dynamically renders custom properties for a user's preferred theme

For these, the HTTP request and response is a little different from our UI routes. 

*Instead of* the request expecting **an HTML response**, *it expects* **JSON**, or **plaintext**, or an **image**. In some cases these requests could be non-GET requests as well.

In Remix, these routes are known as ["Resource Routes"](https://remix.run/docs/en/main/guides/resource-routes) and they are pretty simple. Here's the rule that determines whether a route is a resource route or not:

> A **Resource Route** is like a regular route, but *it doesn't have a `default` export.*

That's it. **Just don't have a default export** and you're working in a resource route.

*The behavior of a resource route* is what you might expect. 

* For regular non-resource-routes, the entire nested routing structure is called and rendered to get the final result. 
* For resource routes, only the route *that matches the request* is called. 

So, with a resource route, the `loader` in the `app/root.tsx` *will not be run*.

[Remix Doc : Resource Routes](https://remix.run/docs/en/main/guides/resource-routes)

👨‍💼 Great! Now we have a good place to put additional "health check" code that will allow us to put in an automated check on the status of our database connection and other things in the future.

If you'd like to see where the Epic Stack takes this eventually, check [the healthcheck route there](https://github.com/epicweb-dev/epic-stack/blob/main/app/routes/resources%2B/healthcheck.tsx).

Additionally, if you'd like to learn more about healthcheck endpoints and how to configure them as part of a deployment pipeline, you can watch this video from [the Deploy Web Applications All Over the World tutorial](https://www.epicweb.dev/tutorials/deploy-web-applications):

🦉 Remember, Remix doesn't have any opinion on which routes in your folder structure are "resource routes" and which ones aren't. So, even though we put ours under `app/routes/resources+/`, that's not a requirement.

And you can send *any* response you like. We're sending a plaintext response, but you can stream audio or video, generate a PDF, generate an `og:image` for SEO, or anything else that can be done over HTTP. You could use resource routes to create a REST or GraphQL API. Whatever you can do with HTTP, you can do with resource routes. (We'll get to how to handle non-GET requests soon).

Also, Remix doesn't care whether you export anything else in your resource route either. I've taken advantage of this by exporting functions and components that use the resource route directly in the same file. This level of colocation is brilliant. Feel free to read more about this on [EpicWeb.dev](https://epicweb.dev/) in ["Full Stack Components"](https://www.epicweb.dev/full-stack-components).

## Route Module Exports

There are a number of things we can export from each of these routes. You will recall from the last exercise that we exported a `links` function from the 

`app/root.tsx` file. 

We can export that from each of these routes as well. This has the benefit of allowing us to provide specific links to render when the route is active which will later be removed when the user navigates away.

**This has great implications for CSS that you want applied *only on specific pages*.** 

**Both** in the sense that we can **reduce the amount of CSS loaded on individual pages**, but also in the sense that **CSS can be scoped to specific routes greatly reducing unexpected clashes and making everything much more predictable.**

Remix also has the ability to preload everything in our links if we want to preload a page as the user uses the site, but we'll get to that later.
**

# Essential Links 

[Routing page](https://remix.run/docs/en/main/discussion/routes)

# Flat Routes Convention 

The `remix-flat-routes` package provides a convention for defining routes in a Remix application in a flat structure, which is an alternative to the nested route folder structure :

- **Flat Routes**: Each route is defined by a single file with a descriptive name, such as `_auth.login.tsx` or `_landing.about.tsx`. This makes it easier to see all the routes in the `routes/` directory without having to navigate through nested folders [1](https://github.com/kiliman/remix-flat-routes).
