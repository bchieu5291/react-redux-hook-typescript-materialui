export const apiUrl =
    process.env.NODE !== "production"
        ? "http://ec2-18-140-197-50.ap-southeast-1.compute.amazonaws.com/api"
        : "http://localhost:4000/api";
export const LOCAL_STORAGE_TOKEN_NAME = "george-mern";
