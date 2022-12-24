export interface ResUsers {
  id: number;
  FIO: string;
  job: string | null;
  task: ResTodo[] | null;
}

export interface ResJob {
  id: number;
  name: string;
}

export interface ResTodo extends ResJob {
  start: string;
  end: string;
}
