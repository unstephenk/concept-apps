# Week 1 Lesson Pack

## Senior Repo Setup + TypeScript Baseline

## Week 1 Goal

By the end of Week 1, you should have a production-style GitHub monorepo with strict TypeScript, baseline testing, CI, shared packages, and your first typed domain model for the dashboard capstone.

This week is not about “learning React.” It is about proving you can start a React/TypeScript codebase like a senior engineer.

---

# Week 1 Learning Outcomes

By the end of this week, you should be able to:

1. Create a senior-level React/TypeScript monorepo.
2. Explain why strict TypeScript settings matter.
3. Model a frontend domain with discriminated unions and branded types.
4. Separate app code from shared packages.
5. Add baseline testing with Vitest.
6. Create a GitHub PR that includes code, architecture notes, and tradeoff explanations.
7. Defend your setup in a senior interview.

TypeScript’s official TSConfig reference includes strictness and safety-related compiler options such as `strict`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, `noImplicitReturns`, `noImplicitOverride`, and `useUnknownInCatchVariables`, which are worth enabling early in a senior-level codebase. ([typescriptlang.org][1])

---

# Recommended Week 1 Schedule

## Day 1 — Repo Setup

**Focus:** Monorepo, package manager, app/package boundaries.

**Output**

```txt
senior-react-typescript-course/
  apps/
    dashboard-web/
    api-server/
    rsc-app/
  packages/
    ui/
    api-client/
    schemas/
    test-utils/
    config/
  docs/
    adr/
    architecture/
    interview-notes/
```

Use `pnpm` workspaces unless you strongly prefer npm or yarn. pnpm’s workspace docs describe workspaces as a way to unite multiple projects inside a single repository, and a workspace is defined by a root `pnpm-workspace.yaml` file. ([pnpm.io][2])

---

## Day 2 — Strict TypeScript Config

**Focus:** senior-level compiler settings.

**Output**

* root `tsconfig.base.json`
* app-level `tsconfig.json`
* package-level `tsconfig.json`
* `typecheck` script

---

## Day 3 — Domain Modeling

**Focus:** invalid states should be hard or impossible to represent.

**Output**

* user model
* role model
* permissions model
* widget model
* dashboard layout model
* API response model

---

## Day 4 — Testing Baseline

**Focus:** unit tests and type tests.

**Output**

* Vitest installed
* first runtime test
* first type test
* GitHub Actions running checks

Vitest supports type testing with `expectTypeOf` or `assertType`, and files like `*.test-d.ts` can be treated as type tests. ([vitest.dev][3])

---

## Day 5 — Architecture Notes + PR Review

**Focus:** communicate your technical decisions.

**Output**

* `README.md`
* `ARCHITECTURE.md`
* `docs/adr/0001-monorepo-structure.md`
* PR description
* self-review checklist

---

# Week 1 GitHub Assignment

## Assignment Name

**Assignment 01 — Senior TypeScript Monorepo Foundation**

## Objective

Create the foundation for your full-stack senior dashboard capstone.

This repo should look like something you could show in an interview and say:

> “This is how I structure a scalable React/TypeScript application with shared contracts, strict type safety, testing, and documented architectural decisions.”

---

# Required Repo Structure

```txt
senior-react-typescript-course/
  apps/
    dashboard-web/
      src/
    api-server/
      src/
    rsc-app/
      src/
  packages/
    ui/
      src/
    api-client/
      src/
    schemas/
      src/
    test-utils/
      src/
    config/
      tsconfig/
      eslint/
  docs/
    adr/
    architecture/
    interview-notes/
  package.json
  pnpm-workspace.yaml
  tsconfig.base.json
  README.md
```

---

# Setup Commands

Use this as a starting path.

```bash
mkdir senior-react-typescript-course
cd senior-react-typescript-course
pnpm init
```

Create the workspace file:

```yaml
# pnpm-workspace.yaml
packages:
  - "apps/*"
  - "packages/*"
```

Create the initial folders:

