import { API_URL } from "../contans/apiUrl.js";

export const fetchColor = async () => {
  const response = await fetch(`${API_URL}/color`, {
    method: "GET",
  });
  if (response.status === 200) {
    const colorData = await response.json();
    return colorData;
  }
};
