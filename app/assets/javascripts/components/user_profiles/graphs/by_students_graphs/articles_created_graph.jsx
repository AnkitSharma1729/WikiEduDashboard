import React from 'react';
const ArticlesCreatedGraph = React.createClass({
  propTypes: {
    statsData: React.PropTypes.array,
    graphWidth: React.PropTypes.number,
    graphHeight: React.PropTypes.number
  },

  render() {
    console.log('Article created count');
    console.log(this.props.statsData);
    return (
      <div id ="stats_graph">
        <h5>ArticlesCreatedGraph </h5>
      </div>
    );
  }
});
export default ArticlesCreatedGraph;
