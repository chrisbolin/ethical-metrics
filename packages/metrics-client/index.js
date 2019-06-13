import { visit } from "./lib/data";
import { idle } from "./lib/utils";

function onPageLoad() {
  idle(500).then(visit);
}

onPageLoad();

window.ethicalMetrics = {
  visit
};
