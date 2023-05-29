//  Use D3 library to read in sample.json from the following url: 


const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

d3.json(url).then(data =>{
    console.log(data)

// Creating dropdown menu
let selector = d3.select("#selDataset");
let sampleNames = data.names;

sampleNames.forEach((sample) => {
  selector
      .append("option")
      .text(sample)
      .property("value", sample);
});


// Filter the data for the specific user ID
var user_id = 940;
var sample = data.samples;
var selected_data = sample.filter(x => x.id == user_id);
console.log(selected_data);

// Extract the necessary values for the chart
var values = selected_data[0].sample_values;
var id = selected_data[0].otu_ids;
var labels = selected_data[0].otu_labels;

// Prepare the chart data
let chartData = [{
  x: values.slice(0, 10).reverse(),
  y: id.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse(),
  text: labels.slice(0, 10).reverse(),
  type: 'bar',
  orientation: 'h'
}];

// Define the layout for the chart})
let layout = {
  title: "Top Ten OTUs",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// Render the chart using Plotly
Plotly.newPlot("bar", chartData, layout);

});


 

