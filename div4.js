// declare the selecters

const img_data = document.querySelector('#images');
const img_data1 = document.querySelector('#images1');
const img_data2 = document.querySelector('#images2');
var data_mapper;

// This runs when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load all files before doing anything else
    Promise.all([d3.csv("Image_Data/image01_2014_03_17.csv"), d3.csv("Image_Data/image02_2014_08_24.csv"),
        d3.csv("Image_Data/image03_2014_11_28.csv"), d3.csv("Image_Data/image04_2014_12_30.csv"),
        d3.csv("Image_Data/image05_2015_02_15.csv"), d3.csv("Image_Data/image06_2015_06_24.csv"),
        d3.csv("Image_Data/image07_2015_09_12.csv"), d3.csv("Image_Data/image08_2015_11_15.csv"),
        d3.csv("Image_Data/image09_2016_03_06.csv"), d3.csv("Image_Data/image10_2016_06_26.csv"),
        d3.csv("Image_Data/image11_2016_09_06.csv"), d3.csv("Image_Data/image12_2016_12_19.csv")])
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


img_data.addEventListener('change', drawMap);
img_data1.addEventListener('change', drawMap);
img_data2.addEventListener('change', drawMap);


function drawMap() {
    console.log("hi")
    // console.log(data_mapper)
    var c = document.getElementById("primaryCanvas");
    var ctx = c.getContext("2d");


    data = data_mapper[img_data.value];

    var imgdata = ctx.getImageData(0, 0, 651, 651);
    var imgdatalen = imgdata.data.length;

    var imgdataOriginal = ctx.getImageData(0, 0, 651, 651);
    for (var i = 0; i < imgdatalen / 4; i++) { //iterate over every pixel in the canvas

        imgdataOriginal.data[4 * i] = data[i].B3; // RED (0-255)
        imgdataOriginal.data[4 * i + 1] = data[i].B2; // GREEN (0-255)
        imgdataOriginal.data[4 * i + 2] = data[i].B1; // BLUE (0-255)
        imgdataOriginal.data[4 * i + 3] = 255; // APLHA (0-255)
    }
    ctx.putImageData(imgdataOriginal, 0, 0);
    var resizeOriginalImage= c.toDataURL("image/png");
    var img1 = new Image();
    img1.src = resizeOriginalImage;
    img1.onload = function() {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(img1, 200, 300, 400, 400);
        c.style.visibility = 'visible';
    }

    data1 = data_mapper[img_data1.value];
    var imgdata1 = ctx.getImageData(0, 0, 651, 651);
    var imgdatalen1 = imgdata1.data.length;

    var imgdataOriginal1 = ctx.getImageData(0, 0, 651, 651);
    for (var i = 0; i < imgdatalen1 / 4; i++) { //iterate over every pixel in the canvas

        imgdataOriginal1.data[4 * i] = data1[i].B3; // RED (0-255)
        imgdataOriginal1.data[4 * i + 1] = data1[i].B2; // GREEN (0-255)
        imgdataOriginal1.data[4 * i + 2] = data1[i].B1; // BLUE (0-255)
        imgdataOriginal1.data[4 * i + 3] = 255; // APLHA (0-255)
    }
    ctx.putImageData(imgdataOriginal1, 0, 0);
    var resizeOriginalImage1= c.toDataURL("image/png");
    var img2 = new Image();
    img2.src = resizeOriginalImage1;
    img2.onload = function() {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(img2, 550, 300, 400, 400);
        c.style.visibility = 'visible';
    }

    // data2 = data_mapper[img_data2.value];
    // var imgdata2 = ctx.getImageData(0, 0, 651, 651);
    // var imgdatalen2 = imgdata2.data.length;
    //
    // var imgdataOriginal2 = ctx.getImageData(0, 0, 651, 651);
    // for (var i = 0; i < imgdatalen2 / 4; i++) { //iterate over every pixel in the canvas
    //
    //     imgdataOriginal2.data[4 * i] = data2[i].B3; // RED (0-255)
    //     imgdataOriginal2.data[4 * i + 1] = data2[i].B2; // GREEN (0-255)
    //     imgdataOriginal2.data[4 * i + 2] = data2[i].B1; // BLUE (0-255)
    //     imgdataOriginal2.data[4 * i + 3] = 255; // APLHA (0-255)
    // }
    // ctx.putImageData(imgdataOriginal2, 0, 0);
    // var resizeOriginalImage= c.toDataURL("image2/png");
    // var img3 = new Image();
    // img3.src = resizeOriginalImage;
    // img3.onload = function() {
    //     ctx.clearRect(0, 0, c.width, c.height);
    //     ctx.drawImage(img3, 1000, 300, 400, 400);
    //     c.style.visibility = 'visible';
    // }

    // for (var i = 0; i < imgdatalen / 4; i++) { //iterate over every pixel in the canvas
    //
    //     imgdata.data[4 * i] = data[i][ist_band.value]; // RED (0-255)
    //     imgdata.data[4 * i + 1] = data[i][sec_band.value]; // GREEN (0-255)
    //     imgdata.data[4 * i + 2] = data[i][thi_band.value]; // BLUE (0-255)
    //     imgdata.data[4 * i + 3] = 255; // APLHA (0-255)
    // }
    // ctx.putImageData(imgdata, 0, 0);
    //
    // var resizeNewImage = c.toDataURL("image/png");
    // var img = new Image();
    // img.src = resizeNewImage;
    // img.onload = function() {
    //
    //     ctx.drawImage(img, 600, 300, 600, 600);
    //     c.style.visibility = 'visible';
    // }
}