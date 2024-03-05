---
layout: ../../../../../layouts/MarkdownCourseLayout.astro
title: 'Error Handling '

---

[Back to Full Stack Foundation](/posts/workshop-resume/epic-web-dev/fullstack-foundations)

# Intro

## The web

On the web, errors can happen in many ways. You can have errors from your JavaScript code running in the browser and errors that happen on the server when a request is made. The server errors are communicated through [HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status). From that article, we find the categories of HTTP status codes:

1. [Informational responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#information_responses) (`100` – `199`)
2. [Successful responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses) (`200` – `299`)
3. [Redirection messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages) (`300` – `399`)
4. [Client error responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses) (`400` – `499`)
5. [Server error responses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses) (`500` – `599`)

So, errors are communicated through HTTP status codes.

"*Client error responses*" could also be termed as "expected" errors where **we (the server) know that the client did something wrong that we anticipated**. For example, maybe they requested something that does not exist (404), they don't have access to (403), or they must first login to access (401).

"*Server error responses*" **are errors that we did not anticipate.** **These are errors that we did not handle in our code.** For example, maybe we tried to access a database that was not available (503), or it could be as simple as a runtime error where we tried to access a property on an object that does not exist.

You will sometimes run into error pages in your browser, but there's not a standard way to display errors in the browser. **Applications need to handle these errors themselves.**

> When making an HTTP request with `fetch`, **if the response comes back with an error** status code (400-599), **the promise is (correctly) *not rejected***. Even though there was an "error," the request was still successful. The response object will have an `ok` property you can use to check if the response was successful or not.
> 

## In Remix

Remix has a nice way to handle these kinds of errors and customize the UI for them. It's called "Error Boundaries" (concept emprunté à React), but has more capabilities (for example, it handles errors that occur during the server render).

# Handle Route Errors

Each *route module* can export a component called `ErrorBoundary` and that component can access the error it's handling via [the `useRouteError()` hook](https://remix.run/docs/en/main/hooks/use-route-error).

```tsx
import { useRouteError } from '@remix-run/react'

export function ErrorBoundary() {
	const error = useRouteError()
	console.error(error)

	return (
		<div>
			<h1>Oh no!</h1>
			<p>Something bad happened! Sorry!</p>
		</div>
	)
}
```
Thanks to the nested layout routing of Remix, this error boundary mechanism *allows fairly fine-grained control over **where** errors appear in the UI and how they are displayed*. It allows much of the application to still be functional if only a part of the nested layout is affected.

- [📜 `ErrorBoundary` export](https://remix.run/docs/en/main/route/error-boundary-v2)
- [📜 `useRouteError()` hook](https://remix.run/docs/en/main/hooks/use-route-error)

### exemple

```tsx
export function ErrorBoundary() {
	const error = useRouteError()
	console.error('error', error)

	return (
		<div className="container mx-auto flex h-full w-full items-center justify-center bg-destructive p-20 text-h2 text-destructive-foreground">
			There was an error, sorry!
		</div>
	)
}
```

Maintenant on a pas toute notre App qui plante ! Seulement la portion d'UI où une error à été levée 👨‍💼 Great job!

And what's more, the `Response` we've been throwing is also handled by the `ErrorBoundary` as well! 

But we can do a bit better for the UX of these kinds of errors...


# Handle Thrown Responses
🦉 As mentioned earlier, Remix allows you to `throw new Response` from your loaders and actions so you can control the status code and other information *sent in the response*

 For example:


> We've got a handy `invariantResponse` that we use for send responses +easy et fonctionne pareil, mais pour être sûr que l'exemple parle à tout le monde, la plupart des exemples renvoient des response "brutes".

When you throw a `Response` from a loader or action, *Remix will catch it* and render your `ErrorBoundary` component **instead of the regular route component.**
In that case, the `error` you get from `useRouteError` *will be the response* object that was thrown.

Because it's impossible to know what error was thrown, it can be difficult to display the correct error message to the user. Which is why Remix also exports a `isRouteErrorResponse` utility which checks if the the error is a Response. 

If it is, then you can access the `.status` property to know the status code and render the right message based on that. Your response can also have a body if you want the error message to be determined by the server.

Here's an example of handling a response error:

```tsx
export function ErrorBoundary() {
	const error = useRouteError()
	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return <p>Not Found</p>
		}
		if (error.status === 401) {
			return <p>Unauthorized</p>
		}
	}
	return <p>Something went wrong</p>
}
```
This mechanism of throwing responses is quite powerful because it allows us to build really nice abstractions. It's exactly what we're doing with the `invariantResponse` utility. 

# Error Bubbling
👨‍💼 To keep things consistent, Kellie (🧝‍♂️) has made a handy abstraction for error boundaries. You can find it in 

`app/components/error-boundary.tsx`

. Here's how you use it:


```tsx
export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				403: ({ params }) => (
					<p>You're not authorized to look at {params.sandwichId}</p>
				),
			}}
		/>
	)
}
```

You can specify any status code you want, and the error boundary will render whatever you return in your callback.

We'd like you to update the `ErrorBoundary` you've got already to use this, and now we can add it to several of the `/users/:userId/notes` routes as well.

You'll notice that **when a parent route has an error boundary, the child routes errors will *bubble up* to the parent route** unless (à moins que) they have one of their own. I would love for you to play around with that idea a bit as well.

# Root ErrorBoundary

👨‍💼 We don't currently have an `ErrorBoundary` component for our root route. This is a problem for two reasons:

1. If we add more routes and they don't have an `ErrorBoundary`, those errors have nowhere to bubble up to.
2. If there's an error in our root route, we don't have a way to catch it.
