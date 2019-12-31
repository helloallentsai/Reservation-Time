import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';

import Title from './components/title.jsx';
import Info from './components/info.jsx';
import Review from './components/review.jsx';
import Tag from './components/tag.jsx';
import Description from './components/description.jsx';

let params = (new URL(document.location)).searchParams;
let restaurantid = parseInt(params.get('restaurantid')) || 1;
console.log('restaurantid = ', restaurantid);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'overview',
      _data: {},
      reviewStars: [],
      topTags: [],
      _id: restaurantid,
    };

    $.ajax({
      type: 'GET',
      // url: '/api/restaurant/' + this.state._id,
      url: `/api/restaurant/${restaurantid}`,
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        console.log('=== GET request success! ===');
        console.log(data);
        this.setState(state => ({
          _data: data,
          reviewStars: data.reviewstars,
          topTags: data.toptags,
        }));
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(xhr, status);
        console.log(err);
        console.log('GET request failed!');
      }.bind(this)
    });
  }

  render() {
    return (
      <div>
        <Title title={this.state._data} />
        <div>
          <Review review={this.state} />
          <Info info={this.state._data} />
        </div>
        <Tag tag={this.state} />
        <Description description={this.state._data} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('overview-section'));