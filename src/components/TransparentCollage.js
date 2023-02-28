import React from "react";
import "./ProjectPages.css";
import birds from "../public/Images/TransparentBirdLanding.png";
import diamonds from "../public/Images/TransparentDiamondsBackground.png";
import cars from "../public/Images/TransparentCarBackground.png";
import hike from "../public/Images/Hike.jpg";

import bungoose from "../public/Images/bungoose.jpg";
import cardinal from "../public/Images/cardinal.jpg";
import cricket from "../public/Images/cricket.jpg";
import smalldoggy from "../public/Images/smalldoggy.jpg";
import serendipkitty from "../public/Images/serendipkitty.png";

class TransparentCollage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: birds,
      imageCanvas: null,
      modifiedImageCanvas: null,
      instantiatedImage: false,
      instantiatedBrush: false,
      brushSrc: smalldoggy,
      brushImage: null,
      brush: null,
      alpha: 0,
      brushes: [smalldoggy, hike, cricket, serendipkitty, cardinal, bungoose],
      backgrounds: [birds, diamonds, cars],
    };
  }

  componentDidMount() {
    const brushInputElement = document.getElementById("brush-input");

    brushInputElement.addEventListener("change", this.handleBrushFiles, false);

    const backgroundInputElement = document.getElementById("background-input");

    backgroundInputElement.addEventListener(
      "change",
      this.handleBackgroundFiles,
      false
    );
  }

  handleBrushFiles = (event) => {
    const fileList = event.srcElement.files;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      if (!file.type.startsWith("image/")) {
        continue;
      }

      // const img = document.createElement("img");
      // img.classList.add("obj");
      // img.file = file;

      const reader = new FileReader();
      reader.onload = async (e) => {
        // img.src = e.target.result;.
        console.log(e.target.result);
        this.setState({ brushes: [...this.state.brushes, e.target.result] });
      };
      reader.readAsDataURL(file);
    }
  };

  handleBackgroundFiles = (event) => {
    const fileList = event.srcElement.files;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      if (!file.type.startsWith("image/")) {
        continue;
      }

      // const img = document.createElement("img");
      // img.classList.add("obj");
      // img.file = file;

      const reader = new FileReader();
      reader.onload = async (e) => {
        // img.src = e.target.result;.
        console.log(e.target.result);
        this.setState({
          backgrounds: [...this.state.backgrounds, e.target.result],
        });
      };
      reader.readAsDataURL(file);
    }
  };

  collage = (alpha) => {
    var img = new Image();
    img.src = birds;
    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var imageData = ctx.getImageData(0, 0, img.width, img.height);
      var pixelData = imageData.data;
      var visitedArray = new Array(imageData.width * imageData.height).fill(0);
      var alphaThreshhold = 0;

      var transparentAreas = [];
      for (var i = 0; i < imageData.width; i++) {
        for (var j = 0; j < imageData.height; j++) {
          if (
            visitedArray[j * imageData.width + i] === 0 &&
            this.getAlphaForCoord(i, j, imageData.width, pixelData) <=
              alphaThreshhold
          ) {
            transparentAreas.push(
              this.findTransparentAreaSize(
                i,
                j,
                imageData.width,
                imageData.height,
                pixelData,
                alphaThreshhold,
                visitedArray
              )
            );
          }
        }
      }

      for (var k = 0; k < transparentAreas.length; k++) {
        var img2 = new Image();
        img2.src = bungoose;
        img2.onload = ((n) => {
          return () => {
            var area = transparentAreas[n];

            var widthRatio = img2.width / area.areaWidth;
            var heightRatio = img2.height / area.areaHeight;

            var adjustedImageWidth;
            var adjustedImageHeight;
            var adjustedImageOffsetX;
            var adjustedImageOffsetY;
            // if width ratio is bigger than height ratio,
            // then width of the image reaches the area first
            if (widthRatio > heightRatio) {
              adjustedImageWidth = img2.width / heightRatio;
              adjustedImageHeight = img2.height / heightRatio;
              adjustedImageOffsetX =
                adjustedImageWidth / 2 - area.areaWidth / 2;
              adjustedImageOffsetY = 0;
            } else {
              adjustedImageWidth = img2.width / widthRatio;
              adjustedImageHeight = img2.height / widthRatio;
              adjustedImageOffsetX = 0;
              adjustedImageOffsetY =
                adjustedImageHeight / 2 - area.areaHeight / 2;
            }

            var canvas2 = document.createElement("canvas");
            canvas2.width = adjustedImageWidth;
            canvas2.height = adjustedImageHeight;
            var ctx2 = canvas2.getContext("2d");

            ctx2.drawImage(
              img2,
              0,
              0,
              Math.round(adjustedImageWidth),
              Math.round(adjustedImageHeight)
            );
            // ctx2.drawImage(img2, 0, 0, adjustedImageWidth, adjustedImageHeight);
            var imageData2 = ctx2.getImageData(
              0,
              0,
              Math.round(adjustedImageWidth),
              Math.round(adjustedImageHeight)
            );
            var pixelData2 = imageData2.data;

            var visitedArray = new Array(
              imageData.width * imageData.height
            ).fill(0);

            // could save a lot of time by caching the visited arrays when originally finding it lol, but would use more space

            this.findTransparentAreaSize(
              area.originX,
              area.originY,
              imageData.width,
              imageData.height,
              pixelData,
              alphaThreshhold,
              visitedArray
            );

            for (
              var i = Math.round(adjustedImageOffsetX);
              i < Math.round(adjustedImageOffsetX) + area.areaWidth;
              i++
            ) {
              for (
                var j = Math.round(adjustedImageOffsetY);
                j < Math.round(adjustedImageOffsetY) + area.areaHeight;
                j++
              ) {
                if (
                  visitedArray[
                    Math.trunc(
                      (area.yOffset + j - Math.round(adjustedImageOffsetY)) *
                        imageData.width +
                        (area.xOffset + i - Math.round(adjustedImageOffsetX))
                    )
                  ] === 1
                ) {
                  var srcIndex = this.getColorIndexForCoord(
                    i,
                    j,
                    Math.round(adjustedImageWidth)
                  );

                  var divider = srcIndex / 4;
                  divider = Math.round(divider);
                  srcIndex = Math.round(divider * 4);

                  var destIndex = this.getColorIndexForCoord(
                    area.xOffset + i - Math.round(adjustedImageOffsetX),
                    area.yOffset + j - Math.round(adjustedImageOffsetY),
                    imageData.width
                  );
                  pixelData[Math.trunc(destIndex)] = pixelData2[srcIndex];
                  pixelData[Math.trunc(destIndex) + 1] =
                    pixelData2[srcIndex + 1];
                  pixelData[Math.trunc(destIndex) + 2] =
                    pixelData2[srcIndex + 2];
                  pixelData[Math.trunc(destIndex) + 3] =
                    (pixelData2[srcIndex + 3] / 255) * 255;
                }
              }
            }
            ctx.putImageData(imageData, 0, 0);
            var target = document.getElementById("transparent-image");
            const resultImg = canvas.toDataURL("image/png");
            target.src = resultImg;
            //Clearing array to free up memory

            visitedArray = null;

            // var canvas = document.createElement("canvas");
            // canvas.width = img.width;
            // canvas.height = img.height;
            // var ctx = canvas.getContext("2d");
            // ctx.drawImage(img, 0, 0, img.width, img.height);
          };
        })(k);
      }
    };
  };

  instantiateImageCanvas = async (force) => {
    return new Promise((resolve, reject) => {
      if (!this.state.instantiatedImage || force) {
        var img = new Image();
        img.src = this.state.imageSrc;
        img.onload = async () => {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, img.width, img.height);

          var canvas2 = document.createElement("canvas");
          canvas2.width = img.width;
          canvas2.height = img.height;
          var ctx2 = canvas2.getContext("2d");
          ctx2.drawImage(img, 0, 0, img.width, img.height);

          await this.promisedSetState({
            instantiatedImage: true,
            imageCanvas: canvas,
            modifiedImageCanvas: canvas2,
          });

          resolve(true);
        };
      } else {
        resolve(true);
      }
    });
  };

  setBackgroundImage = () => {
    this.instantiateImageCanvas(true)
      .then(() => {
        var target = document.getElementById("transparent-image");
        const resultImg = this.state.modifiedImageCanvas.toDataURL("image/png");
        target.src = resultImg;
      })
      .catch(() => {
        console.log("Background Image Not Set Correctly");
      });
  };

  promisedSetState = (newState) =>
    new Promise((resolve) => this.setState(newState, resolve));

  instantiateBrush = async (force) => {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.src = this.state.brushSrc;
      img.onload = async () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);

        await this.promisedSetState({
          brushImage: img,
          instantiatedBrush: true,
          brush: canvas,
        });
        resolve(true);
      };
    });
  };

  transparentManualUpdate = (e) => {
    const transparentImage = document.getElementById("transparent-image");

    const x = e.pageX - e.currentTarget.offsetLeft;
    const y = e.pageY - e.currentTarget.offsetTop;

    let clickX = Math.round(
      (x / e.currentTarget.width) * transparentImage.naturalWidth - 1
    );
    let clickY = Math.round(
      (y / e.currentTarget.height) * transparentImage.naturalHeight - 1
    );

    this.manualCollage(this.state.alpha, clickX, clickY);
  };

  manualCollage = async (alpha, clickX, clickY) => {
    await this.instantiateImageCanvas();

    var ctx = this.state.imageCanvas.getContext("2d");
    var imageData = ctx.getImageData(
      0,
      0,
      this.state.imageCanvas.width,
      this.state.imageCanvas.height
    );
    var pixelData = imageData.data;

    ctx = this.state.modifiedImageCanvas.getContext("2d");
    var modifiedImageData = ctx.getImageData(
      0,
      0,
      this.state.modifiedImageCanvas.width,
      this.state.modifiedImageCanvas.height
    );
    var modifiedPixelData = modifiedImageData.data;
    var visitedArray = new Array(imageData.width * imageData.height).fill(0);

    if (
      this.getAlphaForCoord(clickX, clickY, imageData.width, pixelData) > alpha
    ) {
      return;
    }

    var area = this.findTransparentAreaSize(
      clickX,
      clickY,
      imageData.width,
      imageData.height,
      pixelData,
      alpha,
      visitedArray
    );

    await this.instantiateBrush();

    var widthRatio = this.state.brush.width / area.areaWidth;
    var heightRatio = this.state.brush.height / area.areaHeight;

    var adjustedImageWidth;
    var adjustedImageHeight;
    var adjustedImageOffsetX;
    var adjustedImageOffsetY;
    // if width ratio is bigger than height ratio,
    // then width of the image reaches the area first
    if (widthRatio > heightRatio) {
      adjustedImageWidth = this.state.brush.width / heightRatio;
      adjustedImageHeight = this.state.brush.height / heightRatio;
      adjustedImageOffsetX = adjustedImageWidth / 2 - area.areaWidth / 2;
      adjustedImageOffsetY = 0;
    } else {
      adjustedImageWidth = this.state.brush.width / widthRatio;
      adjustedImageHeight = this.state.brush.height / widthRatio;
      adjustedImageOffsetX = 0;
      adjustedImageOffsetY = adjustedImageHeight / 2 - area.areaHeight / 2;
    }

    // modifying state directly. Probably doesn't matter because we don't component to rerender
    this.state.brush.width = adjustedImageWidth;
    this.state.brush.height = adjustedImageHeight;

    var brushCtx = this.state.brush.getContext("2d");
    brushCtx.drawImage(
      this.state.brushImage,
      0,
      0,
      Math.round(adjustedImageWidth),
      Math.round(adjustedImageHeight)
    );
    // ctx2.drawImage(img2, 0, 0, adjustedImageWidth, adjustedImageHeight);
    var brushImageData = brushCtx.getImageData(
      0,
      0,
      Math.round(adjustedImageWidth),
      Math.round(adjustedImageHeight)
    );
    var brushPixelData = brushImageData.data;

    for (
      var i = Math.round(adjustedImageOffsetX);
      i < Math.round(adjustedImageOffsetX) + area.areaWidth;
      i++
    ) {
      for (
        var j = Math.round(adjustedImageOffsetY);
        j < Math.round(adjustedImageOffsetY) + area.areaHeight;
        j++
      ) {
        if (
          visitedArray[
            Math.trunc(
              (area.yOffset + j - Math.round(adjustedImageOffsetY)) *
                imageData.width +
                (area.xOffset + i - Math.round(adjustedImageOffsetX))
            )
          ] === 1
        ) {
          var srcIndex = this.getColorIndexForCoord(
            i,
            j,
            Math.round(adjustedImageWidth)
          );

          var divider = srcIndex / 4;
          divider = Math.round(divider);
          srcIndex = Math.round(divider * 4);

          var destIndex = this.getColorIndexForCoord(
            area.xOffset + i - Math.round(adjustedImageOffsetX),
            area.yOffset + j - Math.round(adjustedImageOffsetY),
            imageData.width
          );
          modifiedPixelData[Math.trunc(destIndex)] = brushPixelData[srcIndex];
          modifiedPixelData[Math.trunc(destIndex) + 1] =
            brushPixelData[srcIndex + 1];
          modifiedPixelData[Math.trunc(destIndex) + 2] =
            brushPixelData[srcIndex + 2];
          modifiedPixelData[Math.trunc(destIndex) + 3] =
            (brushPixelData[srcIndex + 3] / 255) * 255;
        }
      }
    }

    this.state.modifiedImageCanvas
      .getContext("2d")
      .putImageData(modifiedImageData, 0, 0);
    var target = document.getElementById("transparent-image");
    const resultImg = this.state.modifiedImageCanvas.toDataURL("image/png");
    target.src = resultImg;
    //Clearing array to free up memory

    visitedArray = null;

    // var canvas = document.createElement("canvas");
    // canvas.width = img.width;
    // canvas.height = img.height;
    // var ctx = canvas.getContext("2d");
    // ctx.drawImage(img, 0, 0, img.width, img.height);
  };

  getColorIndexForCoord = (x, y, width) => {
    const red = y * (width * 4) + x * 4;
    return red;
  };

  getAlphaForCoord = (x, y, width, pixelData) => {
    const red = y * (width * 4) + x * 4;
    return pixelData[red + 3];
  };

  // returns JSON in the form of originX, originY, xOffset, yOffset, areaWidth, areaHeight
  findTransparentAreaSize = (
    originX,
    originY,
    width,
    height,
    pixelData,
    alphaThreshhold,
    visitedArray
  ) => {
    var areaWidth = 0;
    var areaHeight = 0;
    var xOffset = originX;
    var yOffset = originY;
    var xMaxOffset = originX;
    var yMaxOffset = originY;

    var pixelQueue = [];
    pixelQueue.push([originX, originY]);
    var currPixel;
    while (pixelQueue.length > 0) {
      currPixel = pixelQueue.shift();

      if (currPixel[0] < xOffset) {
        xOffset = currPixel[0];
      } else if (currPixel[0] > xMaxOffset) {
        xMaxOffset = currPixel[0];
      }

      if (currPixel[1] < yOffset) {
        yOffset = currPixel[1];
      } else if (currPixel[1] > yMaxOffset) {
        yMaxOffset = currPixel[1];
      }

      this.exploreAroundPixel(
        currPixel[0],
        currPixel[1],
        width,
        height,
        pixelData,
        alphaThreshhold,
        visitedArray,
        pixelQueue
      );
    }
    areaWidth = xMaxOffset - xOffset + 1;
    areaHeight = yMaxOffset - yOffset + 1;

    return { originX, originY, xOffset, yOffset, areaWidth, areaHeight };
  };

  exploreAroundPixel = (
    currentX,
    currentY,
    width,
    height,
    pixelData,
    alphaThreshhold,
    visitedArray,
    pixelQueue
  ) => {
    var currPixelAlpha = this.getAlphaForCoord(
      currentX,
      currentY,
      width,
      pixelData
    );
    if (currPixelAlpha > alphaThreshhold) {
      return;
    }
    if (
      currentX + 1 < width &&
      visitedArray[currentY * width + (currentX + 1)] !== 1
    ) {
      currPixelAlpha = this.getAlphaForCoord(
        currentX + 1,
        currentY,
        width,
        pixelData
      );
      if (currPixelAlpha <= alphaThreshhold) {
        visitedArray[currentY * width + (currentX + 1)] = 1;
        pixelQueue.push([currentX + 1, currentY]);
      }
    }
    if (
      currentX - 1 >= 0 &&
      visitedArray[currentY * width + (currentX - 1)] !== 1
    ) {
      currPixelAlpha = this.getAlphaForCoord(
        currentX - 1,
        currentY,
        width,
        pixelData
      );
      if (currPixelAlpha <= alphaThreshhold) {
        visitedArray[currentY * width + (currentX - 1)] = 1;
        pixelQueue.push([currentX - 1, currentY]);
      }
    }
    if (
      currentY + 1 < height &&
      visitedArray[(currentY + 1) * width + currentX] !== 1
    ) {
      currPixelAlpha = this.getAlphaForCoord(
        currentX,
        currentY + 1,
        width,
        pixelData
      );
      if (currPixelAlpha <= alphaThreshhold) {
        visitedArray[(currentY + 1) * width + currentX] = 1;
        pixelQueue.push([currentX, currentY + 1]);
      }
    }
    if (
      currentY - 1 >= 0 &&
      visitedArray[(currentY - 1) * width + currentX] !== 1
    ) {
      currPixelAlpha = this.getAlphaForCoord(
        currentX,
        currentY - 1,
        width,
        pixelData
      );
      if (currPixelAlpha <= alphaThreshhold) {
        visitedArray[(currentY - 1) * width + currentX] = 1;
        pixelQueue.push([currentX, currentY - 1]);
      }
    }
  };

  displayBrushesAsImages = () => {
    return this.state.brushes.map((brush, index) => {
      if (index === 0) {
        return (
          <div key={index} className="horizontal-flex-container">
            <label>
              <input
                type="radio"
                name="brushes"
                value={index}
                defaultChecked
              ></input>
              <img
                onClick={(target) => {
                  this.setState({ brushSrc: brush });
                }}
                src={brush}
                alt="Brush Image"
                className="brush brush-active"
              ></img>
            </label>
          </div>
        );
      }
      return (
        <div key={index} className="horizontal-flex-container">
          <label>
            <input type="radio" name="brushes" value={index}></input>
            <img
              onClick={(target) => {
                this.setState({ brushSrc: brush });
              }}
              src={brush}
              alt="Brush Image"
              className="brush brush-active"
            ></img>
          </label>
        </div>
      );
    });
  };

  displayBackgroundsAsImages = () => {
    return this.state.backgrounds.map((background, index) => {
      if (index === 0) {
        return (
          <div key={index} className="horizontal-flex-container">
            <label>
              <input
                type="radio"
                name="backgrounds"
                value={index}
                defaultChecked
              ></input>
              <img
                onClick={(target) => {
                  this.setState({ imageSrc: background }, async () => {
                    this.setBackgroundImage();
                  });
                }}
                src={background}
                alt="Transparent Background Image"
                className="brush brush-active"
              ></img>
            </label>
          </div>
        );
      }
      return (
        <div key={index} className="horizontal-flex-container">
          <label>
            <input type="radio" name="backgrounds" value={index}></input>
            <img
              onClick={(target) => {
                this.setState({ imageSrc: background }, async () => {
                  this.setBackgroundImage();
                });
              }}
              src={background}
              alt="Transparent Background Image"
              className="brush brush-active"
            ></img>
          </label>
        </div>
      );
    });
  };

  handleAlphaChange = (event) => {
    if (event.target.value > 255) event.target.value = 255;
    else if (event.target.value < 0) event.target.value = 0;
    this.setState({ alpha: event.target.value });
  };

  render() {
    let paragraphText = (
      <p ref={this.myRef} className="project-paragraph">
        This project allows you to fill in transparent areas of background
        images with other pictures. To start, select a background image under
        the 'Transparent Background Images' section and then select a 'brush'
        under the 'Brush Images' section. Clicking on the transparent parts of
        the image will fill them in with the center of the 'brush' image. Please
        note that images with low resolution will become distorted upon
        uploading. Also, images added here are not uploaded to a server but are
        kept and processed locally on your device. Here's a hint for making cool
        pictures too. Set the alpha threshold to 255 and select a primary
        background picture you want. Then click the image. After that, change
        the alpha threshold back to 0 or whatever number you want. The original
        transparent areas should be interactable again and you can draw on the
        modified background image.
      </p>
    );

    return (
      <>
        <div className="height-adjuster">
          <div
            className="project-visual-area"
            style={{ backgroundColor: "white" }}
          >
            <div className="project-image-container">
              <img
                onClick={(e) => {
                  this.transparentManualUpdate(e);
                }}
                id="transparent-image"
                className="project-image"
                src={birds}
                alt="Transparent Image To Paint On"
              ></img>
            </div>
          </div>
          <div className="project-content-container">
            <div className="project-header-container">
              <h1 className="project-header">Transparent Collage Maker</h1>
            </div>
            <div>
              <h2 className="header-title">Brush Images</h2>
              <div className="horizontal-flex-carousal">
                {this.displayBrushesAsImages()}
              </div>
              <label for="brush-input">Upload Brush Image </label>
              <input
                type="file"
                accept="image/*"
                id="brush-input"
                multiple
              ></input>
            </div>
            <div>
              <h2 className="header-title">Transparent Background Images</h2>
              <div className="horizontal-flex-carousal">
                {this.displayBackgroundsAsImages()}
              </div>
              <label for="background-input">Upload Background </label>
              <input
                type="file"
                accept="image/*"
                id="background-input"
                multiple
              ></input>
              <label for="alpha">
                Transparency Threshhold / Alpha Threshold (0-255):{" "}
              </label>
              <input
                type="number"
                id="alpha"
                min="0"
                max="255"
                value={this.state.alpha}
                onChange={this.handleAlphaChange}
              ></input>
              <div className="paragraph-container">{paragraphText}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TransparentCollage;
