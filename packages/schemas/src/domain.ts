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