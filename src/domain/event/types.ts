export type Beacon = {
  HWID: string;
  serviceUUID: string;
};

export type Contact = {
  name: string;
  email: string;
  phone: string;
};

export type Event = {
  id: string;
  url: string;
  beacons: Beacon[];
  image_id: string[];
  name: string;
  contact: Contact;
};
