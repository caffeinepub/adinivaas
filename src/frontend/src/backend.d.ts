import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface JobPost {
    id: bigint;
    title: string;
    description: string;
    company: string;
    image: string;
}
export interface Post {
    id: bigint;
    title: string;
    content: string;
    author: string;
    likes: bigint;
    timestamp: bigint;
    mediaType: MediaType;
    category: PostCategory;
}
export interface TribalTale {
    id: bigint;
    introVideo: boolean;
    name: string;
    role: string;
}
export interface Tribalpreneur {
    id: bigint;
    owner: string;
    businessName: string;
    description: string;
    image: string;
}
export interface UserProfile {
    isPremium: boolean;
    name: string;
    role: string;
    membershipBadge: string;
    avatar: string;
}
export enum MediaType {
    video = "video",
    image = "image"
}
export enum PostCategory {
    jobs = "jobs",
    latest = "latest",
    cultural = "cultural",
    tribalTales = "tribalTales"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCategory(category: string): Promise<void>;
    addJobPost(title: string, description: string, company: string, image: string): Promise<void>;
    addPost(title: string, content: string, mediaType: MediaType, category: PostCategory, author: string): Promise<void>;
    addTribalTale(name: string, role: string, introVideo: boolean): Promise<void>;
    addTribalpreneur(businessName: string, owner: string, image: string, description: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCategories(): Promise<Array<string>>;
    getJobPosts(): Promise<Array<JobPost>>;
    getPostsByCategory(category: PostCategory): Promise<Array<Post>>;
    getTribalTales(): Promise<Array<TribalTale>>;
    getTribalpreneurs(): Promise<Array<Tribalpreneur>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(name: string, role: string, avatar: string, membershipBadge: string, isPremium: boolean): Promise<void>;
    seedData(): Promise<void>;
}
