export interface TimerTypes {
  action: number;
  interval: number;
  section: SectionTypes | null;
  actualTimer: number;
  round: number;
  isPaused: boolean;
  beforeTimer: number;
}

export type SectionTypes = "action" | "interval";
