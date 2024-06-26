import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import app, { firebaseConfig } from '@/firebase/config';

const storage = getStorage(app);

export default async function imagesUpload(images: File[]): Promise<string[]> {
  let urlArray: string[] = [];

  return new Promise((resolve, reject) => {
    images.map((image) => {
      const storageRef = ref(storage, `images/${image.name + Math.random()}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snap) => {
          return (snap.bytesTransferred / snap.totalBytes) * 100;
        },
        (err) => {
          console.log(err);
          reject(false);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          urlArray.push(url);

          if (urlArray.length === images.length) {
            resolve(urlArray);
          }
        },
      );
    });
  });
}
