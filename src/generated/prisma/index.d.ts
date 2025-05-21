
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Subscription
 * 
 */
export type Subscription = $Result.DefaultSelection<Prisma.$SubscriptionPayload>
/**
 * Model NoteSubmission
 * 
 */
export type NoteSubmission = $Result.DefaultSelection<Prisma.$NoteSubmissionPayload>
/**
 * Model Pair
 * 
 */
export type Pair = $Result.DefaultSelection<Prisma.$PairPayload>
/**
 * Model StudyStat
 * 
 */
export type StudyStat = $Result.DefaultSelection<Prisma.$StudyStatPayload>
/**
 * Model HumanizerRun
 * 
 */
export type HumanizerRun = $Result.DefaultSelection<Prisma.$HumanizerRunPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subscription`: Exposes CRUD operations for the **Subscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscriptions
    * const subscriptions = await prisma.subscription.findMany()
    * ```
    */
  get subscription(): Prisma.SubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.noteSubmission`: Exposes CRUD operations for the **NoteSubmission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NoteSubmissions
    * const noteSubmissions = await prisma.noteSubmission.findMany()
    * ```
    */
  get noteSubmission(): Prisma.NoteSubmissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pair`: Exposes CRUD operations for the **Pair** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pairs
    * const pairs = await prisma.pair.findMany()
    * ```
    */
  get pair(): Prisma.PairDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.studyStat`: Exposes CRUD operations for the **StudyStat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudyStats
    * const studyStats = await prisma.studyStat.findMany()
    * ```
    */
  get studyStat(): Prisma.StudyStatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.humanizerRun`: Exposes CRUD operations for the **HumanizerRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HumanizerRuns
    * const humanizerRuns = await prisma.humanizerRun.findMany()
    * ```
    */
  get humanizerRun(): Prisma.HumanizerRunDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Subscription: 'Subscription',
    NoteSubmission: 'NoteSubmission',
    Pair: 'Pair',
    StudyStat: 'StudyStat',
    HumanizerRun: 'HumanizerRun'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "subscription" | "noteSubmission" | "pair" | "studyStat" | "humanizerRun"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Subscription: {
        payload: Prisma.$SubscriptionPayload<ExtArgs>
        fields: Prisma.SubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findFirst: {
            args: Prisma.SubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          findMany: {
            args: Prisma.SubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          create: {
            args: Prisma.SubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          createMany: {
            args: Prisma.SubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          delete: {
            args: Prisma.SubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          update: {
            args: Prisma.SubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.SubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.SubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubscriptionPayload>
          }
          aggregate: {
            args: Prisma.SubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubscription>
          }
          groupBy: {
            args: Prisma.SubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<SubscriptionCountAggregateOutputType> | number
          }
        }
      }
      NoteSubmission: {
        payload: Prisma.$NoteSubmissionPayload<ExtArgs>
        fields: Prisma.NoteSubmissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoteSubmissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoteSubmissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoteSubmissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoteSubmissionPayload>
          }
          findFirst: {
            args: Prisma.NoteSubmissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoteSubmissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoteSubmissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoteSubmissionPayload>
          }
          findMany: {
            args: Prisma.NoteSubmissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoteSubmissionPayload>[]
          }
          create: {
            args: Prisma.NoteSubmissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoteSubmissionPayload>
          }
          createMany: {
            args: Prisma.NoteSubmissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NoteSubmissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoteSubmissionPayload>[]
          }
          delete: {
            args: Prisma.NoteSubmissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoteSubmissionPayload>
          }
          update: {
            args: Prisma.NoteSubmissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoteSubmissionPayload>
          }
          deleteMany: {
            args: Prisma.NoteSubmissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoteSubmissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NoteSubmissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoteSubmissionPayload>[]
          }
          upsert: {
            args: Prisma.NoteSubmissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoteSubmissionPayload>
          }
          aggregate: {
            args: Prisma.NoteSubmissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNoteSubmission>
          }
          groupBy: {
            args: Prisma.NoteSubmissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoteSubmissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.NoteSubmissionCountArgs<ExtArgs>
            result: $Utils.Optional<NoteSubmissionCountAggregateOutputType> | number
          }
        }
      }
      Pair: {
        payload: Prisma.$PairPayload<ExtArgs>
        fields: Prisma.PairFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PairFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PairFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          findFirst: {
            args: Prisma.PairFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PairFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          findMany: {
            args: Prisma.PairFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>[]
          }
          create: {
            args: Prisma.PairCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          createMany: {
            args: Prisma.PairCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PairCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>[]
          }
          delete: {
            args: Prisma.PairDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          update: {
            args: Prisma.PairUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          deleteMany: {
            args: Prisma.PairDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PairUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PairUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>[]
          }
          upsert: {
            args: Prisma.PairUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PairPayload>
          }
          aggregate: {
            args: Prisma.PairAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePair>
          }
          groupBy: {
            args: Prisma.PairGroupByArgs<ExtArgs>
            result: $Utils.Optional<PairGroupByOutputType>[]
          }
          count: {
            args: Prisma.PairCountArgs<ExtArgs>
            result: $Utils.Optional<PairCountAggregateOutputType> | number
          }
        }
      }
      StudyStat: {
        payload: Prisma.$StudyStatPayload<ExtArgs>
        fields: Prisma.StudyStatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudyStatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudyStatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudyStatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudyStatPayload>
          }
          findFirst: {
            args: Prisma.StudyStatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudyStatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudyStatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudyStatPayload>
          }
          findMany: {
            args: Prisma.StudyStatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudyStatPayload>[]
          }
          create: {
            args: Prisma.StudyStatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudyStatPayload>
          }
          createMany: {
            args: Prisma.StudyStatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudyStatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudyStatPayload>[]
          }
          delete: {
            args: Prisma.StudyStatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudyStatPayload>
          }
          update: {
            args: Prisma.StudyStatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudyStatPayload>
          }
          deleteMany: {
            args: Prisma.StudyStatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudyStatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudyStatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudyStatPayload>[]
          }
          upsert: {
            args: Prisma.StudyStatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudyStatPayload>
          }
          aggregate: {
            args: Prisma.StudyStatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudyStat>
          }
          groupBy: {
            args: Prisma.StudyStatGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudyStatGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudyStatCountArgs<ExtArgs>
            result: $Utils.Optional<StudyStatCountAggregateOutputType> | number
          }
        }
      }
      HumanizerRun: {
        payload: Prisma.$HumanizerRunPayload<ExtArgs>
        fields: Prisma.HumanizerRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HumanizerRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HumanizerRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HumanizerRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HumanizerRunPayload>
          }
          findFirst: {
            args: Prisma.HumanizerRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HumanizerRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HumanizerRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HumanizerRunPayload>
          }
          findMany: {
            args: Prisma.HumanizerRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HumanizerRunPayload>[]
          }
          create: {
            args: Prisma.HumanizerRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HumanizerRunPayload>
          }
          createMany: {
            args: Prisma.HumanizerRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HumanizerRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HumanizerRunPayload>[]
          }
          delete: {
            args: Prisma.HumanizerRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HumanizerRunPayload>
          }
          update: {
            args: Prisma.HumanizerRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HumanizerRunPayload>
          }
          deleteMany: {
            args: Prisma.HumanizerRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HumanizerRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HumanizerRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HumanizerRunPayload>[]
          }
          upsert: {
            args: Prisma.HumanizerRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HumanizerRunPayload>
          }
          aggregate: {
            args: Prisma.HumanizerRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHumanizerRun>
          }
          groupBy: {
            args: Prisma.HumanizerRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<HumanizerRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.HumanizerRunCountArgs<ExtArgs>
            result: $Utils.Optional<HumanizerRunCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    subscription?: SubscriptionOmit
    noteSubmission?: NoteSubmissionOmit
    pair?: PairOmit
    studyStat?: StudyStatOmit
    humanizerRun?: HumanizerRunOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    submissions: number
    pairs: number
    studyStats: number
    humanizerRuns: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submissions?: boolean | UserCountOutputTypeCountSubmissionsArgs
    pairs?: boolean | UserCountOutputTypeCountPairsArgs
    studyStats?: boolean | UserCountOutputTypeCountStudyStatsArgs
    humanizerRuns?: boolean | UserCountOutputTypeCountHumanizerRunsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteSubmissionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStudyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudyStatWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountHumanizerRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HumanizerRunWhereInput
  }


  /**
   * Count Type NoteSubmissionCountOutputType
   */

  export type NoteSubmissionCountOutputType = {
    pairs: number
  }

  export type NoteSubmissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pairs?: boolean | NoteSubmissionCountOutputTypeCountPairsArgs
  }

  // Custom InputTypes
  /**
   * NoteSubmissionCountOutputType without action
   */
  export type NoteSubmissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmissionCountOutputType
     */
    select?: NoteSubmissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NoteSubmissionCountOutputType without action
   */
  export type NoteSubmissionCountOutputTypeCountPairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairWhereInput
  }


  /**
   * Count Type PairCountOutputType
   */

  export type PairCountOutputType = {
    studyStats: number
  }

  export type PairCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    studyStats?: boolean | PairCountOutputTypeCountStudyStatsArgs
  }

  // Custom InputTypes
  /**
   * PairCountOutputType without action
   */
  export type PairCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PairCountOutputType
     */
    select?: PairCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PairCountOutputType without action
   */
  export type PairCountOutputTypeCountStudyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudyStatWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subscription?: boolean | User$subscriptionArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    pairs?: boolean | User$pairsArgs<ExtArgs>
    studyStats?: boolean | User$studyStatsArgs<ExtArgs>
    humanizerRuns?: boolean | User$humanizerRunsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subscription?: boolean | User$subscriptionArgs<ExtArgs>
    submissions?: boolean | User$submissionsArgs<ExtArgs>
    pairs?: boolean | User$pairsArgs<ExtArgs>
    studyStats?: boolean | User$studyStatsArgs<ExtArgs>
    humanizerRuns?: boolean | User$humanizerRunsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      subscription: Prisma.$SubscriptionPayload<ExtArgs> | null
      submissions: Prisma.$NoteSubmissionPayload<ExtArgs>[]
      pairs: Prisma.$PairPayload<ExtArgs>[]
      studyStats: Prisma.$StudyStatPayload<ExtArgs>[]
      humanizerRuns: Prisma.$HumanizerRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subscription<T extends User$subscriptionArgs<ExtArgs> = {}>(args?: Subset<T, User$subscriptionArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    submissions<T extends User$submissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$submissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pairs<T extends User$pairsArgs<ExtArgs> = {}>(args?: Subset<T, User$pairsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    studyStats<T extends User$studyStatsArgs<ExtArgs> = {}>(args?: Subset<T, User$studyStatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    humanizerRuns<T extends User$humanizerRunsArgs<ExtArgs> = {}>(args?: Subset<T, User$humanizerRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HumanizerRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.subscription
   */
  export type User$subscriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    where?: SubscriptionWhereInput
  }

  /**
   * User.submissions
   */
  export type User$submissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionInclude<ExtArgs> | null
    where?: NoteSubmissionWhereInput
    orderBy?: NoteSubmissionOrderByWithRelationInput | NoteSubmissionOrderByWithRelationInput[]
    cursor?: NoteSubmissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoteSubmissionScalarFieldEnum | NoteSubmissionScalarFieldEnum[]
  }

  /**
   * User.pairs
   */
  export type User$pairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    where?: PairWhereInput
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    cursor?: PairWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * User.studyStats
   */
  export type User$studyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatInclude<ExtArgs> | null
    where?: StudyStatWhereInput
    orderBy?: StudyStatOrderByWithRelationInput | StudyStatOrderByWithRelationInput[]
    cursor?: StudyStatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudyStatScalarFieldEnum | StudyStatScalarFieldEnum[]
  }

  /**
   * User.humanizerRuns
   */
  export type User$humanizerRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunInclude<ExtArgs> | null
    where?: HumanizerRunWhereInput
    orderBy?: HumanizerRunOrderByWithRelationInput | HumanizerRunOrderByWithRelationInput[]
    cursor?: HumanizerRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HumanizerRunScalarFieldEnum | HumanizerRunScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Subscription
   */

  export type AggregateSubscription = {
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  export type SubscriptionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    stripeCustomerId: string | null
    stripePriceId: string | null
    stripeSubscriptionId: string | null
    status: string | null
    plan: string | null
    currentPeriodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    stripeCustomerId: string | null
    stripePriceId: string | null
    stripeSubscriptionId: string | null
    status: string | null
    plan: string | null
    currentPeriodEnd: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubscriptionCountAggregateOutputType = {
    id: number
    userId: number
    stripeCustomerId: number
    stripePriceId: number
    stripeSubscriptionId: number
    status: number
    plan: number
    currentPeriodEnd: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubscriptionMinAggregateInputType = {
    id?: true
    userId?: true
    stripeCustomerId?: true
    stripePriceId?: true
    stripeSubscriptionId?: true
    status?: true
    plan?: true
    currentPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionMaxAggregateInputType = {
    id?: true
    userId?: true
    stripeCustomerId?: true
    stripePriceId?: true
    stripeSubscriptionId?: true
    status?: true
    plan?: true
    currentPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubscriptionCountAggregateInputType = {
    id?: true
    userId?: true
    stripeCustomerId?: true
    stripePriceId?: true
    stripeSubscriptionId?: true
    status?: true
    plan?: true
    currentPeriodEnd?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscription to aggregate.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscriptions
    **/
    _count?: true | SubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriptionMaxAggregateInputType
  }

  export type GetSubscriptionAggregateType<T extends SubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscription[P]>
      : GetScalarType<T[P], AggregateSubscription[P]>
  }




  export type SubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubscriptionWhereInput
    orderBy?: SubscriptionOrderByWithAggregationInput | SubscriptionOrderByWithAggregationInput[]
    by: SubscriptionScalarFieldEnum[] | SubscriptionScalarFieldEnum
    having?: SubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriptionCountAggregateInputType | true
    _min?: SubscriptionMinAggregateInputType
    _max?: SubscriptionMaxAggregateInputType
  }

  export type SubscriptionGroupByOutputType = {
    id: string
    userId: string
    stripeCustomerId: string | null
    stripePriceId: string | null
    stripeSubscriptionId: string | null
    status: string | null
    plan: string | null
    currentPeriodEnd: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SubscriptionCountAggregateOutputType | null
    _min: SubscriptionMinAggregateOutputType | null
    _max: SubscriptionMaxAggregateOutputType | null
  }

  type GetSubscriptionGroupByPayload<T extends SubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type SubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    stripeCustomerId?: boolean
    stripePriceId?: boolean
    stripeSubscriptionId?: boolean
    status?: boolean
    plan?: boolean
    currentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    stripeCustomerId?: boolean
    stripePriceId?: boolean
    stripeSubscriptionId?: boolean
    status?: boolean
    plan?: boolean
    currentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    stripeCustomerId?: boolean
    stripePriceId?: boolean
    stripeSubscriptionId?: boolean
    status?: boolean
    plan?: boolean
    currentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subscription"]>

  export type SubscriptionSelectScalar = {
    id?: boolean
    userId?: boolean
    stripeCustomerId?: boolean
    stripePriceId?: boolean
    stripeSubscriptionId?: boolean
    status?: boolean
    plan?: boolean
    currentPeriodEnd?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "stripeCustomerId" | "stripePriceId" | "stripeSubscriptionId" | "status" | "plan" | "currentPeriodEnd" | "createdAt" | "updatedAt", ExtArgs["result"]["subscription"]>
  export type SubscriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SubscriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subscription"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      stripeCustomerId: string | null
      stripePriceId: string | null
      stripeSubscriptionId: string | null
      status: string | null
      plan: string | null
      currentPeriodEnd: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subscription"]>
    composites: {}
  }

  type SubscriptionGetPayload<S extends boolean | null | undefined | SubscriptionDefaultArgs> = $Result.GetResult<Prisma.$SubscriptionPayload, S>

  type SubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubscriptionCountAggregateInputType | true
    }

  export interface SubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscription'], meta: { name: 'Subscription' } }
    /**
     * Find zero or one Subscription that matches the filter.
     * @param {SubscriptionFindUniqueArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubscriptionFindUniqueArgs>(args: SelectSubset<T, SubscriptionFindUniqueArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubscriptionFindUniqueOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubscriptionFindFirstArgs>(args?: SelectSubset<T, SubscriptionFindFirstArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindFirstOrThrowArgs} args - Arguments to find a Subscription
     * @example
     * // Get one Subscription
     * const subscription = await prisma.subscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscriptions
     * const subscriptions = await prisma.subscription.findMany()
     * 
     * // Get first 10 Subscriptions
     * const subscriptions = await prisma.subscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubscriptionFindManyArgs>(args?: SelectSubset<T, SubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subscription.
     * @param {SubscriptionCreateArgs} args - Arguments to create a Subscription.
     * @example
     * // Create one Subscription
     * const Subscription = await prisma.subscription.create({
     *   data: {
     *     // ... data to create a Subscription
     *   }
     * })
     * 
     */
    create<T extends SubscriptionCreateArgs>(args: SelectSubset<T, SubscriptionCreateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subscriptions.
     * @param {SubscriptionCreateManyArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubscriptionCreateManyArgs>(args?: SelectSubset<T, SubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subscriptions and returns the data saved in the database.
     * @param {SubscriptionCreateManyAndReturnArgs} args - Arguments to create many Subscriptions.
     * @example
     * // Create many Subscriptions
     * const subscription = await prisma.subscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subscription.
     * @param {SubscriptionDeleteArgs} args - Arguments to delete one Subscription.
     * @example
     * // Delete one Subscription
     * const Subscription = await prisma.subscription.delete({
     *   where: {
     *     // ... filter to delete one Subscription
     *   }
     * })
     * 
     */
    delete<T extends SubscriptionDeleteArgs>(args: SelectSubset<T, SubscriptionDeleteArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subscription.
     * @param {SubscriptionUpdateArgs} args - Arguments to update one Subscription.
     * @example
     * // Update one Subscription
     * const subscription = await prisma.subscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubscriptionUpdateArgs>(args: SelectSubset<T, SubscriptionUpdateArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subscriptions.
     * @param {SubscriptionDeleteManyArgs} args - Arguments to filter Subscriptions to delete.
     * @example
     * // Delete a few Subscriptions
     * const { count } = await prisma.subscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubscriptionDeleteManyArgs>(args?: SelectSubset<T, SubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubscriptionUpdateManyArgs>(args: SelectSubset<T, SubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscriptions and returns the data updated in the database.
     * @param {SubscriptionUpdateManyAndReturnArgs} args - Arguments to update many Subscriptions.
     * @example
     * // Update many Subscriptions
     * const subscription = await prisma.subscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subscriptions and only return the `id`
     * const subscriptionWithIdOnly = await prisma.subscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subscription.
     * @param {SubscriptionUpsertArgs} args - Arguments to update or create a Subscription.
     * @example
     * // Update or create a Subscription
     * const subscription = await prisma.subscription.upsert({
     *   create: {
     *     // ... data to create a Subscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscription we want to update
     *   }
     * })
     */
    upsert<T extends SubscriptionUpsertArgs>(args: SelectSubset<T, SubscriptionUpsertArgs<ExtArgs>>): Prisma__SubscriptionClient<$Result.GetResult<Prisma.$SubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionCountArgs} args - Arguments to filter Subscriptions to count.
     * @example
     * // Count the number of Subscriptions
     * const count = await prisma.subscription.count({
     *   where: {
     *     // ... the filter for the Subscriptions we want to count
     *   }
     * })
    **/
    count<T extends SubscriptionCountArgs>(
      args?: Subset<T, SubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriptionAggregateArgs>(args: Subset<T, SubscriptionAggregateArgs>): Prisma.PrismaPromise<GetSubscriptionAggregateType<T>>

    /**
     * Group by Subscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: SubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscription model
   */
  readonly fields: SubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Subscription model
   */
  interface SubscriptionFieldRefs {
    readonly id: FieldRef<"Subscription", 'String'>
    readonly userId: FieldRef<"Subscription", 'String'>
    readonly stripeCustomerId: FieldRef<"Subscription", 'String'>
    readonly stripePriceId: FieldRef<"Subscription", 'String'>
    readonly stripeSubscriptionId: FieldRef<"Subscription", 'String'>
    readonly status: FieldRef<"Subscription", 'String'>
    readonly plan: FieldRef<"Subscription", 'String'>
    readonly currentPeriodEnd: FieldRef<"Subscription", 'DateTime'>
    readonly createdAt: FieldRef<"Subscription", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subscription findUnique
   */
  export type SubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findUniqueOrThrow
   */
  export type SubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription findFirst
   */
  export type SubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findFirstOrThrow
   */
  export type SubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscription to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscriptions.
     */
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription findMany
   */
  export type SubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter, which Subscriptions to fetch.
     */
    where?: SubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscriptions to fetch.
     */
    orderBy?: SubscriptionOrderByWithRelationInput | SubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscriptions.
     */
    cursor?: SubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscriptions.
     */
    skip?: number
    distinct?: SubscriptionScalarFieldEnum | SubscriptionScalarFieldEnum[]
  }

  /**
   * Subscription create
   */
  export type SubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscription.
     */
    data: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
  }

  /**
   * Subscription createMany
   */
  export type SubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subscription createManyAndReturn
   */
  export type SubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Subscriptions.
     */
    data: SubscriptionCreateManyInput | SubscriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription update
   */
  export type SubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscription.
     */
    data: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
    /**
     * Choose, which Subscription to update.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription updateMany
   */
  export type SubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
  }

  /**
   * Subscription updateManyAndReturn
   */
  export type SubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update Subscriptions.
     */
    data: XOR<SubscriptionUpdateManyMutationInput, SubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which Subscriptions to update
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subscription upsert
   */
  export type SubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscription to update in case it exists.
     */
    where: SubscriptionWhereUniqueInput
    /**
     * In case the Subscription found by the `where` argument doesn't exist, create a new Subscription with this data.
     */
    create: XOR<SubscriptionCreateInput, SubscriptionUncheckedCreateInput>
    /**
     * In case the Subscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriptionUpdateInput, SubscriptionUncheckedUpdateInput>
  }

  /**
   * Subscription delete
   */
  export type SubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
    /**
     * Filter which Subscription to delete.
     */
    where: SubscriptionWhereUniqueInput
  }

  /**
   * Subscription deleteMany
   */
  export type SubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscriptions to delete
     */
    where?: SubscriptionWhereInput
    /**
     * Limit how many Subscriptions to delete.
     */
    limit?: number
  }

  /**
   * Subscription without action
   */
  export type SubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscription
     */
    select?: SubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subscription
     */
    omit?: SubscriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubscriptionInclude<ExtArgs> | null
  }


  /**
   * Model NoteSubmission
   */

  export type AggregateNoteSubmission = {
    _count: NoteSubmissionCountAggregateOutputType | null
    _min: NoteSubmissionMinAggregateOutputType | null
    _max: NoteSubmissionMaxAggregateOutputType | null
  }

  export type NoteSubmissionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    rawText: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NoteSubmissionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    rawText: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NoteSubmissionCountAggregateOutputType = {
    id: number
    userId: number
    rawText: number
    language: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NoteSubmissionMinAggregateInputType = {
    id?: true
    userId?: true
    rawText?: true
    language?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NoteSubmissionMaxAggregateInputType = {
    id?: true
    userId?: true
    rawText?: true
    language?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NoteSubmissionCountAggregateInputType = {
    id?: true
    userId?: true
    rawText?: true
    language?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NoteSubmissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NoteSubmission to aggregate.
     */
    where?: NoteSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NoteSubmissions to fetch.
     */
    orderBy?: NoteSubmissionOrderByWithRelationInput | NoteSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoteSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NoteSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NoteSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NoteSubmissions
    **/
    _count?: true | NoteSubmissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoteSubmissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoteSubmissionMaxAggregateInputType
  }

  export type GetNoteSubmissionAggregateType<T extends NoteSubmissionAggregateArgs> = {
        [P in keyof T & keyof AggregateNoteSubmission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNoteSubmission[P]>
      : GetScalarType<T[P], AggregateNoteSubmission[P]>
  }




  export type NoteSubmissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoteSubmissionWhereInput
    orderBy?: NoteSubmissionOrderByWithAggregationInput | NoteSubmissionOrderByWithAggregationInput[]
    by: NoteSubmissionScalarFieldEnum[] | NoteSubmissionScalarFieldEnum
    having?: NoteSubmissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoteSubmissionCountAggregateInputType | true
    _min?: NoteSubmissionMinAggregateInputType
    _max?: NoteSubmissionMaxAggregateInputType
  }

  export type NoteSubmissionGroupByOutputType = {
    id: string
    userId: string
    rawText: string
    language: string | null
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: NoteSubmissionCountAggregateOutputType | null
    _min: NoteSubmissionMinAggregateOutputType | null
    _max: NoteSubmissionMaxAggregateOutputType | null
  }

  type GetNoteSubmissionGroupByPayload<T extends NoteSubmissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoteSubmissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoteSubmissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoteSubmissionGroupByOutputType[P]>
            : GetScalarType<T[P], NoteSubmissionGroupByOutputType[P]>
        }
      >
    >


  export type NoteSubmissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    rawText?: boolean
    language?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pairs?: boolean | NoteSubmission$pairsArgs<ExtArgs>
    _count?: boolean | NoteSubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["noteSubmission"]>

  export type NoteSubmissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    rawText?: boolean
    language?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["noteSubmission"]>

  export type NoteSubmissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    rawText?: boolean
    language?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["noteSubmission"]>

  export type NoteSubmissionSelectScalar = {
    id?: boolean
    userId?: boolean
    rawText?: boolean
    language?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NoteSubmissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "rawText" | "language" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["noteSubmission"]>
  export type NoteSubmissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pairs?: boolean | NoteSubmission$pairsArgs<ExtArgs>
    _count?: boolean | NoteSubmissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NoteSubmissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NoteSubmissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NoteSubmissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NoteSubmission"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      pairs: Prisma.$PairPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      rawText: string
      language: string | null
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["noteSubmission"]>
    composites: {}
  }

  type NoteSubmissionGetPayload<S extends boolean | null | undefined | NoteSubmissionDefaultArgs> = $Result.GetResult<Prisma.$NoteSubmissionPayload, S>

  type NoteSubmissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NoteSubmissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NoteSubmissionCountAggregateInputType | true
    }

  export interface NoteSubmissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NoteSubmission'], meta: { name: 'NoteSubmission' } }
    /**
     * Find zero or one NoteSubmission that matches the filter.
     * @param {NoteSubmissionFindUniqueArgs} args - Arguments to find a NoteSubmission
     * @example
     * // Get one NoteSubmission
     * const noteSubmission = await prisma.noteSubmission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoteSubmissionFindUniqueArgs>(args: SelectSubset<T, NoteSubmissionFindUniqueArgs<ExtArgs>>): Prisma__NoteSubmissionClient<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NoteSubmission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NoteSubmissionFindUniqueOrThrowArgs} args - Arguments to find a NoteSubmission
     * @example
     * // Get one NoteSubmission
     * const noteSubmission = await prisma.noteSubmission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoteSubmissionFindUniqueOrThrowArgs>(args: SelectSubset<T, NoteSubmissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoteSubmissionClient<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NoteSubmission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteSubmissionFindFirstArgs} args - Arguments to find a NoteSubmission
     * @example
     * // Get one NoteSubmission
     * const noteSubmission = await prisma.noteSubmission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoteSubmissionFindFirstArgs>(args?: SelectSubset<T, NoteSubmissionFindFirstArgs<ExtArgs>>): Prisma__NoteSubmissionClient<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NoteSubmission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteSubmissionFindFirstOrThrowArgs} args - Arguments to find a NoteSubmission
     * @example
     * // Get one NoteSubmission
     * const noteSubmission = await prisma.noteSubmission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoteSubmissionFindFirstOrThrowArgs>(args?: SelectSubset<T, NoteSubmissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoteSubmissionClient<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NoteSubmissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteSubmissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NoteSubmissions
     * const noteSubmissions = await prisma.noteSubmission.findMany()
     * 
     * // Get first 10 NoteSubmissions
     * const noteSubmissions = await prisma.noteSubmission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noteSubmissionWithIdOnly = await prisma.noteSubmission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoteSubmissionFindManyArgs>(args?: SelectSubset<T, NoteSubmissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NoteSubmission.
     * @param {NoteSubmissionCreateArgs} args - Arguments to create a NoteSubmission.
     * @example
     * // Create one NoteSubmission
     * const NoteSubmission = await prisma.noteSubmission.create({
     *   data: {
     *     // ... data to create a NoteSubmission
     *   }
     * })
     * 
     */
    create<T extends NoteSubmissionCreateArgs>(args: SelectSubset<T, NoteSubmissionCreateArgs<ExtArgs>>): Prisma__NoteSubmissionClient<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NoteSubmissions.
     * @param {NoteSubmissionCreateManyArgs} args - Arguments to create many NoteSubmissions.
     * @example
     * // Create many NoteSubmissions
     * const noteSubmission = await prisma.noteSubmission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoteSubmissionCreateManyArgs>(args?: SelectSubset<T, NoteSubmissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NoteSubmissions and returns the data saved in the database.
     * @param {NoteSubmissionCreateManyAndReturnArgs} args - Arguments to create many NoteSubmissions.
     * @example
     * // Create many NoteSubmissions
     * const noteSubmission = await prisma.noteSubmission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NoteSubmissions and only return the `id`
     * const noteSubmissionWithIdOnly = await prisma.noteSubmission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NoteSubmissionCreateManyAndReturnArgs>(args?: SelectSubset<T, NoteSubmissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NoteSubmission.
     * @param {NoteSubmissionDeleteArgs} args - Arguments to delete one NoteSubmission.
     * @example
     * // Delete one NoteSubmission
     * const NoteSubmission = await prisma.noteSubmission.delete({
     *   where: {
     *     // ... filter to delete one NoteSubmission
     *   }
     * })
     * 
     */
    delete<T extends NoteSubmissionDeleteArgs>(args: SelectSubset<T, NoteSubmissionDeleteArgs<ExtArgs>>): Prisma__NoteSubmissionClient<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NoteSubmission.
     * @param {NoteSubmissionUpdateArgs} args - Arguments to update one NoteSubmission.
     * @example
     * // Update one NoteSubmission
     * const noteSubmission = await prisma.noteSubmission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoteSubmissionUpdateArgs>(args: SelectSubset<T, NoteSubmissionUpdateArgs<ExtArgs>>): Prisma__NoteSubmissionClient<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NoteSubmissions.
     * @param {NoteSubmissionDeleteManyArgs} args - Arguments to filter NoteSubmissions to delete.
     * @example
     * // Delete a few NoteSubmissions
     * const { count } = await prisma.noteSubmission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoteSubmissionDeleteManyArgs>(args?: SelectSubset<T, NoteSubmissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NoteSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteSubmissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NoteSubmissions
     * const noteSubmission = await prisma.noteSubmission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoteSubmissionUpdateManyArgs>(args: SelectSubset<T, NoteSubmissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NoteSubmissions and returns the data updated in the database.
     * @param {NoteSubmissionUpdateManyAndReturnArgs} args - Arguments to update many NoteSubmissions.
     * @example
     * // Update many NoteSubmissions
     * const noteSubmission = await prisma.noteSubmission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NoteSubmissions and only return the `id`
     * const noteSubmissionWithIdOnly = await prisma.noteSubmission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NoteSubmissionUpdateManyAndReturnArgs>(args: SelectSubset<T, NoteSubmissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NoteSubmission.
     * @param {NoteSubmissionUpsertArgs} args - Arguments to update or create a NoteSubmission.
     * @example
     * // Update or create a NoteSubmission
     * const noteSubmission = await prisma.noteSubmission.upsert({
     *   create: {
     *     // ... data to create a NoteSubmission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NoteSubmission we want to update
     *   }
     * })
     */
    upsert<T extends NoteSubmissionUpsertArgs>(args: SelectSubset<T, NoteSubmissionUpsertArgs<ExtArgs>>): Prisma__NoteSubmissionClient<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NoteSubmissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteSubmissionCountArgs} args - Arguments to filter NoteSubmissions to count.
     * @example
     * // Count the number of NoteSubmissions
     * const count = await prisma.noteSubmission.count({
     *   where: {
     *     // ... the filter for the NoteSubmissions we want to count
     *   }
     * })
    **/
    count<T extends NoteSubmissionCountArgs>(
      args?: Subset<T, NoteSubmissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoteSubmissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NoteSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteSubmissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NoteSubmissionAggregateArgs>(args: Subset<T, NoteSubmissionAggregateArgs>): Prisma.PrismaPromise<GetNoteSubmissionAggregateType<T>>

    /**
     * Group by NoteSubmission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoteSubmissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NoteSubmissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoteSubmissionGroupByArgs['orderBy'] }
        : { orderBy?: NoteSubmissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NoteSubmissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoteSubmissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NoteSubmission model
   */
  readonly fields: NoteSubmissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NoteSubmission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoteSubmissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pairs<T extends NoteSubmission$pairsArgs<ExtArgs> = {}>(args?: Subset<T, NoteSubmission$pairsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NoteSubmission model
   */
  interface NoteSubmissionFieldRefs {
    readonly id: FieldRef<"NoteSubmission", 'String'>
    readonly userId: FieldRef<"NoteSubmission", 'String'>
    readonly rawText: FieldRef<"NoteSubmission", 'String'>
    readonly language: FieldRef<"NoteSubmission", 'String'>
    readonly metadata: FieldRef<"NoteSubmission", 'Json'>
    readonly createdAt: FieldRef<"NoteSubmission", 'DateTime'>
    readonly updatedAt: FieldRef<"NoteSubmission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NoteSubmission findUnique
   */
  export type NoteSubmissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which NoteSubmission to fetch.
     */
    where: NoteSubmissionWhereUniqueInput
  }

  /**
   * NoteSubmission findUniqueOrThrow
   */
  export type NoteSubmissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which NoteSubmission to fetch.
     */
    where: NoteSubmissionWhereUniqueInput
  }

  /**
   * NoteSubmission findFirst
   */
  export type NoteSubmissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which NoteSubmission to fetch.
     */
    where?: NoteSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NoteSubmissions to fetch.
     */
    orderBy?: NoteSubmissionOrderByWithRelationInput | NoteSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NoteSubmissions.
     */
    cursor?: NoteSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NoteSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NoteSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NoteSubmissions.
     */
    distinct?: NoteSubmissionScalarFieldEnum | NoteSubmissionScalarFieldEnum[]
  }

  /**
   * NoteSubmission findFirstOrThrow
   */
  export type NoteSubmissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which NoteSubmission to fetch.
     */
    where?: NoteSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NoteSubmissions to fetch.
     */
    orderBy?: NoteSubmissionOrderByWithRelationInput | NoteSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NoteSubmissions.
     */
    cursor?: NoteSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NoteSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NoteSubmissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NoteSubmissions.
     */
    distinct?: NoteSubmissionScalarFieldEnum | NoteSubmissionScalarFieldEnum[]
  }

  /**
   * NoteSubmission findMany
   */
  export type NoteSubmissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionInclude<ExtArgs> | null
    /**
     * Filter, which NoteSubmissions to fetch.
     */
    where?: NoteSubmissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NoteSubmissions to fetch.
     */
    orderBy?: NoteSubmissionOrderByWithRelationInput | NoteSubmissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NoteSubmissions.
     */
    cursor?: NoteSubmissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NoteSubmissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NoteSubmissions.
     */
    skip?: number
    distinct?: NoteSubmissionScalarFieldEnum | NoteSubmissionScalarFieldEnum[]
  }

  /**
   * NoteSubmission create
   */
  export type NoteSubmissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to create a NoteSubmission.
     */
    data: XOR<NoteSubmissionCreateInput, NoteSubmissionUncheckedCreateInput>
  }

  /**
   * NoteSubmission createMany
   */
  export type NoteSubmissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NoteSubmissions.
     */
    data: NoteSubmissionCreateManyInput | NoteSubmissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NoteSubmission createManyAndReturn
   */
  export type NoteSubmissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * The data used to create many NoteSubmissions.
     */
    data: NoteSubmissionCreateManyInput | NoteSubmissionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * NoteSubmission update
   */
  export type NoteSubmissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionInclude<ExtArgs> | null
    /**
     * The data needed to update a NoteSubmission.
     */
    data: XOR<NoteSubmissionUpdateInput, NoteSubmissionUncheckedUpdateInput>
    /**
     * Choose, which NoteSubmission to update.
     */
    where: NoteSubmissionWhereUniqueInput
  }

  /**
   * NoteSubmission updateMany
   */
  export type NoteSubmissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NoteSubmissions.
     */
    data: XOR<NoteSubmissionUpdateManyMutationInput, NoteSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which NoteSubmissions to update
     */
    where?: NoteSubmissionWhereInput
    /**
     * Limit how many NoteSubmissions to update.
     */
    limit?: number
  }

  /**
   * NoteSubmission updateManyAndReturn
   */
  export type NoteSubmissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * The data used to update NoteSubmissions.
     */
    data: XOR<NoteSubmissionUpdateManyMutationInput, NoteSubmissionUncheckedUpdateManyInput>
    /**
     * Filter which NoteSubmissions to update
     */
    where?: NoteSubmissionWhereInput
    /**
     * Limit how many NoteSubmissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * NoteSubmission upsert
   */
  export type NoteSubmissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionInclude<ExtArgs> | null
    /**
     * The filter to search for the NoteSubmission to update in case it exists.
     */
    where: NoteSubmissionWhereUniqueInput
    /**
     * In case the NoteSubmission found by the `where` argument doesn't exist, create a new NoteSubmission with this data.
     */
    create: XOR<NoteSubmissionCreateInput, NoteSubmissionUncheckedCreateInput>
    /**
     * In case the NoteSubmission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoteSubmissionUpdateInput, NoteSubmissionUncheckedUpdateInput>
  }

  /**
   * NoteSubmission delete
   */
  export type NoteSubmissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionInclude<ExtArgs> | null
    /**
     * Filter which NoteSubmission to delete.
     */
    where: NoteSubmissionWhereUniqueInput
  }

  /**
   * NoteSubmission deleteMany
   */
  export type NoteSubmissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NoteSubmissions to delete
     */
    where?: NoteSubmissionWhereInput
    /**
     * Limit how many NoteSubmissions to delete.
     */
    limit?: number
  }

  /**
   * NoteSubmission.pairs
   */
  export type NoteSubmission$pairsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    where?: PairWhereInput
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    cursor?: PairWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * NoteSubmission without action
   */
  export type NoteSubmissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NoteSubmission
     */
    select?: NoteSubmissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NoteSubmission
     */
    omit?: NoteSubmissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoteSubmissionInclude<ExtArgs> | null
  }


  /**
   * Model Pair
   */

  export type AggregatePair = {
    _count: PairCountAggregateOutputType | null
    _avg: PairAvgAggregateOutputType | null
    _sum: PairSumAggregateOutputType | null
    _min: PairMinAggregateOutputType | null
    _max: PairMaxAggregateOutputType | null
  }

  export type PairAvgAggregateOutputType = {
    order: number | null
  }

  export type PairSumAggregateOutputType = {
    order: number | null
  }

  export type PairMinAggregateOutputType = {
    id: string | null
    userId: string | null
    submissionId: string | null
    term: string | null
    definition: string | null
    question: string | null
    answer: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PairMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    submissionId: string | null
    term: string | null
    definition: string | null
    question: string | null
    answer: string | null
    order: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PairCountAggregateOutputType = {
    id: number
    userId: number
    submissionId: number
    term: number
    definition: number
    question: number
    answer: number
    order: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PairAvgAggregateInputType = {
    order?: true
  }

  export type PairSumAggregateInputType = {
    order?: true
  }

  export type PairMinAggregateInputType = {
    id?: true
    userId?: true
    submissionId?: true
    term?: true
    definition?: true
    question?: true
    answer?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PairMaxAggregateInputType = {
    id?: true
    userId?: true
    submissionId?: true
    term?: true
    definition?: true
    question?: true
    answer?: true
    order?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PairCountAggregateInputType = {
    id?: true
    userId?: true
    submissionId?: true
    term?: true
    definition?: true
    question?: true
    answer?: true
    order?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PairAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pair to aggregate.
     */
    where?: PairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairs to fetch.
     */
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pairs
    **/
    _count?: true | PairCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PairAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PairSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PairMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PairMaxAggregateInputType
  }

  export type GetPairAggregateType<T extends PairAggregateArgs> = {
        [P in keyof T & keyof AggregatePair]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePair[P]>
      : GetScalarType<T[P], AggregatePair[P]>
  }




  export type PairGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PairWhereInput
    orderBy?: PairOrderByWithAggregationInput | PairOrderByWithAggregationInput[]
    by: PairScalarFieldEnum[] | PairScalarFieldEnum
    having?: PairScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PairCountAggregateInputType | true
    _avg?: PairAvgAggregateInputType
    _sum?: PairSumAggregateInputType
    _min?: PairMinAggregateInputType
    _max?: PairMaxAggregateInputType
  }

  export type PairGroupByOutputType = {
    id: string
    userId: string
    submissionId: string
    term: string
    definition: string
    question: string
    answer: string
    order: number
    createdAt: Date
    updatedAt: Date
    _count: PairCountAggregateOutputType | null
    _avg: PairAvgAggregateOutputType | null
    _sum: PairSumAggregateOutputType | null
    _min: PairMinAggregateOutputType | null
    _max: PairMaxAggregateOutputType | null
  }

  type GetPairGroupByPayload<T extends PairGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PairGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PairGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PairGroupByOutputType[P]>
            : GetScalarType<T[P], PairGroupByOutputType[P]>
        }
      >
    >


  export type PairSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    submissionId?: boolean
    term?: boolean
    definition?: boolean
    question?: boolean
    answer?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    submission?: boolean | NoteSubmissionDefaultArgs<ExtArgs>
    studyStats?: boolean | Pair$studyStatsArgs<ExtArgs>
    _count?: boolean | PairCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pair"]>

  export type PairSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    submissionId?: boolean
    term?: boolean
    definition?: boolean
    question?: boolean
    answer?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    submission?: boolean | NoteSubmissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pair"]>

  export type PairSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    submissionId?: boolean
    term?: boolean
    definition?: boolean
    question?: boolean
    answer?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    submission?: boolean | NoteSubmissionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pair"]>

  export type PairSelectScalar = {
    id?: boolean
    userId?: boolean
    submissionId?: boolean
    term?: boolean
    definition?: boolean
    question?: boolean
    answer?: boolean
    order?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PairOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "submissionId" | "term" | "definition" | "question" | "answer" | "order" | "createdAt" | "updatedAt", ExtArgs["result"]["pair"]>
  export type PairInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    submission?: boolean | NoteSubmissionDefaultArgs<ExtArgs>
    studyStats?: boolean | Pair$studyStatsArgs<ExtArgs>
    _count?: boolean | PairCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PairIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    submission?: boolean | NoteSubmissionDefaultArgs<ExtArgs>
  }
  export type PairIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    submission?: boolean | NoteSubmissionDefaultArgs<ExtArgs>
  }

  export type $PairPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pair"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      submission: Prisma.$NoteSubmissionPayload<ExtArgs>
      studyStats: Prisma.$StudyStatPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      submissionId: string
      term: string
      definition: string
      question: string
      answer: string
      order: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pair"]>
    composites: {}
  }

  type PairGetPayload<S extends boolean | null | undefined | PairDefaultArgs> = $Result.GetResult<Prisma.$PairPayload, S>

  type PairCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PairFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PairCountAggregateInputType | true
    }

  export interface PairDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pair'], meta: { name: 'Pair' } }
    /**
     * Find zero or one Pair that matches the filter.
     * @param {PairFindUniqueArgs} args - Arguments to find a Pair
     * @example
     * // Get one Pair
     * const pair = await prisma.pair.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PairFindUniqueArgs>(args: SelectSubset<T, PairFindUniqueArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pair that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PairFindUniqueOrThrowArgs} args - Arguments to find a Pair
     * @example
     * // Get one Pair
     * const pair = await prisma.pair.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PairFindUniqueOrThrowArgs>(args: SelectSubset<T, PairFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pair that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairFindFirstArgs} args - Arguments to find a Pair
     * @example
     * // Get one Pair
     * const pair = await prisma.pair.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PairFindFirstArgs>(args?: SelectSubset<T, PairFindFirstArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pair that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairFindFirstOrThrowArgs} args - Arguments to find a Pair
     * @example
     * // Get one Pair
     * const pair = await prisma.pair.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PairFindFirstOrThrowArgs>(args?: SelectSubset<T, PairFindFirstOrThrowArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pairs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pairs
     * const pairs = await prisma.pair.findMany()
     * 
     * // Get first 10 Pairs
     * const pairs = await prisma.pair.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pairWithIdOnly = await prisma.pair.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PairFindManyArgs>(args?: SelectSubset<T, PairFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pair.
     * @param {PairCreateArgs} args - Arguments to create a Pair.
     * @example
     * // Create one Pair
     * const Pair = await prisma.pair.create({
     *   data: {
     *     // ... data to create a Pair
     *   }
     * })
     * 
     */
    create<T extends PairCreateArgs>(args: SelectSubset<T, PairCreateArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pairs.
     * @param {PairCreateManyArgs} args - Arguments to create many Pairs.
     * @example
     * // Create many Pairs
     * const pair = await prisma.pair.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PairCreateManyArgs>(args?: SelectSubset<T, PairCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pairs and returns the data saved in the database.
     * @param {PairCreateManyAndReturnArgs} args - Arguments to create many Pairs.
     * @example
     * // Create many Pairs
     * const pair = await prisma.pair.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pairs and only return the `id`
     * const pairWithIdOnly = await prisma.pair.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PairCreateManyAndReturnArgs>(args?: SelectSubset<T, PairCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pair.
     * @param {PairDeleteArgs} args - Arguments to delete one Pair.
     * @example
     * // Delete one Pair
     * const Pair = await prisma.pair.delete({
     *   where: {
     *     // ... filter to delete one Pair
     *   }
     * })
     * 
     */
    delete<T extends PairDeleteArgs>(args: SelectSubset<T, PairDeleteArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pair.
     * @param {PairUpdateArgs} args - Arguments to update one Pair.
     * @example
     * // Update one Pair
     * const pair = await prisma.pair.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PairUpdateArgs>(args: SelectSubset<T, PairUpdateArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pairs.
     * @param {PairDeleteManyArgs} args - Arguments to filter Pairs to delete.
     * @example
     * // Delete a few Pairs
     * const { count } = await prisma.pair.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PairDeleteManyArgs>(args?: SelectSubset<T, PairDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pairs
     * const pair = await prisma.pair.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PairUpdateManyArgs>(args: SelectSubset<T, PairUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pairs and returns the data updated in the database.
     * @param {PairUpdateManyAndReturnArgs} args - Arguments to update many Pairs.
     * @example
     * // Update many Pairs
     * const pair = await prisma.pair.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pairs and only return the `id`
     * const pairWithIdOnly = await prisma.pair.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PairUpdateManyAndReturnArgs>(args: SelectSubset<T, PairUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pair.
     * @param {PairUpsertArgs} args - Arguments to update or create a Pair.
     * @example
     * // Update or create a Pair
     * const pair = await prisma.pair.upsert({
     *   create: {
     *     // ... data to create a Pair
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pair we want to update
     *   }
     * })
     */
    upsert<T extends PairUpsertArgs>(args: SelectSubset<T, PairUpsertArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pairs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairCountArgs} args - Arguments to filter Pairs to count.
     * @example
     * // Count the number of Pairs
     * const count = await prisma.pair.count({
     *   where: {
     *     // ... the filter for the Pairs we want to count
     *   }
     * })
    **/
    count<T extends PairCountArgs>(
      args?: Subset<T, PairCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PairCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PairAggregateArgs>(args: Subset<T, PairAggregateArgs>): Prisma.PrismaPromise<GetPairAggregateType<T>>

    /**
     * Group by Pair.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PairGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PairGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PairGroupByArgs['orderBy'] }
        : { orderBy?: PairGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PairGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPairGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pair model
   */
  readonly fields: PairFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pair.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PairClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    submission<T extends NoteSubmissionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NoteSubmissionDefaultArgs<ExtArgs>>): Prisma__NoteSubmissionClient<$Result.GetResult<Prisma.$NoteSubmissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    studyStats<T extends Pair$studyStatsArgs<ExtArgs> = {}>(args?: Subset<T, Pair$studyStatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Pair model
   */
  interface PairFieldRefs {
    readonly id: FieldRef<"Pair", 'String'>
    readonly userId: FieldRef<"Pair", 'String'>
    readonly submissionId: FieldRef<"Pair", 'String'>
    readonly term: FieldRef<"Pair", 'String'>
    readonly definition: FieldRef<"Pair", 'String'>
    readonly question: FieldRef<"Pair", 'String'>
    readonly answer: FieldRef<"Pair", 'String'>
    readonly order: FieldRef<"Pair", 'Int'>
    readonly createdAt: FieldRef<"Pair", 'DateTime'>
    readonly updatedAt: FieldRef<"Pair", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Pair findUnique
   */
  export type PairFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pair to fetch.
     */
    where: PairWhereUniqueInput
  }

  /**
   * Pair findUniqueOrThrow
   */
  export type PairFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pair to fetch.
     */
    where: PairWhereUniqueInput
  }

  /**
   * Pair findFirst
   */
  export type PairFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pair to fetch.
     */
    where?: PairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairs to fetch.
     */
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pairs.
     */
    cursor?: PairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pairs.
     */
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * Pair findFirstOrThrow
   */
  export type PairFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pair to fetch.
     */
    where?: PairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairs to fetch.
     */
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pairs.
     */
    cursor?: PairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pairs.
     */
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * Pair findMany
   */
  export type PairFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter, which Pairs to fetch.
     */
    where?: PairWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pairs to fetch.
     */
    orderBy?: PairOrderByWithRelationInput | PairOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pairs.
     */
    cursor?: PairWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pairs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pairs.
     */
    skip?: number
    distinct?: PairScalarFieldEnum | PairScalarFieldEnum[]
  }

  /**
   * Pair create
   */
  export type PairCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * The data needed to create a Pair.
     */
    data: XOR<PairCreateInput, PairUncheckedCreateInput>
  }

  /**
   * Pair createMany
   */
  export type PairCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pairs.
     */
    data: PairCreateManyInput | PairCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pair createManyAndReturn
   */
  export type PairCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * The data used to create many Pairs.
     */
    data: PairCreateManyInput | PairCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pair update
   */
  export type PairUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * The data needed to update a Pair.
     */
    data: XOR<PairUpdateInput, PairUncheckedUpdateInput>
    /**
     * Choose, which Pair to update.
     */
    where: PairWhereUniqueInput
  }

  /**
   * Pair updateMany
   */
  export type PairUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pairs.
     */
    data: XOR<PairUpdateManyMutationInput, PairUncheckedUpdateManyInput>
    /**
     * Filter which Pairs to update
     */
    where?: PairWhereInput
    /**
     * Limit how many Pairs to update.
     */
    limit?: number
  }

  /**
   * Pair updateManyAndReturn
   */
  export type PairUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * The data used to update Pairs.
     */
    data: XOR<PairUpdateManyMutationInput, PairUncheckedUpdateManyInput>
    /**
     * Filter which Pairs to update
     */
    where?: PairWhereInput
    /**
     * Limit how many Pairs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pair upsert
   */
  export type PairUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * The filter to search for the Pair to update in case it exists.
     */
    where: PairWhereUniqueInput
    /**
     * In case the Pair found by the `where` argument doesn't exist, create a new Pair with this data.
     */
    create: XOR<PairCreateInput, PairUncheckedCreateInput>
    /**
     * In case the Pair was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PairUpdateInput, PairUncheckedUpdateInput>
  }

  /**
   * Pair delete
   */
  export type PairDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
    /**
     * Filter which Pair to delete.
     */
    where: PairWhereUniqueInput
  }

  /**
   * Pair deleteMany
   */
  export type PairDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pairs to delete
     */
    where?: PairWhereInput
    /**
     * Limit how many Pairs to delete.
     */
    limit?: number
  }

  /**
   * Pair.studyStats
   */
  export type Pair$studyStatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatInclude<ExtArgs> | null
    where?: StudyStatWhereInput
    orderBy?: StudyStatOrderByWithRelationInput | StudyStatOrderByWithRelationInput[]
    cursor?: StudyStatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudyStatScalarFieldEnum | StudyStatScalarFieldEnum[]
  }

  /**
   * Pair without action
   */
  export type PairDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pair
     */
    select?: PairSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pair
     */
    omit?: PairOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PairInclude<ExtArgs> | null
  }


  /**
   * Model StudyStat
   */

  export type AggregateStudyStat = {
    _count: StudyStatCountAggregateOutputType | null
    _avg: StudyStatAvgAggregateOutputType | null
    _sum: StudyStatSumAggregateOutputType | null
    _min: StudyStatMinAggregateOutputType | null
    _max: StudyStatMaxAggregateOutputType | null
  }

  export type StudyStatAvgAggregateOutputType = {
    correctCount: number | null
    incorrectCount: number | null
    confidence: number | null
  }

  export type StudyStatSumAggregateOutputType = {
    correctCount: number | null
    incorrectCount: number | null
    confidence: number | null
  }

  export type StudyStatMinAggregateOutputType = {
    id: string | null
    userId: string | null
    pairId: string | null
    correctCount: number | null
    incorrectCount: number | null
    lastReviewed: Date | null
    confidence: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudyStatMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    pairId: string | null
    correctCount: number | null
    incorrectCount: number | null
    lastReviewed: Date | null
    confidence: number | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudyStatCountAggregateOutputType = {
    id: number
    userId: number
    pairId: number
    correctCount: number
    incorrectCount: number
    lastReviewed: number
    confidence: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudyStatAvgAggregateInputType = {
    correctCount?: true
    incorrectCount?: true
    confidence?: true
  }

  export type StudyStatSumAggregateInputType = {
    correctCount?: true
    incorrectCount?: true
    confidence?: true
  }

  export type StudyStatMinAggregateInputType = {
    id?: true
    userId?: true
    pairId?: true
    correctCount?: true
    incorrectCount?: true
    lastReviewed?: true
    confidence?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudyStatMaxAggregateInputType = {
    id?: true
    userId?: true
    pairId?: true
    correctCount?: true
    incorrectCount?: true
    lastReviewed?: true
    confidence?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudyStatCountAggregateInputType = {
    id?: true
    userId?: true
    pairId?: true
    correctCount?: true
    incorrectCount?: true
    lastReviewed?: true
    confidence?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudyStatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudyStat to aggregate.
     */
    where?: StudyStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudyStats to fetch.
     */
    orderBy?: StudyStatOrderByWithRelationInput | StudyStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudyStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudyStats
    **/
    _count?: true | StudyStatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudyStatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudyStatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudyStatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudyStatMaxAggregateInputType
  }

  export type GetStudyStatAggregateType<T extends StudyStatAggregateArgs> = {
        [P in keyof T & keyof AggregateStudyStat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudyStat[P]>
      : GetScalarType<T[P], AggregateStudyStat[P]>
  }




  export type StudyStatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudyStatWhereInput
    orderBy?: StudyStatOrderByWithAggregationInput | StudyStatOrderByWithAggregationInput[]
    by: StudyStatScalarFieldEnum[] | StudyStatScalarFieldEnum
    having?: StudyStatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudyStatCountAggregateInputType | true
    _avg?: StudyStatAvgAggregateInputType
    _sum?: StudyStatSumAggregateInputType
    _min?: StudyStatMinAggregateInputType
    _max?: StudyStatMaxAggregateInputType
  }

  export type StudyStatGroupByOutputType = {
    id: string
    userId: string
    pairId: string
    correctCount: number
    incorrectCount: number
    lastReviewed: Date | null
    confidence: number | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: StudyStatCountAggregateOutputType | null
    _avg: StudyStatAvgAggregateOutputType | null
    _sum: StudyStatSumAggregateOutputType | null
    _min: StudyStatMinAggregateOutputType | null
    _max: StudyStatMaxAggregateOutputType | null
  }

  type GetStudyStatGroupByPayload<T extends StudyStatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudyStatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudyStatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudyStatGroupByOutputType[P]>
            : GetScalarType<T[P], StudyStatGroupByOutputType[P]>
        }
      >
    >


  export type StudyStatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    pairId?: boolean
    correctCount?: boolean
    incorrectCount?: boolean
    lastReviewed?: boolean
    confidence?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pair?: boolean | PairDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studyStat"]>

  export type StudyStatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    pairId?: boolean
    correctCount?: boolean
    incorrectCount?: boolean
    lastReviewed?: boolean
    confidence?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pair?: boolean | PairDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studyStat"]>

  export type StudyStatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    pairId?: boolean
    correctCount?: boolean
    incorrectCount?: boolean
    lastReviewed?: boolean
    confidence?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    pair?: boolean | PairDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studyStat"]>

  export type StudyStatSelectScalar = {
    id?: boolean
    userId?: boolean
    pairId?: boolean
    correctCount?: boolean
    incorrectCount?: boolean
    lastReviewed?: boolean
    confidence?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudyStatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "pairId" | "correctCount" | "incorrectCount" | "lastReviewed" | "confidence" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["studyStat"]>
  export type StudyStatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pair?: boolean | PairDefaultArgs<ExtArgs>
  }
  export type StudyStatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pair?: boolean | PairDefaultArgs<ExtArgs>
  }
  export type StudyStatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    pair?: boolean | PairDefaultArgs<ExtArgs>
  }

  export type $StudyStatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudyStat"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      pair: Prisma.$PairPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      pairId: string
      correctCount: number
      incorrectCount: number
      lastReviewed: Date | null
      confidence: number | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["studyStat"]>
    composites: {}
  }

  type StudyStatGetPayload<S extends boolean | null | undefined | StudyStatDefaultArgs> = $Result.GetResult<Prisma.$StudyStatPayload, S>

  type StudyStatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudyStatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudyStatCountAggregateInputType | true
    }

  export interface StudyStatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudyStat'], meta: { name: 'StudyStat' } }
    /**
     * Find zero or one StudyStat that matches the filter.
     * @param {StudyStatFindUniqueArgs} args - Arguments to find a StudyStat
     * @example
     * // Get one StudyStat
     * const studyStat = await prisma.studyStat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudyStatFindUniqueArgs>(args: SelectSubset<T, StudyStatFindUniqueArgs<ExtArgs>>): Prisma__StudyStatClient<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StudyStat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudyStatFindUniqueOrThrowArgs} args - Arguments to find a StudyStat
     * @example
     * // Get one StudyStat
     * const studyStat = await prisma.studyStat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudyStatFindUniqueOrThrowArgs>(args: SelectSubset<T, StudyStatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudyStatClient<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudyStat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyStatFindFirstArgs} args - Arguments to find a StudyStat
     * @example
     * // Get one StudyStat
     * const studyStat = await prisma.studyStat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudyStatFindFirstArgs>(args?: SelectSubset<T, StudyStatFindFirstArgs<ExtArgs>>): Prisma__StudyStatClient<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StudyStat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyStatFindFirstOrThrowArgs} args - Arguments to find a StudyStat
     * @example
     * // Get one StudyStat
     * const studyStat = await prisma.studyStat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudyStatFindFirstOrThrowArgs>(args?: SelectSubset<T, StudyStatFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudyStatClient<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StudyStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyStatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudyStats
     * const studyStats = await prisma.studyStat.findMany()
     * 
     * // Get first 10 StudyStats
     * const studyStats = await prisma.studyStat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studyStatWithIdOnly = await prisma.studyStat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudyStatFindManyArgs>(args?: SelectSubset<T, StudyStatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StudyStat.
     * @param {StudyStatCreateArgs} args - Arguments to create a StudyStat.
     * @example
     * // Create one StudyStat
     * const StudyStat = await prisma.studyStat.create({
     *   data: {
     *     // ... data to create a StudyStat
     *   }
     * })
     * 
     */
    create<T extends StudyStatCreateArgs>(args: SelectSubset<T, StudyStatCreateArgs<ExtArgs>>): Prisma__StudyStatClient<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StudyStats.
     * @param {StudyStatCreateManyArgs} args - Arguments to create many StudyStats.
     * @example
     * // Create many StudyStats
     * const studyStat = await prisma.studyStat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudyStatCreateManyArgs>(args?: SelectSubset<T, StudyStatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudyStats and returns the data saved in the database.
     * @param {StudyStatCreateManyAndReturnArgs} args - Arguments to create many StudyStats.
     * @example
     * // Create many StudyStats
     * const studyStat = await prisma.studyStat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudyStats and only return the `id`
     * const studyStatWithIdOnly = await prisma.studyStat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudyStatCreateManyAndReturnArgs>(args?: SelectSubset<T, StudyStatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StudyStat.
     * @param {StudyStatDeleteArgs} args - Arguments to delete one StudyStat.
     * @example
     * // Delete one StudyStat
     * const StudyStat = await prisma.studyStat.delete({
     *   where: {
     *     // ... filter to delete one StudyStat
     *   }
     * })
     * 
     */
    delete<T extends StudyStatDeleteArgs>(args: SelectSubset<T, StudyStatDeleteArgs<ExtArgs>>): Prisma__StudyStatClient<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StudyStat.
     * @param {StudyStatUpdateArgs} args - Arguments to update one StudyStat.
     * @example
     * // Update one StudyStat
     * const studyStat = await prisma.studyStat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudyStatUpdateArgs>(args: SelectSubset<T, StudyStatUpdateArgs<ExtArgs>>): Prisma__StudyStatClient<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StudyStats.
     * @param {StudyStatDeleteManyArgs} args - Arguments to filter StudyStats to delete.
     * @example
     * // Delete a few StudyStats
     * const { count } = await prisma.studyStat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudyStatDeleteManyArgs>(args?: SelectSubset<T, StudyStatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyStatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudyStats
     * const studyStat = await prisma.studyStat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudyStatUpdateManyArgs>(args: SelectSubset<T, StudyStatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudyStats and returns the data updated in the database.
     * @param {StudyStatUpdateManyAndReturnArgs} args - Arguments to update many StudyStats.
     * @example
     * // Update many StudyStats
     * const studyStat = await prisma.studyStat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StudyStats and only return the `id`
     * const studyStatWithIdOnly = await prisma.studyStat.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StudyStatUpdateManyAndReturnArgs>(args: SelectSubset<T, StudyStatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StudyStat.
     * @param {StudyStatUpsertArgs} args - Arguments to update or create a StudyStat.
     * @example
     * // Update or create a StudyStat
     * const studyStat = await prisma.studyStat.upsert({
     *   create: {
     *     // ... data to create a StudyStat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudyStat we want to update
     *   }
     * })
     */
    upsert<T extends StudyStatUpsertArgs>(args: SelectSubset<T, StudyStatUpsertArgs<ExtArgs>>): Prisma__StudyStatClient<$Result.GetResult<Prisma.$StudyStatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StudyStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyStatCountArgs} args - Arguments to filter StudyStats to count.
     * @example
     * // Count the number of StudyStats
     * const count = await prisma.studyStat.count({
     *   where: {
     *     // ... the filter for the StudyStats we want to count
     *   }
     * })
    **/
    count<T extends StudyStatCountArgs>(
      args?: Subset<T, StudyStatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudyStatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudyStat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyStatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudyStatAggregateArgs>(args: Subset<T, StudyStatAggregateArgs>): Prisma.PrismaPromise<GetStudyStatAggregateType<T>>

    /**
     * Group by StudyStat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudyStatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudyStatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudyStatGroupByArgs['orderBy'] }
        : { orderBy?: StudyStatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudyStatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudyStatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudyStat model
   */
  readonly fields: StudyStatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudyStat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudyStatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    pair<T extends PairDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PairDefaultArgs<ExtArgs>>): Prisma__PairClient<$Result.GetResult<Prisma.$PairPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudyStat model
   */
  interface StudyStatFieldRefs {
    readonly id: FieldRef<"StudyStat", 'String'>
    readonly userId: FieldRef<"StudyStat", 'String'>
    readonly pairId: FieldRef<"StudyStat", 'String'>
    readonly correctCount: FieldRef<"StudyStat", 'Int'>
    readonly incorrectCount: FieldRef<"StudyStat", 'Int'>
    readonly lastReviewed: FieldRef<"StudyStat", 'DateTime'>
    readonly confidence: FieldRef<"StudyStat", 'Int'>
    readonly status: FieldRef<"StudyStat", 'String'>
    readonly createdAt: FieldRef<"StudyStat", 'DateTime'>
    readonly updatedAt: FieldRef<"StudyStat", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StudyStat findUnique
   */
  export type StudyStatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatInclude<ExtArgs> | null
    /**
     * Filter, which StudyStat to fetch.
     */
    where: StudyStatWhereUniqueInput
  }

  /**
   * StudyStat findUniqueOrThrow
   */
  export type StudyStatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatInclude<ExtArgs> | null
    /**
     * Filter, which StudyStat to fetch.
     */
    where: StudyStatWhereUniqueInput
  }

  /**
   * StudyStat findFirst
   */
  export type StudyStatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatInclude<ExtArgs> | null
    /**
     * Filter, which StudyStat to fetch.
     */
    where?: StudyStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudyStats to fetch.
     */
    orderBy?: StudyStatOrderByWithRelationInput | StudyStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudyStats.
     */
    cursor?: StudyStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudyStats.
     */
    distinct?: StudyStatScalarFieldEnum | StudyStatScalarFieldEnum[]
  }

  /**
   * StudyStat findFirstOrThrow
   */
  export type StudyStatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatInclude<ExtArgs> | null
    /**
     * Filter, which StudyStat to fetch.
     */
    where?: StudyStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudyStats to fetch.
     */
    orderBy?: StudyStatOrderByWithRelationInput | StudyStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudyStats.
     */
    cursor?: StudyStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudyStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudyStats.
     */
    distinct?: StudyStatScalarFieldEnum | StudyStatScalarFieldEnum[]
  }

  /**
   * StudyStat findMany
   */
  export type StudyStatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatInclude<ExtArgs> | null
    /**
     * Filter, which StudyStats to fetch.
     */
    where?: StudyStatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudyStats to fetch.
     */
    orderBy?: StudyStatOrderByWithRelationInput | StudyStatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudyStats.
     */
    cursor?: StudyStatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudyStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudyStats.
     */
    skip?: number
    distinct?: StudyStatScalarFieldEnum | StudyStatScalarFieldEnum[]
  }

  /**
   * StudyStat create
   */
  export type StudyStatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatInclude<ExtArgs> | null
    /**
     * The data needed to create a StudyStat.
     */
    data: XOR<StudyStatCreateInput, StudyStatUncheckedCreateInput>
  }

  /**
   * StudyStat createMany
   */
  export type StudyStatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudyStats.
     */
    data: StudyStatCreateManyInput | StudyStatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudyStat createManyAndReturn
   */
  export type StudyStatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * The data used to create many StudyStats.
     */
    data: StudyStatCreateManyInput | StudyStatCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudyStat update
   */
  export type StudyStatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatInclude<ExtArgs> | null
    /**
     * The data needed to update a StudyStat.
     */
    data: XOR<StudyStatUpdateInput, StudyStatUncheckedUpdateInput>
    /**
     * Choose, which StudyStat to update.
     */
    where: StudyStatWhereUniqueInput
  }

  /**
   * StudyStat updateMany
   */
  export type StudyStatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudyStats.
     */
    data: XOR<StudyStatUpdateManyMutationInput, StudyStatUncheckedUpdateManyInput>
    /**
     * Filter which StudyStats to update
     */
    where?: StudyStatWhereInput
    /**
     * Limit how many StudyStats to update.
     */
    limit?: number
  }

  /**
   * StudyStat updateManyAndReturn
   */
  export type StudyStatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * The data used to update StudyStats.
     */
    data: XOR<StudyStatUpdateManyMutationInput, StudyStatUncheckedUpdateManyInput>
    /**
     * Filter which StudyStats to update
     */
    where?: StudyStatWhereInput
    /**
     * Limit how many StudyStats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudyStat upsert
   */
  export type StudyStatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatInclude<ExtArgs> | null
    /**
     * The filter to search for the StudyStat to update in case it exists.
     */
    where: StudyStatWhereUniqueInput
    /**
     * In case the StudyStat found by the `where` argument doesn't exist, create a new StudyStat with this data.
     */
    create: XOR<StudyStatCreateInput, StudyStatUncheckedCreateInput>
    /**
     * In case the StudyStat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudyStatUpdateInput, StudyStatUncheckedUpdateInput>
  }

  /**
   * StudyStat delete
   */
  export type StudyStatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatInclude<ExtArgs> | null
    /**
     * Filter which StudyStat to delete.
     */
    where: StudyStatWhereUniqueInput
  }

  /**
   * StudyStat deleteMany
   */
  export type StudyStatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudyStats to delete
     */
    where?: StudyStatWhereInput
    /**
     * Limit how many StudyStats to delete.
     */
    limit?: number
  }

  /**
   * StudyStat without action
   */
  export type StudyStatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudyStat
     */
    select?: StudyStatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StudyStat
     */
    omit?: StudyStatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudyStatInclude<ExtArgs> | null
  }


  /**
   * Model HumanizerRun
   */

  export type AggregateHumanizerRun = {
    _count: HumanizerRunCountAggregateOutputType | null
    _avg: HumanizerRunAvgAggregateOutputType | null
    _sum: HumanizerRunSumAggregateOutputType | null
    _min: HumanizerRunMinAggregateOutputType | null
    _max: HumanizerRunMaxAggregateOutputType | null
  }

  export type HumanizerRunAvgAggregateOutputType = {
    saplingScore: number | null
    iterations: number | null
    similarity: number | null
  }

  export type HumanizerRunSumAggregateOutputType = {
    saplingScore: number | null
    iterations: number | null
    similarity: number | null
  }

  export type HumanizerRunMinAggregateOutputType = {
    id: string | null
    userId: string | null
    inputText: string | null
    outputText: string | null
    saplingScore: number | null
    iterations: number | null
    similarity: number | null
    createdAt: Date | null
  }

  export type HumanizerRunMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    inputText: string | null
    outputText: string | null
    saplingScore: number | null
    iterations: number | null
    similarity: number | null
    createdAt: Date | null
  }

  export type HumanizerRunCountAggregateOutputType = {
    id: number
    userId: number
    inputText: number
    outputText: number
    saplingScore: number
    iterations: number
    similarity: number
    createdAt: number
    _all: number
  }


  export type HumanizerRunAvgAggregateInputType = {
    saplingScore?: true
    iterations?: true
    similarity?: true
  }

  export type HumanizerRunSumAggregateInputType = {
    saplingScore?: true
    iterations?: true
    similarity?: true
  }

  export type HumanizerRunMinAggregateInputType = {
    id?: true
    userId?: true
    inputText?: true
    outputText?: true
    saplingScore?: true
    iterations?: true
    similarity?: true
    createdAt?: true
  }

  export type HumanizerRunMaxAggregateInputType = {
    id?: true
    userId?: true
    inputText?: true
    outputText?: true
    saplingScore?: true
    iterations?: true
    similarity?: true
    createdAt?: true
  }

  export type HumanizerRunCountAggregateInputType = {
    id?: true
    userId?: true
    inputText?: true
    outputText?: true
    saplingScore?: true
    iterations?: true
    similarity?: true
    createdAt?: true
    _all?: true
  }

  export type HumanizerRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HumanizerRun to aggregate.
     */
    where?: HumanizerRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HumanizerRuns to fetch.
     */
    orderBy?: HumanizerRunOrderByWithRelationInput | HumanizerRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HumanizerRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HumanizerRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HumanizerRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HumanizerRuns
    **/
    _count?: true | HumanizerRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HumanizerRunAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HumanizerRunSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HumanizerRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HumanizerRunMaxAggregateInputType
  }

  export type GetHumanizerRunAggregateType<T extends HumanizerRunAggregateArgs> = {
        [P in keyof T & keyof AggregateHumanizerRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHumanizerRun[P]>
      : GetScalarType<T[P], AggregateHumanizerRun[P]>
  }




  export type HumanizerRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HumanizerRunWhereInput
    orderBy?: HumanizerRunOrderByWithAggregationInput | HumanizerRunOrderByWithAggregationInput[]
    by: HumanizerRunScalarFieldEnum[] | HumanizerRunScalarFieldEnum
    having?: HumanizerRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HumanizerRunCountAggregateInputType | true
    _avg?: HumanizerRunAvgAggregateInputType
    _sum?: HumanizerRunSumAggregateInputType
    _min?: HumanizerRunMinAggregateInputType
    _max?: HumanizerRunMaxAggregateInputType
  }

  export type HumanizerRunGroupByOutputType = {
    id: string
    userId: string
    inputText: string
    outputText: string
    saplingScore: number | null
    iterations: number
    similarity: number | null
    createdAt: Date
    _count: HumanizerRunCountAggregateOutputType | null
    _avg: HumanizerRunAvgAggregateOutputType | null
    _sum: HumanizerRunSumAggregateOutputType | null
    _min: HumanizerRunMinAggregateOutputType | null
    _max: HumanizerRunMaxAggregateOutputType | null
  }

  type GetHumanizerRunGroupByPayload<T extends HumanizerRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HumanizerRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HumanizerRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HumanizerRunGroupByOutputType[P]>
            : GetScalarType<T[P], HumanizerRunGroupByOutputType[P]>
        }
      >
    >


  export type HumanizerRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    inputText?: boolean
    outputText?: boolean
    saplingScore?: boolean
    iterations?: boolean
    similarity?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["humanizerRun"]>

  export type HumanizerRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    inputText?: boolean
    outputText?: boolean
    saplingScore?: boolean
    iterations?: boolean
    similarity?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["humanizerRun"]>

  export type HumanizerRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    inputText?: boolean
    outputText?: boolean
    saplingScore?: boolean
    iterations?: boolean
    similarity?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["humanizerRun"]>

  export type HumanizerRunSelectScalar = {
    id?: boolean
    userId?: boolean
    inputText?: boolean
    outputText?: boolean
    saplingScore?: boolean
    iterations?: boolean
    similarity?: boolean
    createdAt?: boolean
  }

  export type HumanizerRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "inputText" | "outputText" | "saplingScore" | "iterations" | "similarity" | "createdAt", ExtArgs["result"]["humanizerRun"]>
  export type HumanizerRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HumanizerRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HumanizerRunIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $HumanizerRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HumanizerRun"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      inputText: string
      outputText: string
      saplingScore: number | null
      iterations: number
      similarity: number | null
      createdAt: Date
    }, ExtArgs["result"]["humanizerRun"]>
    composites: {}
  }

  type HumanizerRunGetPayload<S extends boolean | null | undefined | HumanizerRunDefaultArgs> = $Result.GetResult<Prisma.$HumanizerRunPayload, S>

  type HumanizerRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HumanizerRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HumanizerRunCountAggregateInputType | true
    }

  export interface HumanizerRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HumanizerRun'], meta: { name: 'HumanizerRun' } }
    /**
     * Find zero or one HumanizerRun that matches the filter.
     * @param {HumanizerRunFindUniqueArgs} args - Arguments to find a HumanizerRun
     * @example
     * // Get one HumanizerRun
     * const humanizerRun = await prisma.humanizerRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HumanizerRunFindUniqueArgs>(args: SelectSubset<T, HumanizerRunFindUniqueArgs<ExtArgs>>): Prisma__HumanizerRunClient<$Result.GetResult<Prisma.$HumanizerRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HumanizerRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HumanizerRunFindUniqueOrThrowArgs} args - Arguments to find a HumanizerRun
     * @example
     * // Get one HumanizerRun
     * const humanizerRun = await prisma.humanizerRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HumanizerRunFindUniqueOrThrowArgs>(args: SelectSubset<T, HumanizerRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HumanizerRunClient<$Result.GetResult<Prisma.$HumanizerRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HumanizerRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HumanizerRunFindFirstArgs} args - Arguments to find a HumanizerRun
     * @example
     * // Get one HumanizerRun
     * const humanizerRun = await prisma.humanizerRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HumanizerRunFindFirstArgs>(args?: SelectSubset<T, HumanizerRunFindFirstArgs<ExtArgs>>): Prisma__HumanizerRunClient<$Result.GetResult<Prisma.$HumanizerRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HumanizerRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HumanizerRunFindFirstOrThrowArgs} args - Arguments to find a HumanizerRun
     * @example
     * // Get one HumanizerRun
     * const humanizerRun = await prisma.humanizerRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HumanizerRunFindFirstOrThrowArgs>(args?: SelectSubset<T, HumanizerRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__HumanizerRunClient<$Result.GetResult<Prisma.$HumanizerRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HumanizerRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HumanizerRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HumanizerRuns
     * const humanizerRuns = await prisma.humanizerRun.findMany()
     * 
     * // Get first 10 HumanizerRuns
     * const humanizerRuns = await prisma.humanizerRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const humanizerRunWithIdOnly = await prisma.humanizerRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HumanizerRunFindManyArgs>(args?: SelectSubset<T, HumanizerRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HumanizerRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HumanizerRun.
     * @param {HumanizerRunCreateArgs} args - Arguments to create a HumanizerRun.
     * @example
     * // Create one HumanizerRun
     * const HumanizerRun = await prisma.humanizerRun.create({
     *   data: {
     *     // ... data to create a HumanizerRun
     *   }
     * })
     * 
     */
    create<T extends HumanizerRunCreateArgs>(args: SelectSubset<T, HumanizerRunCreateArgs<ExtArgs>>): Prisma__HumanizerRunClient<$Result.GetResult<Prisma.$HumanizerRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HumanizerRuns.
     * @param {HumanizerRunCreateManyArgs} args - Arguments to create many HumanizerRuns.
     * @example
     * // Create many HumanizerRuns
     * const humanizerRun = await prisma.humanizerRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HumanizerRunCreateManyArgs>(args?: SelectSubset<T, HumanizerRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HumanizerRuns and returns the data saved in the database.
     * @param {HumanizerRunCreateManyAndReturnArgs} args - Arguments to create many HumanizerRuns.
     * @example
     * // Create many HumanizerRuns
     * const humanizerRun = await prisma.humanizerRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HumanizerRuns and only return the `id`
     * const humanizerRunWithIdOnly = await prisma.humanizerRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HumanizerRunCreateManyAndReturnArgs>(args?: SelectSubset<T, HumanizerRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HumanizerRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HumanizerRun.
     * @param {HumanizerRunDeleteArgs} args - Arguments to delete one HumanizerRun.
     * @example
     * // Delete one HumanizerRun
     * const HumanizerRun = await prisma.humanizerRun.delete({
     *   where: {
     *     // ... filter to delete one HumanizerRun
     *   }
     * })
     * 
     */
    delete<T extends HumanizerRunDeleteArgs>(args: SelectSubset<T, HumanizerRunDeleteArgs<ExtArgs>>): Prisma__HumanizerRunClient<$Result.GetResult<Prisma.$HumanizerRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HumanizerRun.
     * @param {HumanizerRunUpdateArgs} args - Arguments to update one HumanizerRun.
     * @example
     * // Update one HumanizerRun
     * const humanizerRun = await prisma.humanizerRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HumanizerRunUpdateArgs>(args: SelectSubset<T, HumanizerRunUpdateArgs<ExtArgs>>): Prisma__HumanizerRunClient<$Result.GetResult<Prisma.$HumanizerRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HumanizerRuns.
     * @param {HumanizerRunDeleteManyArgs} args - Arguments to filter HumanizerRuns to delete.
     * @example
     * // Delete a few HumanizerRuns
     * const { count } = await prisma.humanizerRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HumanizerRunDeleteManyArgs>(args?: SelectSubset<T, HumanizerRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HumanizerRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HumanizerRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HumanizerRuns
     * const humanizerRun = await prisma.humanizerRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HumanizerRunUpdateManyArgs>(args: SelectSubset<T, HumanizerRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HumanizerRuns and returns the data updated in the database.
     * @param {HumanizerRunUpdateManyAndReturnArgs} args - Arguments to update many HumanizerRuns.
     * @example
     * // Update many HumanizerRuns
     * const humanizerRun = await prisma.humanizerRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HumanizerRuns and only return the `id`
     * const humanizerRunWithIdOnly = await prisma.humanizerRun.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HumanizerRunUpdateManyAndReturnArgs>(args: SelectSubset<T, HumanizerRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HumanizerRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HumanizerRun.
     * @param {HumanizerRunUpsertArgs} args - Arguments to update or create a HumanizerRun.
     * @example
     * // Update or create a HumanizerRun
     * const humanizerRun = await prisma.humanizerRun.upsert({
     *   create: {
     *     // ... data to create a HumanizerRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HumanizerRun we want to update
     *   }
     * })
     */
    upsert<T extends HumanizerRunUpsertArgs>(args: SelectSubset<T, HumanizerRunUpsertArgs<ExtArgs>>): Prisma__HumanizerRunClient<$Result.GetResult<Prisma.$HumanizerRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HumanizerRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HumanizerRunCountArgs} args - Arguments to filter HumanizerRuns to count.
     * @example
     * // Count the number of HumanizerRuns
     * const count = await prisma.humanizerRun.count({
     *   where: {
     *     // ... the filter for the HumanizerRuns we want to count
     *   }
     * })
    **/
    count<T extends HumanizerRunCountArgs>(
      args?: Subset<T, HumanizerRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HumanizerRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HumanizerRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HumanizerRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HumanizerRunAggregateArgs>(args: Subset<T, HumanizerRunAggregateArgs>): Prisma.PrismaPromise<GetHumanizerRunAggregateType<T>>

    /**
     * Group by HumanizerRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HumanizerRunGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HumanizerRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HumanizerRunGroupByArgs['orderBy'] }
        : { orderBy?: HumanizerRunGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HumanizerRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHumanizerRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HumanizerRun model
   */
  readonly fields: HumanizerRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HumanizerRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HumanizerRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HumanizerRun model
   */
  interface HumanizerRunFieldRefs {
    readonly id: FieldRef<"HumanizerRun", 'String'>
    readonly userId: FieldRef<"HumanizerRun", 'String'>
    readonly inputText: FieldRef<"HumanizerRun", 'String'>
    readonly outputText: FieldRef<"HumanizerRun", 'String'>
    readonly saplingScore: FieldRef<"HumanizerRun", 'Float'>
    readonly iterations: FieldRef<"HumanizerRun", 'Int'>
    readonly similarity: FieldRef<"HumanizerRun", 'Float'>
    readonly createdAt: FieldRef<"HumanizerRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HumanizerRun findUnique
   */
  export type HumanizerRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunInclude<ExtArgs> | null
    /**
     * Filter, which HumanizerRun to fetch.
     */
    where: HumanizerRunWhereUniqueInput
  }

  /**
   * HumanizerRun findUniqueOrThrow
   */
  export type HumanizerRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunInclude<ExtArgs> | null
    /**
     * Filter, which HumanizerRun to fetch.
     */
    where: HumanizerRunWhereUniqueInput
  }

  /**
   * HumanizerRun findFirst
   */
  export type HumanizerRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunInclude<ExtArgs> | null
    /**
     * Filter, which HumanizerRun to fetch.
     */
    where?: HumanizerRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HumanizerRuns to fetch.
     */
    orderBy?: HumanizerRunOrderByWithRelationInput | HumanizerRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HumanizerRuns.
     */
    cursor?: HumanizerRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HumanizerRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HumanizerRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HumanizerRuns.
     */
    distinct?: HumanizerRunScalarFieldEnum | HumanizerRunScalarFieldEnum[]
  }

  /**
   * HumanizerRun findFirstOrThrow
   */
  export type HumanizerRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunInclude<ExtArgs> | null
    /**
     * Filter, which HumanizerRun to fetch.
     */
    where?: HumanizerRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HumanizerRuns to fetch.
     */
    orderBy?: HumanizerRunOrderByWithRelationInput | HumanizerRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HumanizerRuns.
     */
    cursor?: HumanizerRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HumanizerRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HumanizerRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HumanizerRuns.
     */
    distinct?: HumanizerRunScalarFieldEnum | HumanizerRunScalarFieldEnum[]
  }

  /**
   * HumanizerRun findMany
   */
  export type HumanizerRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunInclude<ExtArgs> | null
    /**
     * Filter, which HumanizerRuns to fetch.
     */
    where?: HumanizerRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HumanizerRuns to fetch.
     */
    orderBy?: HumanizerRunOrderByWithRelationInput | HumanizerRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HumanizerRuns.
     */
    cursor?: HumanizerRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HumanizerRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HumanizerRuns.
     */
    skip?: number
    distinct?: HumanizerRunScalarFieldEnum | HumanizerRunScalarFieldEnum[]
  }

  /**
   * HumanizerRun create
   */
  export type HumanizerRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunInclude<ExtArgs> | null
    /**
     * The data needed to create a HumanizerRun.
     */
    data: XOR<HumanizerRunCreateInput, HumanizerRunUncheckedCreateInput>
  }

  /**
   * HumanizerRun createMany
   */
  export type HumanizerRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HumanizerRuns.
     */
    data: HumanizerRunCreateManyInput | HumanizerRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HumanizerRun createManyAndReturn
   */
  export type HumanizerRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * The data used to create many HumanizerRuns.
     */
    data: HumanizerRunCreateManyInput | HumanizerRunCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HumanizerRun update
   */
  export type HumanizerRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunInclude<ExtArgs> | null
    /**
     * The data needed to update a HumanizerRun.
     */
    data: XOR<HumanizerRunUpdateInput, HumanizerRunUncheckedUpdateInput>
    /**
     * Choose, which HumanizerRun to update.
     */
    where: HumanizerRunWhereUniqueInput
  }

  /**
   * HumanizerRun updateMany
   */
  export type HumanizerRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HumanizerRuns.
     */
    data: XOR<HumanizerRunUpdateManyMutationInput, HumanizerRunUncheckedUpdateManyInput>
    /**
     * Filter which HumanizerRuns to update
     */
    where?: HumanizerRunWhereInput
    /**
     * Limit how many HumanizerRuns to update.
     */
    limit?: number
  }

  /**
   * HumanizerRun updateManyAndReturn
   */
  export type HumanizerRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * The data used to update HumanizerRuns.
     */
    data: XOR<HumanizerRunUpdateManyMutationInput, HumanizerRunUncheckedUpdateManyInput>
    /**
     * Filter which HumanizerRuns to update
     */
    where?: HumanizerRunWhereInput
    /**
     * Limit how many HumanizerRuns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HumanizerRun upsert
   */
  export type HumanizerRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunInclude<ExtArgs> | null
    /**
     * The filter to search for the HumanizerRun to update in case it exists.
     */
    where: HumanizerRunWhereUniqueInput
    /**
     * In case the HumanizerRun found by the `where` argument doesn't exist, create a new HumanizerRun with this data.
     */
    create: XOR<HumanizerRunCreateInput, HumanizerRunUncheckedCreateInput>
    /**
     * In case the HumanizerRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HumanizerRunUpdateInput, HumanizerRunUncheckedUpdateInput>
  }

  /**
   * HumanizerRun delete
   */
  export type HumanizerRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunInclude<ExtArgs> | null
    /**
     * Filter which HumanizerRun to delete.
     */
    where: HumanizerRunWhereUniqueInput
  }

  /**
   * HumanizerRun deleteMany
   */
  export type HumanizerRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HumanizerRuns to delete
     */
    where?: HumanizerRunWhereInput
    /**
     * Limit how many HumanizerRuns to delete.
     */
    limit?: number
  }

  /**
   * HumanizerRun without action
   */
  export type HumanizerRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HumanizerRun
     */
    select?: HumanizerRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HumanizerRun
     */
    omit?: HumanizerRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HumanizerRunInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SubscriptionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    stripeCustomerId: 'stripeCustomerId',
    stripePriceId: 'stripePriceId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    status: 'status',
    plan: 'plan',
    currentPeriodEnd: 'currentPeriodEnd',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubscriptionScalarFieldEnum = (typeof SubscriptionScalarFieldEnum)[keyof typeof SubscriptionScalarFieldEnum]


  export const NoteSubmissionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    rawText: 'rawText',
    language: 'language',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NoteSubmissionScalarFieldEnum = (typeof NoteSubmissionScalarFieldEnum)[keyof typeof NoteSubmissionScalarFieldEnum]


  export const PairScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    submissionId: 'submissionId',
    term: 'term',
    definition: 'definition',
    question: 'question',
    answer: 'answer',
    order: 'order',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PairScalarFieldEnum = (typeof PairScalarFieldEnum)[keyof typeof PairScalarFieldEnum]


  export const StudyStatScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    pairId: 'pairId',
    correctCount: 'correctCount',
    incorrectCount: 'incorrectCount',
    lastReviewed: 'lastReviewed',
    confidence: 'confidence',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudyStatScalarFieldEnum = (typeof StudyStatScalarFieldEnum)[keyof typeof StudyStatScalarFieldEnum]


  export const HumanizerRunScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    inputText: 'inputText',
    outputText: 'outputText',
    saplingScore: 'saplingScore',
    iterations: 'iterations',
    similarity: 'similarity',
    createdAt: 'createdAt'
  };

  export type HumanizerRunScalarFieldEnum = (typeof HumanizerRunScalarFieldEnum)[keyof typeof HumanizerRunScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    submissions?: NoteSubmissionListRelationFilter
    pairs?: PairListRelationFilter
    studyStats?: StudyStatListRelationFilter
    humanizerRuns?: HumanizerRunListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subscription?: SubscriptionOrderByWithRelationInput
    submissions?: NoteSubmissionOrderByRelationAggregateInput
    pairs?: PairOrderByRelationAggregateInput
    studyStats?: StudyStatOrderByRelationAggregateInput
    humanizerRuns?: HumanizerRunOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    subscription?: XOR<SubscriptionNullableScalarRelationFilter, SubscriptionWhereInput> | null
    submissions?: NoteSubmissionListRelationFilter
    pairs?: PairListRelationFilter
    studyStats?: StudyStatListRelationFilter
    humanizerRuns?: HumanizerRunListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SubscriptionWhereInput = {
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    id?: StringFilter<"Subscription"> | string
    userId?: StringFilter<"Subscription"> | string
    stripeCustomerId?: StringNullableFilter<"Subscription"> | string | null
    stripePriceId?: StringNullableFilter<"Subscription"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"Subscription"> | string | null
    status?: StringNullableFilter<"Subscription"> | string | null
    plan?: StringNullableFilter<"Subscription"> | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripePriceId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    plan?: SortOrderInput | SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    stripeCustomerId?: string
    stripeSubscriptionId?: string
    AND?: SubscriptionWhereInput | SubscriptionWhereInput[]
    OR?: SubscriptionWhereInput[]
    NOT?: SubscriptionWhereInput | SubscriptionWhereInput[]
    stripePriceId?: StringNullableFilter<"Subscription"> | string | null
    status?: StringNullableFilter<"Subscription"> | string | null
    plan?: StringNullableFilter<"Subscription"> | string | null
    currentPeriodEnd?: DateTimeNullableFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeFilter<"Subscription"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId" | "stripeCustomerId" | "stripeSubscriptionId">

  export type SubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripePriceId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    plan?: SortOrderInput | SortOrder
    currentPeriodEnd?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubscriptionCountOrderByAggregateInput
    _max?: SubscriptionMaxOrderByAggregateInput
    _min?: SubscriptionMinOrderByAggregateInput
  }

  export type SubscriptionScalarWhereWithAggregatesInput = {
    AND?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    OR?: SubscriptionScalarWhereWithAggregatesInput[]
    NOT?: SubscriptionScalarWhereWithAggregatesInput | SubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Subscription"> | string
    userId?: StringWithAggregatesFilter<"Subscription"> | string
    stripeCustomerId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    stripePriceId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    stripeSubscriptionId?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    status?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    plan?: StringNullableWithAggregatesFilter<"Subscription"> | string | null
    currentPeriodEnd?: DateTimeNullableWithAggregatesFilter<"Subscription"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subscription"> | Date | string
  }

  export type NoteSubmissionWhereInput = {
    AND?: NoteSubmissionWhereInput | NoteSubmissionWhereInput[]
    OR?: NoteSubmissionWhereInput[]
    NOT?: NoteSubmissionWhereInput | NoteSubmissionWhereInput[]
    id?: StringFilter<"NoteSubmission"> | string
    userId?: StringFilter<"NoteSubmission"> | string
    rawText?: StringFilter<"NoteSubmission"> | string
    language?: StringNullableFilter<"NoteSubmission"> | string | null
    metadata?: JsonNullableFilter<"NoteSubmission">
    createdAt?: DateTimeFilter<"NoteSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"NoteSubmission"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pairs?: PairListRelationFilter
  }

  export type NoteSubmissionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    rawText?: SortOrder
    language?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    pairs?: PairOrderByRelationAggregateInput
  }

  export type NoteSubmissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NoteSubmissionWhereInput | NoteSubmissionWhereInput[]
    OR?: NoteSubmissionWhereInput[]
    NOT?: NoteSubmissionWhereInput | NoteSubmissionWhereInput[]
    userId?: StringFilter<"NoteSubmission"> | string
    rawText?: StringFilter<"NoteSubmission"> | string
    language?: StringNullableFilter<"NoteSubmission"> | string | null
    metadata?: JsonNullableFilter<"NoteSubmission">
    createdAt?: DateTimeFilter<"NoteSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"NoteSubmission"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pairs?: PairListRelationFilter
  }, "id">

  export type NoteSubmissionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    rawText?: SortOrder
    language?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NoteSubmissionCountOrderByAggregateInput
    _max?: NoteSubmissionMaxOrderByAggregateInput
    _min?: NoteSubmissionMinOrderByAggregateInput
  }

  export type NoteSubmissionScalarWhereWithAggregatesInput = {
    AND?: NoteSubmissionScalarWhereWithAggregatesInput | NoteSubmissionScalarWhereWithAggregatesInput[]
    OR?: NoteSubmissionScalarWhereWithAggregatesInput[]
    NOT?: NoteSubmissionScalarWhereWithAggregatesInput | NoteSubmissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NoteSubmission"> | string
    userId?: StringWithAggregatesFilter<"NoteSubmission"> | string
    rawText?: StringWithAggregatesFilter<"NoteSubmission"> | string
    language?: StringNullableWithAggregatesFilter<"NoteSubmission"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"NoteSubmission">
    createdAt?: DateTimeWithAggregatesFilter<"NoteSubmission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NoteSubmission"> | Date | string
  }

  export type PairWhereInput = {
    AND?: PairWhereInput | PairWhereInput[]
    OR?: PairWhereInput[]
    NOT?: PairWhereInput | PairWhereInput[]
    id?: StringFilter<"Pair"> | string
    userId?: StringFilter<"Pair"> | string
    submissionId?: StringFilter<"Pair"> | string
    term?: StringFilter<"Pair"> | string
    definition?: StringFilter<"Pair"> | string
    question?: StringFilter<"Pair"> | string
    answer?: StringFilter<"Pair"> | string
    order?: IntFilter<"Pair"> | number
    createdAt?: DateTimeFilter<"Pair"> | Date | string
    updatedAt?: DateTimeFilter<"Pair"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    submission?: XOR<NoteSubmissionScalarRelationFilter, NoteSubmissionWhereInput>
    studyStats?: StudyStatListRelationFilter
  }

  export type PairOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    term?: SortOrder
    definition?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    submission?: NoteSubmissionOrderByWithRelationInput
    studyStats?: StudyStatOrderByRelationAggregateInput
  }

  export type PairWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PairWhereInput | PairWhereInput[]
    OR?: PairWhereInput[]
    NOT?: PairWhereInput | PairWhereInput[]
    userId?: StringFilter<"Pair"> | string
    submissionId?: StringFilter<"Pair"> | string
    term?: StringFilter<"Pair"> | string
    definition?: StringFilter<"Pair"> | string
    question?: StringFilter<"Pair"> | string
    answer?: StringFilter<"Pair"> | string
    order?: IntFilter<"Pair"> | number
    createdAt?: DateTimeFilter<"Pair"> | Date | string
    updatedAt?: DateTimeFilter<"Pair"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    submission?: XOR<NoteSubmissionScalarRelationFilter, NoteSubmissionWhereInput>
    studyStats?: StudyStatListRelationFilter
  }, "id">

  export type PairOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    term?: SortOrder
    definition?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PairCountOrderByAggregateInput
    _avg?: PairAvgOrderByAggregateInput
    _max?: PairMaxOrderByAggregateInput
    _min?: PairMinOrderByAggregateInput
    _sum?: PairSumOrderByAggregateInput
  }

  export type PairScalarWhereWithAggregatesInput = {
    AND?: PairScalarWhereWithAggregatesInput | PairScalarWhereWithAggregatesInput[]
    OR?: PairScalarWhereWithAggregatesInput[]
    NOT?: PairScalarWhereWithAggregatesInput | PairScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pair"> | string
    userId?: StringWithAggregatesFilter<"Pair"> | string
    submissionId?: StringWithAggregatesFilter<"Pair"> | string
    term?: StringWithAggregatesFilter<"Pair"> | string
    definition?: StringWithAggregatesFilter<"Pair"> | string
    question?: StringWithAggregatesFilter<"Pair"> | string
    answer?: StringWithAggregatesFilter<"Pair"> | string
    order?: IntWithAggregatesFilter<"Pair"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Pair"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Pair"> | Date | string
  }

  export type StudyStatWhereInput = {
    AND?: StudyStatWhereInput | StudyStatWhereInput[]
    OR?: StudyStatWhereInput[]
    NOT?: StudyStatWhereInput | StudyStatWhereInput[]
    id?: StringFilter<"StudyStat"> | string
    userId?: StringFilter<"StudyStat"> | string
    pairId?: StringFilter<"StudyStat"> | string
    correctCount?: IntFilter<"StudyStat"> | number
    incorrectCount?: IntFilter<"StudyStat"> | number
    lastReviewed?: DateTimeNullableFilter<"StudyStat"> | Date | string | null
    confidence?: IntNullableFilter<"StudyStat"> | number | null
    status?: StringFilter<"StudyStat"> | string
    createdAt?: DateTimeFilter<"StudyStat"> | Date | string
    updatedAt?: DateTimeFilter<"StudyStat"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pair?: XOR<PairScalarRelationFilter, PairWhereInput>
  }

  export type StudyStatOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    pairId?: SortOrder
    correctCount?: SortOrder
    incorrectCount?: SortOrder
    lastReviewed?: SortOrderInput | SortOrder
    confidence?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    pair?: PairOrderByWithRelationInput
  }

  export type StudyStatWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_pairId?: StudyStatUserIdPairIdCompoundUniqueInput
    AND?: StudyStatWhereInput | StudyStatWhereInput[]
    OR?: StudyStatWhereInput[]
    NOT?: StudyStatWhereInput | StudyStatWhereInput[]
    userId?: StringFilter<"StudyStat"> | string
    pairId?: StringFilter<"StudyStat"> | string
    correctCount?: IntFilter<"StudyStat"> | number
    incorrectCount?: IntFilter<"StudyStat"> | number
    lastReviewed?: DateTimeNullableFilter<"StudyStat"> | Date | string | null
    confidence?: IntNullableFilter<"StudyStat"> | number | null
    status?: StringFilter<"StudyStat"> | string
    createdAt?: DateTimeFilter<"StudyStat"> | Date | string
    updatedAt?: DateTimeFilter<"StudyStat"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    pair?: XOR<PairScalarRelationFilter, PairWhereInput>
  }, "id" | "userId_pairId">

  export type StudyStatOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    pairId?: SortOrder
    correctCount?: SortOrder
    incorrectCount?: SortOrder
    lastReviewed?: SortOrderInput | SortOrder
    confidence?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudyStatCountOrderByAggregateInput
    _avg?: StudyStatAvgOrderByAggregateInput
    _max?: StudyStatMaxOrderByAggregateInput
    _min?: StudyStatMinOrderByAggregateInput
    _sum?: StudyStatSumOrderByAggregateInput
  }

  export type StudyStatScalarWhereWithAggregatesInput = {
    AND?: StudyStatScalarWhereWithAggregatesInput | StudyStatScalarWhereWithAggregatesInput[]
    OR?: StudyStatScalarWhereWithAggregatesInput[]
    NOT?: StudyStatScalarWhereWithAggregatesInput | StudyStatScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StudyStat"> | string
    userId?: StringWithAggregatesFilter<"StudyStat"> | string
    pairId?: StringWithAggregatesFilter<"StudyStat"> | string
    correctCount?: IntWithAggregatesFilter<"StudyStat"> | number
    incorrectCount?: IntWithAggregatesFilter<"StudyStat"> | number
    lastReviewed?: DateTimeNullableWithAggregatesFilter<"StudyStat"> | Date | string | null
    confidence?: IntNullableWithAggregatesFilter<"StudyStat"> | number | null
    status?: StringWithAggregatesFilter<"StudyStat"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StudyStat"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StudyStat"> | Date | string
  }

  export type HumanizerRunWhereInput = {
    AND?: HumanizerRunWhereInput | HumanizerRunWhereInput[]
    OR?: HumanizerRunWhereInput[]
    NOT?: HumanizerRunWhereInput | HumanizerRunWhereInput[]
    id?: StringFilter<"HumanizerRun"> | string
    userId?: StringFilter<"HumanizerRun"> | string
    inputText?: StringFilter<"HumanizerRun"> | string
    outputText?: StringFilter<"HumanizerRun"> | string
    saplingScore?: FloatNullableFilter<"HumanizerRun"> | number | null
    iterations?: IntFilter<"HumanizerRun"> | number
    similarity?: FloatNullableFilter<"HumanizerRun"> | number | null
    createdAt?: DateTimeFilter<"HumanizerRun"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type HumanizerRunOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    inputText?: SortOrder
    outputText?: SortOrder
    saplingScore?: SortOrderInput | SortOrder
    iterations?: SortOrder
    similarity?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type HumanizerRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HumanizerRunWhereInput | HumanizerRunWhereInput[]
    OR?: HumanizerRunWhereInput[]
    NOT?: HumanizerRunWhereInput | HumanizerRunWhereInput[]
    userId?: StringFilter<"HumanizerRun"> | string
    inputText?: StringFilter<"HumanizerRun"> | string
    outputText?: StringFilter<"HumanizerRun"> | string
    saplingScore?: FloatNullableFilter<"HumanizerRun"> | number | null
    iterations?: IntFilter<"HumanizerRun"> | number
    similarity?: FloatNullableFilter<"HumanizerRun"> | number | null
    createdAt?: DateTimeFilter<"HumanizerRun"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type HumanizerRunOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    inputText?: SortOrder
    outputText?: SortOrder
    saplingScore?: SortOrderInput | SortOrder
    iterations?: SortOrder
    similarity?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: HumanizerRunCountOrderByAggregateInput
    _avg?: HumanizerRunAvgOrderByAggregateInput
    _max?: HumanizerRunMaxOrderByAggregateInput
    _min?: HumanizerRunMinOrderByAggregateInput
    _sum?: HumanizerRunSumOrderByAggregateInput
  }

  export type HumanizerRunScalarWhereWithAggregatesInput = {
    AND?: HumanizerRunScalarWhereWithAggregatesInput | HumanizerRunScalarWhereWithAggregatesInput[]
    OR?: HumanizerRunScalarWhereWithAggregatesInput[]
    NOT?: HumanizerRunScalarWhereWithAggregatesInput | HumanizerRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HumanizerRun"> | string
    userId?: StringWithAggregatesFilter<"HumanizerRun"> | string
    inputText?: StringWithAggregatesFilter<"HumanizerRun"> | string
    outputText?: StringWithAggregatesFilter<"HumanizerRun"> | string
    saplingScore?: FloatNullableWithAggregatesFilter<"HumanizerRun"> | number | null
    iterations?: IntWithAggregatesFilter<"HumanizerRun"> | number
    similarity?: FloatNullableWithAggregatesFilter<"HumanizerRun"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"HumanizerRun"> | Date | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    submissions?: NoteSubmissionCreateNestedManyWithoutUserInput
    pairs?: PairCreateNestedManyWithoutUserInput
    studyStats?: StudyStatCreateNestedManyWithoutUserInput
    humanizerRuns?: HumanizerRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    submissions?: NoteSubmissionUncheckedCreateNestedManyWithoutUserInput
    pairs?: PairUncheckedCreateNestedManyWithoutUserInput
    studyStats?: StudyStatUncheckedCreateNestedManyWithoutUserInput
    humanizerRuns?: HumanizerRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    submissions?: NoteSubmissionUpdateManyWithoutUserNestedInput
    pairs?: PairUpdateManyWithoutUserNestedInput
    studyStats?: StudyStatUpdateManyWithoutUserNestedInput
    humanizerRuns?: HumanizerRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    submissions?: NoteSubmissionUncheckedUpdateManyWithoutUserNestedInput
    pairs?: PairUncheckedUpdateManyWithoutUserNestedInput
    studyStats?: StudyStatUncheckedUpdateManyWithoutUserNestedInput
    humanizerRuns?: HumanizerRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateInput = {
    id?: string
    stripeCustomerId?: string | null
    stripePriceId?: string | null
    stripeSubscriptionId?: string | null
    status?: string | null
    plan?: string | null
    currentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubscriptionInput
  }

  export type SubscriptionUncheckedCreateInput = {
    id?: string
    userId: string
    stripeCustomerId?: string | null
    stripePriceId?: string | null
    stripeSubscriptionId?: string | null
    status?: string | null
    plan?: string | null
    currentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubscriptionNestedInput
  }

  export type SubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionCreateManyInput = {
    id?: string
    userId: string
    stripeCustomerId?: string | null
    stripePriceId?: string | null
    stripeSubscriptionId?: string | null
    status?: string | null
    plan?: string | null
    currentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteSubmissionCreateInput = {
    id?: string
    rawText: string
    language?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubmissionsInput
    pairs?: PairCreateNestedManyWithoutSubmissionInput
  }

  export type NoteSubmissionUncheckedCreateInput = {
    id?: string
    userId: string
    rawText: string
    language?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    pairs?: PairUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type NoteSubmissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawText?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
    pairs?: PairUpdateManyWithoutSubmissionNestedInput
  }

  export type NoteSubmissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rawText?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type NoteSubmissionCreateManyInput = {
    id?: string
    userId: string
    rawText: string
    language?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoteSubmissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawText?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteSubmissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rawText?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairCreateInput = {
    id?: string
    term: string
    definition: string
    question: string
    answer: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPairsInput
    submission: NoteSubmissionCreateNestedOneWithoutPairsInput
    studyStats?: StudyStatCreateNestedManyWithoutPairInput
  }

  export type PairUncheckedCreateInput = {
    id?: string
    userId: string
    submissionId: string
    term: string
    definition: string
    question: string
    answer: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    studyStats?: StudyStatUncheckedCreateNestedManyWithoutPairInput
  }

  export type PairUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPairsNestedInput
    submission?: NoteSubmissionUpdateOneRequiredWithoutPairsNestedInput
    studyStats?: StudyStatUpdateManyWithoutPairNestedInput
  }

  export type PairUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studyStats?: StudyStatUncheckedUpdateManyWithoutPairNestedInput
  }

  export type PairCreateManyInput = {
    id?: string
    userId: string
    submissionId: string
    term: string
    definition: string
    question: string
    answer: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PairUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudyStatCreateInput = {
    id?: string
    correctCount?: number
    incorrectCount?: number
    lastReviewed?: Date | string | null
    confidence?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStudyStatsInput
    pair: PairCreateNestedOneWithoutStudyStatsInput
  }

  export type StudyStatUncheckedCreateInput = {
    id?: string
    userId: string
    pairId: string
    correctCount?: number
    incorrectCount?: number
    lastReviewed?: Date | string | null
    confidence?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudyStatUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confidence?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStudyStatsNestedInput
    pair?: PairUpdateOneRequiredWithoutStudyStatsNestedInput
  }

  export type StudyStatUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pairId?: StringFieldUpdateOperationsInput | string
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confidence?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudyStatCreateManyInput = {
    id?: string
    userId: string
    pairId: string
    correctCount?: number
    incorrectCount?: number
    lastReviewed?: Date | string | null
    confidence?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudyStatUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confidence?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudyStatUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    pairId?: StringFieldUpdateOperationsInput | string
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confidence?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HumanizerRunCreateInput = {
    id?: string
    inputText: string
    outputText: string
    saplingScore?: number | null
    iterations: number
    similarity?: number | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutHumanizerRunsInput
  }

  export type HumanizerRunUncheckedCreateInput = {
    id?: string
    userId: string
    inputText: string
    outputText: string
    saplingScore?: number | null
    iterations: number
    similarity?: number | null
    createdAt?: Date | string
  }

  export type HumanizerRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    outputText?: StringFieldUpdateOperationsInput | string
    saplingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    iterations?: IntFieldUpdateOperationsInput | number
    similarity?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutHumanizerRunsNestedInput
  }

  export type HumanizerRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    outputText?: StringFieldUpdateOperationsInput | string
    saplingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    iterations?: IntFieldUpdateOperationsInput | number
    similarity?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HumanizerRunCreateManyInput = {
    id?: string
    userId: string
    inputText: string
    outputText: string
    saplingScore?: number | null
    iterations: number
    similarity?: number | null
    createdAt?: Date | string
  }

  export type HumanizerRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    outputText?: StringFieldUpdateOperationsInput | string
    saplingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    iterations?: IntFieldUpdateOperationsInput | number
    similarity?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HumanizerRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    outputText?: StringFieldUpdateOperationsInput | string
    saplingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    iterations?: IntFieldUpdateOperationsInput | number
    similarity?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SubscriptionNullableScalarRelationFilter = {
    is?: SubscriptionWhereInput | null
    isNot?: SubscriptionWhereInput | null
  }

  export type NoteSubmissionListRelationFilter = {
    every?: NoteSubmissionWhereInput
    some?: NoteSubmissionWhereInput
    none?: NoteSubmissionWhereInput
  }

  export type PairListRelationFilter = {
    every?: PairWhereInput
    some?: PairWhereInput
    none?: PairWhereInput
  }

  export type StudyStatListRelationFilter = {
    every?: StudyStatWhereInput
    some?: StudyStatWhereInput
    none?: StudyStatWhereInput
  }

  export type HumanizerRunListRelationFilter = {
    every?: HumanizerRunWhereInput
    some?: HumanizerRunWhereInput
    none?: HumanizerRunWhereInput
  }

  export type NoteSubmissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PairOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudyStatOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type HumanizerRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stripeCustomerId?: SortOrder
    stripePriceId?: SortOrder
    stripeSubscriptionId?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    currentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stripeCustomerId?: SortOrder
    stripePriceId?: SortOrder
    stripeSubscriptionId?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    currentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    stripeCustomerId?: SortOrder
    stripePriceId?: SortOrder
    stripeSubscriptionId?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    currentPeriodEnd?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NoteSubmissionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rawText?: SortOrder
    language?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoteSubmissionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rawText?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoteSubmissionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    rawText?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NoteSubmissionScalarRelationFilter = {
    is?: NoteSubmissionWhereInput
    isNot?: NoteSubmissionWhereInput
  }

  export type PairCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    term?: SortOrder
    definition?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PairAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type PairMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    term?: SortOrder
    definition?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PairMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    submissionId?: SortOrder
    term?: SortOrder
    definition?: SortOrder
    question?: SortOrder
    answer?: SortOrder
    order?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PairSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PairScalarRelationFilter = {
    is?: PairWhereInput
    isNot?: PairWhereInput
  }

  export type StudyStatUserIdPairIdCompoundUniqueInput = {
    userId: string
    pairId: string
  }

  export type StudyStatCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pairId?: SortOrder
    correctCount?: SortOrder
    incorrectCount?: SortOrder
    lastReviewed?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudyStatAvgOrderByAggregateInput = {
    correctCount?: SortOrder
    incorrectCount?: SortOrder
    confidence?: SortOrder
  }

  export type StudyStatMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pairId?: SortOrder
    correctCount?: SortOrder
    incorrectCount?: SortOrder
    lastReviewed?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudyStatMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    pairId?: SortOrder
    correctCount?: SortOrder
    incorrectCount?: SortOrder
    lastReviewed?: SortOrder
    confidence?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudyStatSumOrderByAggregateInput = {
    correctCount?: SortOrder
    incorrectCount?: SortOrder
    confidence?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type HumanizerRunCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    inputText?: SortOrder
    outputText?: SortOrder
    saplingScore?: SortOrder
    iterations?: SortOrder
    similarity?: SortOrder
    createdAt?: SortOrder
  }

  export type HumanizerRunAvgOrderByAggregateInput = {
    saplingScore?: SortOrder
    iterations?: SortOrder
    similarity?: SortOrder
  }

  export type HumanizerRunMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    inputText?: SortOrder
    outputText?: SortOrder
    saplingScore?: SortOrder
    iterations?: SortOrder
    similarity?: SortOrder
    createdAt?: SortOrder
  }

  export type HumanizerRunMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    inputText?: SortOrder
    outputText?: SortOrder
    saplingScore?: SortOrder
    iterations?: SortOrder
    similarity?: SortOrder
    createdAt?: SortOrder
  }

  export type HumanizerRunSumOrderByAggregateInput = {
    saplingScore?: SortOrder
    iterations?: SortOrder
    similarity?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type SubscriptionCreateNestedOneWithoutUserInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type NoteSubmissionCreateNestedManyWithoutUserInput = {
    create?: XOR<NoteSubmissionCreateWithoutUserInput, NoteSubmissionUncheckedCreateWithoutUserInput> | NoteSubmissionCreateWithoutUserInput[] | NoteSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteSubmissionCreateOrConnectWithoutUserInput | NoteSubmissionCreateOrConnectWithoutUserInput[]
    createMany?: NoteSubmissionCreateManyUserInputEnvelope
    connect?: NoteSubmissionWhereUniqueInput | NoteSubmissionWhereUniqueInput[]
  }

  export type PairCreateNestedManyWithoutUserInput = {
    create?: XOR<PairCreateWithoutUserInput, PairUncheckedCreateWithoutUserInput> | PairCreateWithoutUserInput[] | PairUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PairCreateOrConnectWithoutUserInput | PairCreateOrConnectWithoutUserInput[]
    createMany?: PairCreateManyUserInputEnvelope
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
  }

  export type StudyStatCreateNestedManyWithoutUserInput = {
    create?: XOR<StudyStatCreateWithoutUserInput, StudyStatUncheckedCreateWithoutUserInput> | StudyStatCreateWithoutUserInput[] | StudyStatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StudyStatCreateOrConnectWithoutUserInput | StudyStatCreateOrConnectWithoutUserInput[]
    createMany?: StudyStatCreateManyUserInputEnvelope
    connect?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
  }

  export type HumanizerRunCreateNestedManyWithoutUserInput = {
    create?: XOR<HumanizerRunCreateWithoutUserInput, HumanizerRunUncheckedCreateWithoutUserInput> | HumanizerRunCreateWithoutUserInput[] | HumanizerRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HumanizerRunCreateOrConnectWithoutUserInput | HumanizerRunCreateOrConnectWithoutUserInput[]
    createMany?: HumanizerRunCreateManyUserInputEnvelope
    connect?: HumanizerRunWhereUniqueInput | HumanizerRunWhereUniqueInput[]
  }

  export type SubscriptionUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    connect?: SubscriptionWhereUniqueInput
  }

  export type NoteSubmissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NoteSubmissionCreateWithoutUserInput, NoteSubmissionUncheckedCreateWithoutUserInput> | NoteSubmissionCreateWithoutUserInput[] | NoteSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteSubmissionCreateOrConnectWithoutUserInput | NoteSubmissionCreateOrConnectWithoutUserInput[]
    createMany?: NoteSubmissionCreateManyUserInputEnvelope
    connect?: NoteSubmissionWhereUniqueInput | NoteSubmissionWhereUniqueInput[]
  }

  export type PairUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PairCreateWithoutUserInput, PairUncheckedCreateWithoutUserInput> | PairCreateWithoutUserInput[] | PairUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PairCreateOrConnectWithoutUserInput | PairCreateOrConnectWithoutUserInput[]
    createMany?: PairCreateManyUserInputEnvelope
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
  }

  export type StudyStatUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StudyStatCreateWithoutUserInput, StudyStatUncheckedCreateWithoutUserInput> | StudyStatCreateWithoutUserInput[] | StudyStatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StudyStatCreateOrConnectWithoutUserInput | StudyStatCreateOrConnectWithoutUserInput[]
    createMany?: StudyStatCreateManyUserInputEnvelope
    connect?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
  }

  export type HumanizerRunUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<HumanizerRunCreateWithoutUserInput, HumanizerRunUncheckedCreateWithoutUserInput> | HumanizerRunCreateWithoutUserInput[] | HumanizerRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HumanizerRunCreateOrConnectWithoutUserInput | HumanizerRunCreateOrConnectWithoutUserInput[]
    createMany?: HumanizerRunCreateManyUserInputEnvelope
    connect?: HumanizerRunWhereUniqueInput | HumanizerRunWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SubscriptionUpdateOneWithoutUserNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    upsert?: SubscriptionUpsertWithoutUserInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutUserInput, SubscriptionUpdateWithoutUserInput>, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type NoteSubmissionUpdateManyWithoutUserNestedInput = {
    create?: XOR<NoteSubmissionCreateWithoutUserInput, NoteSubmissionUncheckedCreateWithoutUserInput> | NoteSubmissionCreateWithoutUserInput[] | NoteSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteSubmissionCreateOrConnectWithoutUserInput | NoteSubmissionCreateOrConnectWithoutUserInput[]
    upsert?: NoteSubmissionUpsertWithWhereUniqueWithoutUserInput | NoteSubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NoteSubmissionCreateManyUserInputEnvelope
    set?: NoteSubmissionWhereUniqueInput | NoteSubmissionWhereUniqueInput[]
    disconnect?: NoteSubmissionWhereUniqueInput | NoteSubmissionWhereUniqueInput[]
    delete?: NoteSubmissionWhereUniqueInput | NoteSubmissionWhereUniqueInput[]
    connect?: NoteSubmissionWhereUniqueInput | NoteSubmissionWhereUniqueInput[]
    update?: NoteSubmissionUpdateWithWhereUniqueWithoutUserInput | NoteSubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NoteSubmissionUpdateManyWithWhereWithoutUserInput | NoteSubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NoteSubmissionScalarWhereInput | NoteSubmissionScalarWhereInput[]
  }

  export type PairUpdateManyWithoutUserNestedInput = {
    create?: XOR<PairCreateWithoutUserInput, PairUncheckedCreateWithoutUserInput> | PairCreateWithoutUserInput[] | PairUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PairCreateOrConnectWithoutUserInput | PairCreateOrConnectWithoutUserInput[]
    upsert?: PairUpsertWithWhereUniqueWithoutUserInput | PairUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PairCreateManyUserInputEnvelope
    set?: PairWhereUniqueInput | PairWhereUniqueInput[]
    disconnect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    delete?: PairWhereUniqueInput | PairWhereUniqueInput[]
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    update?: PairUpdateWithWhereUniqueWithoutUserInput | PairUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PairUpdateManyWithWhereWithoutUserInput | PairUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PairScalarWhereInput | PairScalarWhereInput[]
  }

  export type StudyStatUpdateManyWithoutUserNestedInput = {
    create?: XOR<StudyStatCreateWithoutUserInput, StudyStatUncheckedCreateWithoutUserInput> | StudyStatCreateWithoutUserInput[] | StudyStatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StudyStatCreateOrConnectWithoutUserInput | StudyStatCreateOrConnectWithoutUserInput[]
    upsert?: StudyStatUpsertWithWhereUniqueWithoutUserInput | StudyStatUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StudyStatCreateManyUserInputEnvelope
    set?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    disconnect?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    delete?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    connect?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    update?: StudyStatUpdateWithWhereUniqueWithoutUserInput | StudyStatUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StudyStatUpdateManyWithWhereWithoutUserInput | StudyStatUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StudyStatScalarWhereInput | StudyStatScalarWhereInput[]
  }

  export type HumanizerRunUpdateManyWithoutUserNestedInput = {
    create?: XOR<HumanizerRunCreateWithoutUserInput, HumanizerRunUncheckedCreateWithoutUserInput> | HumanizerRunCreateWithoutUserInput[] | HumanizerRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HumanizerRunCreateOrConnectWithoutUserInput | HumanizerRunCreateOrConnectWithoutUserInput[]
    upsert?: HumanizerRunUpsertWithWhereUniqueWithoutUserInput | HumanizerRunUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HumanizerRunCreateManyUserInputEnvelope
    set?: HumanizerRunWhereUniqueInput | HumanizerRunWhereUniqueInput[]
    disconnect?: HumanizerRunWhereUniqueInput | HumanizerRunWhereUniqueInput[]
    delete?: HumanizerRunWhereUniqueInput | HumanizerRunWhereUniqueInput[]
    connect?: HumanizerRunWhereUniqueInput | HumanizerRunWhereUniqueInput[]
    update?: HumanizerRunUpdateWithWhereUniqueWithoutUserInput | HumanizerRunUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HumanizerRunUpdateManyWithWhereWithoutUserInput | HumanizerRunUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HumanizerRunScalarWhereInput | HumanizerRunScalarWhereInput[]
  }

  export type SubscriptionUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    connectOrCreate?: SubscriptionCreateOrConnectWithoutUserInput
    upsert?: SubscriptionUpsertWithoutUserInput
    disconnect?: SubscriptionWhereInput | boolean
    delete?: SubscriptionWhereInput | boolean
    connect?: SubscriptionWhereUniqueInput
    update?: XOR<XOR<SubscriptionUpdateToOneWithWhereWithoutUserInput, SubscriptionUpdateWithoutUserInput>, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type NoteSubmissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NoteSubmissionCreateWithoutUserInput, NoteSubmissionUncheckedCreateWithoutUserInput> | NoteSubmissionCreateWithoutUserInput[] | NoteSubmissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NoteSubmissionCreateOrConnectWithoutUserInput | NoteSubmissionCreateOrConnectWithoutUserInput[]
    upsert?: NoteSubmissionUpsertWithWhereUniqueWithoutUserInput | NoteSubmissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NoteSubmissionCreateManyUserInputEnvelope
    set?: NoteSubmissionWhereUniqueInput | NoteSubmissionWhereUniqueInput[]
    disconnect?: NoteSubmissionWhereUniqueInput | NoteSubmissionWhereUniqueInput[]
    delete?: NoteSubmissionWhereUniqueInput | NoteSubmissionWhereUniqueInput[]
    connect?: NoteSubmissionWhereUniqueInput | NoteSubmissionWhereUniqueInput[]
    update?: NoteSubmissionUpdateWithWhereUniqueWithoutUserInput | NoteSubmissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NoteSubmissionUpdateManyWithWhereWithoutUserInput | NoteSubmissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NoteSubmissionScalarWhereInput | NoteSubmissionScalarWhereInput[]
  }

  export type PairUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PairCreateWithoutUserInput, PairUncheckedCreateWithoutUserInput> | PairCreateWithoutUserInput[] | PairUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PairCreateOrConnectWithoutUserInput | PairCreateOrConnectWithoutUserInput[]
    upsert?: PairUpsertWithWhereUniqueWithoutUserInput | PairUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PairCreateManyUserInputEnvelope
    set?: PairWhereUniqueInput | PairWhereUniqueInput[]
    disconnect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    delete?: PairWhereUniqueInput | PairWhereUniqueInput[]
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    update?: PairUpdateWithWhereUniqueWithoutUserInput | PairUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PairUpdateManyWithWhereWithoutUserInput | PairUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PairScalarWhereInput | PairScalarWhereInput[]
  }

  export type StudyStatUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StudyStatCreateWithoutUserInput, StudyStatUncheckedCreateWithoutUserInput> | StudyStatCreateWithoutUserInput[] | StudyStatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StudyStatCreateOrConnectWithoutUserInput | StudyStatCreateOrConnectWithoutUserInput[]
    upsert?: StudyStatUpsertWithWhereUniqueWithoutUserInput | StudyStatUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StudyStatCreateManyUserInputEnvelope
    set?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    disconnect?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    delete?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    connect?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    update?: StudyStatUpdateWithWhereUniqueWithoutUserInput | StudyStatUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StudyStatUpdateManyWithWhereWithoutUserInput | StudyStatUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StudyStatScalarWhereInput | StudyStatScalarWhereInput[]
  }

  export type HumanizerRunUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<HumanizerRunCreateWithoutUserInput, HumanizerRunUncheckedCreateWithoutUserInput> | HumanizerRunCreateWithoutUserInput[] | HumanizerRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: HumanizerRunCreateOrConnectWithoutUserInput | HumanizerRunCreateOrConnectWithoutUserInput[]
    upsert?: HumanizerRunUpsertWithWhereUniqueWithoutUserInput | HumanizerRunUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: HumanizerRunCreateManyUserInputEnvelope
    set?: HumanizerRunWhereUniqueInput | HumanizerRunWhereUniqueInput[]
    disconnect?: HumanizerRunWhereUniqueInput | HumanizerRunWhereUniqueInput[]
    delete?: HumanizerRunWhereUniqueInput | HumanizerRunWhereUniqueInput[]
    connect?: HumanizerRunWhereUniqueInput | HumanizerRunWhereUniqueInput[]
    update?: HumanizerRunUpdateWithWhereUniqueWithoutUserInput | HumanizerRunUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: HumanizerRunUpdateManyWithWhereWithoutUserInput | HumanizerRunUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: HumanizerRunScalarWhereInput | HumanizerRunScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSubscriptionInput = {
    create?: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutSubscriptionNestedInput = {
    create?: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubscriptionInput
    upsert?: UserUpsertWithoutSubscriptionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubscriptionInput, UserUpdateWithoutSubscriptionInput>, UserUncheckedUpdateWithoutSubscriptionInput>
  }

  export type UserCreateNestedOneWithoutSubmissionsInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
  }

  export type PairCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<PairCreateWithoutSubmissionInput, PairUncheckedCreateWithoutSubmissionInput> | PairCreateWithoutSubmissionInput[] | PairUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: PairCreateOrConnectWithoutSubmissionInput | PairCreateOrConnectWithoutSubmissionInput[]
    createMany?: PairCreateManySubmissionInputEnvelope
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
  }

  export type PairUncheckedCreateNestedManyWithoutSubmissionInput = {
    create?: XOR<PairCreateWithoutSubmissionInput, PairUncheckedCreateWithoutSubmissionInput> | PairCreateWithoutSubmissionInput[] | PairUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: PairCreateOrConnectWithoutSubmissionInput | PairCreateOrConnectWithoutSubmissionInput[]
    createMany?: PairCreateManySubmissionInputEnvelope
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutSubmissionsNestedInput = {
    create?: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmissionsInput
    upsert?: UserUpsertWithoutSubmissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmissionsInput, UserUpdateWithoutSubmissionsInput>, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type PairUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<PairCreateWithoutSubmissionInput, PairUncheckedCreateWithoutSubmissionInput> | PairCreateWithoutSubmissionInput[] | PairUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: PairCreateOrConnectWithoutSubmissionInput | PairCreateOrConnectWithoutSubmissionInput[]
    upsert?: PairUpsertWithWhereUniqueWithoutSubmissionInput | PairUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: PairCreateManySubmissionInputEnvelope
    set?: PairWhereUniqueInput | PairWhereUniqueInput[]
    disconnect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    delete?: PairWhereUniqueInput | PairWhereUniqueInput[]
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    update?: PairUpdateWithWhereUniqueWithoutSubmissionInput | PairUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: PairUpdateManyWithWhereWithoutSubmissionInput | PairUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: PairScalarWhereInput | PairScalarWhereInput[]
  }

  export type PairUncheckedUpdateManyWithoutSubmissionNestedInput = {
    create?: XOR<PairCreateWithoutSubmissionInput, PairUncheckedCreateWithoutSubmissionInput> | PairCreateWithoutSubmissionInput[] | PairUncheckedCreateWithoutSubmissionInput[]
    connectOrCreate?: PairCreateOrConnectWithoutSubmissionInput | PairCreateOrConnectWithoutSubmissionInput[]
    upsert?: PairUpsertWithWhereUniqueWithoutSubmissionInput | PairUpsertWithWhereUniqueWithoutSubmissionInput[]
    createMany?: PairCreateManySubmissionInputEnvelope
    set?: PairWhereUniqueInput | PairWhereUniqueInput[]
    disconnect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    delete?: PairWhereUniqueInput | PairWhereUniqueInput[]
    connect?: PairWhereUniqueInput | PairWhereUniqueInput[]
    update?: PairUpdateWithWhereUniqueWithoutSubmissionInput | PairUpdateWithWhereUniqueWithoutSubmissionInput[]
    updateMany?: PairUpdateManyWithWhereWithoutSubmissionInput | PairUpdateManyWithWhereWithoutSubmissionInput[]
    deleteMany?: PairScalarWhereInput | PairScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPairsInput = {
    create?: XOR<UserCreateWithoutPairsInput, UserUncheckedCreateWithoutPairsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPairsInput
    connect?: UserWhereUniqueInput
  }

  export type NoteSubmissionCreateNestedOneWithoutPairsInput = {
    create?: XOR<NoteSubmissionCreateWithoutPairsInput, NoteSubmissionUncheckedCreateWithoutPairsInput>
    connectOrCreate?: NoteSubmissionCreateOrConnectWithoutPairsInput
    connect?: NoteSubmissionWhereUniqueInput
  }

  export type StudyStatCreateNestedManyWithoutPairInput = {
    create?: XOR<StudyStatCreateWithoutPairInput, StudyStatUncheckedCreateWithoutPairInput> | StudyStatCreateWithoutPairInput[] | StudyStatUncheckedCreateWithoutPairInput[]
    connectOrCreate?: StudyStatCreateOrConnectWithoutPairInput | StudyStatCreateOrConnectWithoutPairInput[]
    createMany?: StudyStatCreateManyPairInputEnvelope
    connect?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
  }

  export type StudyStatUncheckedCreateNestedManyWithoutPairInput = {
    create?: XOR<StudyStatCreateWithoutPairInput, StudyStatUncheckedCreateWithoutPairInput> | StudyStatCreateWithoutPairInput[] | StudyStatUncheckedCreateWithoutPairInput[]
    connectOrCreate?: StudyStatCreateOrConnectWithoutPairInput | StudyStatCreateOrConnectWithoutPairInput[]
    createMany?: StudyStatCreateManyPairInputEnvelope
    connect?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutPairsNestedInput = {
    create?: XOR<UserCreateWithoutPairsInput, UserUncheckedCreateWithoutPairsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPairsInput
    upsert?: UserUpsertWithoutPairsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPairsInput, UserUpdateWithoutPairsInput>, UserUncheckedUpdateWithoutPairsInput>
  }

  export type NoteSubmissionUpdateOneRequiredWithoutPairsNestedInput = {
    create?: XOR<NoteSubmissionCreateWithoutPairsInput, NoteSubmissionUncheckedCreateWithoutPairsInput>
    connectOrCreate?: NoteSubmissionCreateOrConnectWithoutPairsInput
    upsert?: NoteSubmissionUpsertWithoutPairsInput
    connect?: NoteSubmissionWhereUniqueInput
    update?: XOR<XOR<NoteSubmissionUpdateToOneWithWhereWithoutPairsInput, NoteSubmissionUpdateWithoutPairsInput>, NoteSubmissionUncheckedUpdateWithoutPairsInput>
  }

  export type StudyStatUpdateManyWithoutPairNestedInput = {
    create?: XOR<StudyStatCreateWithoutPairInput, StudyStatUncheckedCreateWithoutPairInput> | StudyStatCreateWithoutPairInput[] | StudyStatUncheckedCreateWithoutPairInput[]
    connectOrCreate?: StudyStatCreateOrConnectWithoutPairInput | StudyStatCreateOrConnectWithoutPairInput[]
    upsert?: StudyStatUpsertWithWhereUniqueWithoutPairInput | StudyStatUpsertWithWhereUniqueWithoutPairInput[]
    createMany?: StudyStatCreateManyPairInputEnvelope
    set?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    disconnect?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    delete?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    connect?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    update?: StudyStatUpdateWithWhereUniqueWithoutPairInput | StudyStatUpdateWithWhereUniqueWithoutPairInput[]
    updateMany?: StudyStatUpdateManyWithWhereWithoutPairInput | StudyStatUpdateManyWithWhereWithoutPairInput[]
    deleteMany?: StudyStatScalarWhereInput | StudyStatScalarWhereInput[]
  }

  export type StudyStatUncheckedUpdateManyWithoutPairNestedInput = {
    create?: XOR<StudyStatCreateWithoutPairInput, StudyStatUncheckedCreateWithoutPairInput> | StudyStatCreateWithoutPairInput[] | StudyStatUncheckedCreateWithoutPairInput[]
    connectOrCreate?: StudyStatCreateOrConnectWithoutPairInput | StudyStatCreateOrConnectWithoutPairInput[]
    upsert?: StudyStatUpsertWithWhereUniqueWithoutPairInput | StudyStatUpsertWithWhereUniqueWithoutPairInput[]
    createMany?: StudyStatCreateManyPairInputEnvelope
    set?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    disconnect?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    delete?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    connect?: StudyStatWhereUniqueInput | StudyStatWhereUniqueInput[]
    update?: StudyStatUpdateWithWhereUniqueWithoutPairInput | StudyStatUpdateWithWhereUniqueWithoutPairInput[]
    updateMany?: StudyStatUpdateManyWithWhereWithoutPairInput | StudyStatUpdateManyWithWhereWithoutPairInput[]
    deleteMany?: StudyStatScalarWhereInput | StudyStatScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutStudyStatsInput = {
    create?: XOR<UserCreateWithoutStudyStatsInput, UserUncheckedCreateWithoutStudyStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudyStatsInput
    connect?: UserWhereUniqueInput
  }

  export type PairCreateNestedOneWithoutStudyStatsInput = {
    create?: XOR<PairCreateWithoutStudyStatsInput, PairUncheckedCreateWithoutStudyStatsInput>
    connectOrCreate?: PairCreateOrConnectWithoutStudyStatsInput
    connect?: PairWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutStudyStatsNestedInput = {
    create?: XOR<UserCreateWithoutStudyStatsInput, UserUncheckedCreateWithoutStudyStatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudyStatsInput
    upsert?: UserUpsertWithoutStudyStatsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStudyStatsInput, UserUpdateWithoutStudyStatsInput>, UserUncheckedUpdateWithoutStudyStatsInput>
  }

  export type PairUpdateOneRequiredWithoutStudyStatsNestedInput = {
    create?: XOR<PairCreateWithoutStudyStatsInput, PairUncheckedCreateWithoutStudyStatsInput>
    connectOrCreate?: PairCreateOrConnectWithoutStudyStatsInput
    upsert?: PairUpsertWithoutStudyStatsInput
    connect?: PairWhereUniqueInput
    update?: XOR<XOR<PairUpdateToOneWithWhereWithoutStudyStatsInput, PairUpdateWithoutStudyStatsInput>, PairUncheckedUpdateWithoutStudyStatsInput>
  }

  export type UserCreateNestedOneWithoutHumanizerRunsInput = {
    create?: XOR<UserCreateWithoutHumanizerRunsInput, UserUncheckedCreateWithoutHumanizerRunsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHumanizerRunsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutHumanizerRunsNestedInput = {
    create?: XOR<UserCreateWithoutHumanizerRunsInput, UserUncheckedCreateWithoutHumanizerRunsInput>
    connectOrCreate?: UserCreateOrConnectWithoutHumanizerRunsInput
    upsert?: UserUpsertWithoutHumanizerRunsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHumanizerRunsInput, UserUpdateWithoutHumanizerRunsInput>, UserUncheckedUpdateWithoutHumanizerRunsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type SubscriptionCreateWithoutUserInput = {
    id?: string
    stripeCustomerId?: string | null
    stripePriceId?: string | null
    stripeSubscriptionId?: string | null
    status?: string | null
    plan?: string | null
    currentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionUncheckedCreateWithoutUserInput = {
    id?: string
    stripeCustomerId?: string | null
    stripePriceId?: string | null
    stripeSubscriptionId?: string | null
    status?: string | null
    plan?: string | null
    currentPeriodEnd?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubscriptionCreateOrConnectWithoutUserInput = {
    where: SubscriptionWhereUniqueInput
    create: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
  }

  export type NoteSubmissionCreateWithoutUserInput = {
    id?: string
    rawText: string
    language?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    pairs?: PairCreateNestedManyWithoutSubmissionInput
  }

  export type NoteSubmissionUncheckedCreateWithoutUserInput = {
    id?: string
    rawText: string
    language?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    pairs?: PairUncheckedCreateNestedManyWithoutSubmissionInput
  }

  export type NoteSubmissionCreateOrConnectWithoutUserInput = {
    where: NoteSubmissionWhereUniqueInput
    create: XOR<NoteSubmissionCreateWithoutUserInput, NoteSubmissionUncheckedCreateWithoutUserInput>
  }

  export type NoteSubmissionCreateManyUserInputEnvelope = {
    data: NoteSubmissionCreateManyUserInput | NoteSubmissionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PairCreateWithoutUserInput = {
    id?: string
    term: string
    definition: string
    question: string
    answer: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    submission: NoteSubmissionCreateNestedOneWithoutPairsInput
    studyStats?: StudyStatCreateNestedManyWithoutPairInput
  }

  export type PairUncheckedCreateWithoutUserInput = {
    id?: string
    submissionId: string
    term: string
    definition: string
    question: string
    answer: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    studyStats?: StudyStatUncheckedCreateNestedManyWithoutPairInput
  }

  export type PairCreateOrConnectWithoutUserInput = {
    where: PairWhereUniqueInput
    create: XOR<PairCreateWithoutUserInput, PairUncheckedCreateWithoutUserInput>
  }

  export type PairCreateManyUserInputEnvelope = {
    data: PairCreateManyUserInput | PairCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StudyStatCreateWithoutUserInput = {
    id?: string
    correctCount?: number
    incorrectCount?: number
    lastReviewed?: Date | string | null
    confidence?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pair: PairCreateNestedOneWithoutStudyStatsInput
  }

  export type StudyStatUncheckedCreateWithoutUserInput = {
    id?: string
    pairId: string
    correctCount?: number
    incorrectCount?: number
    lastReviewed?: Date | string | null
    confidence?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudyStatCreateOrConnectWithoutUserInput = {
    where: StudyStatWhereUniqueInput
    create: XOR<StudyStatCreateWithoutUserInput, StudyStatUncheckedCreateWithoutUserInput>
  }

  export type StudyStatCreateManyUserInputEnvelope = {
    data: StudyStatCreateManyUserInput | StudyStatCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type HumanizerRunCreateWithoutUserInput = {
    id?: string
    inputText: string
    outputText: string
    saplingScore?: number | null
    iterations: number
    similarity?: number | null
    createdAt?: Date | string
  }

  export type HumanizerRunUncheckedCreateWithoutUserInput = {
    id?: string
    inputText: string
    outputText: string
    saplingScore?: number | null
    iterations: number
    similarity?: number | null
    createdAt?: Date | string
  }

  export type HumanizerRunCreateOrConnectWithoutUserInput = {
    where: HumanizerRunWhereUniqueInput
    create: XOR<HumanizerRunCreateWithoutUserInput, HumanizerRunUncheckedCreateWithoutUserInput>
  }

  export type HumanizerRunCreateManyUserInputEnvelope = {
    data: HumanizerRunCreateManyUserInput | HumanizerRunCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SubscriptionUpsertWithoutUserInput = {
    update: XOR<SubscriptionUpdateWithoutUserInput, SubscriptionUncheckedUpdateWithoutUserInput>
    create: XOR<SubscriptionCreateWithoutUserInput, SubscriptionUncheckedCreateWithoutUserInput>
    where?: SubscriptionWhereInput
  }

  export type SubscriptionUpdateToOneWithWhereWithoutUserInput = {
    where?: SubscriptionWhereInput
    data: XOR<SubscriptionUpdateWithoutUserInput, SubscriptionUncheckedUpdateWithoutUserInput>
  }

  export type SubscriptionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriptionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    plan?: NullableStringFieldUpdateOperationsInput | string | null
    currentPeriodEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoteSubmissionUpsertWithWhereUniqueWithoutUserInput = {
    where: NoteSubmissionWhereUniqueInput
    update: XOR<NoteSubmissionUpdateWithoutUserInput, NoteSubmissionUncheckedUpdateWithoutUserInput>
    create: XOR<NoteSubmissionCreateWithoutUserInput, NoteSubmissionUncheckedCreateWithoutUserInput>
  }

  export type NoteSubmissionUpdateWithWhereUniqueWithoutUserInput = {
    where: NoteSubmissionWhereUniqueInput
    data: XOR<NoteSubmissionUpdateWithoutUserInput, NoteSubmissionUncheckedUpdateWithoutUserInput>
  }

  export type NoteSubmissionUpdateManyWithWhereWithoutUserInput = {
    where: NoteSubmissionScalarWhereInput
    data: XOR<NoteSubmissionUpdateManyMutationInput, NoteSubmissionUncheckedUpdateManyWithoutUserInput>
  }

  export type NoteSubmissionScalarWhereInput = {
    AND?: NoteSubmissionScalarWhereInput | NoteSubmissionScalarWhereInput[]
    OR?: NoteSubmissionScalarWhereInput[]
    NOT?: NoteSubmissionScalarWhereInput | NoteSubmissionScalarWhereInput[]
    id?: StringFilter<"NoteSubmission"> | string
    userId?: StringFilter<"NoteSubmission"> | string
    rawText?: StringFilter<"NoteSubmission"> | string
    language?: StringNullableFilter<"NoteSubmission"> | string | null
    metadata?: JsonNullableFilter<"NoteSubmission">
    createdAt?: DateTimeFilter<"NoteSubmission"> | Date | string
    updatedAt?: DateTimeFilter<"NoteSubmission"> | Date | string
  }

  export type PairUpsertWithWhereUniqueWithoutUserInput = {
    where: PairWhereUniqueInput
    update: XOR<PairUpdateWithoutUserInput, PairUncheckedUpdateWithoutUserInput>
    create: XOR<PairCreateWithoutUserInput, PairUncheckedCreateWithoutUserInput>
  }

  export type PairUpdateWithWhereUniqueWithoutUserInput = {
    where: PairWhereUniqueInput
    data: XOR<PairUpdateWithoutUserInput, PairUncheckedUpdateWithoutUserInput>
  }

  export type PairUpdateManyWithWhereWithoutUserInput = {
    where: PairScalarWhereInput
    data: XOR<PairUpdateManyMutationInput, PairUncheckedUpdateManyWithoutUserInput>
  }

  export type PairScalarWhereInput = {
    AND?: PairScalarWhereInput | PairScalarWhereInput[]
    OR?: PairScalarWhereInput[]
    NOT?: PairScalarWhereInput | PairScalarWhereInput[]
    id?: StringFilter<"Pair"> | string
    userId?: StringFilter<"Pair"> | string
    submissionId?: StringFilter<"Pair"> | string
    term?: StringFilter<"Pair"> | string
    definition?: StringFilter<"Pair"> | string
    question?: StringFilter<"Pair"> | string
    answer?: StringFilter<"Pair"> | string
    order?: IntFilter<"Pair"> | number
    createdAt?: DateTimeFilter<"Pair"> | Date | string
    updatedAt?: DateTimeFilter<"Pair"> | Date | string
  }

  export type StudyStatUpsertWithWhereUniqueWithoutUserInput = {
    where: StudyStatWhereUniqueInput
    update: XOR<StudyStatUpdateWithoutUserInput, StudyStatUncheckedUpdateWithoutUserInput>
    create: XOR<StudyStatCreateWithoutUserInput, StudyStatUncheckedCreateWithoutUserInput>
  }

  export type StudyStatUpdateWithWhereUniqueWithoutUserInput = {
    where: StudyStatWhereUniqueInput
    data: XOR<StudyStatUpdateWithoutUserInput, StudyStatUncheckedUpdateWithoutUserInput>
  }

  export type StudyStatUpdateManyWithWhereWithoutUserInput = {
    where: StudyStatScalarWhereInput
    data: XOR<StudyStatUpdateManyMutationInput, StudyStatUncheckedUpdateManyWithoutUserInput>
  }

  export type StudyStatScalarWhereInput = {
    AND?: StudyStatScalarWhereInput | StudyStatScalarWhereInput[]
    OR?: StudyStatScalarWhereInput[]
    NOT?: StudyStatScalarWhereInput | StudyStatScalarWhereInput[]
    id?: StringFilter<"StudyStat"> | string
    userId?: StringFilter<"StudyStat"> | string
    pairId?: StringFilter<"StudyStat"> | string
    correctCount?: IntFilter<"StudyStat"> | number
    incorrectCount?: IntFilter<"StudyStat"> | number
    lastReviewed?: DateTimeNullableFilter<"StudyStat"> | Date | string | null
    confidence?: IntNullableFilter<"StudyStat"> | number | null
    status?: StringFilter<"StudyStat"> | string
    createdAt?: DateTimeFilter<"StudyStat"> | Date | string
    updatedAt?: DateTimeFilter<"StudyStat"> | Date | string
  }

  export type HumanizerRunUpsertWithWhereUniqueWithoutUserInput = {
    where: HumanizerRunWhereUniqueInput
    update: XOR<HumanizerRunUpdateWithoutUserInput, HumanizerRunUncheckedUpdateWithoutUserInput>
    create: XOR<HumanizerRunCreateWithoutUserInput, HumanizerRunUncheckedCreateWithoutUserInput>
  }

  export type HumanizerRunUpdateWithWhereUniqueWithoutUserInput = {
    where: HumanizerRunWhereUniqueInput
    data: XOR<HumanizerRunUpdateWithoutUserInput, HumanizerRunUncheckedUpdateWithoutUserInput>
  }

  export type HumanizerRunUpdateManyWithWhereWithoutUserInput = {
    where: HumanizerRunScalarWhereInput
    data: XOR<HumanizerRunUpdateManyMutationInput, HumanizerRunUncheckedUpdateManyWithoutUserInput>
  }

  export type HumanizerRunScalarWhereInput = {
    AND?: HumanizerRunScalarWhereInput | HumanizerRunScalarWhereInput[]
    OR?: HumanizerRunScalarWhereInput[]
    NOT?: HumanizerRunScalarWhereInput | HumanizerRunScalarWhereInput[]
    id?: StringFilter<"HumanizerRun"> | string
    userId?: StringFilter<"HumanizerRun"> | string
    inputText?: StringFilter<"HumanizerRun"> | string
    outputText?: StringFilter<"HumanizerRun"> | string
    saplingScore?: FloatNullableFilter<"HumanizerRun"> | number | null
    iterations?: IntFilter<"HumanizerRun"> | number
    similarity?: FloatNullableFilter<"HumanizerRun"> | number | null
    createdAt?: DateTimeFilter<"HumanizerRun"> | Date | string
  }

  export type UserCreateWithoutSubscriptionInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: NoteSubmissionCreateNestedManyWithoutUserInput
    pairs?: PairCreateNestedManyWithoutUserInput
    studyStats?: StudyStatCreateNestedManyWithoutUserInput
    humanizerRuns?: HumanizerRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubscriptionInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    submissions?: NoteSubmissionUncheckedCreateNestedManyWithoutUserInput
    pairs?: PairUncheckedCreateNestedManyWithoutUserInput
    studyStats?: StudyStatUncheckedCreateNestedManyWithoutUserInput
    humanizerRuns?: HumanizerRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubscriptionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
  }

  export type UserUpsertWithoutSubscriptionInput = {
    update: XOR<UserUpdateWithoutSubscriptionInput, UserUncheckedUpdateWithoutSubscriptionInput>
    create: XOR<UserCreateWithoutSubscriptionInput, UserUncheckedCreateWithoutSubscriptionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubscriptionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubscriptionInput, UserUncheckedUpdateWithoutSubscriptionInput>
  }

  export type UserUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: NoteSubmissionUpdateManyWithoutUserNestedInput
    pairs?: PairUpdateManyWithoutUserNestedInput
    studyStats?: StudyStatUpdateManyWithoutUserNestedInput
    humanizerRuns?: HumanizerRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubscriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submissions?: NoteSubmissionUncheckedUpdateManyWithoutUserNestedInput
    pairs?: PairUncheckedUpdateManyWithoutUserNestedInput
    studyStats?: StudyStatUncheckedUpdateManyWithoutUserNestedInput
    humanizerRuns?: HumanizerRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSubmissionsInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    pairs?: PairCreateNestedManyWithoutUserInput
    studyStats?: StudyStatCreateNestedManyWithoutUserInput
    humanizerRuns?: HumanizerRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubmissionsInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    pairs?: PairUncheckedCreateNestedManyWithoutUserInput
    studyStats?: StudyStatUncheckedCreateNestedManyWithoutUserInput
    humanizerRuns?: HumanizerRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubmissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
  }

  export type PairCreateWithoutSubmissionInput = {
    id?: string
    term: string
    definition: string
    question: string
    answer: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPairsInput
    studyStats?: StudyStatCreateNestedManyWithoutPairInput
  }

  export type PairUncheckedCreateWithoutSubmissionInput = {
    id?: string
    userId: string
    term: string
    definition: string
    question: string
    answer: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    studyStats?: StudyStatUncheckedCreateNestedManyWithoutPairInput
  }

  export type PairCreateOrConnectWithoutSubmissionInput = {
    where: PairWhereUniqueInput
    create: XOR<PairCreateWithoutSubmissionInput, PairUncheckedCreateWithoutSubmissionInput>
  }

  export type PairCreateManySubmissionInputEnvelope = {
    data: PairCreateManySubmissionInput | PairCreateManySubmissionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSubmissionsInput = {
    update: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
    create: XOR<UserCreateWithoutSubmissionsInput, UserUncheckedCreateWithoutSubmissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmissionsInput, UserUncheckedUpdateWithoutSubmissionsInput>
  }

  export type UserUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    pairs?: PairUpdateManyWithoutUserNestedInput
    studyStats?: StudyStatUpdateManyWithoutUserNestedInput
    humanizerRuns?: HumanizerRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    pairs?: PairUncheckedUpdateManyWithoutUserNestedInput
    studyStats?: StudyStatUncheckedUpdateManyWithoutUserNestedInput
    humanizerRuns?: HumanizerRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PairUpsertWithWhereUniqueWithoutSubmissionInput = {
    where: PairWhereUniqueInput
    update: XOR<PairUpdateWithoutSubmissionInput, PairUncheckedUpdateWithoutSubmissionInput>
    create: XOR<PairCreateWithoutSubmissionInput, PairUncheckedCreateWithoutSubmissionInput>
  }

  export type PairUpdateWithWhereUniqueWithoutSubmissionInput = {
    where: PairWhereUniqueInput
    data: XOR<PairUpdateWithoutSubmissionInput, PairUncheckedUpdateWithoutSubmissionInput>
  }

  export type PairUpdateManyWithWhereWithoutSubmissionInput = {
    where: PairScalarWhereInput
    data: XOR<PairUpdateManyMutationInput, PairUncheckedUpdateManyWithoutSubmissionInput>
  }

  export type UserCreateWithoutPairsInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    submissions?: NoteSubmissionCreateNestedManyWithoutUserInput
    studyStats?: StudyStatCreateNestedManyWithoutUserInput
    humanizerRuns?: HumanizerRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPairsInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    submissions?: NoteSubmissionUncheckedCreateNestedManyWithoutUserInput
    studyStats?: StudyStatUncheckedCreateNestedManyWithoutUserInput
    humanizerRuns?: HumanizerRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPairsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPairsInput, UserUncheckedCreateWithoutPairsInput>
  }

  export type NoteSubmissionCreateWithoutPairsInput = {
    id?: string
    rawText: string
    language?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSubmissionsInput
  }

  export type NoteSubmissionUncheckedCreateWithoutPairsInput = {
    id?: string
    userId: string
    rawText: string
    language?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoteSubmissionCreateOrConnectWithoutPairsInput = {
    where: NoteSubmissionWhereUniqueInput
    create: XOR<NoteSubmissionCreateWithoutPairsInput, NoteSubmissionUncheckedCreateWithoutPairsInput>
  }

  export type StudyStatCreateWithoutPairInput = {
    id?: string
    correctCount?: number
    incorrectCount?: number
    lastReviewed?: Date | string | null
    confidence?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutStudyStatsInput
  }

  export type StudyStatUncheckedCreateWithoutPairInput = {
    id?: string
    userId: string
    correctCount?: number
    incorrectCount?: number
    lastReviewed?: Date | string | null
    confidence?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudyStatCreateOrConnectWithoutPairInput = {
    where: StudyStatWhereUniqueInput
    create: XOR<StudyStatCreateWithoutPairInput, StudyStatUncheckedCreateWithoutPairInput>
  }

  export type StudyStatCreateManyPairInputEnvelope = {
    data: StudyStatCreateManyPairInput | StudyStatCreateManyPairInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPairsInput = {
    update: XOR<UserUpdateWithoutPairsInput, UserUncheckedUpdateWithoutPairsInput>
    create: XOR<UserCreateWithoutPairsInput, UserUncheckedCreateWithoutPairsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPairsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPairsInput, UserUncheckedUpdateWithoutPairsInput>
  }

  export type UserUpdateWithoutPairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    submissions?: NoteSubmissionUpdateManyWithoutUserNestedInput
    studyStats?: StudyStatUpdateManyWithoutUserNestedInput
    humanizerRuns?: HumanizerRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    submissions?: NoteSubmissionUncheckedUpdateManyWithoutUserNestedInput
    studyStats?: StudyStatUncheckedUpdateManyWithoutUserNestedInput
    humanizerRuns?: HumanizerRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type NoteSubmissionUpsertWithoutPairsInput = {
    update: XOR<NoteSubmissionUpdateWithoutPairsInput, NoteSubmissionUncheckedUpdateWithoutPairsInput>
    create: XOR<NoteSubmissionCreateWithoutPairsInput, NoteSubmissionUncheckedCreateWithoutPairsInput>
    where?: NoteSubmissionWhereInput
  }

  export type NoteSubmissionUpdateToOneWithWhereWithoutPairsInput = {
    where?: NoteSubmissionWhereInput
    data: XOR<NoteSubmissionUpdateWithoutPairsInput, NoteSubmissionUncheckedUpdateWithoutPairsInput>
  }

  export type NoteSubmissionUpdateWithoutPairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawText?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSubmissionsNestedInput
  }

  export type NoteSubmissionUncheckedUpdateWithoutPairsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rawText?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudyStatUpsertWithWhereUniqueWithoutPairInput = {
    where: StudyStatWhereUniqueInput
    update: XOR<StudyStatUpdateWithoutPairInput, StudyStatUncheckedUpdateWithoutPairInput>
    create: XOR<StudyStatCreateWithoutPairInput, StudyStatUncheckedCreateWithoutPairInput>
  }

  export type StudyStatUpdateWithWhereUniqueWithoutPairInput = {
    where: StudyStatWhereUniqueInput
    data: XOR<StudyStatUpdateWithoutPairInput, StudyStatUncheckedUpdateWithoutPairInput>
  }

  export type StudyStatUpdateManyWithWhereWithoutPairInput = {
    where: StudyStatScalarWhereInput
    data: XOR<StudyStatUpdateManyMutationInput, StudyStatUncheckedUpdateManyWithoutPairInput>
  }

  export type UserCreateWithoutStudyStatsInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    submissions?: NoteSubmissionCreateNestedManyWithoutUserInput
    pairs?: PairCreateNestedManyWithoutUserInput
    humanizerRuns?: HumanizerRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStudyStatsInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    submissions?: NoteSubmissionUncheckedCreateNestedManyWithoutUserInput
    pairs?: PairUncheckedCreateNestedManyWithoutUserInput
    humanizerRuns?: HumanizerRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStudyStatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStudyStatsInput, UserUncheckedCreateWithoutStudyStatsInput>
  }

  export type PairCreateWithoutStudyStatsInput = {
    id?: string
    term: string
    definition: string
    question: string
    answer: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPairsInput
    submission: NoteSubmissionCreateNestedOneWithoutPairsInput
  }

  export type PairUncheckedCreateWithoutStudyStatsInput = {
    id?: string
    userId: string
    submissionId: string
    term: string
    definition: string
    question: string
    answer: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PairCreateOrConnectWithoutStudyStatsInput = {
    where: PairWhereUniqueInput
    create: XOR<PairCreateWithoutStudyStatsInput, PairUncheckedCreateWithoutStudyStatsInput>
  }

  export type UserUpsertWithoutStudyStatsInput = {
    update: XOR<UserUpdateWithoutStudyStatsInput, UserUncheckedUpdateWithoutStudyStatsInput>
    create: XOR<UserCreateWithoutStudyStatsInput, UserUncheckedCreateWithoutStudyStatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStudyStatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStudyStatsInput, UserUncheckedUpdateWithoutStudyStatsInput>
  }

  export type UserUpdateWithoutStudyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    submissions?: NoteSubmissionUpdateManyWithoutUserNestedInput
    pairs?: PairUpdateManyWithoutUserNestedInput
    humanizerRuns?: HumanizerRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStudyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    submissions?: NoteSubmissionUncheckedUpdateManyWithoutUserNestedInput
    pairs?: PairUncheckedUpdateManyWithoutUserNestedInput
    humanizerRuns?: HumanizerRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PairUpsertWithoutStudyStatsInput = {
    update: XOR<PairUpdateWithoutStudyStatsInput, PairUncheckedUpdateWithoutStudyStatsInput>
    create: XOR<PairCreateWithoutStudyStatsInput, PairUncheckedCreateWithoutStudyStatsInput>
    where?: PairWhereInput
  }

  export type PairUpdateToOneWithWhereWithoutStudyStatsInput = {
    where?: PairWhereInput
    data: XOR<PairUpdateWithoutStudyStatsInput, PairUncheckedUpdateWithoutStudyStatsInput>
  }

  export type PairUpdateWithoutStudyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPairsNestedInput
    submission?: NoteSubmissionUpdateOneRequiredWithoutPairsNestedInput
  }

  export type PairUncheckedUpdateWithoutStudyStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutHumanizerRunsInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionCreateNestedOneWithoutUserInput
    submissions?: NoteSubmissionCreateNestedManyWithoutUserInput
    pairs?: PairCreateNestedManyWithoutUserInput
    studyStats?: StudyStatCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHumanizerRunsInput = {
    id: string
    email: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscription?: SubscriptionUncheckedCreateNestedOneWithoutUserInput
    submissions?: NoteSubmissionUncheckedCreateNestedManyWithoutUserInput
    pairs?: PairUncheckedCreateNestedManyWithoutUserInput
    studyStats?: StudyStatUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHumanizerRunsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHumanizerRunsInput, UserUncheckedCreateWithoutHumanizerRunsInput>
  }

  export type UserUpsertWithoutHumanizerRunsInput = {
    update: XOR<UserUpdateWithoutHumanizerRunsInput, UserUncheckedUpdateWithoutHumanizerRunsInput>
    create: XOR<UserCreateWithoutHumanizerRunsInput, UserUncheckedCreateWithoutHumanizerRunsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHumanizerRunsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHumanizerRunsInput, UserUncheckedUpdateWithoutHumanizerRunsInput>
  }

  export type UserUpdateWithoutHumanizerRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUpdateOneWithoutUserNestedInput
    submissions?: NoteSubmissionUpdateManyWithoutUserNestedInput
    pairs?: PairUpdateManyWithoutUserNestedInput
    studyStats?: StudyStatUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHumanizerRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscription?: SubscriptionUncheckedUpdateOneWithoutUserNestedInput
    submissions?: NoteSubmissionUncheckedUpdateManyWithoutUserNestedInput
    pairs?: PairUncheckedUpdateManyWithoutUserNestedInput
    studyStats?: StudyStatUncheckedUpdateManyWithoutUserNestedInput
  }

  export type NoteSubmissionCreateManyUserInput = {
    id?: string
    rawText: string
    language?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PairCreateManyUserInput = {
    id?: string
    submissionId: string
    term: string
    definition: string
    question: string
    answer: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudyStatCreateManyUserInput = {
    id?: string
    pairId: string
    correctCount?: number
    incorrectCount?: number
    lastReviewed?: Date | string | null
    confidence?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HumanizerRunCreateManyUserInput = {
    id?: string
    inputText: string
    outputText: string
    saplingScore?: number | null
    iterations: number
    similarity?: number | null
    createdAt?: Date | string
  }

  export type NoteSubmissionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawText?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUpdateManyWithoutSubmissionNestedInput
  }

  export type NoteSubmissionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawText?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pairs?: PairUncheckedUpdateManyWithoutSubmissionNestedInput
  }

  export type NoteSubmissionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rawText?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submission?: NoteSubmissionUpdateOneRequiredWithoutPairsNestedInput
    studyStats?: StudyStatUpdateManyWithoutPairNestedInput
  }

  export type PairUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studyStats?: StudyStatUncheckedUpdateManyWithoutPairNestedInput
  }

  export type PairUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    submissionId?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudyStatUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confidence?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pair?: PairUpdateOneRequiredWithoutStudyStatsNestedInput
  }

  export type StudyStatUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    pairId?: StringFieldUpdateOperationsInput | string
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confidence?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudyStatUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    pairId?: StringFieldUpdateOperationsInput | string
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confidence?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HumanizerRunUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    outputText?: StringFieldUpdateOperationsInput | string
    saplingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    iterations?: IntFieldUpdateOperationsInput | number
    similarity?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HumanizerRunUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    outputText?: StringFieldUpdateOperationsInput | string
    saplingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    iterations?: IntFieldUpdateOperationsInput | number
    similarity?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HumanizerRunUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    inputText?: StringFieldUpdateOperationsInput | string
    outputText?: StringFieldUpdateOperationsInput | string
    saplingScore?: NullableFloatFieldUpdateOperationsInput | number | null
    iterations?: IntFieldUpdateOperationsInput | number
    similarity?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PairCreateManySubmissionInput = {
    id?: string
    userId: string
    term: string
    definition: string
    question: string
    answer: string
    order: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PairUpdateWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPairsNestedInput
    studyStats?: StudyStatUpdateManyWithoutPairNestedInput
  }

  export type PairUncheckedUpdateWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    studyStats?: StudyStatUncheckedUpdateManyWithoutPairNestedInput
  }

  export type PairUncheckedUpdateManyWithoutSubmissionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    term?: StringFieldUpdateOperationsInput | string
    definition?: StringFieldUpdateOperationsInput | string
    question?: StringFieldUpdateOperationsInput | string
    answer?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudyStatCreateManyPairInput = {
    id?: string
    userId: string
    correctCount?: number
    incorrectCount?: number
    lastReviewed?: Date | string | null
    confidence?: number | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudyStatUpdateWithoutPairInput = {
    id?: StringFieldUpdateOperationsInput | string
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confidence?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutStudyStatsNestedInput
  }

  export type StudyStatUncheckedUpdateWithoutPairInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confidence?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudyStatUncheckedUpdateManyWithoutPairInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    correctCount?: IntFieldUpdateOperationsInput | number
    incorrectCount?: IntFieldUpdateOperationsInput | number
    lastReviewed?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    confidence?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}