const graphql = require('graphql');
const {
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = graphql;
const _ = require('lodash');
const Book = require('../models/book.model');
const Author = require('../models/author.model');

// define a book type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // find bookes in the Author model
                return Author.findById(parent.authorId);
            }
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
});


// define an author type
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // find all the author related to the book with the book model
                return Book.find({ authorId: parent.id });
            }
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
});

// set up mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // add an author
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                // create a new author
                const author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },

        // add a book
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                // create a new book
                const book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

// create a root query object
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        // get a book by id
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // find book by id with the book model
                return Book.findById(args.id);
            }
        },
        // get all books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
                // return the list of all books
                return Book.find();
            }
        },
        // get an author by id
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return  the autho  by id with the author model
                return Author.findById(args.id);
            }
        },
        // get all authors
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return all authors
                return Author.find();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
