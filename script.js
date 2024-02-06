// import { videoGameData } from "./dataSet/videoGame";

const videoGameData =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

const movieData =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

const kickstarter =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";

const req = new XMLHttpRequest();

let canvas, category, description, names, childrenData;

const drawDiagram = () => {
  canvas = d3.select("#canvas");
  canvas
    .append("g")
    .selectAll("rect")
    .data(childrenData)
    .enter()
    .append("rect")
    .attr("class", "tile")
    .attr("width", "200")
    .attr("height", "150")
    .style("border", "1px solid green")
    .attr("data-name", (d) => {
      console.log(d);
      return d.map((i) => {
        return i.name;
      });
    })
    .attr("data-category", (d) => {
      return d.map((i) => {
        return i.category;
      });
    })
    .attr("data-value", (d) => {
      return d.map((i) => {
        return i.value;
      });
    })
    .style("fill", (d) => {
      return d.map((i) => {
        category = i.category;

        if (category == "2600") {
          return "blue";
        } else if (category == "Wii") {
          return "green";
        } else if (category == "NES") {
          return "lightblue";
        } else if (category == "GB") {
          return "orange";
        } else if (category == "DS") {
          return "yellow";
        } else if (category == "X360") {
          return "yellowgreen";
        } else if (category == "PS3") {
          return "coffee";
        } else if (category == "PS2") {
          return "carotte";
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
          return "red";
        }
      });
    });

  canvas.append("text");
};

d3.json(videoGameData).then((data) => {
  names = data.name;
  //   data.children.map((d) => console.log(d.children));
  childrenData = data.children.map((d) => {
    return d.children;
  });

  childrenData.map((d) => {
    d.map((i) => console.log(i.category));
  });
  // console.log("dhild", childrenData);

  drawDiagram();
});

d3.json(movieData).then((data) => {});
