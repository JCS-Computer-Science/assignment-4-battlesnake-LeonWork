export function move() {
    const options = ["up", "down", "left", "right"];
    return options[Math.floor(Math.random() * options.length)];
  }
  