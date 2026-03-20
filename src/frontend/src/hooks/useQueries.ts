import { useQuery } from "@tanstack/react-query";
import type {
  JobPost,
  Post,
  TribalTale,
  Tribalpreneur,
  UserProfile,
} from "../backend.d";
import { PostCategory } from "../backend.d";
import { useActor } from "./useActor";

export function useLatestPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts", "latest"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPostsByCategory(PostCategory.latest);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCulturalPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<Post[]>({
    queryKey: ["posts", "cultural"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPostsByCategory(PostCategory.cultural);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTribalpreneurs() {
  const { actor, isFetching } = useActor();
  return useQuery<Tribalpreneur[]>({
    queryKey: ["tribalpreneurs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTribalpreneurs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTribalTales() {
  const { actor, isFetching } = useActor();
  return useQuery<TribalTale[]>({
    queryKey: ["tribalTales"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTribalTales();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useJobPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<JobPost[]>({
    queryKey: ["jobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJobPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}
