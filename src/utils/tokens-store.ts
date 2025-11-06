import { StorageKeysEnum } from '@/constants/storage.keys';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Tokens = { access: string; refresh: string };
let tokens: Tokens | null = null;

export async function loadTokens() {
	const [a, r] = await Promise.all([
		AsyncStorage.getItem(StorageKeysEnum.AccessToken),
		AsyncStorage.getItem(StorageKeysEnum.RefreshToken),
	]);
	tokens = a && r ? { access: a, refresh: r } : null;
	return tokens;
}

export function getAccess() {
	return tokens?.access ?? null;
}
export function getRefresh() {
	return tokens?.refresh ?? null;
}

export async function setTokens(next: Tokens) {
	tokens = next;
	await Promise.all([
		AsyncStorage.setItem(StorageKeysEnum.AccessToken, next.access),
		AsyncStorage.setItem(StorageKeysEnum.RefreshToken, next.refresh),
	]);
}

export async function clearTokens() {
	tokens = null;
	await Promise.all([
		AsyncStorage.removeItem(StorageKeysEnum.AccessToken),
		AsyncStorage.removeItem(StorageKeysEnum.RefreshToken),
	]);
}
