

// declare the selecters
const ist_band = document.querySelector('#Band_1');
const sec_band = document.querySelector('#Band_2');
const thi_band = document.querySelector('#Band_3');
const img_data = document.querySelector('#images');
var data_mapper;

// This runs when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Load all files before doing anything else
  Promise.all([d3.csv("/Image_Data/image01_2014_03_17.csv"), d3.csv("/Image_Data/image02_2014_08_24.csv"),
              d3.csv("/Image_Data/image03_2014_11_28.csv"), d3.csv("/Image_Data/image04_2014_12_30.csv"),
              d3.csv("/Image_Data/image05_2015_02_15.csv"), d3.csv("/Image_Data/image06_2015_06_24.csv"),
              d3.csv("/Image_Data/image07_2015_09_12.csv"), d3.csv("/Image_Data/image08_2015_11_15.csv"),
              d3.csv("/Image_Data/image09_2016_03_06.csv"), d3.csv("/Image_Data/image10_2016_06_26.csv"),
              d3.csv("/Image_Data/image11_2016_09_06.csv"), d3.csv("/Image_Data/image12_2016_12_19.csv")])
          .then(function(values){

    data_2014_03_17 = values[0]; data_2014_08_24 = values[1]; data_2014_11_28 = values[2];
    data_2014_12_30 = values[3]; data_2015_02_15 = values[4]; data_2015_06_24 = values[5];
    data_2015_09_12 = values[6]; data_2015_11_15 = values[7]; data_2016_03_06 = values[8];
    data_2016_06_26 = values[9]; data_2016_09_06 = values[10]; data_2016_12_19 = values[11];

    // map input values to variables
    data_mapper = {'image01_2014_03_17': data_2014_03_17, 'image02_2014_08_24': data_2014_08_24, 'image03_2014_11_28': data_2014_11_28,
      'image04_2014_12_30': data_2014_12_30, 'image05_2015_02_15': data_2015_02_15, 'image06_2015_06_24': data_2015_06_24,
      'image07_2015_09_12': data_2015_09_12, 'image08_2015_11_15': data_2015_11_15, 'image09_2016_03_06': data_2016_03_06,
      'image10_2016_06_26': data_2016_06_26, 'image11_2016_09_06': data_2016_09_06, 'image12_2016_12_19': data_2016_12_19}
    
      drawMap();
      
    
  })
});


ist_band.addEventListener('change', drawMap);
sec_band.addEventListener('change', drawMap);
thi_band.addEventListener('change', drawMap);
img_data.addEventListener('change', drawMap);




