export interface Actor {
  character: string;
  name: string;
  profile_path: string;
}

export interface Credits {
  cast: Actor[];
}
