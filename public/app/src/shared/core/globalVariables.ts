export interface IGloabalVariables {
  apiUrl: string;
  stripePublicKey: string;
}

const devVariables: IGloabalVariables = {
  apiUrl: "http://localhost:8000",
  stripePublicKey: "pk_test_51Or5wSEFPFmk82jPndG5FlKO6i0iYd1Oelq8HTEohiDG5or6oGTVKTLihraLO038zd5NX58DOjwDjHyzVIiSUB6u00UpC70MQc"
};

const prodVariables: IGloabalVariables = {
  apiUrl: "",
  stripePublicKey: ""
};

/**
 * Get global variables.
 */
function getGlobal(key: keyof IGloabalVariables) {
  const env = process.env.NODE_ENV;
  if (env === "development") {
    return devVariables[key];
  } else if (env === "production") {
    return prodVariables[key];
  } else {
    return devVariables[key];
  }
}

export { getGlobal };
