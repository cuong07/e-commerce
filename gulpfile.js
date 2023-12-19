import gulp from "gulp";
import browserSync from "browser-sync";

// Static server
gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
});

// or...

gulp.task("browser-sync", function () {
  browserSync.create.init({
    proxy: "yourlocal.dev",
  });
});