```bash
mkdir -p apps/dashboard-web/src
mkdir -p apps/api-server/src
mkdir -p apps/rsc-app/src

mkdir -p packages/ui/src
mkdir -p packages/api-client/src
mkdir -p packages/schemas/src
mkdir -p packages/test-utils/src
mkdir -p packages/config/tsconfig
mkdir -p packages/config/eslint

mkdir -p docs/adr
mkdir -p docs/architecture
mkdir -p docs/interview-notes
```

For the React app, Vite is a good Week 1 choice because its official guide supports TypeScript templates and React apps can be bootstrapped quickly with a modern dev/build workflow. ([vitejs][4])

---

# Root `package.json`

```json
{
  "name": "senior-react-typescript-course",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "pnpm --filter dashboard-web dev",
    "build": "pnpm -r build",
    "typecheck": "pnpm -r typecheck",
    "test": "pnpm -r test",
    "lint": "pnpm -r lint",
    "format": "prettier --write .",
    "check": "pnpm typecheck && pnpm test && pnpm lint"
  },
  "devDependencies": {
    "@types/node": "latest",
    "prettier": "latest",
    "typescript": "latest",
    "vitest": "latest"
  },
  "packageManager": "pnpm@latest"
}
```

---

# Strict TypeScript Baseline

## `tsconfig.base.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",

    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "useUnknownInCatchVariables": true,

    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true,

    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

## Why these settings matter

### `strict`

This enables TypeScript’s core strictness family. For senior frontend work, this should be the default unless you have a specific migration reason not to use it.

### `noUncheckedIndexedAccess`

This forces you to handle the possibility that an array or object lookup may return `undefined`.

```ts
const names = ["Ada", "Grace"];

const first = names[0];
// first: string | undefined
```

That is annoying at first, but valuable. In production apps, unsafe lookups are a common source of bugs.

### `exactOptionalPropertyTypes`

This makes optional properties more precise.

```ts
type User = {
  displayName?: string;
};
```

With stricter optional property behavior, “missing” and “explicitly undefined” are treated more carefully.

### `useUnknownInCatchVariables`

This prevents this unsafe pattern:

```ts
try {
  throw new Error("Failed");
} catch (error) {
  console.log(error.message); // unsafe
}
```

Use narrowing instead:

```ts
try {
  throw new Error("Failed");
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}
```

---

# Package Setup Example

## `packages/schemas/package.json`

```json
{
  "name": "@course/schemas",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "lint": "echo \"lint schemas\""
  },
  "devDependencies": {
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

## `packages/schemas/tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "composite": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"]
}
```

---

# Week 1 Code Lab 1

## Typed Domain Model

Create:

```txt
packages/schemas/src/domain.ts
```

```ts
export type Brand<TValue, TBrand extends string> = TValue & {
  readonly __brand: TBrand;
};

export type UserId = Brand<string, "UserId">;
export type WidgetId = Brand<string, "WidgetId">;
export type DashboardId = Brand<string, "DashboardId">;

export type UserRole = "admin" | "editor" | "viewer";

export type Permission =
  | "dashboard:read"
  | "dashboard:update"
  | "widget:create"
  | "widget:update"
  | "widget:delete"
  | "user:manage";

export type User = {
  id: UserId;
  email: string;
  displayName: string;
  role: UserRole;
  permissions: readonly Permission[];
};

export type WidgetKind = "metric" | "chart" | "table" | "activityFeed";

export type WidgetBase = {
  id: WidgetId;
  title: string;
  description?: string;
  createdBy: UserId;
  updatedAt: string;
};

export type MetricWidget = WidgetBase & {
  kind: "metric";
  metric: {
    label: string;
    value: number;
    unit?: string;
    trend?: "up" | "down" | "flat";
  };
};

export type ChartWidget = WidgetBase & {
  kind: "chart";
  chart: {
    chartType: "line" | "bar" | "area";
    dataSourceId: string;
  };
};

export type TableWidget = WidgetBase & {
  kind: "table";
  table: {
    dataSourceId: string;
    pageSize: number;
    columns: readonly string[];
  };
};

export type ActivityFeedWidget = WidgetBase & {
  kind: "activityFeed";
  feed: {
    source: "system" | "team" | "user";
    maxItems: number;
  };
};

