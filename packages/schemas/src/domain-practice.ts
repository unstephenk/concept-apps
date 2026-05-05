type Brand<TValue, TBrand extends string> = TValue & {
    readonly __brand: TBrand;
};

type ProjectId = Brand<string, "ProjectId">;
type TaskId = Brand<string, "TaskId">;
type UserId = Brand<string, "UserId">;

type TaskStatus = "todo" | "inProgress" | "blocked" | "done";
type TasksPriority = "low" | "medium" | "high";

type User = {
    id: UserId;
    displayName: string;
    email: string;
}

type TaskBase = {
    id: TaskId;
    title: string;
    status: TaskStatus;
    priority: TasksPriority;
    assignedTo?: UserId;
}

type BugTask = TaskBase & {
    kind: "bug";
    severity: "minor" | "major" | "critical";
    stepsToReproduce: readonly string[];
}

type FeatureTask = TaskBase & {
    kind: "feature"
    acceptanceCriteria: readonly string[];
}

type Task = BugTask | FeatureTask;

type Project = {
    id: ProjectId;
    name: string;
    ownerId: UserId;
    tasks: readonly Task[];
}

function test() {
    const test: Project = {
        id: "testProject" as ProjectId,
        name: "stephen",
        ownerId: "stephen123" as UserId,
        tasks: [
            {
                id: "123" as TaskId,
                title: "Add dark mode",
                status: "inProgress",
                priority: "medium",
                assignedTo: "stephen" as UserId,
                kind: "feature",
                acceptanceCriteria: [
                    "User can toggle between light and dark mode",
                    "Theme preference is saved",
                    "Dark mode works across all main pages"
                ]
            },
                        {
                id: "123" as TaskId,
                title: "Fix login error",
                status: "todo",
                priority: "high",
                assignedTo: "stephen" as UserId,
                kind: "bug",
                severity: "critical",
                stepsToReproduce: [
                    "Go to the login page",
                    "Enter valid credentials",
                    "Click the login button",
                    "Notice the error message"
                ]
            },
        ]
    }

    return test
}