import {
	Box,
	Button,
	Center,
	FormControl,
	Heading,
	Input,
	Link,
	Text,
} from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface IFormData {
	fullName: string;
	phoneNumber: string;
	email?: string;
	password: string;
	repeatPassword: string;
}

export default function SignUpScreen() {
	const { t } = useTranslation();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({
		defaultValues: { phoneNumber: '', password: '' },
	});

	const onSubmit = handleSubmit(async (data) => {
		console.log('data');
	});

	return (
		<Center>
			<Box margin={2}>
				<Heading>{t('auth.title.sign-up')}</Heading>

				<FormControl isInvalid={!!errors.email}>
					<FormControl.Label>{t('auth.fields.email.label')}</FormControl.Label>

					<Controller
						control={control}
						name='email'
						rules={{
							required: t('errors.form.requiredField'),
							pattern: {
								value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
								message: t('auth.fields.email.errors.notValid'),
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder={t('auth.fields.email.placeholder')}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								autoCapitalize='none'
								keyboardType='email-address'
								autoComplete='email'
								returnKeyType='next'
							/>
						)}
					/>
				</FormControl>

				<Button onPress={onSubmit}>{t('auth.buttons.sign-up.enter')}</Button>
				<Box>
					<Text>{t('auth.buttons.sign-up.navigation.firstPart')}</Text>
					<Link href={'/(auth)/sign-in'}>
						{t('auth.buttons.sign-up.navigation.secondPart')}
					</Link>
				</Box>
			</Box>
		</Center>
	);
}