export type DashboardWidget =
  | MetricWidget
  | ChartWidget
  | TableWidget
  | ActivityFeedWidget;

export type DashboardLayoutItem = {
  widgetId: WidgetId;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Dashboard = {
  id: DashboardId;
  name: string;
  ownerId: UserId;
  widgets: readonly DashboardWidget[];
  layout: readonly DashboardLayoutItem[];
};
```

---

# Week 1 Code Lab 2

## Exhaustive Type Checking

Create:

```txt
packages/schemas/src/widget-utils.ts
```

```ts
import type { DashboardWidget } from "./domain";

export function getWidgetDisplayLabel(widget: DashboardWidget): string {
  switch (widget.kind) {
    case "metric":
      return `${widget.title}: ${widget.metric.label}`;

    case "chart":
      return `${widget.title}: ${widget.chart.chartType} chart`;

    case "table":
      return `${widget.title}: ${widget.table.columns.length} columns`;

    case "activityFeed":
      return `${widget.title}: ${widget.feed.source} feed`;

    default:
      return assertNever(widget);
  }
}

function assertNever(value: never): never {
  throw new Error(`Unhandled widget variant: ${JSON.stringify(value)}`);
}
```

## Why this matters

This gives you compiler-enforced safety when adding new widget types later.

For example, if you add this:

```ts
export type MapWidget = WidgetBase & {
  kind: "map";
  map: {
    region: string;
  };
};
```

And then add `MapWidget` to `DashboardWidget`, TypeScript should force you to update `getWidgetDisplayLabel`.

That is senior-level TypeScript: using the compiler to catch future change risk.

---

# Week 1 Code Lab 3

## Safe API Response Model

Create:

```txt
packages/schemas/src/api.ts
```

```ts
export type ApiSuccess<TData> = {
  ok: true;
  data: TData;
  meta?: {
    requestId: string;
  };
};

export type ApiFailure<TCode extends string = string> = {
  ok: false;
  error: {
    code: TCode;
    message: string;
    fieldErrors?: Record<string, string[]>;
  };
  meta?: {
    requestId: string;
  };
};

export type ApiResponse<TData, TCode extends string = string> =
  | ApiSuccess<TData>
  | ApiFailure<TCode>;

export function unwrapApiResponse<TData>(
  response: ApiResponse<TData>
): TData {
  if (response.ok) {
    return response.data;
  }

  throw new Error(response.error.message);
}
```

Usage:

```ts
import type { ApiResponse } from "./api";
import type { Dashboard } from "./domain";

type GetDashboardResponse = ApiResponse<
  Dashboard,
  "DASHBOARD_NOT_FOUND" | "UNAUTHORIZED"
>;

export function handleDashboardResponse(response: GetDashboardResponse) {
  if (response.ok) {
    return response.data.name;
  }

  switch (response.error.code) {
    case "DASHBOARD_NOT_FOUND":
      return "Dashboard not found";

    case "UNAUTHORIZED":
      return "You do not have access";

    default:
      return "Unknown error";
  }
}
```

---

# Week 1 Code Lab 4

## First Type Test

Create:

```txt
packages/schemas/src/domain.test-d.ts
```

```ts
import { expectTypeOf } from "vitest";
import type {
  DashboardWidget,
  MetricWidget,
  WidgetId,
  UserId
} from "./domain";

declare const widgetId: WidgetId;
declare const userId: UserId;

expectTypeOf(widgetId).not.toEqualTypeOf<UserId>();

const metricWidget: MetricWidget = {
  id: widgetId,
  title: "Revenue",
  createdBy: userId,
  updatedAt: new Date().toISOString(),
  kind: "metric",
  metric: {
    label: "Revenue",
    value: 125000,
    unit: "USD",
    trend: "up"
  }
};

expectTypeOf(metricWidget).toMatchTypeOf<DashboardWidget>();
```

---

# Week 1 Code Lab 5

## First Runtime Test

Create:

```txt
packages/schemas/src/widget-utils.test.ts
```

```ts
import { describe, expect, it } from "vitest";
import type { MetricWidget, UserId, WidgetId } from "./domain";
import { getWidgetDisplayLabel } from "./widget-utils";

const widgetId = "widget-1" as WidgetId;
const userId = "user-1" as UserId;

describe("getWidgetDisplayLabel", () => {
  it("returns a display label for a metric widget", () => {
    const widget: MetricWidget = {
      id: widgetId,
      title: "Revenue",
      createdBy: userId,
      updatedAt: "2026-04-27T00:00:00.000Z",
      kind: "metric",
      metric: {
        label: "Monthly Revenue",
        value: 25000,
        unit: "USD",
        trend: "up"
      }
    };

    expect(getWidgetDisplayLabel(widget)).toBe(
      "Revenue: Monthly Revenue"
    );
  });
});
```

---

# Week 1 Architecture Document

Create:

```txt
docs/architecture/week-01-foundation.md
```

Use this structure:

```md
# Week 1 Architecture Foundation

## Goal

Create a scalable React/TypeScript monorepo that supports multiple apps, shared packages, strict typing, testing, and future capstone growth.

## Key Decisions

### 1. Monorepo

We chose a monorepo because the dashboard web app, API server, RSC experiment, UI package, API client, and schemas should evolve together during the course.

### 2. Shared Schemas Package

Shared domain types live in `packages/schemas` so the frontend, backend, tests, and API client can depend on a single contract.

### 3. Strict TypeScript

We enabled strict TypeScript settings to catch invalid states, unsafe lookups, incomplete return paths, and imprecise optional properties.

### 4. App/Package Separation

Apps are deployable surfaces. Packages are reusable internal libraries.

## Tradeoffs

### Benefits

- Better type reuse
- Easier capstone growth
- Clearer architecture
- Shared validation path later
- More interview-friendly structure

### Costs

- More setup overhead
- More package boundaries to manage
- Requires discipline around dependencies

## Open Questions

- Should `packages/schemas` eventually use Zod or Valibot?
- Should the API client be generated from OpenAPI or hand-written?
- Should the design system package be published or kept internal?
```

---

# Week 1 ADR

Create:

```txt
docs/adr/0001-monorepo-structure.md
```

```md
# ADR 0001: Use a Monorepo for the Senior Dashboard Capstone

## Status

Accepted

## Context

The course capstone requires a React app, Node/TypeScript API, RSC experiment, shared schemas, API client, reusable UI package, and test utilities.

Keeping these in separate repositories would create friction for local development and make it harder to evolve shared contracts.

## Decision

Use a monorepo with separate `apps` and `packages` folders.

Apps:

- `dashboard-web`
- `api-server`
- `rsc-app`

Packages:

- `ui`
- `api-client`
- `schemas`
- `test-utils`
- `config`

## Consequences

### Positive

- Shared TypeScript contracts
- Easier refactoring
- Single CI workflow
- Better capstone cohesion
- Easier interview walkthrough

### Negative

- More initial configuration
- Risk of accidental tight coupling
- Requires clear dependency boundaries

## Follow-up

Add dependency boundary checks later in the course.
```

---

# Week 1 Video Lesson Script

## Video 1 — “Starting Like a Senior Engineer”

**Length:** 8–12 minutes

**Opening**

> In this course, we are not starting with JSX, props, or basic hooks. You already know React. The goal here is to build the way a senior engineer would build: with boundaries, type safety, testing, documentation, and architectural reasoning from day one.

**Section 1 — What makes this senior-level?**

> A junior repo proves the app can run.
> A senior repo proves the app can grow.
>
> That means we care about:
>
> * where code lives,
> * who owns each boundary,
> * how types move through the system,
> * how changes are tested,
> * how future developers understand decisions,
> * and how easily the architecture can evolve.

**Section 2 — Why a monorepo?**

> Our capstone has multiple surfaces: a React SPA, a Node API, a React Server Components experiment, shared schemas, a UI package, an API client, and test utilities.
>
> A monorepo lets us evolve these together while keeping deployable apps separate from reusable packages.

**Section 3 — Apps vs packages**

> Apps are deployable. Packages are reusable.
>
> `dashboard-web` is an app.
> `api-server` is an app.
> `rsc-app` is an app.
>
> But `schemas`, `ui`, `api-client`, and `test-utils` are packages. They should not know too much about the apps that consume them.

**Section 4 — TypeScript as architecture**

> TypeScript is not just autocomplete.
>
> In a senior codebase, TypeScript should encode architectural rules:
>
> * Which widget states are valid?
> * Which permissions exist?
> * Which API responses are successful or failed?
> * Which values are IDs and should not be mixed?
> * Which cases must be handled when new variants are added?

**Section 5 — This week’s success criteria**

> By the end of this week, you should have a repo that builds, typechecks, tests, and explains itself.
>
> The code matters. The documentation matters. The PR matters.
>
> A senior interview is not just “can you code?”
> It is “can you make good decisions and explain them?”

**Closing**

> Your assignment is to create the foundation for the capstone dashboard. Treat this like your first PR on a serious product team.

---

## Video 2 — “Strict TypeScript as a Design Tool”

**Length:** 10–15 minutes

**Opening**

> Strict TypeScript can feel annoying when you first enable it. But for senior frontend engineering, that annoyance is the point. It forces ambiguity into the open.

**Section 1 — `any` vs `unknown`**

> `any` turns off TypeScript.
> `unknown` forces you to prove what something is.
>
> When data crosses a boundary — an API call, localStorage, a URL param, a third-party SDK — start with `unknown` and narrow.

Example:

```ts
function parseErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Unknown error";
}
```

**Section 2 — Discriminated unions**

> Discriminated unions let us model variants safely.
>
> Instead of one loose widget type with lots of optional fields, we create exact widget types.

Bad:

```ts
type Widget = {
  kind: string;
  metricValue?: number;
  chartType?: string;
  columns?: string[];
};
```

Better:

```ts
type Widget =
  | { kind: "metric"; value: number }
  | { kind: "chart"; chartType: "line" | "bar" }
  | { kind: "table"; columns: string[] };
