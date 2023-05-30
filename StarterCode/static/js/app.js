// //  Use D3 library to read in sample.json from the following url: 
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

d3.json(url).then(data =>{
    console.log(data) 
});
// Start dashboard 
function init() {

  // Create dropdown menu with d3 
  let selector = d3.select("#selDataset");

  // Use d3 to get the sample names and populate selector
  d3.json(url).then(data => {

    // Set variable for sample names 
    let sampleNames = data.names;

    // Include samples in dropdown menu
    sampleNames.forEach((id) => {

      // Log value of id for each iteration of the loop 
      console.log(id);

      selector
          .append("option")
          .text(id)
          .property("value", id);
    });

    //  Set first sample from the list 
        let sample_one = names[0];

         // Log the value of sample_one
         console.log(sample_one);
 
         // Build the initial plots
         buildMetadata(sample_one);
         buildBarChart(sample_one);
         buildBubbleChart(sample_one);
         buildGaugeChart(sample_one);
 
     });
 };

 // Function that populates metadata info
function buildMetadata(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then((data) => {

      // Retrieve all metadata
      let metadata = data.metadata;

      // Filter based on the value of the sample
      let value = metadata.filter(result => result.id == sample);

      // Log the array of metadata objects after the have been filtered
      console.log(value)

      // Get the first index from the array
      let valueData = value[0];

      // Clear out metadata
      d3.select("#sample-metadata").html("");

      // Use Object.entries to add each key/value pair to the panel
      Object.entries(valueData).forEach(([key,value]) => {

          // Log the individual key/value pairs as they are being appended to the metadata panel
          console.log(key,value);

          d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
      });
  });

};
// Function that builds the bar chart
function buildBarChart(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then(data => {

      // Retrieve all sample data
      let sampleData = data.samples;

      // Filter based on value of the sample
      let value = sampleData.filter(result => result.id == sample);

      // Get the first index from the array
      let selected_value = value[0];

      // Get the otu_ids, lables, and sample values
      let otu_ids = selected_value.otu_ids;
      let otu_labels = selected_value.otu_labels;
      let sample_values = selected_value.sample_values;

      // Log the data to the console
      console.log(otu_ids,otu_labels,sample_values);

      // Set top ten items to display in descending order
      let sorted_otu_id = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
      let sorted_sample_values = sample_values.slice(0,10).reverse();
      let labels = otu_labels.slice(0,10).reverse();
      
      // Set up the trace for the bar chart
      let trace = {
          x: sorted_sample_values,
          y: sorted_otu_id,
          text: labels,
          type: "bar",
          orientation: "h"
      };

      // Setup the layout
      let layout = {
          title: "Top 10 OTUs Present"
      };

      // Call Plotly to plot the bar chart
      Plotly.newPlot("bar", [trace], layout)
  });
};

// Function that builds the bubble chart
function buildBubbleChart(sample) {

  // Use D3 to retrieve all of the data
  d3.json(url).then(data => {

    // Retrieve all sample data
    let sampleData = data.samples;

    // Filter based on value of the sample
    let value = sampleData.filter(result => result.id == sample);

    // Get the first index from the array
    let selected_value = value[0];

    // Get the otu_ids, lables, and sample values
    let otu_ids = selected_value.otu_ids;
    let otu_labels = selected_value.otu_labels;
    let sample_values = selected_value.sample_values;

    // Log the data to the console
    console.log(otu_ids,otu_labels,sample_values);
      
    // Set up the trace for the bubble chart
      let trace1 = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Rainbow"
          }
      };

      // Set up the layout
      let layout = {
          title: "Bacteria Per Sample",
          hovermode: "closest",
          xaxis: {title: "OTU ID"},
      };

      // Call Plotly to plot the bubble chart
      Plotly.newPlot("bubble", [trace1], layout)
  });
};

// Function that updates dashboard when sample is changed
function optionChanged(values) { 

  // Log the new value
  console.log(values); 

  // Call all functions 
  buildMetadata(values);
  buildBarChart(values);
  buildBubbleChart(values);
  buildGaugeChart(values);
};

// Call the initialize function
init();







