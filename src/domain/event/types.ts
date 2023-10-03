export type Beacon = {
  spotId: string;
  name: string;
  isPick: boolean;
  bonus: boolean;
  hwId: string;
  serviceUuid: string;
};

export type Contact = {
  name: string;
  email: string;
  phone: string;
};

export type Event = {
  eventId: string;
  name: string;
  hpUrl: string;
  spots: Beacon[];
  image_id: string[];
  contact: Contact;
};
