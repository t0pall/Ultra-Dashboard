import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
  schema: "https://api.crm.refine.dev/graphql",
  extensions: {
    codegen: {
      hooks: {
        afterOneFileWrite: ["eslint --fix", "prettier --write"],
      },
      generates: {
        "src/graphql/schema.types.ts": {
          plugins: ["typescript"],
          config: {
            skipTypename: true, // skipTypename is used to remove __typename from the generated types
            enumsAsTypes: true, // enumsAsTypes is used to generate enums as types instead of enums.
            // scalars is used to define how the scalars i.e. DateTime, JSON, etc. will be generated
            // scalar is a type that is not a list and does not have fields. Meaning it is a primitive type.
            scalars: {
              // DateTime is a scalar type that is used to represent date and time
              DateTime: {
                input: "string",
                output: "string",
                format: "date-time",
              },
            },
          },
        },
        // generates typescript types from GraphQL operations
        // graphql operations are queries, mutations, and subscriptions we write in our code to communicate with the GraphQL API
        "src/graphql/types.ts": {
          preset: "import-types",
          // documents is used to define the path of the files that contain GraphQL operations
          documents: ["src/graphql/**/*.{ts,tsx}"],
          // plugins is used to define the plugins that will be used to generate typescript types from GraphQL operations
          plugins: ["typescript-operations"],
          config: {
            skipTypename: true,
            enumsAsTypes: true,
            // determine whether the generated types should be resolved ahead of time or not.
            // When preResolveTypes is set to false, the code generator will not try to resolve the types ahead of time.
            // Instead, it will generate more generic types, and the actual types will be resolved at runtime.
            preResolveTypes: false,
            // useTypeImports is used to import types using import type instead of import.
            useTypeImports: true,
          },
          // presetConfig is used to define the config of the preset
          presetConfig: {
            typesPath: "./schema.types",
          },
        },
      },
    },
  },
};

export default config;