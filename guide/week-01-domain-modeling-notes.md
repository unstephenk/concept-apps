# Week 1 Domain Modeling Notes

## What is a branded type?
A pattern used to distinguish between types that have the same underlying structure like two different strings or numbers

## Why would I use branded IDs?
Using branded IDs in typescript primarily prevents semantic mixing errors where the compiler otherwise treats all strings as interchangeable. Because TypeScript uses structural typing, two different ID types (like UserId and OrderId) are seen as the same if they are both just string

## What is a discriminated union?
A powerful Typescript pattern used to represent a value that can be one of several different but related types

## Why is a discriminated union better than one big type with optional fields?
Because they enforce strict type safety by making invalid states impossible

## What does readonly do?
Used to make properties of an object or elements of an array immutable at compile-time. It also prevents properties from being reassigned after they are initialized

## What would happen if I added a new task kind later?
You would need to add a new task kind, a new type with its own kind value and include it in the task union

# API Response Modeling Notes

## What is the discriminator in ApiResponse?
The discriminator in ApiResponse allows the response to be categorized as either a success or failure when the response comes in. The discriminator is specifically the ok field. When ok is true, it will use success and opposite when false.

## Why is `ok: true | false` better than optional `data` and `error` fields?
`ok: true | false` is better because it creates a clear discriminated union. A response is either successful and has `data`, or it failed and has `error`. Optional `data` and `error` fields can accidentally allow unclear states, like both fields existing, neither field existing, or UI code forgetting to check which state it is in.

## What does `ApiResponse<TData>` mean?
`ApiResponse<TData>` means the response is generic over the successful data shape. The API response structure stays the same, but `TData` changes depending on the endpoint, such as `User`, `Dashboard`, or `DashboardWidget[]`.

## Why might error codes be typed as string literal unions?
Error codes can be typed as string literal unions so each endpoint only allows known error cases. This helps the UI handle specific errors safely, prevents typos, and makes it easier for TypeScript to warn when a new error case needs to be handled.

## What does `unwrapApiResponse` do?
`unwrapApiResponse` takes an API response and returns the data when `ok` is `true`. If `ok` is `false`, it throws an error using the response error message.

## When would I avoid using `unwrapApiResponse` directly in UI code?
I would avoid using `unwrapApiResponse` directly in UI rendering code if I need to show specific error states. Throwing is useful at a boundary, but many UI flows should inspect the error code and render a helpful message instead.