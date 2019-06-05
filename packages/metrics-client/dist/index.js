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

function makeRawFingerprint() {
  return new Promise(resolve => {
    Fingerprint.get({}, components => {
      const fingerprint = components.map(component => component.value).join("");
      resolve(fingerprint);
    });
  });
}

function makeFingerprint() {
  return makeRawFingerprint().then(fingerprint =>
    hash(fingerprint, window.location.host)
  );
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
    width: window.innerWidth,
    height: window.innerHeight,
    referrer: document.referrer,
    userAgent: window.navigator.userAgent,
    timezone: timezone()
  };
}

export default function client() {
  wait()
    .then(makeFingerprint)
    .then(fingerprint => console.log(fingerprint, metrics()));
}
