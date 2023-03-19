import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://127.0.0.1:4000/graphql',
  generates: {
    './src/__generate__/gql.types.ts': {
      plugins: ['typescript'],
    },
  },
};

export default config;
