import * as serdev from "serdev";

serdev.listen({
  components: {
    tests: {
      dir: ".",
      build: "node scripts/build.js",
      watch: ["src", "tests"],
    },
  },
  routes: {
    "/tests/index.html": "tests/index.html",
    "/tests/*rest": ["tests", (x) => `out/tests/${x.rest}`],
    "/examples/*rest": (x) => `examples/${x.rest}`,
    "/*rest": (x) => `out/${x.rest}`,
  },
});
