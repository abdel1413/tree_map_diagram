// import { videoGameData } from "./dataSet/videoGame";

const videoGameData =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

const req = new XMLHttpRequest();

let canvas, category, description, names, childrenData;
const backgroundColors = {
  blue: "blue",
  green: "green",
  yellow: "yellow",
  yellowgreen: "yellowgreen",
  pink: "pink",
  orange: "orange",
  coffee: "coffee",
  carol: "carol",
  magenta: "magenta",
  gray: "gray",
  lightblue: "lightblue",
  lightgray: "lightgray",
  lightgreen: "lightgreen",
  tan: "tan",
  khaki: "khaki",
};

const legend = d3.select("#legend");
const tooltip = d3.select("#tooltip");

const handleMouseOver = (e, movies) => {
  const [xcoord, ycoord] = d3.pointer(e);
  console.log("xc", xcoord);
  console.log("yc", ycoord);
  tooltip
    .transition()
    .style("visibility", "visible")
    .attr("top", ycoord + 10 + "px")
    .attr("left", xcoord + 10 + "px")
    .style("opacity", "0.9")
    .style("border", "1px solid rgba(250,250,205,0.2)")
    .style("background-color", "rgba(255,255,255,0.9)")
    .style("border-radius", "10px")
    .style("padding", "10px")
    .attr("data-value", (d) => {
      return movies.value;
    })
    .text(
      `${movies.data.name}- ${movies.data.category} - ${movies.data.value}`
    );
};

const handleMouseMove = (e, movies) => {
  tooltip
    .transition()
    .attr("data-value", () => movies.data.value)
    .attr("top", e.pageY + 10 + "px")
    .attr("left", e.pageX + 10 + "px")
    .style("opacity", "0.9")
    .style("width", "auto")
    .style("height", "auto")
    .style("padding", "10px")
    .style("background-color", "rgba(245,230,245,0.5)")
    .style("border-radius", "10px");
};

const handleMouseOut = () => {
  tooltip.transition().style("visibility", "hidden").style("opacity", "0");
};

const drawDiagram = () => {
  const width = "1000";
  const height = "600";
  canvas = d3.select("#canvas");
  canvas.attr("width", width).attr("height", height);
  //create a hiearchy of childreen
  let hierarchy = d3
    .hierarchy(childrenData, (node) => {
      return node.children;
    })
    .sum((node) => {
      return node.value;
    })
    .sort((node1, node2) => {
      return node2["value"] - node1["value"];
    });
  //   console.log("hie", hierarchy.leaves());

  //create a method then pass hierarchy in to create a tree map
  let createTreeMap = d3.treemap().size([width, height]).padding(1);

  createTreeMap(hierarchy);

  // call methd leaves() to return the last node with no child
  let movies = hierarchy.leaves();
  console.log("mo", movies);

  let cell = canvas
    .selectAll("g")
    .data(movies)
    .enter()
    .append("g")
    .attr("transform", (movies) => {
      //return "translate(" + movies["x0"] + "," + movies["y0"] + ")";

      return `translate(${movies["x0"]}, ${movies["y0"]})`;
    });

  cell
    .append("rect")
    .attr("width", (d) => {
      const rectWidth = d.x1 - d.x0;
      return rectWidth;
    })
    .attr("height", (d) => {
      // d.y1 - d.y0
      const rectHeight = d.y1 - d.y0;
      return rectHeight;
    })
    .style("border", "1px solid red")
    .attr("class", "tile")
    .style("border", "1px solid red ")
    .style("fill", (d) => {
      let category = d.data.category;

      if (category == "2600") {
        return backgroundColors.blue;
      } else if (category == "Wii") {
        return backgroundColors.lightgreen;
      } else if (category == "NES") {
        return backgroundColors.lightblue;
      } else if (category == "GB") {
        return backgroundColors.orange;
      } else if (category == "DS") {
        return backgroundColors.yellow;
      } else if (category == "X360") {
        return backgroundColors.yellowgreen;
      } else if (category == "PS3") {
        return backgroundColors.tan;
      } else if (category == "PS2") {
        return backgroundColors.khaki;
      } else if (category == "SNES") {
        return backgroundColors.pink;
      } else if (category == "GBA") {
        return backgroundColors.magenta;
      } else if (category == "PS4") {
        return backgroundColors.gray;
      } else if (category == "3DS") {
        // return backgroundColors.caro;
        return "#ADE5A1";
      } else if (category == "N64") {
        return "#E992CE";
      } else if (category == "PS") {
        return "#D0B0A9";
      } else if (category == "XB") {
        return "#C9CA4E";
      } else if (category == " PC") {
        return "#D2D2D2";
      } else if (category == "PSP") {
        return "#F4C4DB";
      } else {
        return backgroundColors.lightgray;
        return "lightgray";
      }
    })
    .attr("data-name", (movies) => {
      return movies.data.name;
    })
    .attr("data-category", (movies) => {
      return movies.data.category;
    })
    .attr("data-value", (movies) => {
      return movies.data.value;
    })
    .on("mouseover", handleMouseOver)
    .on("mousemove", handleMouseMove)
    .on("mouseout", handleMouseOut);

  //append text to g
  cell
    .append("text")

    .selectAll("tspan")
    .data((d) => d.data.name.split(" "))
    .enter()
    .append("tspan")
    .attr("x", "4")
    .attr("padding", "10")
    //.attr("y", "1")
    .attr("y", (d, i) => {
      return 15 + i * 15;
    })
    .text((d) => d)
    .style("font-size", "0.8rem")
    .style("overflow", "hidden");

  tooltip
    .style("visibility", "hidden")
    .style("position", "absolute")
    .style("opactiy", "0");
};

d3.json(videoGameData).then((data) => {
  names = data.name;

  childrenData = data;

  drawDiagram();
  //legendFunction();
});
