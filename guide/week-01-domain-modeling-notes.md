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