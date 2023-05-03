export interface TableColumns {
    [key: string]: {
      title: string;
      type: string;
      show?: boolean;
      renderComponent?: any;
    }
  }