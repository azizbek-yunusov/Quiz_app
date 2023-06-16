import { serverUrl } from "../utils/apiUrl";

export const sendToResultTelegramBot = async (data) => {
  try {
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
