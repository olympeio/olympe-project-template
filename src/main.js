// This file imports Olympe and project and dependencies bricks source code, so that Webpack can bundle everything together.

// Import Olympe runtime and extensions
import 'olympe';
import '@olympeio/core';
import '@olympeio-extensions/commons';
import '@olympeio-extensions/file-format-support';
import '@olympeio-extensions/open-sky';
import '@olympeio-extensions/mapbox';
import '@olympeio-extensions/qrcode-zxing';
import '@olympeio-extensions/samples';
import '@olympeio-extensions/workflow';
import '@olympeio-extensions/chartjs';
import '@olympeio-extensions/lab';

// Import project bricks. We use webpack-import-glob-loader to import all bricks.
import './bricks/common/**/*.js';
import './bricks/common/**/*.ts';
import './bricks/web/**/*.js';
import './bricks/web/**/*.ts';
import './bricks/**/*.jsx';
import './bricks/**/*.tsx';

// Import further dependencies bricks
// ...
