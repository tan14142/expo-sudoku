const dark = {
  p: "#476A6F",
  pb: "#f2f2f2",
  pf: "#fff",
  s: "#519E8A",
  sb: "#f2f2f2",
  sf: "#fff",
  t: "#7EB09B",
  tb: "#f2f2f2",
  tf: "#fff",
  q: "#ddf0e8",
  e: "#ecbeb4",
  ef: "red",
}

const green = {
  p: "#476a6f",
  pb: "#f2f2f2",
  pf: "#fff",
  // s: "#519e8a",
  s: "#009688",
  sb: "#a3d3cf",
  sf: "#fff",
  t: "#7eb09b",
  tb: "#f2f2f2",
  tf: "#fff",
  q: "#ddf0e8",
  e: "#ecbeb4",
  ef: "red",
}

const orange = {
  p: "#476A6F",
  pb: "#f2f2f2",
  pf: "#fff",
  s: "#519E8A",
  sb: "#f2f2f2",
  sf: "#fff",
  t: "#7EB09B",
  tb: "#f2f2f2",
  tf: "#fff",
  q: "#ddf0e8",
  e: "#ecbeb4",
  ef: "red",
}

const themes = {
  dark,
  green,
  orange,
}

export type ThemeType = (typeof themes)[keyof typeof themes]
export default themes
