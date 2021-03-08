export type Coords = { x: number; y: number };

export type Point = Coords;

export type Link = {
  target: string;
  edited?: boolean;
  points?: Array<Point>;
  label?: string;
  color?: string;
  editTag?: string;
  custom?: any;
};
export type Links = Array<Link>;

export type EntityType = string;

export type EntityModel = {
  id: string;
  type: EntityType;
  width: number;
  height: number;
  x: number;
  y: number;
  name: string;
  linksTo?: Links;
  linksBy?: Links;
  custom?: any;
};

export type EntityState = Array<EntityModel>;

export type MetaEntityModel = {
  id: string;
  isAnchored: boolean;
  isSelected: boolean;
};

export type DiagComponentProps = {
  model: EntityModel;
  meta: MetaEntityModel;
  // setName: (payload: SetNamePayload) => EntityAction;
};
