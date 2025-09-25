import { Client, type Models, Storage, type UploadProgress } from "appwrite";

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// Initialize the Storage service
// export const storage = new Storage(client);

/**
 * Uploads a file to Appwrite Storage and returns its public URL.
 * It also tracks upload progress using the provided setProgress callback.
 *
 * @param {File} file - The file object to upload.
 * @param {function} [setProgress] - Optional callback to track upload progress.
 * @returns {Promise<string>} - The public URL of the uploaded file.
 */

export async function uploadFile(
  file: File,
  setProgress?: (progress: number) => void,
): Promise<{ downloadURL: string; fileId: string }> {
  const storage = new Storage(client);

  try {
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;

    // Call createFile with 5 parameters:
    // bucketId, fileId (use 'unique()' to auto-generate), file, permissions (optional), onProgress callback.
    const response: Models.File = await storage.createFile(
      bucketId,
      "unique()",
      file,
      undefined, // permissions (optional), leave as undefined if not needed
      (progress: UploadProgress) => {
        const percentCompleted = parseFloat(
          ((progress.chunksUploaded / progress.chunksTotal) * 100).toFixed(1),
        );
        if (setProgress) setProgress(percentCompleted);
      },
    );
    console.log("File uploaded:", response);

    // Construct the public URL. Ensure that your bucket's permissions allow public viewing or use a temporary URL
    const downloadURL = `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${response.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
    const fileId = response.$id;

    return { downloadURL, fileId };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

/**
 * Deletes a file from Appwrite Storage.
 *
 * @param {string} fileId - The ID of the file to delete.
 * @returns {Promise<void>}
 */

export async function deleteFile(fileId: string): Promise<void> {
  const storage = new Storage(client);

  try {
    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!;
    await storage.deleteFile(bucketId, fileId);
    console.log("File deleted:", fileId);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}