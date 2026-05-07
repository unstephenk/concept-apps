import {describe, it} from "vitest"

import type {
  DashboardWidget,
  MetricWidget,
  UserId,
  WidgetId
} from "./domain";

declare const widgetId: WidgetId;
declare const userId: UserId;

describe("getWidgetKindLabel", () => {
    it(" a kind label for a metric widget", () => {
        const widget: MetricWidget = {
            id: widgetId,
  title: "Revenue",
  createdBy: userId,
  updatedAt: "2026-05-06T00:00:00.000Z",
  kind: "metric",
  metric: {
    label: "Revenue",
    value: 125000,
    unit: "USD",
    trend: "up"
  }
        }
    })
})