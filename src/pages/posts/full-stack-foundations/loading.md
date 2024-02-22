---
layout: ../../../layouts/MarkdownCourseLayout.astro
title: 'Data Loading'
tags: [""]
---

[Back to Full Stack Foundation](/posts/workshop-resume/full-stack-foundations)

# Intro

## The Web

> When a user goes to a URL, the browser makes a request to the server. 

The server *then* sends back a response, which is usually HTML. 

The browser then renders the HTML into a page. 
The HTML can contain references to other resources, such as images, CSS, and JavaScript.The browser will make requests for these resources and process them as well.

That initial request for HTML normally comes with all the information the user expects to **see**. However, users of **modern web apps expect to be able to interact with the page *without reloading it***. 

To accommodate this, for the purpose of keeping the data current as the user interacts, changes the state of the application, or navigates through it, the application must be capable of sending requests for data to the server dynamically.

Around 2006, a new tech was dev for this purpose called AJAX. AJAX stands for **Async JS and XML**. *It's a way of making requests to the server without reloading the page*

These days, web app typically use **a newer web standard called [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).** 

 It allows web applications to make network requests to servers for data or resources asynchronously. 
 
Quel rapport entre l'asynchrone et la possibilité de ne plus avoir à reload la full page, la possibilité de réalimenter celle-ci, juste là où c'est nécessaire, avec des données fraiches basées sur l'interaction de l'utilisateur ?

Avec les opérations asynchrones, comme celles initiées par `fetch()`, le browser peut continuer à traiter d'autres tâches pendant que la requête est en cours. Ca signifie que l'utilisateur peut continuer à interagir avec la page, naviguer, etc.., sans interruption. 


> Among other things, this API allows the browser to make requests to a server without triggering a full page refresh. There are various parts to this API, but two critical objects are called [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response).

