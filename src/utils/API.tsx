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
