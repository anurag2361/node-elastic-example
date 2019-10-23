import React, { Component } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { withRouter } from 'react-router-dom';

class Result extends Component {

    render() {
        console.log(this.props.response);
        return (

            <div className="table-responsive table-responsive-md table-responsive-sm table-responsive-xl table-responsive-lg">
                <table className="table table-striped table-bordered table-hover table-dark">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Image</th>
                            <th scope="col">Song</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Album</th>
                            <th scope="col">Price</th>
                            <th scope="col">Country</th>
                            <th scope="col">Currency</th>
                            <th scope="col">Release Date</th>
                            <th scope="col">Preview</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.response.length === 0 ? <tr>
                            <td>No Image Available</td>
                            <td>No Data Available</td>
                            <td>No Data Available</td>
                            <td>No Data Available</td>
                            <td>No Data Available</td>
                            <td>No Data Available</td>
                            <td>No Data Available</td>
                            <td>No Data Available</td>
                            <td>No Preview Available</td>
                        </tr> : this.props.response.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td><img src={item._source.artworkUrl100} alt="" /></td>
                                    <td>{item._source.trackName}</td>
                                    <td>{item._source.artistName}</td>
                                    <td>{item._source.collectionName}</td>
                                    <td>{item._source.collectionPrice}</td>
                                    <td>{item._source.country}</td>
                                    <td>{item._source.currency}</td>
                                    <td>{(item._source.releaseDate).substring(0, 10)}</td>
                                    <td><ReactAudioPlayer src={item._source.previewUrl} controls /></td>
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