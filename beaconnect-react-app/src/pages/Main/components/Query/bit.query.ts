import { gql } from '@apollo/client';

export type postBitMutationVariables = {
    content: string;
};

export type postBitMutationResult = {
    postBit: {
        id: string;
    };
};

export const postBitQuery = gql`
    mutation PostBit($content: String!) {
        postBit(content: $content) {
            id
        }
    }
`;
