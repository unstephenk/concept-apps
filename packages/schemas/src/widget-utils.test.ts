import {describe, it, expect} from "vitest"
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
      updatedAt: "2026-05-06T00:00:00.000Z",
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