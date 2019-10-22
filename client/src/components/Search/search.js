import React, { Component } from 'react';
import axios from 'axios';
import Result from "./../Result/result";
import { withRouter } from 'react-router-dom';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            artistName: '',
            trackName: '',
            response: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ artistName: "", trackName: "", response: '' });
    }

    handleSubmit(event) {
        event.preventDefault();
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
        if (this.state.artistName.length > 0) {
            axios.post("/data/getData", {
                artistName: this.state.artistName
            }).then((data) => {
                this.setState({ response: data.data.hits.hits });
                console.log(this.state.response);
            }).catch((error) => {
                console.log(error);
            });
        } else {
            axios.post("/data/getData", {
                trackName: this.state.trackName
            }).then((data) => {
                this.setState({ response: data.data.hits.hits });
                console.log(this.state.response);
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    render() {
        const { response } = this.state;
        console.log(this.state);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <p>Enter Artist or Track Name:</p>
                    <input type="text" id="trackName" name="trackName" value={this.state.trackName} onChange={this.handleSubmit} placeholder="Track Name" />
                    <input type="text" id="artistName" name="artistName" value={this.state.artistName} onChange={this.handleSubmit} placeholder="Artist Name" />
                    <button type="submit">Submit</button>
                    <Result response={response} />
                </form>
            </div>
        )
    }

}

withRouter(Search);
export default Search;