export const ImageUpload = async (data) => {
    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dloylpool/image/upload", {
            method: "POST",
            body: data,
        });

        if (!res.ok) {
            return { success: false, message: "Failed to upload image" }
        }
        const myData = await res.json();
        return myData.url
    } catch (error) {
        return { success: false, message: "Server error" }
    }
}