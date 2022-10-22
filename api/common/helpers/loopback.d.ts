import { Express, Request, Response } from 'express';
import { Readable } from 'stream';
import {
  CallbackWithoutResult,
  Conflict,
  LoopBackApplication,
  Model,
  RemoteMethodOptions,
} from 'loopback';

declare type Where<T extends any> = {
  [key in keyof T]?: any;
} & {
  and?: Where<T>[];
  or?: Where<T>[];
};

declare type Filter<T> = {
  fields?: string | any | any[];
  include?: string | any | any[];
  limit?: number;
  order?: string;
  skip?: number;
  where?: Where<T>;
};

declare type FilterForFindOne<T> = {
  fields?: string | any | any[];
  include?: string | any | any[];
  order?: string;
  skip?: number;
  where?: Where<T>;
};

declare type FilterForFindById = {
  fields?: string | any | any[];
  include?: string | any | any[];
};

declare type FilterForChangeStream<T> = {
  fields?: string | any | any[];
  where?: Where<T>;
};

declare type AccessToken = {
  id?: number;
  userId?: number;
};

declare type HttpContext<T> = {
  args: any;
  instance?: PersistedModel<T>;
  method: {
    name: string;
  };
  methodString: string;
  req: Request & {
    accessToken?: AccessToken;
  };
  res: Response;
  result?: PersistedModel<T>;
};

interface Change<M> {
  target: number;
  type: string;
  data: PersistedModel<M>;
}

declare type AccessContext<T> = {
  [key: string]: any;
  modelName: string;
  modelId?: string;
  property: string;
  method: string;
  accessType: 'READ' | 'WRITE' | 'EXECUTE' | string;
  accessToken: AccessToken;
  remotingContext: HttpContext<T>;
};

declare type RoleResolverCallback = (
  err: Error | null,
  inRole?: boolean,
) => any;

declare interface App extends Express, LoopBackApplication {
  models: any;
  dataSources: any;
  loopback: any;
}

declare type PersistedModel<T> = T & {
  constructor(data: T): PersistedModel<T>; // TODO: LongNT

  toJSON(): T;

  destroy(): Promise<void>;

  getId(): any;

  getIdName(): string;

  isNewRecord(): boolean;

  reload(): Promise<PersistedModel<T>>;

  replaceAttributes<T = any>(
    data: T,
    options?: { validate: boolean },
  ): Promise<PersistedModel<T>>;

  save(options?: {
    validate: boolean;
    throws: boolean;
  }): Promise<PersistedModel<T>>;

  setId(val: any): void;

  updateAttribute(name: keyof T, value: any): Promise<T>;

  updateAttributes(data: T): PersistedModel<T>;
};

type ObserverName =
  | 'access'
  | 'before save'
  | 'after save'
  | 'before delete'
  | 'after delete'
  | 'loaded'
  | 'persist';

type ObserverContext<T> = {
  hookState: any;
  instance?: PersistedModel<T>;
  data?: PersistedModel<T>;
  isNewInstance: boolean;
  options: any;
  currentInstance: any;
  Model: PersistedModelStatic<T>;
};

declare class PersistedModelStatic<T> {
  app: App;
  dataSource: any;
  disableRemoteMethod: (name: string, isStatic: boolean) => void;
  disableRemoteMethodByName: (name: string) => void;
  enableChangeTracking: () => void;

  // bulkUpdate: { (updates: any[], options: any, callback: l.CallbackWithoutResult): void; (updates: any[], options: any): Promise<void> };

  // changes: { (since: number, filter: any, callback: l.CallbackWithResult<any>): void; (since: number, filter: any): Promise<any[]> };

  // checkAccess: (token: l.AccessToken, modelId: any, sharedMethod: any, ctx: any, callback: (err: (string | Error), allowed: boolean) => void) => void;

  // checkpoint: { (callback?: () => void): void; (): Promise<void> };
  getChangeModel: () => void;
  getIdName: () => string;
  handleChangeError: (err: Error) => void;
  modelName: string;

  // createUpdates: { (deltas: any[], callback: l.CallbackWithoutResult): void; (deltas: any[]): Promise<void> };

