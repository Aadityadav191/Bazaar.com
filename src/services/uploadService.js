export const uploadProfilePicture = async (file, token) => {
  const dataPayload = new FormData();
  dataPayload.append("ProfilePic", file);

  const response = await fetch('http://localhost:5000/api/user/upload-profile', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: dataPayload
  });

  if (!response.ok) {
    throw new Error('Failed to synchronize image file with storage bucket.');
  }

  const result = await response.json();
  console.log("Verified Backend Data Return:", result);
  return result.imageUrl; 
};