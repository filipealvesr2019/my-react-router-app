import axios from "axios";

const uploadImageToImgBB = async (imageFile) => {
  const apiKey = 'your_actual_api_key'; // Replace with your actual ImgBB API key

  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        key: apiKey,
      },
    });

    if (response.data && response.data.data && response.data.data.url) {
      const imageUrl = response.data.data.url;
      return imageUrl;
    } else {
      console.error('Error uploading image:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error uploading image:', error.message);
    return null;
  }
};

export { uploadImageToImgBB };
