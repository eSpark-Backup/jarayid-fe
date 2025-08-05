const VITE_DEPLOYMENT_TYPE = "PROD";
export const VITE_BASE_URL =
  VITE_DEPLOYMENT_TYPE === "PROD"
    ? "https://jarayid-api.stg.esparkconsultants.com/api"
    : "http://localhost:3000/api";
export const VITE_AUTH0_DOMAIN = "dev-st4ex8mtmrznbeji.us.auth0.com";
export const VITE_CLIENT_ID = "DrTJihVGc8SMawWQkCeji5k5DL44Lfas";
export const VITE_CAPTCHA_SITE_KEY = "6LeiS5orAAAAADXS7liaUSkS1R7qTWUVBRaTWomj";
