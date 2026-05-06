// x SaveSuccess should have success: true and data
// x SaveFailure should have success: false and error
// x error should include code and message
// x SaveResult should be a union of success or failure
// Create a function unwrapSaveResult<TData>() that returns data or throws

// SaveSuccess<TData>
// SaveFailure<TCode extends string = string>
// SaveResult<TData, TCode extends string = string>

export type SaveSuccess<TData> = {
    ok: true,
    data: TData;
    meta?: {
        requestId: string;
    }
}

export type SaveFailure<TCode extends string = string> = {
    ok: false,
    error: {
        code: TCode;
        message: string;
        fieldErrors?: Record<string, string[]>
    }
    meta?: {
        requestId: string;
    }
}

export type SaveResult<TData, TCode extends string = string> = SaveSuccess<TData> | SaveFailure<TCode>

function unwrapSaveResult<TData>(response: SaveResult<TData>): TData {
    if (response.ok) {
        return response.data
    }

    throw new Error(response.error.message)
}