```

**Section 3 — Branded types**

> Branded types prevent accidental mixing of values that are structurally identical.

```ts
type Brand<T, TBrand extends string> = T & {
  readonly __brand: TBrand;
};

type UserId = Brand<string, "UserId">;
type WidgetId = Brand<string, "WidgetId">;
```

**Section 4 — Exhaustive checking**

> When a union grows, the compiler should tell us what broke.

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}
```

**Section 5 — Senior-level habit**

> Do not ask, “Can TypeScript type this?”
> Ask, “What production mistake can this type prevent?”

**Closing**

> Week 1 is successful when your types are not decorative. They should enforce real product rules.

---

# Week 1 Audio Review Script

**Title:** “TypeScript is Architecture”

**Length:** 5–7 minutes

> This week is about setting the foundation for a senior-level React and TypeScript codebase.
>
> The biggest mindset shift is this: TypeScript is not just a tool for catching typos. TypeScript is part of your architecture.
>
> When you model users, roles, permissions, widgets, API responses, and dashboard layouts, you are deciding what states are allowed to exist in your application.
>
> Weak types allow weak assumptions. Strong types make assumptions visible.
>
> For example, a dashboard widget should not be modeled as one giant object with optional fields for every possible widget type. That creates invalid states. You could accidentally create a chart widget with table fields or a metric widget without a metric value.
>
> A better senior-level approach is to use discriminated unions. A metric widget has `kind: "metric"`. A chart widget has `kind: "chart"`. A table widget has `kind: "table"`. Each variant has only the fields it needs.
>
> Then, when you render or process a widget, TypeScript can narrow the type for you. If you add a new widget later, exhaustive checking can force you to update every important switch statement.
>
> That is the difference between TypeScript as syntax and TypeScript as design.
>
> This week also introduces the monorepo structure. The important idea is separation. Apps are deployable. Packages are reusable. Your React dashboard app should use shared schemas. Your future API server should use the same schemas. Your API client should depend on the contract, not invent its own version of reality.
>
> The goal is not to create folders for the sake of folders. The goal is to make future change safer.
>
> At the end of this week, your repo should build, typecheck, test, and explain itself. The explanation matters. A senior engineer does not just write code. A senior engineer leaves behind decisions that other people can understand.
>
> Your architecture document and ADR are part of the assignment because interviews are not just about implementation. You need to be able to explain tradeoffs.
>
> Why a monorepo?
> Why strict TypeScript?
> Why shared schemas?
> Why branded IDs?
> Why discriminated unions?
>
> Those answers are what turn this from a coding exercise into senior interview preparation.

