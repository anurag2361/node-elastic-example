import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Result extends Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props.response);
        return (

            <div>
                <table className="ResultTable">
                    <thead>
                        <th>Song</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Price</th>
                        <th>Country</th>
                        <th>Currency</th>
                        <th>Release Date</th>
                    </thead>
                    <tbody>
                        {this.props.response.length === 0 ? <tr>
                            <td>No Data Available</td>
                            <td>No Data Available</td>
                            <td>No Data Available</td>
                            <td>No Data Available</td>
                            <td>No Data Available</td>
                            <td>No Data Available</td>
                            <td>No Data Available</td>
                        </tr> : this.props.response.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item._source.trackName}</td>
                                    <td>{item._source.artistName}</td>
                                    <td>{item._source.collectionName}</td>
                                    <td>{item._source.collectionPrice}</td>
                                    <td>{item._source.country}</td>
                                    <td>{item._source.currency}</td>
                                    <td>{item._source.releaseDate}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div >
        )
    }

}

withRouter(Result);
export default Result;