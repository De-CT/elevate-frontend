import { getProfile } from "@/backend/user";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore, type UserProfile } from "@/store/useUserStore";

export async function restoreAuthenticatedProfile(): Promise<UserProfile | null> {
  await useAuthStore.persist.rehydrate();
  if (!useAuthStore.getState().token?.accessToken) return null;

  try {
    const profile = await getProfile();
    useUserStore.getState().setUser(profile);
    return profile;
  } catch {
    return null;
  }
}
