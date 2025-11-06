import { useColorScheme } from '@/hooks/use-color-scheme';
import { initI18n } from '@/localization/init';
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

// export const unstable_settings = {
// 	anchor: '(tabs)',
// };

const queryClient = new QueryClient();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [isReady, setIsReady] = useState<boolean>(false);

	useEffect(() => {
		initI18n().then(() => setIsReady(true));
	}, []);

	if (!isReady) return null;

	return (
		<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<QueryClientProvider client={queryClient}>
				<NativeBaseProvider>
					<Stack>
						<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
						<Stack.Screen
							name='modal'
							options={{ presentation: 'modal', title: 'Modal' }}
						/>
					</Stack>
					<StatusBar style='auto' />
				</NativeBaseProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