---

# Week 1 Quiz

## Questions

### 1. What is the senior-level reason for using a monorepo in this course?

A. It makes the project look more complicated.
B. It allows deployable apps and shared packages to evolve together.
C. It avoids needing TypeScript.
D. It removes the need for tests.

---

### 2. What is the difference between `unknown` and `any`?

A. They are identical.
B. `unknown` requires narrowing before use, while `any` bypasses type safety.
C. `any` is safer than `unknown`.
D. `unknown` only works with strings.

---

### 3. Why use branded types for IDs?

A. To make runtime validation automatic.
B. To prevent structurally identical primitive values from being accidentally mixed.
C. To make strings faster.
D. To avoid using TypeScript generics.

---

### 4. What problem does a discriminated union solve?

A. It allows every field to be optional.
B. It models multiple valid variants while preserving type safety.
C. It prevents all runtime errors.
D. It replaces the need for components.

---

### 5. Why is this type dangerous?

```ts
type Widget = {
  kind: string;
  metricValue?: number;
  chartType?: string;
  columns?: string[];
};
```

A. It cannot represent charts.
B. It allows invalid combinations of fields.
C. It is too strict.
D. It cannot be serialized.

---

### 6. What is the purpose of `assertNever`?

A. To skip TypeScript errors.
B. To force exhaustive handling of union variants.
C. To convert strings into numbers.
D. To replace unit tests.