  // currentCheckpoint: { (callback: l.CallbackWithResult<number>): void; (): Promise<number> };
  nestRemoting: (
    relationName: string,
    pathName: string,
    filterMethod: string,
    paramName: string,
    getterName: string,
    hooks: boolean,
    options?: {},
    filterCallback?: (SharedMethod: any, RelationDefinition: any) => void,
  ) => void;
  prototype: PersistedModel<T> & any;
  rectifyChange: {
    (id: any, callback: CallbackWithoutResult): void;
    (id: any): Promise<void>;
  };

  // diff: { (since: number, remoteChanges: any[], callback: l.CallbackWithResult<any>): void; (since: number, remoteChanges: any[]): Promise<any> };
  replicate: (
    since?: number,
    targetModel?: PersistedModel<T>,
    options?: any,
    optionsFilter?: any,
    callback?: (err: Error, conflicts: Conflict[], param: any) => void,
  ) => Promise<{ conflicts: Conflict[]; params: any }> | void;
  setup: () => void;
  sharedMethod: any;

  build(data: T): PersistedModel<T>; // TODO: LongNT

  beforeRemote(
    method: string,
    callback: (
      ctx: HttpContext<T>,
      modelInstance?: PersistedModel<T>,
    ) => Promise<any>,
  ): void;

  afterRemote(
    method: string,
    callback: (
      ctx: HttpContext<T>,
      modelInstance?: PersistedModel<T>,
    ) => Promise<any>,
  ): void;

  afterRemoteError(
    method: string,
    callback: (ctx: HttpContext<T>) => Promise<any>,
  ): void;

  count(where: Where<T>): Promise<number>;

  // findOrCreate: { <T = any>(data: any, callback: l.CallbackWithMultipleResults<T, boolean>): void; <T = any>(data: any, filter: { fields?: string | any | any[]; include?: string | any | any[]; limit?: number; order?: string; skip?: number; where?: any }, callback: l.CallbackWithMultipleResults<T, boolean>): void; <T = any>(data: any, filter?: { fields?: string | any | any[]; include?: string | any | any[]; limit?: number; order?: string; skip?: number; where?: any }): Promise<{ instance: T; created: boolean } | null> };

  create(data: T): Promise<PersistedModel<T>>;

  create(data: T[]): Promise<PersistedModel<T[]>>;

  createChangeStream(options?: { where: Where<T> }): Promise<Readable>;

  // getSourceId: { (callback: l.CallbackWithResult<string>): void; (): Promise<string> };

  destroyAll(where: Where<T>): Promise<{ info: any; infoCount: number }>;

  destroyById(id: number): Promise<{ count: number }>;

  remoteMethod(name: string, options: RemoteMethodOptions): void;

  exists(id: any): Promise<boolean>;

  find(filter?: Filter<T>): Promise<PersistedModel<T>[]>;

  // replaceById: { <T = any>(id: any, data: any, callback: l.CallbackWithResult<T>): void; <T = any>(id: any, data: any, options: { validate: boolean }, callback: l.CallbackWithResult<T>): void; <T = any>(id: any, data: any, options?: { validate: boolean }): Promise<T> };

  // replaceOrCreate: { <T = any>(data: any, callback: l.CallbackWithResult<T>): void; <T = any>(data: any, options: { validate: boolean }, callback: l.CallbackWithResult<T>): void; <T = any>(data: any, options?: { validate: boolean }): Promise<T> };

  findOne(filter: FilterForFindOne<T>): Promise<PersistedModel<T> | null>;

  findById(
    id: number,
    filter: FilterForFindById,
  ): Promise<PersistedModel<T> | null>;

  getApp(callback: (err: null, app: App) => void): void;

  updateAll(where: Where<T>, data: T): Promise<{ count: number }>;

  upsert(data: T): Promise<PersistedModel<T>>;

  upsertWithWhere(where: Where<T>, data: T): Promise<PersistedModel<T>>;

  observe(
    name: ObserverName,
    callback: (ctx: ObserverContext<T>) => Promise<any>,
  ): void;

  on(event: 'dataSourceAttached', callback: () => void): void;

  once(event: 'dataSourceAttached', callback: () => void): void;
}
