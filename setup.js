
var svg = d3.select("body").append("svg");
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
var mapData;

// declare the selecters
const ist_band = document.querySelector('#Band_1');
const sec_band = document.querySelector('#Band_2');
const thi_band = document.querySelector('#Band_3');

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

    data = values[0];
    drawMap();
  })

});

// when any of the bands is changed
ist_band.addEventListener('change', drawMap);
sec_band.addEventListener('change', drawMap);
thi_band.addEventListener('change', drawMap);


function drawMap() {
  var imgdata = ctx.getImageData(0, 0, 651, 651);
  var imgdatalen = imgdata.data.length;

  for (var i = 0; i < imgdatalen / 4; i++) { //iterate over every pixel in the canvas

    imgdata.data[4 * i] = data[i][ist_band.value]; // RED (0-255)
    imgdata.data[4 * i + 1] = data[i][sec_band.value]; // GREEN (0-255)
    imgdata.data[4 * i + 2] = data[i][thi_band.value]; // BLUE (0-255)
    imgdata.data[4 * i + 3] = 255; // APLHA (0-255)
  }
  ctx.putImageData(imgdata, 0, 0);

  // var oldCanvas = c.toDataURL("image/png");
  // var img = new Image();
  // img.src = oldCanvas;
  // img.onload = function() {
  //   ctx.clearRect(0, 0, c.width, c.height);
  //   ctx.drawImage(img, 0, 0, 300, 300);
  //   c.style.visibility = 'visible';
  // }
}
