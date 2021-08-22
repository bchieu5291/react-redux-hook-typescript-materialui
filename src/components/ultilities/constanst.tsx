export const apiUrl =
    process.env.NODE !== "production"
        ? "http://localhost:4000/api"
        : "http://ec2-13-229-153-126.ap-southeast-1.compute.amazonaws.com/";
export const LOCAL_STORAGE_TOKEN_NAME = "george-mern";
