import Fingerprint from "fingerprintjs2";

function wait(timeout = 500) {
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

function getRawFingerprint() {
  return new Promise(resolve => {
    Fingerprint.get({}, components => {
      const fingerprint = components.map(component => component.value).join("");
      resolve(fingerprint);
    });
  });
}

function getFingerprint() {
  return getRawFingerprint().then(fingerprint =>
    hash(fingerprint, location.host)
  );
}

export default function client() {
  wait()
    .then(getFingerprint)
    .then(fingerprint => console.log(fingerprint));
}
