const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID} = graphql;

const books = [
    {name: 'Naruto', genre: 'Fantasy', id: '1'},
    {name: 'Death Note', genre: 'Erotic', id: '2'},
    {name: 'Bleach', genre: 'Action', id: '3'}
];
const authors = [
    {name: 'Maria', age: 44, id: '1'},
    {name: 'Pedro', age: 20, id: '2'},
    {name: 'Juan', age: 25, id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return _.find(authors, {id: args.id});
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});