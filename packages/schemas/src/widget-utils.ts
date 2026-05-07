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

export function assertNever(value: never): never {
  throw new Error(`Unhandled variant: ${JSON.stringify(value)}`);
}