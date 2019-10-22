# Node-ElasticSearch

## What is this?

This app consumes iTunes API to save song/album information of a specified artist (given by user) and feeds the data in ElasticSearch. It then searches for the data through frontend made in React.

## Why was it made?

Mainly for my practice with ES and to showcase the tremendous abilities of the already famous ElasticSearch.

## How to run this?

1. Go to [This link](https://www.elastic.co/guide/en/elasticsearch/reference/7.4/install-elasticsearch.html) to install ElasticSearch in your system.

2. Install/Download and run ElasticSearch as prescribed in the docs.

3. Download and install Nodejs from [here](https://nodejs.org/en/)

4. Git clone this project and go into the downloaded directory.

5. Run `npm install` from your system's terminal (or `sudo npm install if you're on Linux`).

6. Start the app through typing `npm run dev` from your terminal.

7. Download and install Postman through [Postman](https://www.getpostman.com/)

8. Make a POST request in Postman to `http://localhost:3001/data/feedData` with a body parameter key as `artist` and it's value as your favorite music artist. This will feed the album/song data into ElasticSearch. You can feed as many artist's data as you like. Just keep changing the value of artist in body parameter.

9. Now, the data is there. You can start typing in the fields of the app frontend and see your results!!


## What does it do?

You can type either an artist name or a song name in the specified fields and it will display the results as you type.