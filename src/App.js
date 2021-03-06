import React, {Component} from "react";
import "./styles/styles.css";
import {fetchMovie} from "./modules/fetchers";
import AppView from "./components/App/AppView";

/**
 * The MovieDescription Db - React App
 * Container component
 *
 * @author Daniel Zawadzki <hello@danielzawadzki.com>
 * @constructor
 */

class App extends Component {

    /**
     * @constructor
     */
    constructor() {
        super();

        /**
         * @type {Object} state
         * @prop {Object} movieDescription - Contains description of presented movie.
         */
        this.state = {
            movieDescription: {}
        };

        this.setMovieDescription = this.setMovieDescription.bind(this);
    }

    /* Initial fetch - before component will mount*/
    componentWillMount() {
        this.setMovieDescription(127585);
    }

    /**
     * Setter for movie details.
     * @param {Number} id - MovieDescription id from TMDb database.
     */
    async setMovieDescription(id) {
        try {
            this.setState({
                movieDescription: await fetchMovie(id)
            })
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Renders the component.
     * @returns {ReactElement || XML}
     */
    render() {
        const appStyle = {
            backgroundImage: `linear-gradient(to right, rgba(9, 66, 59, .925) 0%, rgba(9, 28, 37, 0.925) 100%),
                    url('https://image.tmdb.org/t/p/original/${this.state.movieDescription.backdrop_path}')`,
            backgroundPosition: "top center",
            backgroundSize: "cover"
        };

        return (
            <AppView appStyle={appStyle}
                     setMovieDescription={this.setMovieDescription}
                     movieDescription={this.state.movieDescription}/>
        )
    }
}

export default App;
