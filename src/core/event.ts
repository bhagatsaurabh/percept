export interface Event {
  registeredEvents: any;

  on(eventKey: string, callback: Function): void;
}
