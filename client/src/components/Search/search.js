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
            response: '',
            from: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nextFunction = this.nextFunction.bind(this);
        this.prevFunction = this.prevFunction.bind(this);
    }

    componentDidMount() {
        this.setState({ artistName: "", trackName: "", response: '', from: 0 });
    }

    nextFunction(event) {
        event.preventDefault();
        this.setState({ from: this.state.from + 30 });
        console.log(this.state.from);

        if (this.state.artistName.length > 0) {
            axios.post(`/data/getData?from=${this.state.from}`, {
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

    prevFunction(event) {
        event.preventDefault();
        this.setState({ from: this.state.from - 30 });
        console.log(this.state.from);
        if (this.state.from >= 0) {
            if (this.state.artistName.length > 0) {
                axios.post(`/data/getData?from=${this.state.from}`, {
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
        } else {
            console.log("Can't go back any further.");
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
        console.log(this.state.from);
        if (this.state.artistName.length > 0) {
            axios.post(`/data/getData?from=${this.state.from}`, {
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