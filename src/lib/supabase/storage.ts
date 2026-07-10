import "server-only";
import { createAdminClient } from "./admin";

const BUCKET = "prompt-images";
let bucketEnsured = false;

async function ensureBucket() {
  if (bucketEnsured) return;
  const supabase = createAdminClient();
  const { error } = await supabase.storage.createBucket(BUCKET, { public: true });
  if (error && !error.message.toLowerCase().includes("already exists")) {
    console.error("[uploadPromptImage] failed to ensure bucket:", error);
  }
  bucketEnsured = true;
}

/** Uploads a prompt reference image to Supabase Storage and returns its public URL, or null on failure. */
export async function uploadPromptImage(
  userId: string,
  buffer: Buffer,
  mimeType: string,
): Promise<string | null> {
  await ensureBucket();
  const supabase = createAdminClient();

  const ext = mimeType.split("/")[1]?.split("+")[0] || "png";
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: mimeType,
    upsert: false,
  });

  if (error) {
    console.error("[uploadPromptImage] upload failed:", error);
    return null;
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