---

### 7. What should live in `packages/schemas`?

A. React page components.
B. Shared domain types, API contracts, and later runtime schemas.
C. CSS files only.
D. GitHub Actions workflows.

---

### 8. What should be true about apps in this monorepo?

A. They should be deployable surfaces.
B. They should contain all shared code.
C. They should import from each other freely.
D. They should avoid TypeScript.

---

### 9. What does `noUncheckedIndexedAccess` help catch?

A. Missing package scripts.
B. Unsafe array or object lookups that may return `undefined`.
C. Invalid CSS.
D. Slow React renders.

---

### 10. What should your Week 1 PR prove?

A. That the app has final UI polish.
B. That the repo has a scalable foundation, strict types, testing, and documented decisions.
C. That every capstone feature is complete.
D. That Redux is installed.

---

# Week 1 Answer Key

### 1. B

A monorepo lets the apps and packages evolve together while preserving boundaries.

### 2. B

`unknown` is safe because it requires narrowing. `any` disables meaningful type checking.

### 3. B

Branded types prevent accidental mixing of values like `UserId`, `WidgetId`, and `DashboardId`.

### 4. B

Discriminated unions model variants safely and let TypeScript narrow based on the discriminant field.

### 5. B

The type allows invalid states, such as a widget with `kind: "metric"` but chart fields.

### 6. B

`assertNever` helps ensure all union variants are handled.

### 7. B

The schemas package should hold shared domain types, API contracts, and eventually runtime schemas.

### 8. A

Apps are deployable surfaces. Shared reusable code belongs in packages.

### 9. B

It makes indexed lookups safer by including `undefined` when a lookup may fail.

### 10. B

The Week 1 PR should prove you can establish a scalable senior-level foundation.

---

# Week 1 Interview Drill

## Prompt

> You are joining a team that is starting a new enterprise dashboard. The team wants to move fast and suggests putting everything in one React app folder with loose TypeScript settings. How would you respond?

## Strong Answer Structure

Use this structure:

```txt
1. Acknowledge the speed concern.
2. Explain the long-term risk.
3. Recommend a lightweight but scalable structure.
4. Explain strict TypeScript as risk reduction.
5. Offer a compromise.
6. Tie the decision to team productivity.
```

