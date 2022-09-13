import { isObject, isUndefined, filter, map } from "lodash";
import { getPieDimensions } from "./preparePieData";

function multipleStringLines(longTextFormatter: any) {
  if (longTextFormatter.length > 40 && longTextFormatter.length < 80) { // check if greater than threshold!
    let y_axis = longTextFormatter.split(' ');    //break into words
    let interval = longTextFormatter.split(' ').length / 2;     //2-lines
    return y_axis.slice(0, interval).join(' ') + '<br>' + y_axis.slice(interval, y_axis.length).join(' ');
  } else if (longTextFormatter.length > 80) { // check if greater than threshold!
    let y_axis = longTextFormatter.split(' ');    //break into words
    let interval = longTextFormatter.split(' ').length / 3;     //2-lines
    return y_axis.slice(0, interval).join(' ') + '<br>' + y_axis.slice(interval, interval+interval).join(' ') + '<br>' + y_axis.slice(interval+interval, y_axis.length).join(' ');
  }
   return longTextFormatter;
}

function smallscreenmultipleStringLines(longTextFormatter: any) {
  if (longTextFormatter.length > 20) { // check if greater than threshold!
              let y_axis = longTextFormatter.split(' ');    //break into words
              let interval = longTextFormatter.split(' ').length / 5;    //2-lines
			  var split1 = y_axis.slice(0, 3).join(' ').length < 22 ? y_axis.slice(0, 3).join(' ') : y_axis.slice(0, 2).join(' ') + '<br>' + y_axis.slice(2, 3).join(' ');
			  var split2 = y_axis.slice(3, 6).join(' ').length < 22 ? y_axis.slice(3, 6).join(' ') : y_axis.slice(3, 4).join(' ') + '<br>' + y_axis.slice(4, 6).join(' ');
			  var split3 = y_axis.slice(6, 9).join(' ').length < 22 ? y_axis.slice(6, 9).join(' ') : y_axis.slice(6, 8).join(' ') + '<br>' + y_axis.slice(8, 9).join(' ');
			  var split4 = y_axis.slice(9, 12).join(' ').length < 22 ? y_axis.slice(9, 12).join(' ') : y_axis.slice(9, 11).join(' ') + '<br>' + y_axis.slice(11, 12).join(' ')
			  var split5 = y_axis.slice(12, y_axis.length).join(' ').length < 22 ? y_axis.slice(12, y_axis.length).join(' ') : y_axis.slice(12, 14).join(' ') + '<br>' + y_axis.slice(14, y_axis.length).join(' ');
              return split1 + '<br>' + split2 + '<br>' + split3 + '<br>' + split4 + '<br>' + split5;
  }
   return longTextFormatter;
}

function smallscreenlegendmultipleStringLines(longTextFormatter: any) {
  if (longTextFormatter.length > 40 && longTextFormatter.length < 80) { // check if greater than threshold!
              let y_axis = longTextFormatter.split(' ');    //break into words
              let interval = longTextFormatter.split(' ').length / 2;     //2-lines
              return y_axis.slice(0, interval).join(' ') + '<br>' + y_axis.slice(interval, y_axis.length).join(' ');
  } else if (longTextFormatter.length > 80) { // check if greater than threshold!
    let y_axis = longTextFormatter.split(' ');    //break into words
    let interval = longTextFormatter.split(' ').length / 3;     //2-lines
    return y_axis.slice(0, interval).join(' ') + '<br>' + y_axis.slice(interval, interval+interval).join(' ') + '<br>' + y_axis.slice(interval+interval, y_axis.length).join(' ');
  }
   return longTextFormatter;
}

function getAxisTitle(axis: any) {
  return isObject(axis.title) ? axis.title.text : null;
}

function getAxisScaleType(axis: any) {
  switch (axis.type) {
    case "datetime":
      return "date";
    case "logarithmic":
      return "log";
    default:
      return axis.type;
  }
}

