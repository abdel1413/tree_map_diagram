// import { videoGameData } from "./dataSet/videoGame";

const videoGameData =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

const movieData =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

const kickstarter =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";

const req = new XMLHttpRequest();

let canvas, category, description, names, childrenData;
const backgroundColors = {
  bleu: "blue",
  green: "green",
  yellow: "yellow",
  yellowgreen: "yellowgreen",
  pink: "pink",
  orange: "orange",
  coffee: "coffee",
  carote: "carote",
  magenta: "magenta",
  gray: "gray",
  lightblue: "lightblue",
};

const legend = d3.select("#legend");
const tooltip = d3.select("#tooltip");

const legendFunction = (movies) => {
  //class="legend-item"
  const legendRec = legend
    .selectAll("g")
    .data(movies)
    .enter()
    .append("g")
    .attr("transform", "translate(0, 200)");
  legendRec
    .append("rect")
    .attr("width", "20")
    .attr("height", "20")
    .attr("class", "legend-item")
    .style("fill", (movies, i) => {
      let category = movies.data.category;

      if (category == "2600") {
        return "bleu";
      } else if (category == "Wii") {
        return "green";
      } else if (category == "NES") {
        return "lightblue";
      } else if (category == "GB") {
        return "yellow";
      } else if (category == "PS3") {
        return "#D0B0A9";
      } else if (category == "PS2") {
        return "#D2D2D2";
      } else if (category == "SNES") {
        return "pink";
      } else if (category == "GBA") {
        return "magenta";
      }
    });

  legendRec
    .append("text")
    .attr("x", "5")
    .attr("y", "10")
    .text((movies) => {
      return movies.data.category;
    });
};

const handleMouseOver = (e, movies) => {
  console.log("in", e, "d", movies);
  tooltip
    .transition()
    .style("visibility", "visible")
    .style("width", "200")
    .style("height", "200")
    .style("background-color", "black");
};
const handleMouseOut = () => {
  tooltip.transition().style("visibility", "hidden").style("opacity", "0");
};

const drawDiagram = () => {
  canvas = d3.select("#canvas");

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
  let createTreeMap = d3.treemap().size([1000, 600]);

  createTreeMap(hierarchy);

  // call methd leaves() to return the last node with no child
  let movies = hierarchy.leaves();
  console.log("mo", movies);

  let gs = canvas
    .selectAll("g")
    .data(movies)
    .enter()
    .append("g")
    .attr("transform", (movies) => {
      return "translate(" + movies["x0"] + "," + movies["y0"] + ")";
    });

  gs.append("rect")
    .style("border", "1px solid red")
    .attr("class", "tile")
    .style("border", "1px solid white")
    .style("fill", (d) => {
      let category = d.data.category;

      //   if (category == "Action") {
      //     return "orange";
      //   } else if (category == "Drama") {
      //     return "lightblue";
      //   } else if (category == "Adventure") {
      //     return "yellowgreen";
      //   } else if (category == "Family") {
      //     return "blue";
      //   } else if (category == "Comedy") {
      //     return "yellow";
      //   } else if (category == "Biography") {
      //     return "blue";
      //   } else if (category == "Animation") {
      //     return "green";
      //   }

      if (category == "2600") {
        return "blue";
      } else if (category == "Wii") {
        return "lightgreen";
      } else if (category == "NES") {
        return "lightblue";
      } else if (category == "GB") {
        return "orange";
      } else if (category == "DS") {
        return "yellow";
      } else if (category == "X360") {
        return "yellowgreen";
      } else if (category == "PS3") {
        return "tan";
      } else if (category == "PS2") {
        return "khaki";
      } else if (category == "SNES") {
        return "pink";
      } else if (category == "GBA") {
        return "magenta";
      } else if (category == "PS4") {
        return "gray";
      } else if (category == "3DS") {
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
    .attr("width", (movies) => {
      return movies.parent.x1 - movies.parent.x0;
    })
    .attr("height", (movies) => {
      return movies.parent.y1 - movies.parent.y0;
    });

  //append text to g
  gs.append("text")
    .attr("x", "10")
    .attr("y", "20")
    .text((movies) => {
      return movies.data.name;
    })
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

  legendFunction(movies);
  //   canvas
  //     .append("g")
  //     .selectAll("rect")
  //     .data(childrenData)
  //     .enter()
  //     .append("rect")
  //     .attr("class", "tile")
  //     .attr("width", "200")
  //     .attr("height", "150")
  //     .style("border", "1px solid green")
  //     .attr("data-name", (d) => {
  //       return d.map((i) => {
  //         return i.name;
  //       });
  //     })
  //     .attr("data-category", (d) => {
  //       return d.map((i) => {
  //         return i.category;
  //       });
  //     })
  // .attr("data-value", (d) => {
  //   return d.map((i) => {
  //     return i.value;
  //   });
  // })
  // .style("fill", (d) => {
  //   return d.map((i) => {
  //     category = i.category;
  //     if (category == "2600") {
  //       return "blue";
  //     } else if (category == "Wii") {
  //       return "green";
  //     } else if (category == "NES") {
  //       return "lightblue";
  //     } else if (category == "GB") {
  //       return "orange";
  //     } else if (category == "DS") {
  //       return "yellow";
  //     } else if (category == "X360") {
  //       return "yellowgreen";
  //     } else if (category == "PS3") {
  //       return "coffee";
  //     } else if (category == "PS2") {
  //       return "carotte";
  //     } else if (category == "SNES") {
  //       return "pink";
  //     } else if (category == "GBA") {
  //       return "magenta";
  //     } else if (category == "PS4") {
  //       return "gray";
  //     } else if (category == "3DS") {
  //       return "#ADE5A1";
  //     } else if (category == "N64") {
  //       return "#E992CE";
  //     } else if (category == "PS") {
  //       return "#D0B0A9";
  //     } else if (category == "XB") {
  //       return "#C9CA4E";
  //     } else if (category == " PC") {
  //       return "#D2D2D2";
  //     } else if (category == "PSP") {
  //       return "#F4C4DB";
  //     } else {
  //       return "red";
  //     }
  //   });
  // });

  //canvas.append("text");

  tooltip.style("visibility", "hidden");
};

d3.json(videoGameData).then((data) => {
  names = data.name;

  childrenData = data;
  console.log("d", childrenData);

  drawDiagram();
  //legendFunction();
});

d3.json(movieData).then((data) => {});
