export class ApiResponse<T> {
  private ok: boolean;
  private message: string;
  private data?: T;

  constructor(ok: boolean, message: string, data?: any) {
    this.ok = ok;
    this.message = message;
    this.data = data;
  }

  response() {
    return {
      ok: this.ok,
      message: this.message,
      data: this.data,
    };
  }
}

export class ApiResponseOk<T> extends ApiResponse<T> {
  constructor(message: string, data?: T) {
    super(true, message, data);
  }
}

export class ApiResponseError extends ApiResponse<undefined> {
  constructor(message: string) {
    super(false, message, undefined);
  }
}
