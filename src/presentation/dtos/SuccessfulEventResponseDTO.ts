interface ISuccessfulEventResponseDTO {
  destination?: {
    id?: string;
    balance?: number
  };

  origin?: {
    id?: string;
    balance?: number
  };
}
export class SuccessfulEventResponseDTO implements ISuccessfulEventResponseDTO {
  public destination?: {
    id?: string;
    balance?: number
  };

  public origin?: {
    id?: string;
    balance?: number
  };

  constructor(event?: Partial<ISuccessfulEventResponseDTO> | undefined) {
    if (event && event !== undefined) {
      Object.assign(this, event);
    }
  }
}