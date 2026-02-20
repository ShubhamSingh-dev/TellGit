import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET_NAME = "meetings"; // Change this to your bucket name

export async function uploadFile(
  file: File,
  setProgress?: (progress: number) => void,
): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;

  // Supabase doesn't support granular upload progress natively via the JS client,
  // so we simulate it using XMLHttpRequest for progress tracking.
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && setProgress) {
        const progress = Math.round((event.loaded / event.total) * 100);
        console.log(`Upload progress: ${progress}%`);
        setProgress(progress);
      }
    });

    xhr.addEventListener("load", async () => {
      if (xhr.status === 200) {
        // Get the public URL after successful upload
        const { data } = supabase.storage
          .from(BUCKET_NAME)
          .getPublicUrl(fileName);

        console.log("Download URL obtained:", data.publicUrl);
        resolve(data.publicUrl);
      } else {
        console.error("Upload failed:", xhr.responseText);
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    });

    xhr.addEventListener("error", () => {
      console.error("Upload error");
      reject(new Error("Upload failed"));
    });

    // Build the Supabase Storage upload URL
    const uploadUrl = `${supabaseUrl}/storage/v1/object/${BUCKET_NAME}/${fileName}`;

    xhr.open("POST", uploadUrl);
    xhr.setRequestHeader("Authorization", `Bearer ${supabaseAnonKey}`);
    xhr.setRequestHeader("x-upsert", "true");
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.send(file);
  });
}