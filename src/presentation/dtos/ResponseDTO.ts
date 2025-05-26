export type ResponseDTO<S, F> = Success<S> | Failure<F>;

export type FailData<F = unknown> = {
  code: number;
  message: string;
  data: F | {
    originalMessage: string;
    stack?: string;
  };
};
export type SuccessData<S = unknown> = {
  code: number;
  data: S ;
};

export class Success<S> {
  readonly isError = false;
  constructor(
    public readonly code: number,
    public readonly data: S
  ) {}

  toJSON(): SuccessData<S> {
    return {
      code: this.code,
      data: this.data,
    };
  }
}

export class Failure<F = unknown> {
  readonly isError = true;

  constructor(
    public readonly code: number,
    public readonly message: string,
    public readonly original: F | Error
  ) {}

  toJSON(): FailData<F> {
    if (this.original instanceof Error) {
      return {
        code: this.code,
        message: this.message,
        data: {
          originalMessage: this.original.message,
          // stack: this.original.stack,
        },
      };
    }

    return {
      code: this.code,
      message: this.message,
      data: this.original,
    };
  }
}

export const success = <S>(code: number, data: S): ResponseDTO<S, never> =>
  new Success(code, data);

export const failure = <F = Error>(
  code: number,
  error: F,
  msg: string
): ResponseDTO<never, F> => new Failure(code, msg, error);
