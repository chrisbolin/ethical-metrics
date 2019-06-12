import React from "react";
import metrics from "ethical-metrics-client";

window.ETHICAL_METRICS_CONFIG = {
  url: "http://localhost:3333/"
};

function App() {
  metrics();
  return <pre>metrics-client-demo</pre>;
}

export default App;
