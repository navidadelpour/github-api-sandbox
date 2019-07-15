import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context'

const TOKEN = ""

const httpLink = createHttpLink({
    uri: "https://api.github.com/graphql",
})

const authLink = setContext(({headers}) => {
    return {
        headers: {
            ...headers,
            authorization: TOKEN ? `Bearer ${TOKEN}` : ""
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
})

export default client