var React = require('react');
var $ = require('jquery');

const RandomArticle = React.createClass({
    render: function () {
        return (
            <a target="_blank" href="https://en.wikipedia.org/wiki/Special:Random" className="RandomArticle">
                Random Article
            </a>
        );
    }
});

const SearchBar = React.createClass({
    getInitialState: function () {
        return {
            searchText: ''
        }
    },
    handleChange: function (e) {
        this.setState({
            searchText: e.target.value
        });
        this.props.getSearchText(e.target.value);
    },
    render: function () {
        return (
            <div className="SearchBar">
                <input
                    placeholder="Enter Search Term"
                    type="text"
                    value={this.state.searchText}
                    onChange={this.handleChange}
                    className="SearchTextInput"
                    onKeyUp={this.props.handleEnter}
                    />
                <a onClick={this.props.getResultsList} className="SearchButtonLink">
                    <i className="fa fa-search fa-2x searchButton"></i>
                </a>
            </div>
        )
    }
});
const ResultsList = React.createClass({
    render: function () {
        var data = [];
        var LIST = [];

        if (this.props.data) {
            data = this.props.data;

            for (var key in data) {
                var pageid = data[key].pageid;

                LIST.push(
                    <li id={pageid} key={pageid} className="Result">
                        <a href={"https://en.wikipedia.org/?curid=" + pageid} target="_blank" className="wikiLink">
                            <p className="ResultTitle">{data[key].title}</p>
                            <p className="ResultExtract">{data[key].extract}</p>
                        </a>
                    </li>
                );
            }
        }
        return (
            <ul className= "ResultsList" >
                {LIST}
            </ul >
        );
    }
});

const App = React.createClass({
    getInitialState: function () {
        return {
            query: '',
            data: []
        }
    },
    getSearchText: function (q) {
        var query = q.split(" ").join("%20");
        this.setState({
            query: query
        });
    },
    handleEnterPress: function (key) {
        var add = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
        var url = add + this.state.query;
        if (key.which == 13) {
            $.ajax({
                url: url,
                dataType: 'jsonp',
                cache: 'true',
                success: function (data) {
                    this.setState({
                        data: data.query.pages
                    });
                    console.log(data.query.pages[2256889]);
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(url, err.toString());
                }.bind(this)
            });
        }
    },
    getResultsList: function () {
        var add = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
        var url = add + this.state.query;
        if (this.state.query) {
            $.ajax({
                url: url,
                dataType: 'jsonp',
                cache: 'true',
                success: function (data) {
                    this.setState({
                        data: data.query.pages
                    });
                }.bind(this),
                error: function (xhr, status, err) {
                    console.log(url, err.toString());
                }.bind(this)
            });
        }
    },
    render: function () {
        return (
            <div className="App">
                <SearchBar
                    getSearchText={this.getSearchText}
                    handleEnter={this.handleEnterPress}
                    getResultsList={this.getResultsList}
                    />
                <RandomArticle />
                <ResultsList data={this.state.data} />
            </div>
        )
    }
});
const Footer = React.createClass({
    render: function () {
        return (
            <div className="footerWrapper">
                <div className="footer">
                    <a href="https://github.com/ishanjain28/wikipedia-viewer">Github</a>
                    <a href="mailto:ishanjain28@gmail.com">Contact</a>
                    <a href="https://twitter.com/ishanjain28">Twitter</a>
                </div>
            </div>
        );
    }
});
const AppContainer = React.createClass({
    render: function () {
        return (
            <div className="AppRoot">
                <App />
                <Footer />
            </div>
        )
    }
});

module.exports = AppContainer;