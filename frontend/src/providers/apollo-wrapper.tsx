'use client';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import type { PropsWithChildren } from 'react';

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