function prepareXAxis(axisOptions: any, additionalOptions: any) {
  const axis = {
    title: getAxisTitle(axisOptions),
    type: getAxisScaleType(axisOptions),
    automargin: true,
  };

  if (additionalOptions.sortX && axis.type === "category") {
    if (additionalOptions.reverseX) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryorder' does not exist on type '{... Remove this comment to see the full error message
      axis.categoryorder = "category descending";
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'categoryorder' does not exist on type '{... Remove this comment to see the full error message
      axis.categoryorder = "category ascending";
    }
  }

  if (!isUndefined(axisOptions.labels)) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showticklabels' does not exist on type '... Remove this comment to see the full error message
    axis.showticklabels = axisOptions.labels.enabled;
  }

  return axis;
}

function prepareYAxis(axisOptions: any) {
  return {
    title: getAxisTitle(axisOptions),
    type: getAxisScaleType(axisOptions),
    automargin: true,
    autorange: true,
    range: null,
  };
}

function preparePieLayout(layout: any, options: any, data: any) {
  const hasName = /{{\s*@@name\s*}}/.test(options.textFormat);

  if (screen.width < 960) {
    for(var i = 0; i < data.length; i++) {
      var xaxisdata = data[i].labels;
      for(var j = 0; j < xaxisdata.length; j++) {
        data[i].labels[j] = smallscreenlegendmultipleStringLines(xaxisdata[j]);
      };
    };
  };

  const { cellsInRow, cellWidth, cellHeight, xPadding } = getPieDimensions(data);

  if (hasName) {
    layout.annotations = [];
  } else {
    layout.annotations = filter(
      map(data, (series, index) => {
        // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        const xPosition = (index % cellsInRow) * cellWidth;
        // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        const yPosition = Math.floor(index / cellsInRow) * cellHeight;
        let adjustedYPosition = cellHeight == 0.5 ? 0.015 : 0.065;
        return {
          x: xPosition + (cellWidth - xPadding) / 2,
          y: yPosition + cellHeight + adjustedYPosition,
          xanchor: "center",
          yanchor: "top",
          text: multipleStringLines(series.name),
          showarrow: false,
        };
      })
    );
  }

  return layout;
}

function prepareDefaultLayout(layout: any, options: any, data: any) {
  if (screen.width < 960 && options.globalSeriesType == 'column') {
    layout.margin = { l: 150, r: 10, b: 5, t: 20, pad: 4 };
    for(var i = 0; i < data.length; i++) {
      var xaxisdata = data[i].x;
      var legendvalue = data[i].name;
      data[i].name = smallscreenlegendmultipleStringLines(legendvalue);
      for(var j = 0; j < xaxisdata.length; j++) {
        data[i].x[j] = smallscreenmultipleStringLines(xaxisdata[j]);
      };
    };
  };

  const y2Series = data.filter((s: any) => s.yaxis === "y2");

  layout.xaxis = prepareXAxis(options.xAxis, options);

  layout.yaxis = prepareYAxis(options.yAxis[0]);
  if (y2Series.length > 0) {
    layout.yaxis2 = prepareYAxis(options.yAxis[1]);
    layout.yaxis2.overlaying = "y";
    layout.yaxis2.side = "right";
  }

  if (options.series.stacking) {
    layout.barmode = "relative";
  }

  return layout;
}

function prepareBoxLayout(layout: any, options: any, data: any) {
  layout = prepareDefaultLayout(layout, options, data);
  layout.boxmode = "group";
  layout.boxgroupgap = 0.5;
  return layout;
}

export default function prepareLayout(element: any, options: any, data: any) {
  let layout = {
    margin: { l: 10, r: 10, b: 5, t: 25, pad: 4 },
    // plot size should be at least 5x5px
    width: Math.max(5, Math.floor(element.offsetWidth)),
    height: Math.max(5, Math.floor(element.offsetHeight)),
    autosize: false,
    showlegend: options.legend.enabled,
    legend: {
      traceorder: options.legend.traceorder,
    },
    hoverlabel: {
      namelength: -1,
      "font": {
        "family": "'BCSans', 'Noto Sans', Verdana, Arial, sans-serif"
      },
    },
    font: {
      family: "'BCSans', 'Noto Sans', Verdana, Arial, sans-serif",
      size: 13,
    },
  };

  switch (options.globalSeriesType) {
    case "pie":
      return preparePieLayout(layout, options, data);
    case "box":
      return prepareBoxLayout(layout, options, data);
    default:
      return prepareDefaultLayout(layout, options, data);
  }
}
