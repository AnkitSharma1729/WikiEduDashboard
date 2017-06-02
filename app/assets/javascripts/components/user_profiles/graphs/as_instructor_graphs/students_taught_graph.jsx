import React from 'react';

const StudentsTaughtGraph = React.createClass({
  propTypes: {
    statsData: React.PropTypes.array,
    graphWidth: React.PropTypes.number,
    graphHeight: React.PropTypes.number
  },

  renderGraph() {
    const vegaSpec = {
      width: this.props.graphWidth,
      height: this.props.graphHeight,
      padding: { top: 40, left: 70, right: 20, bottom: 35 },
      // //////////////////
      // Scales and Axes //
      // //////////////////
      scales: [
        {
          name: 'x',
          type: 'time',
          domain: {
            fields: [{
              data: 'courses_data',
              field: 'created_at=',
              sort: { field: 'date', op: 'min' }
            }
            ]
          },
          rangeMin: 0,
          rangeMax: this.props.graphWidth,
          round: true
        },
        {
          name: 'y',
          type: 'ordinal',
          domain: {
            data: 'courses_data',
            field: 'index'
          },
          rangeMin: this.props.graphHeight,
          rangeMax: 0,
          round: true,
          nice: true,
          zero: true
        }
      ],
      axes: [
        {
          type: 'x',
          scale: 'x',
          grid: true,
          layer: 'back',
          title: 'Date',
          ticks: 10,
          properties: {
            labels: {
              text: { template: '{{datum["data"] | time:\'%b\'%d/%y\'}}' },
              angle: { value: 0 },
              fontSize: { value: 9 }
            }
          }
        },
        {
          type: 'y',
          scale: 'y',
          title: 'Students taught',
          grid: true,
          layer: 'back',
          offset: 10,
          ticks: 0,
          values: []
        }
      ],
      // ///////////////
      // Data Sources //
      // ///////////////
      data: [
        {
          name: 'courses_data',
          values: this.props.statsData,
          format: { type: 'json', parse: { 'created_at=': 'date' } }
        }
      ],
      // //////////////
      // Mark layers //
      // //////////////
      marks: [
        {
          name: 'text_marks',
          type: 'text',
          from: {
            data: 'courses_data',
            transform: [{ type: 'sort', by: '-date' }]
          },
          properties: { enter: {
            orient: { value: 'vertical' },
            x: { scale: 'x', field: 'created_at=' },
            y: { scale: 'y', field: 'index', offset: -3 },
            fill: { value: '#000' },
            text: { field: 'index' }
          } }
        },
        {
          name: 'symbol_marks',
          type: 'symbol',
          from: {
            data: 'courses_data',
            transform: [{ type: 'sort', by: '-date' }]
          },
          properties: { enter: {
            x: { scale: 'x', field: 'created_at=' },
            y: { scale: 'y', field: 'index', offset: -1 },
            size: { value: 60 },
            shape: { value: 'circle' },
            fill: { value: '#359178' },
            opacity: { value: 0.7 }
          }
          }
        }
      ]
    };
    const embedSpec = {
      mode: 'vega', // instruct Vega-Embed to use vega compiler.
      spec: vegaSpec,
      actions: false
    };
    // emded the visualization in the container with id vega-graph-article_id
    vg.embed('#StudentsTaughGraph', embedSpec); // Callback receiving View instance and parsed Vega spec
  },

  render() {
    console.log("student stats data");
    console.log(this.props.statsData);
    this.renderGraph();
    return (
      <div id ="stats_graph">
        <h5>StudentsTaughtGraph </h5>
        <div id= "StudentsTaughGraph" />
      </div>
    );
  }
});

export default StudentsTaughtGraph;
