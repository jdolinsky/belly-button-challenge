// hold data
let data = []

//add event handler for the list
function optionChanged(v) {
    data_id = data.samples.find((e) => e.id == v)
    metadata = data.metadata.find((e) => e.id == v)
    console.log(data_id)
    buildTop10(data_id)
    displayInfo(metadata)
    buildBubbleChart(data_id)
}

function buildTop10(d) {
    console.info("Building top 10 OTUs")
    n = 10;
    //div for graph
    let div = "bar";
    // trace for data
    let trace = {
        x: d.sample_values.slice(0,n).reverse(),
        y: d.otu_ids.slice(0,n).map((id => "OTU " + id)).reverse(),
        type: "bar",
        orientation: "h",
        text: d.otu_labels.slice(0, 10).reverse(),
        marker: {
            color: 'rgb(231, 144, 125)'
          }
    }
    let layout = {
        margin: {
            t: 10
        },
        width: 500,
        height: 460,
    }
    Plotly.newPlot(div, [trace], layout);
}
// show demographic info
function displayInfo(d) {
    console.info("Building demographic info")
    let ul = d3.select("#ul-metadata")
    ul.selectAll("li").remove()
    for (key in d) {
        ul.append('li').text(`${key}: ${d[key]}`)
    }
}

// build bubble chart
function buildBubbleChart(d) {
    console.info("Building bubbles")
    trace = {
        x: d.otu_ids,
        y: d.sample_values,
        text: d.otu_labels,
        mode: "markers",
        marker: {
            color: d.otu_ids,
            colorscale: "Pastel",
            size: d.sample_values,
        },
        type: "scatter",
    };
    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
        height: 600
    }
    Plotly.newPlot("bubble", [trace], layout);
}


// load data 
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
.then((d) => {
    data = d
    //select subject id values list
    const dd = d3.select("#selDataset")
    
    // populate the list
    const options = dd.selectAll("option")
        .data(data.names)
        .enter()
        .append("option");

    options.text(function(id) {
        return id;
        })
        .attr("value", function(d) {
            return d.values;
        });

});

