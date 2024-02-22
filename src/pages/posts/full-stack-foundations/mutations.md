---
layout: ../../../layouts/MarkdownCourseLayout.astro
title: 'Data Mutations'
tags: [""]
---

[Back to Full Stack Foundation](/posts/workshop-resume/full-stack-foundations)

# Data Mutations

## Intro

### The web

Ever since the invention of HTML, we've had the ability to create *interactive* web apps, thanks to [the `<form>` element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form):

```html
<form>
	<label>
		Type:
		<input name="sandwichType" />
	</label>
	<button type="submit">Create Sandwich</button>
</form>
```

When a form is submitted on the web (like if we were to type "ham" in the `sandwichType` input and click "Create Sandwich"), the browser will take all associated form elements (the `sandwichType` input in our example above) and "serialize" them into what's called a "query string" (e.g. `sandwichType=ham`) and make a request to the server at the current URL. 

> So, if this form appears on the route `/sandwiches`, submitting the form will trigger a full-page refresh to the route `/sandwiches?sandwichType=ham`.

  This is great for search pages for example, but it would be really bad for a login form (it will leak the password ==> the route url is visible :/ ), which is why the `<form>` element also allows you to specify a `method` attribute to switch from the default `GET` request to a `POST` request: `<form method="POST">`.

