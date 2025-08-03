import { writable } from 'svelte/store';
import { auth } from '$lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInAnonymously,
  updateProfile,
  type User as FirebaseUser
} from 'firebase/auth';

export interface User {
  id: string;
  email: string;
  name: string;
  type: 'talent' | 'client' | 'agency';
  avatar?: string;
  isAnonymous?: boolean;
}

export const user = writable<User | null>(null);
export const isAuthenticated = writable<boolean>(false);
export const authLoading = writable<boolean>(true);

export const authStore = {
  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get user data from localStorage or create default
      const savedUserData = localStorage.getItem(`user_${firebaseUser.uid}`);
      let userData: User;
      
      if (savedUserData) {
        userData = JSON.parse(savedUserData);
      } else {
        userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email || email,
          name: firebaseUser.displayName || email.split('@')[0],
          type: 'talent',
          isAnonymous: false
        };
        localStorage.setItem(`user_${firebaseUser.uid}`, JSON.stringify(userData));
      }
      
      user.set(userData);
      isAuthenticated.set(true);
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  },
  
  register: async (email: string, password: string, name: string, type: 'talent' | 'client' | 'agency') => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Update Firebase profile
      await updateProfile(firebaseUser, { displayName: name });
      
      const userData: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || email,
        name: name,
        type: type,
        isAnonymous: false
      };
      
      localStorage.setItem(`user_${firebaseUser.uid}`, JSON.stringify(userData));
      user.set(userData);
      isAuthenticated.set(true);
      return { success: true };
    } catch (error: any) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    }
  },
  
  loginAnonymously: async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      const firebaseUser = userCredential.user;
      
      const userData: User = {
        id: firebaseUser.uid,
        email: 'anonymous@flourishtalents.com',
        name: 'Guest User',
        type: 'talent',
        isAnonymous: true
      };
      
      user.set(userData);
      isAuthenticated.set(true);
      return { success: true };
    } catch (error: any) {
      console.error('Anonymous login error:', error);
      return { success: false, error: error.message };
    }
  },
  
  logout: async () => {
    try {
      await signOut(auth);
      user.set(null);
      isAuthenticated.set(false);
      return { success: true };
    } catch (error: any) {
      console.error('Logout error:', error);
      return { success: false, error: error.message };
    }
  },
  
  init: () => {
    onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const savedUserData = localStorage.getItem(`user_${firebaseUser.uid}`);
        if (savedUserData) {
          const userData = JSON.parse(savedUserData);
          user.set(userData);
          isAuthenticated.set(true);
        } else {
          const userData: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'User',
            type: 'talent',
            isAnonymous: firebaseUser.isAnonymous
          };
          localStorage.setItem(`user_${firebaseUser.uid}`, JSON.stringify(userData));
          user.set(userData);
          isAuthenticated.set(true);
        }
      } else {
        user.set(null);
        isAuthenticated.set(false);
      }
      authLoading.set(false);
    });
  }
};