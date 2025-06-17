export interface HistoryEvent {
  year: number;
  description: string;
}

export interface HistorySection {
  circleTitle: string;
  events: HistoryEvent[];
}
