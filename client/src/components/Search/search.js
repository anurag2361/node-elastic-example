import React, { Component } from 'react';
import axios from 'axios';
import Result from "./../Result/result";
import { withRouter } from 'react-router-dom';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            artistName: '',
            response: '',
            from: 0
        };
        this.handleArtistSubmit = this.handleArtistSubmit.bind(this);
        this.nextFunction = this.nextFunction.bind(this);
        this.prevFunction = this.prevFunction.bind(this);
    }

    componentDidMount() {
        this.setState({ artistName: "", response: '' });
    }

    nextFunction(event) {
        event.preventDefault();
        this.setState({ from: this.state.from + 30 });

        if (this.state.artistName.length > 0) {
            axios.post(`/data/getData?from=${this.state.from}`, {
                artistName: this.state.artistName
            }).then((data) => {
                this.setState({ response: data.data.hits.hits });
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    prevFunction(event) {
        event.preventDefault();
        this.setState({ from: this.state.from - 30 });
        if (this.state.from >= 0) {
            if (this.state.artistName.length > 0) {
                axios.post(`/data/getData?from=${this.state.from}`, {
                    artistName: this.state.artistName
                }).then((data) => {
                    this.setState({ response: data.data.hits.hits });
                }).catch((error) => {
                    console.log(error);
                });
            }
        } else {
            console.log("Can't go back any further.");
        }
    }

    handleArtistSubmit(event) {
        event.preventDefault();
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
        axios.post(`/data/getData?from=${this.state.from}`, {
            artistName: this.state.artistName
        }).then((data) => {
            this.setState({ response: data.data.hits.hits });
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        const { response } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="artistName" name="artistName" value={this.state.artistName} onChange={this.handleArtistSubmit} placeholder="Search by Track, Artist, Album" />
                    <button className="btn btn-success" type="submit">Submit</button>
                </form>
                <button className="btn btn-primary float-md-left lbut" onClick={this.prevFunction}> Previous </button>
                <button className="btn btn-info float-md-right rbut" onClick={this.nextFunction}> Next </button>
                <Result response={response} />
            </div>
        )
    }

}

withRouter(Search);
export default Search;