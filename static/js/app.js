
// load data 
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json")
.then((data) => {
    
    //select subject id values list
    const dd = d3.select("#selDataset")
    
    // populate the list
    const options = dd.selectAll("option")
        .data(data.names)
        .enter()
        .append("option");

    options.text(function(name) {
        return name;
        })
        .attr("value", function(d) {
        return d.values;
        });

});