## Example Strong Answer

> I understand the desire to move quickly, especially early in a product. I would not want to over-engineer the repo before we understand the product shape.
>
> That said, for an enterprise dashboard, I would still want a few foundations in place from day one: strict TypeScript, a clear app/package boundary, shared domain types, and basic test infrastructure.
>
> I would not create a huge architecture upfront, but I would separate deployable apps from reusable packages. For example, the dashboard app can live under `apps/dashboard-web`, while shared schemas, UI components, and API client code can live under `packages`.
>
> The reason is that dashboards tend to accumulate complexity quickly: permissions, widgets, filters, forms, API contracts, role-specific UI, and reporting logic. If we start with loose types and no boundaries, we will move quickly for a few weeks but pay for it when the first major refactor arrives.
>
> I would propose a lightweight monorepo structure with strict TypeScript enabled. That gives us safety without adding too much process. We can defer heavier decisions like package publishing, generated clients, or dependency-boundary tooling until the app grows.
>
> So my recommendation would be: keep the initial architecture simple, but do not make it careless. The goal is to preserve speed while avoiding decisions that make the codebase harder to scale later.

---

# Week 1 Mock Interview Script

## Interviewer

You are starting a new React and TypeScript dashboard. Why not just create a single Vite app and keep everything in `src`?

## Candidate

For a small prototype, that would be fine. For this course and for a senior-level dashboard, I want the repo to reflect the likely future shape of the system. The dashboard will eventually need shared UI components, shared API types, schemas, test utilities, and possibly a separate backend and RSC experiment. If everything starts inside one `src` folder, the boundaries become harder to introduce later.

## Interviewer

Isn’t that over-engineering?

## Candidate

It could be if the structure were too heavy. I would avoid premature complexity like publishing packages, complex dependency rules, or excessive abstractions. But a simple `apps` and `packages` split is a low-cost decision that gives us room to grow. It makes deployable surfaces distinct from reusable code.

## Interviewer

Why enable strict TypeScript immediately?

## Candidate

Because strict TypeScript is much easier to start with than to retrofit later. It forces us to handle uncertain values, missing cases, optional fields, and unsafe lookups. In a dashboard with permissions, widgets, forms, and API data, those are exactly the areas where bugs appear.

## Interviewer

Give me an example.

## Candidate

For widgets, I would avoid a single loose widget type with lots of optional fields. Instead, I would use a discriminated union. A metric widget should have metric fields. A chart widget should have chart fields. Then when I switch on `widget.kind`, TypeScript narrows the correct shape. If we add a map widget later, exhaustive checking can force us to update the right rendering and utility code.

## Interviewer

What is the tradeoff?

## Candidate

The tradeoff is more setup and slightly more friction early on. But the benefit is safer refactoring, clearer ownership, better API contracts, and more confidence as the codebase grows. For a senior-level project, I think that is a good trade.

---

# Week 1 Frontend System Design Prompt

## Prompt

Design the frontend architecture for a customizable enterprise dashboard.

## Requirements

The dashboard should support:

* multiple users
* role-based permissions
* customizable widgets
* saved layouts
* metric widgets
* chart widgets
* table widgets
* activity feed widgets
* future widget types
* typed API responses
* reusable UI components
* testable business logic

## Expected Answer Areas

Your written answer should cover:

```txt
1. App structure
2. Package structure
3. Domain model
4. Widget model
5. Permission model
6. API response model
7. State ownership
8. Testing approach
9. Performance risks
10. Future extensibility
```

## Week 1 Target Answer

For Week 1, do not fully solve the system design. Focus on the foundation:

* What types would you create first?
* What packages would exist?
* What boundaries matter immediately?
* What decisions can wait?

---

# Week 1 PR Template

Create:

```txt
.github/pull_request_template.md
```

