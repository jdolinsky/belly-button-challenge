//add event handler for the list
function optionChanged(v) {
    data_id = data.samples.find((e) => e.id == v)
    metadata = data.metadata.find((e) => e.id == v)
    console.log(data_id)
    buildTop10(data_id)
    displayInfo(metadata)
}

function buildTop10(d) {
    console.info("Building top 10 OTUs")
    n = 10;
    //div for graph
    let div = "bar";
    // trace for data
    let trace = {
        x: d.sample_values.slice(0,n),
        y: d.otu_ids.slice(0,n).map((id => "OTU " + id)),
        type: "bar",
        orientation: "h"
    }
    Plotly.newPlot(div, [trace]);
}
// show demographic info
function displayInfo(d) {
    console.info("Building demographic info")
    let ul = d3.select("#ul-metadata")
    for (key in d) {
        ul.append('li').text(`${key}: ${d[key]}`)
    }
}
// hold data
let data = []

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

