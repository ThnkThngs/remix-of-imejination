export const adminSessionKey = "imejination-admin-authenticated";

const fallbackAdminPassword = "imejination-admin";

export function getAdminPassword() {
  return process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim() || fallbackAdminPassword;
}

export function isAdminPasswordValid(input: string, expected = getAdminPassword()) {
  const password = input.trim();
  return password.length > 0 && password === expected.trim();
}

