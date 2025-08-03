import axios from "axios";

export const enhanceTextWithGemini = async (section, data) => {
  try {
    console.log("🟢 Sending to backend:", { section, data }); // ✅ log correctly

    const response = await axios.post("http://localhost:8000/api/enhance", {
      section,
      data,
    });

    return response.data.enhanced;
  } catch (error) {
    console.error("❌ Enhance API error:", error);
    return null;
  }
};
