export type Spot = {
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
  spots: Spot[];
  images: string[];
  contact: Contact;
};

export type Traffic = {
  spotId: string;
  headCount: number;
};
