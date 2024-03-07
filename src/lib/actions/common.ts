export const uploadImage = async (file: File | null): Promise<string> => {
    try {
        const form = new FormData();
        form.append("file", file!);
        form.append("upload_preset", process.env.C_UPLOAD_PRESET!);
        form.append("cloud_name", process.env.C_CLOUD_NAME!);

        const response = await fetch(`${process.env.C_URL}`, {
            method: "POST",
            body: form,
        });

        if (response.ok) {
            const data = await response.json();
            return data.secure_url;
        } else {
            console.log("Failed to upload image");
            return "";
        }
    } catch (e) {
        console.log("Something went wrong.");
        return "";
    }
};

export const isWithinRange = (date: Date, start: Date, end: Date) => {
    return date >= start && date <= end;
};