### Fetch API
```js
async function afficherFilms() {
  const reponse = await fetch("http://example.com/films.json");
  const films = await reponse.json();
  console.log(films);
}
```
  Dans sa forme la plus simple, `fetch()` utilise un argument qui correspond à l'URL de la ressource qu'on veut fetch. Ce call ne renvoie pas directement une response avec un corps en JSON, mais une *promesse* qui sera (*await*) résolue en un objet [`Response`](https://developer.mozilla.org/fr/docs/Web/API/Response).

### Fournir des options à la request

### Request

L'interface `Request` de la Web API `fetch()` en JS est un objet qui représente une demande de ressource

Vous pouvez utiliser cette interface pour configurer et personnaliser les request HTTP avant de les envoyer avec `fetch()`

**Initialisation :** Vous créez un objet `Request` en passant l'URL de la ressource et un objet d'options pour configurer la requête. Par exemple, `new Request(url, options)`.
**Options :** Les options peuvent inclure la méthode HTTP (`GET`, `POST`, etc.), les en-têtes (`headers`), le corps de la requête (`body` pour `POST`, par exemple), etc...

**Utilisation avec fetch() :** Une fois l'objet `Request` configuré, vous l'envoyez en utilisant `fetch(request)`. `fetch` retourne une promesse qui se résout en un objet `Response`.

```js
let url = 'https://example.com/posts';
let data = { title: 'Mon Nouveau Post', body: 'Contenu du post', userId: 1 };

let requestInit = {
  method: 'POST'
};

let request = new Request(url, requestInit);

fetch(request)
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
```

### Response

Lorsque vous utilisez `fetch()` pour envoyer une request, cela "déclenche" une promesse. Cette promesse se résout en un objet `Response` une fois que la requête a reçu une réponse du serveur.

1. **Envoi de la Requête :** Lorsque vous appelez `fetch(url, options)`, une requête est envoyée au serveur.
2. **Promesse :** `fetch()` renvoie immédiatement une promesse qui sera résolue plus tard, une fois que la réponse du serveur est reçue.
3. **Résolution de la Promesse :** Lorsque le serveur répond, la promesse est résolue. Si la requête est réussie (le serveur a répondu), la promesse est résolue avec un objet `Response`. 
4. Si la requête échoue (par exemple, en cas d'erreur réseau), la promesse est rejetée.
5. **Traitement de la Réponse :** Vous pouvez ensuite utiliser les méthodes de l'objet `Response`, comme `.json()`, `.text()`, etc., pour traiter le contenu de la réponse

L'objet `Response` dans la Web API Fetch représente la réponse à une request. Après avoir envoyé une request avec `fetch()`, vous recevez un objet `Response`. 
Voici ses caractéristiques principales :

```js
fetch('https://example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // ou .text(), .blob(), etc.
  })
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));
```

We can use this API to make requests to our servers to get data. Normally, a request for data will return a JSON object which is a string that looks like a JavaScript object. **We can use the `JSON.parse` function to convert this string into a JavaScript object**, but this is so common, that the `fetch` `Response` object has a special method (called [`.json()`](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)) to parse the JSON response for us.

Même si on ne request pas de HTML au serveur, we still make fetch() requests to URLs. Typically a server will have a router that is responsible for routing these URL requests to the appropriate "handler" *The handler will then do whatever work is necessary to get the data and return a response to the client.*

When the server sends the response, it can include special "metadata" that goes along with the response that *tells the browser how to handle the response*. This is in the form of [`Headers`](https://developer.mozilla.org/en-US/docs/Web/API/Headers). **They are a very important part of the `fetch` API** that you should be aware of.

## In Remix

The data loading is a part of the route module in Remix. 

> **Each route module in the `app/routes` directory can export an `async` function called a** [`loader`](https://remix.run/docs/en/1.14.3/route/loader)

 **This function is run only on the server** and therefore has access to your database, APIs, private environment variables, etc. It receives the `Request` object and `params` object and should return a `Response` object. For example:

```tsx

import { type DataFunctionArgs } from '@remix-run/node'

export async function loader({ request, params }: DataFunctionArgs) {
	const dataString = JSON.stringify({ hello: 'world' })
	return new Response(dataString, {
		headers: { 'content-type': 'application/json' },
	})
}
```

Because the most common use case for loaders is returning JSON data, Remix also exports a utility called `json` which allows you to more easily create a JSON object:

```tsx

import { json, type DataFunctionArgs } from '@remix-run/node'

export async function loader({ request, params }: DataFunctionArgs) {
	return json({ hello: 'world' })
}
```

**Then** the UI code can use the [`useLoaderData`](https://remix.run/docs/en/1.14.3/hooks/use-loader-data) hook from `@remix-run/react` which will return the data from the `loader` function.

```tsx

import { json, type DataFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ request, params }) {
	return json({ hello: 'world' })
}

export default function MyRoute() {
	const data = useLoaderData()
	return (
		<div>
			<h1>{data.hello}</h1>
		</div>
	)
}
```

**Nb** : 
- Premier cas (`json({ user })`):

  ```js
  const data = useLoaderData();
  const userProp = data.user.someUserProps;
  ```

- Deuxième cas (`json(user)`):

  ```js
  const data = useLoaderData();
  const userProp = data.someUserProps;
  ```


Finally, you can control the `headers` with remix's `json` utility by passing a second argument to `json` which allows you to set things like cache headers for example. And of course, if you want full control you can always create the response object yourself instead of using the utility. Remix exposes the full web platform to you.

## Loaders
C'est évident mais on le précise au cas où :

Les *loader function* sont executées sur le **server**.

Par exemple, on peut tout à fait faire qqchse choses comme ça :
```ts
export async function loader({params}: DataFunctionArgs){
	return fetch(`myApi.com/user/${params.username}`)
}

```
## Handle Missing Data

👨‍💼 One of our Quality Assurance folks discovered an issue. If you go to a user that does not exist, the app crashes. For example, try this one: 

[`/users/i-do-not-exist`](http://localhost:5639/03/02/problem?pathname=%2Fusers%2Fi-do-not-exist)

 😬

We had to ignore some TypeScript errors with `// @ts-expect-error` which should have tipped us off about this problem... 🦺 Lily the life jacket is not amused.

We need to handle this case. That should be a `404` error (l'erreur *404* signale que la ressource demandée, is not found)

So after trying to get the `user` from the database, you're going to need to check whether the returned `user` exists. If they don't, then you should throw a `404` error. Here's an example how you do that:

```js
export async function loader({ params }) {
	const sandwich = await db.sandwich.findFirst({
		where: { id: params.id },
	})

	if (!sandwich) {
		throw new Response('Sandwich not found', { status: 404 })
	}

	return json({ sandwich })
}

```

Hmmm... `throw` a response!? (on est plutôt habitués à throw une erreur..) 

How weird is that? Well, in Remix it's exactly how you solve this problem. It allows you to easily exit code flow and send a response right away. You can even put it into a utility function : 

```ts
function assertDefined<Value>(
	value: Value | null | undefined,
): asserts value is Value {
	if (value === undefined || value === null) {
		throw new Response('Not found', { status: 404 })
	}
}
```

ici `assertDefined` est utilisé pour garantir qu'une valeur donnée n'est ni null ni undefined 

- `function assertDefined<Value>(value: Value | null | undefined): asserts value is Value { ... }`:

  - The function is generic, denoted by `<Value>`, allowing it to be used with any type.
  - It takes one parameter named `value`, which can be of any type (`Value`), `null`, or `undefined`.
  - The return type `asserts value is Value` is a special TypeScript syntax called an assertion signature. It tells TypeScript's type checker that, if the function completes without throwing an error, the `value` parameter can be safely treated as not `null` and not `undefined` from that point forward in the code.

* Inside the function, there's an `if` statement that checks whether `value` is `null` or `undefined`. If so, it throws a `Response` object with a `404 Not Found` status. This is how the function enforces the assertion.

- If the function does not throw, TypeScript understands that `value` is neither `null` nor `undefined` thanks to the assertion signature. This allows you to safely use `value` in your code with the assurance that it is not `null` or `undefined`.
