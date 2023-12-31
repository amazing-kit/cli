export interface ServerToClientEvents {
  // event_name: (event_property_1: string, event_property_2: number, ...) => void;
  // event_name: (event_property_1: string, event_property_2: number, ..., callback: (returned_value: number) => void) => void;
}

export interface ClientToServerEvents {
  // event_name: (event_property_1: string, event_property_2: number, ...) => void;
  // event_name: (event_property_1: string, event_property_2: number, ..., callback: (returned_value: number) => void) => void;
}

export interface InterServerEvents {
  ping: () => void;
}