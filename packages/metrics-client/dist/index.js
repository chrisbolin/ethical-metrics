import Fingerprint from "fingerprintjs2";

function config() {
  return {
    url: "//configure-ethical-metrics.please",
    ...window.ETHICAL_METRICS_CONFIG
  };
}

function wait(timeout = 0) {
  return new Promise(resolve => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(resolve, { timeout });
    } else {
      setTimeout(resolve, timeout);
    }
  });
}

function hash(fingerprint, salt = "") {
  return Fingerprint.x64hash128(fingerprint + salt);
}

function rawFingerprint() {
  return new Promise(resolve => {
    Fingerprint.get({}, components => {
      const fingerprint = components.map(component => component.value).join("");
      resolve(fingerprint);
    });
  });
}

let cachedClientVisitorID = null;
function clientVisitorID() {
  if (cachedClientVisitorID) {
    return new Promise(resolve => resolve(cachedClientVisitorID));
  }
  return rawFingerprint().then(fingerprint => {
    cachedClientVisitorID = hash(fingerprint, window.location.host);
    return cachedClientVisitorID;
  });
}

function timezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    return null;
  }
}

function metrics() {
  return {
    href: window.location.href,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    referrer: document.referrer,
    userAgent: window.navigator.userAgent,
    timezone: timezone()
  };
}

function clientIDVersion() {
  /*
    v0
      fingerprint: fingerprintjs2 2.1.0
      hash: murmur 3 via fingerprintjs2.x64hash128
      seed: 0
      salt: location.host
  */
  return "0";
}

function payload() {
  return clientVisitorID().then(clientVisitorID => ({
    clientVisitorID,
    clientIDVersion: clientIDVersion(),
    ...metrics()
  }));
}

function send(body) {
  return fetch(config().url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function visit() {
  payload().then(send);
}

export default function client() {
  wait(500).then(visit);
}