```md
# Summary

Describe what this PR adds.

# Changes

- [ ] Added monorepo structure
- [ ] Added strict TypeScript config
- [ ] Added shared schemas package
- [ ] Added initial domain model
- [ ] Added runtime tests
- [ ] Added type tests
- [ ] Added architecture notes
- [ ] Added ADR

# Type Safety Notes

Explain how this PR uses TypeScript to prevent invalid states.

# Architecture Notes

Explain any folder/package decisions.

# Testing

Describe what tests were added.

# Tradeoffs

What did you choose not to solve yet?

# Interview Defense

How would you explain this PR in a senior frontend interview?
```

---

# Week 1 Definition of Done

Your Week 1 assignment is complete when:

```txt
[ ] Repo has apps/packages/docs structure
[ ] pnpm workspace is configured
[ ] root package scripts exist
[ ] strict TypeScript base config exists
[ ] packages/schemas package exists
[ ] domain model includes branded IDs
[ ] domain model includes discriminated widget union
[ ] API response model exists
[ ] at least one runtime test exists
[ ] at least one type test exists
[ ] README exists
[ ] ARCHITECTURE.md exists
[ ] ADR 0001 exists
[ ] PR template exists
[ ] GitHub Actions check exists
```

---

# GitHub Actions Baseline

Create:

```txt
.github/workflows/ci.yml
```

```yaml
name: CI

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Install
        run: pnpm install

      - name: Typecheck
        run: pnpm typecheck

      - name: Test
        run: pnpm test

      - name: Lint
        run: pnpm lint
```

---

# Week 1 Capstone Milestone

By the end of Week 1, your capstone does **not** need a real UI yet.

It needs a strong foundation:

```txt
Capstone Week 1 Deliverable:
A strict TypeScript monorepo with shared domain models, initial API response types, test infrastructure, and architecture documentation.
```

Your interview talking point should be:

> “I started by creating the architecture foundation: apps for deployable surfaces, packages for shared contracts and reusable code, strict TypeScript to reduce invalid states, and early documentation so future decisions are traceable.”

---

# Week 1 Stretch Goals

Only do these after the core assignment is complete.

## Stretch Goal 1 — Add dependency direction notes

Create:

```txt
docs/architecture/dependency-boundaries.md
```

Document rules like:

```txt
apps/* may import packages/*
packages/ui may import packages/schemas only if needed
packages/schemas should import nothing from app code
packages/api-client may import packages/schemas
packages/test-utils may import packages/schemas
apps should not import from other apps
```

## Stretch Goal 2 — Add TypeScript path aliases

Example:

```json
{
  "compilerOptions": {
    "paths": {
      "@course/schemas": ["packages/schemas/src/index.ts"],
      "@course/ui": ["packages/ui/src/index.ts"]
    }
  }
}
```

## Stretch Goal 3 — Add more type tests

Test that:

* `UserId` cannot be assigned to `WidgetId`
* invalid permissions fail
* widget variants require the correct fields
* `ApiResponse<T>` narrows correctly when `ok` is checked

---

# Week 1 Self-Review Questions

Before you mark the week complete, answer these in `docs/interview-notes/week-01.md`:

```md
# Week 1 Interview Notes

## Why did I choose a monorepo?

## What belongs in apps vs packages?

## What invalid states does my domain model prevent?

## Where am I using discriminated unions?

## Where am I using branded types?

## What TypeScript setting felt most annoying, and why is it useful?

## What would I change if this were a two-week prototype?

## What would I add if this repo had 20 developers?
```

---

# Week 1 Final Deliverable

At the end of Week 1, open a PR named:

```txt
Assignment 01: Senior TypeScript Monorepo Foundation
```

The PR should include:

```txt
README.md
ARCHITECTURE.md
docs/adr/0001-monorepo-structure.md
docs/architecture/week-01-foundation.md
docs/interview-notes/week-01.md
packages/schemas/src/domain.ts
packages/schemas/src/api.ts
packages/schemas/src/widget-utils.ts
packages/schemas/src/widget-utils.test.ts
packages/schemas/src/domain.test-d.ts
.github/workflows/ci.yml
.github/pull_request_template.md
```

This is your first senior interview artifact. It should show that you can write code, structure a repo, model a domain, explain tradeoffs, and create a foundation that can scale.