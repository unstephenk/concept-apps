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

export function unwrapApiResponse<TData>(response: ApiResponse<TData>): TData {
  if (response.ok) {
    return response.data;
  }

  throw new Error(response.error.message);
}