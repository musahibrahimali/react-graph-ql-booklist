import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import {
    addBookMutation,
    getAuthorsQuery,
    getBooksQuery
} from '../functions/queries';

const initialValues = {
    name: '',
    genre: '',
    authorId: ''
};

const AddBook = (props) => {
    const [values, setValues] = React.useState(initialValues);

    const displayAuthors = () => {
        var data = props.getAuthorsQuery;
        if (data.loading) {
            return (
                <option disabled>
                    Loading authors
                </option>
            );
        } else {
            return data.authors.map(author => {
                return (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                );
            });
        }
    }
    const onChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    const submitForm = (event) => {
        event.preventDefault();
        // use the addBookMutation
        props.addBookMutation({
            variables: {
                name: values.name,
                genre: values.genre,
                authorId: values.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        });
    }

    return (
        <form id="add-book" onSubmit={submitForm} >
            <div className="field">
                <label>Book name:</label>
                <input
                    type="text"
                    name='name'
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input
                    type="text"
                    name='genre'
                    onChange={onChange}
                />
            </div>
            <div className="field">
                <label>Author:</label>
                <select name='authorId' onChange={onChange} >
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    );
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
