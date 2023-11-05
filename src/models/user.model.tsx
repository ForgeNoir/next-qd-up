
export interface User {
    id: string;
    role: string;
    name: string;
    email: string;
    photoURL: string;
    createdAt: string;
}

export interface FirebaseUser {
    id: string;
    role: string;
    name: string;
    email: string;
}