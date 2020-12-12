var clicks = 0;
var lastClick = [0, 0];
 var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
// c.addEventListener('click', drawLine, false);

var file= "/Image_Data/image01_2014_03_17.csv";
var data;
var maxRows=650;
var maxColumns=650;
var pixelSize= 1;


d3.csv(file).then(data => {

  data.forEach(function(d) {
 });

   var imgdata = ctx.getImageData(0, 0, 651, 651);
     var imgdatalen = imgdata.data.length;

     for (var i = 0; i < imgdatalen / 4; i++) { //iterate over every pixel in the canvas

       imgdata.data[4 * i] = data[i].B3; // RED (0-255)
       imgdata.data[4 * i + 1] = data[i].B2; // GREEN (0-255)
       imgdata.data[4 * i + 2] = data[i].B1; // BLUE (0-255)
       imgdata.data[4 * i + 3] = 255; // APLHA (0-255)
     }
     ctx.putImageData(imgdata, 0, 0);

     ctx.fillStyle = 'limeGreen';
     ctx.font = "20px Arial";
     ctx.fillText("33 Pixels", 170, 490);



     var oldCanvas = c.toDataURL("image/png");
     var img = new Image();
     img.src = oldCanvas;
      window.addEventListener('mousemove',hover,false);
      function getMousePos (c, event) {
          var rect = c.getBoundingClientRect();
          return {
              x: event.clientX - rect.left,
              y: event.clientY - rect.top
          };
      }
      function hover (event){
          pos = getMousePos(c,event);

      }
      ctx.beginPath();
      ctx.moveTo(154, 472);
      ctx.lineTo(154, 506, 6);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      clicks = 0;

  });

function drawLine(e) {
    context = this.getContext('2d');

    x = getCursorPosition(e)[0] - this.offsetLeft;
    y = getCursorPosition(e)[1] - this.offsetTop;

    if (clicks != 1) {
        clicks++;
    } else {
        context.beginPath();
        context.moveTo(lastClick[0], lastClick[1]);
        context.lineTo(x, y, 6);

        context.strokeStyle = '#000000';
        context.stroke();

        clicks = 0;
    }

    lastClick = [x, y];
};