When the method is `POST` the form body is submitted as a "payload" instead of a query string. The browser will encode it as `application/x-www-form-urlencoded`. On the server side, you can use [the `Request`'s `formData` method](https://developer.mozilla.org/en-US/docs/Web/API/Request/formData) to get the form data as a `FormData` object:

```js
const formData = await request.formData()
const sandwichType = formData.get('sandwichType')
```

Parfois la submission que tu veux handle sur le server ne se trouve pas sur la même URL que celle où apparaît le form : not at the same URL where the form appears. In this case, you can use the `action` attribute to specify a different URL.

action attribute : => where (so, the route) the browser is going when we do submission

Là où se trouve le handler approprié 
sur mon serveur pour gérer/manipuler, mutate this data

```js
<form action="/make-a-sandwich">
	<label>
		Type:
		<input name="sandwichType" />
	</label>
	<button type="submit">Create Sandwich</button>
</form>
```

This would make a request to `/make-a-sandwich` instead of `/sandwiches` donc sur la route qui make a thing with the data submitted, autrement dit un handler sur ton server, un controller 

### The back button

1. **Soumission de Formulaire :** Lorsque vous remplissez et envoyez un formulaire sur un site web (par exemple, une transaction bancaire ou l'achat d'un billet d'avion), le navigateur envoie ces informations au serveur.
2. **Réponse du Serveur :** Normalement, le serveur répond en renvoyant une page web (HTML). Cependant, **si le serveur répond avec une page HTML après une soumission réussie, cela peut causer des problèmes.**
3. **Problème avec le Bouton Retour :** Si vous appuyez sur le bouton "retour" de votre navigateur après avoir soumis un formulaire, le navigateur peut essayer de renvoyer les informations du formulaire une deuxième fois. Cela peut provoquer des pop-ups ennuyeux ou, dans des cas plus sérieux, des soumissions de formulaire répétées (comme payer deux fois).

4. **Solution - Post/Redirect/Get :** Au lieu de répondre avec une page HTML, le serveur doit **rediriger** *redirect* the browser vers une nouvelle page en utilisant ce qu'on appelle le modèle "Post/Redirect/Get". Cela signifie :

   - **Post :** Vous soumettez le formulaire.
   - **Redirect :** Le serveur répond non pas avec une page HTML, mais avec une instruction de redirection vers une autre page.
   - **Get :** Le navigateur charge la nouvelle page.*
   
Ainsi, si vous appuyez sur le bouton "retour" après cette opération, vous ne resoumettez pas le formulaire, car la dernière action était une simple requête de page (Get), et non une soumission de formulaire (Post).


**Difficultés liées à la mise à jour des Données avec JS :** Si on utilise JS pour mettre à jour les données (fetch), on évite un refresh de la page, mais on se retrouve à devoir gérer l'état de l'UI, côté client (donc on ajoute, ou on fait passser une bonne partie de la complexité de l'app côté client) pour s'assurer que l'UI reste à jour. 

*Spoiler* : **Remix va nous aider à régler e problème**

[How Remix solved React’s client state management problem
](https://www.youtube.com/watch?v=xZSNjzpkHMY&ab_channel=ThomasGauvin)

**Gestion de l'État et Expérience Utilisateur :** La gestion de l'état côté client devient nécessaire pour maintenir l'interface utilisateur synchronisée avec les données les plus récentes, sans avoir à recharger entièrement la page. Cela améliore l'expérience utilisateur, comme dans l'exemple d'un "like" sur un tweet : si chaque "like" nécessitait un rafraîchissement complet de la page, cela serait peu pratique et frustrant pour l'utilisateur.

### In Remix

Remix has mutation capabilities built-in the framework and it's entirely based on the browser behavior for `<form>`s. 

1. **Capacités de Mutation de Remix :** Remix intègre des fonctionnalités de mutation qui utilisent le comportement standard des formulaires HTML. *Ca permet de changer ou de mettre à jour des données sur le serveur après la soumission d'un formulaire*.
2. **Remix comme Émulateur de Navigateur :** Remix optimise l'expérience utilisateur en évitant le rechargement **complet** de la page après la soumission d'un formulaire. Ca se fait tout en garantissant la *revalidation des données*, ce qui signifie que les data affichées à l'user sont mises à jour sans nécessiter un rafraîchissement manuel.
3. **Revalidation Automatique :** Avec Remix, après la soumission d'un formulaire, la page n'est pas entièrement rafraîchie. Au lieu de cela, Remix gère la mise à jour des données nécessaires de manière transparente ==> Ca peut sembler comme un rafraîchissement, mais en réalité, seules les parties nécessaires de la page sont mises à jour.
4. **Gestion du State côté Front-end :** La gestion du state côté client devient effectivement plus complexe avec de telles approches. **Cependant, Remix est conçu pour simplifier cette gestion en assurant une synchronisation efficace entre le serveur et le client.**

5. **API pour les Mutations :** Dans votre code pour l'UI, l'utilisation de l'API de mutation de Remix est similaire à l'utilisation d'un form HTML standard (`<form>`), except you use [Remix's `<Form>` component](https://remix.run/docs/en/main/components/form).

6. **Gestion Côté Serveur :** Étant donné que Remix est un framework d'application complet (full-stack), il possède également une API côté serveur pour gérer la soumission des formulaires. Cette API est *similaire à l'API de chargement (loader API)* de Remix. **Dans le module de route de votre application, vous exportez une fonction d'*action* asynchrone qui reçoit la requête et les paramètres**. Vous êtes censé retourner une réponse (Response), et en cas de soumission réussie de formulaire, vous devriez renvoyer une redirection.

```tsx
import { Form } from '@remix-run/react'
import { type DataFunctionArgs, redirect } from '@remix-run/node'

export async function action({ request, params }: DataFunctionArgs) {
	const formData = await request.formData()
	const sandwichType = formData.get('sandwichType')

	// do something with the sandwichType

	return redirect('/sandwiches')
}

export default function SandwichChooser() {
	return (
		<Form method="POST">
			<label>
				Type: <input name="sandwichType" />
			</label>
			<button type="submit">Create Sandwich</button>
		</Form>
	)
}
```

- Avec `<Form>`, on est côté client. Le formulaire est rendu dans le navigateur de l'user qui interagit avec lui [2](https://www.kirandev.com/remix/use-action-to-handle-form-submission-in-remix)[5](https://remix.run/docs/en/main/start/tutorial).
- Avec `action` on est côté server (hanlder).

Remix simplifie l'archi MVC classic en combinant les responsabilités de la vue et du contrôleur dans un même fichier.

Action is a sever-side function to handle data mutation. It's the way to handle form submission in Remix.

> **If you make a POST request to your route, the *Action is execeuted*.** **If you make a GET request, the *Action is not executed***.
> 
`action`s are called for non-GET requests, and `loaders` are called for GET request, so if your form does not specify a method or specifies `method="GET"`, then your loader will be called instead of the action.


## Réception des data côté server
**Réception des Données du Formulaire :** *L'objet `request` représente la requête HTTP entrante sur le serveur.* So as ARGUMENT in your code function :)

```tsx
export async function action({ request, params }: DataFunctionArgs) {
	const formData = await request.formData()
	const title = formData.get('title')
	const content = formData.get('content')
	db.note.update({
		where: { id: { equals: params.noteId } },
		// @ts-expect-error 🦺 we'll fix this next...
		data: { title, content },
	})

	return redirect(`/users/${params.username}/notes/${params.noteId}`)
}
```


Lorsqu'un formulaire est soumis, les données du formulaire sont envoyées au serveur sous forme de req HTTP. **L'objet `request` contient toutes les informations de cette requête, y compris les données du formulaire.**

**Extraction des Données du Formulaire :** La méthode `request.formData()` est utilisée pour extraire les données envoyées par le formulaire. C'est une méthode asynchrone qui renvoie un objet `FormData`, lequel peut être utilisé pour accéder aux valeurs des différents champs du formulaire.
Ex: `formData.get('sandwichType')` get la value entrée dans l'input `sandwichType` du formulaire.

**Gestion des Actions Serveur :** Après avoir extrait les données, vous pouvez effectuer diverses opérations côté serveur, comme la validation des données, l'interaction avec une base de données, la logique métier, etc.

**Retour d'une Réponse :** Enfin, la fonction `action` renvoie une réponse. Dans votre exemple, elle utilise `redirect('/sandwiches')` pour rediriger l'utilisateur vers une autre route après la soumission réussie du formulaire. Cela fait partie de la gestion du flux de l'application.


> `action` are called for non-GET requests, and `loaders` are called for GET request, so if your form does not specify a method or specifies `method="GET"`, then your loader will be called instead of the action.


## Forms

- [📜 `<Form>`](https://remix.run/docs/en/main/components/form)

## Actions !!!

- [📜 `action`](https://remix.run/docs/en/main/route/action)

👨‍💼 Just like our `loader` responds to `GET` requests for data, the `action` responds to non-`GET` requests for data.


The `action` accepts the same parameters as the `loader` and **is expected to return a `Response`.**

It's also typically expected to return a `redirect` or a `json` response and can use the same utilities.

So now, we want you to get the `formData` from the `request` and use it to update the note, and then redirect back to the note's page.

```ts
export async function action({ request, params }: DataFunctionArgs) {
	const formData = await request.formData()
	const title = formData.get('title')
	const content = formData.get('content')
	db.note.update({
		where: { id: { equals: params.noteId } },
		// @ts-expect-error 🦺 we'll fix this next...
		data: { title, content },
	})

	return redirect(`/users/${params.username}/notes/${params.noteId}`)
}
```

You know what's *really* cool? You didn't have to do anything to get the data updated in the app. As soon as the note is updated in your action, the data in the app is automatically updated as well!

Remix émule le navigateur pour nous et le navigateur *aurait* **complètement** actualisé la page, ce qui nous donne effectivement les dernières données. Il s'agit d'une fonctionnalité très puissante de Remix et nous en discuterons plus tard.

Another important thing to note is that this form **works without any client-side JavaScript**. That's actually how we get away with **not needing to manage state**!

## FormData Types
The **`formData()`** method of the [`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) interface reads the request body and returns it as a promise that resolves with a [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object.

🦉 An important thing to know about `request.formData` is the values stored in it can have three different types:

- `null` - the value doesn't exist in the form data at all
- `string` - This applies to inputs (including checkboxes and radio buttons), textareas, and select elements.
- `File` - This applies to file inputs.

It's impossible for us to prevent users from submitting invalid data (users can change the types in our form using the browser devtools or even submit the form using a tool like Postman).
c-à-d : On peut pas se fier uniquement à la validation côté client pour garantir la qualité ou la sécurité des données soumises.

But we know that if the data is invalid, we don't want to proceed with the form submission
so we can simply throw an error which we can handle that



```ts
export async function action({ request, params }: DataFunctionArgs) {
	const formData = await request.formData()
	const title = formData.get('title')
	const content = formData.get('content')
  
	invariantResponse(typeof title === 'string', 'title must be a string')
	invariantResponse(typeof content === 'string', 'content must be a string')

	db.note.update({
		where: { id: { equals: params.noteId } },
		data: { title, content },
	})

	return redirect(`/users/${params.username}/notes/${params.noteId}`)
}
```
## Button Forms

```tsx
export async function action({ params }: DataFunctionArgs) {
	db.note.delete({ where: { id: { equals: params.noteId } } })
	return redirect(`/users/${params.username}/notes`)
}

export default function NoteRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<>
			<h2>{data.note.title}</h2>
			
			<p>{data.note.content}</p>
		
			<Form method="post">
				<Button type="submit">Delete</Button>
			</Form>
                 <>
	)
}
```

👨‍💼 Great! Isn't that nice and declarative? Edge cases are handled in a nice and declarative way. We still have much to dive into with giving the user a better experience, which is the subject of the next exercise, but for now our form is functioning well!

## Intent

👨‍💼 Our `action` for the delete button is pretty simple. In the future we'll probably add a "favorite" button where users can mark a note as a favorite, but our `action` only handles deleting a note.

To help us to distinguish the user's preferred action, we'll use a common pattern of adding a `name` and `value` to the delete button:

```html
<button type="submit" name="intent" value="delete">Delete</button>
```

🤯 yes, it's true. Submit buttons are form controls, just like inputs, and can therefore have names and values. From there you can get the intent from the request form data and handle it accordingly.

Doing things this way will also ensure the request is performed properly.

```ts
export async function action({ params, request }: DataFunctionArgs) {
	const formData = await request.formData()
	const intent = formData.get('intent')

	invariantResponse(intent === 'delete', 'Invalid intent')

	db.note.delete({ where: { id: { equals: params.noteId } } })
	return redirect(`/users/${params.username}/notes`)
}
```

Petit tips : 

```tsx
    const formData = await request.formData()
    const intent = formData.get('intent')
  
  switch(intent) 
    case('delete') {
    //do that logic
      etc..

```