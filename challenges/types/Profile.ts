export interface Profile {
  initial: string;
  events: UsageEvent[];
}

export interface UsageEvent {
  state: string;
  timestamp: number;
}
