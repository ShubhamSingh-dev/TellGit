// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFile(file: File, setProgress?: (progress: number) => void): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            console.log("Starting upload for:", file.name);
            // Create a unique name to avoid overwriting or caching issues
            const fileName = `${Date.now()}-${file.name}`;
            const storageRef = ref(storage, fileName);  
            const uploadTask = uploadBytesResumable(storageRef, file); 

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    console.log(`Upload progress: ${progress}%`);
                    if (setProgress) setProgress(progress);
                },
                (error) => {
                    console.error("Firebase Storage Error:", error);
                    reject(error);
                },
                async () => {
                    try {
                        console.log("File uploaded, fetching download URL...");
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        console.log("Download URL obtained:", downloadURL);
                        resolve(downloadURL);
                    } catch (urlError) {
                        console.error("Error getting download URL:", urlError);
                        reject(urlError);
                    }
                }
            );
        } catch (error) {
            console.error("Initialization Error:", error);
            reject(error);
        }
    });
}