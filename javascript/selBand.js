

function drawMap() {
    console.log("hi")
    // console.log(data_mapper)
    var c = document.getElementById("primaryCanvas");
    var ctx = c.getContext("2d");

    var d = document.getElementById("S_Canvas");
    var dtx = d.getContext("2d");

    data = data_mapper[img_data.value];
    console.log(data);
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
      ctx.drawImage(img1, 0, 0, 300, 300);
      c.style.visibility = 'visible';
    }

    var dimgdata = dtx.getImageData(0, 0, 651, 651);
    var dimgdatalen = dimgdata.data.length;
    for (var i = 0; i < dimgdatalen / 4; i++) { //iterate over every pixel in the canvas

      dimgdata.data[4 * i] = data[i][ist_band.value]; // RED (0-255)
      dimgdata.data[4 * i + 1] = data[i][sec_band.value]; // GREEN (0-255)
      dimgdata.data[4 * i + 2] = data[i][thi_band.value]; // BLUE (0-255)
      dimgdata.data[4 * i + 3] = 255; // APLHA (0-255)
    }
    dtx.putImageData(dimgdata, 0, 0);

    var resizeNewImage = d.toDataURL("image/png");
    var img = new Image();
    img.src = resizeNewImage;
    img.onload = function() {
      dtx.clearRect(0, 0, d.width, d.height);
      dtx.drawImage(img, 0, 0, 300, 300);
      d.style.visibility = 'visible';
    }


//
    var canvas   = document.getElementById("S_Canvas");
    var context  = canvas.getContext("2d");

    // lazy programmers globals
    var scale = 1;
    var wx    = 0; // world zoom origin
    var wy    = 0;
    var sx    = 0; // mouse screen pos
    var sy    = 0;

    var mouse = {};
    mouse.x   = 0; // pixel pos of mouse
    mouse.y   = 0;
    mouse.rx  = 0; // mouse real (world) pos
    mouse.ry  = 0;
    mouse.button = 0;

    function zoomed(number) { // just scale
      return Math.floor(number * scale);
    }

    // inverse function converts from screen pixel coord to world coord
    function zoomedX_INV(number) { // scale & origin INV
      return Math.floor((number - sx) * (1 / scale) + wx);
      // or return Math.floor((number - sx) / scale + wx);
    }

    function zoomedY_INV(number) { // scale & origin INV
      return Math.floor((number - sy) * (1 / scale) + wy);
      // or return Math.floor((number - sy) / scale + wy);
    }

    // draw everything in pixels coords
    function draw(event) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        var rect = canvas.getBoundingClientRect();
        var x = event.pageX - rect.left;
        var y = event.pageY - rect.top;
        context.drawImage(img, x-zoomed(300)/2, y-zoomed(300)/2, zoomed(300), zoomed(300));
        canvas.style.visibility = 'visible';
    }
    // wheel event must not be passive to allow default action to be prevented
    canvas.addEventListener("wheel", trackWheel, {passive:false});
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mousedown", handleMouseDown)
    canvas.addEventListener("mouseup", handleMouseUp)
    canvas.addEventListener("mouseout", handleMouseOut)
    var isDragging;

    function handleMouseDown(e){
      canMouseX=parseInt(e.clientX);
      canMouseY=parseInt(e.clientY);
      // set the drag flag
      isDragging=true;
    }

    function handleMouseUp(e){
      canMouseX=parseInt(e.clientX);
      canMouseY=parseInt(e.clientY);
      // clear the drag flag
      isDragging=false;
    }

    function handleMouseOut(e){
      canMouseX=parseInt(e.clientX);
      canMouseY=parseInt(e.clientY);
      // user has left the canvas, so clear the drag flag
      isDragging=false;
    }

    function handleMouseMove(e){
      canMouseX=parseInt(e.clientX);
      canMouseY=parseInt(e.clientY);
      // if the drag flag is set, clear the canvas and draw the image
      if(isDragging) {
          var rect = canvas.getBoundingClientRect();
          var x = event.pageX - rect.left;
          var y = event.pageY - rect.top;
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, x-zoomed(300)/2, y-zoomed(300)/2, zoomed(300),zoomed(300));
          canvas.style.visibility = 'visible';
        }
    }

    function trackWheel(e) {

      if (e.deltaY < 0) {
        scale = Math.min(5, scale * 1.1); // zoom in
      } else {
        scale = Math.max(0.1, scale * (1 / 1.1)); // zoom out is inverse of zoom in
      }
      wx = mouse.rx; // set world origin
      wy = mouse.ry;
      sx = mouse.x; // set screen origin
      sy = mouse.y;
      mouse.rx = zoomedX_INV(mouse.x); // recalc mouse world (real) pos
      mouse.ry = zoomedY_INV(mouse.y);

      draw(e);
      e.preventDefault(); // stop the page scrolling
    }
    // draw();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, zoomed(300), zoomed(300));
    canvas.style.visibility = 'visible';
  }
