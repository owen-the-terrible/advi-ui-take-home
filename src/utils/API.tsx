// "https://newsapi.org/v2/everything?q=bitcoin&apiKey=8523bd2a5fef471f8fed4a36a53f9a25";
import { PromiseAPI } from "../components/RootLayout";

export const fetchData = async (url: string): Promise<PromiseAPI> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error fetching articles");
    }

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Error fetching articles");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
