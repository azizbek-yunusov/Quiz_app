import { serverUrl } from "../utils/apiUrl";

export const sendToResultTelegramBot = async (data) => {
  try {
    console.log(data);
    await fetch(`${serverUrl}/result`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.log(err);
  }
};
