import axios from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  const defaultUrl = "<https://localhost:8082>";

  let api = axios.create({
    headers: {
      common: {},
    },
  });
  return {
    provide: {
      axios: api,
    },
  };
});