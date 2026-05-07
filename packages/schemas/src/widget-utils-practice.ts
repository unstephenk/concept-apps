import type { DashboardWidget } from "./domain";
import { assertNever } from "./widget-utils";

// x metric       -> "Metric Widget"
// x chart        -> "Chart Widget"
// x table        -> "Table Widget"
// x activityFeed -> "Activity Feed Widget"

// x Use a switch statement
// x Use widget.kind
// x Use assertNever in the default case
// x Export the function

export function getWidgetKindLabel(widget: DashboardWidget): string {
    switch(widget.kind) {
        case "metric":
            return "Metric Widget"
        case "activityFeed":
            return "Activity Feed"
        case "chart":
            return "Chart Feed"
        case "table":
            return "Table"
        default:
            return assertNever(widget)
    }
}
