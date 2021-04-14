export type ArtAction = {
  callToAction: string;
  url: string;
};

export type ArtHashTag = {
  target: string;
  tag: string[];
};

export type ArtProprties = {
  artist: string;
  year: number;
  mediatype: string;
  style: string | string[];
};

export type Marketing = {
  title: string;
  artId: string;
  backgroundColor: string;
  textColor: string;
  hashTag: string[];
  property: Partial<ArtProprties>;
  action: ArtAction[];
  description: string;
};
