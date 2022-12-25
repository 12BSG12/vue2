export interface ResUsers {
  id: number;
  FIO: string;
  job: string | null;
  task: UserTaskType[] | null;
}

export interface ResJob {
  id: number;
  name: string;
}

export type ResTodo = ResJob

export interface UserTaskType extends ResTodo{
  start: string;
  end: string;
}