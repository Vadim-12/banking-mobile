import { Feather } from '@expo/vector-icons';
import {
	Box,
	Button,
	Center,
	FormControl,
	Heading,
	Icon,
	Input,
	Link,
	Pressable,
	Text,
} from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface IFormData {
	fullName: string;
	phoneNumber: string;
	email?: string;
	password: string;
	passwordConfirm: string;
}

export default function SignUpScreen() {
	const { t } = useTranslation();

	const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);
	const [confirmPasswordIsVisible, setConfirmPasswordIsVisible] =
		useState<boolean>(false);

	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<IFormData>({
		defaultValues: { phoneNumber: '', password: '' },
	});

	const onSubmit = handleSubmit(async (data) => {
		console.log('data', data);
	});

	return (
		<Center>
			<Box margin={2}>
				<Heading>{t('auth.title.sign-up')}</Heading>

				<FormControl isInvalid={!!errors.fullName}>
					<FormControl.Label>
						{t('auth.fields.fullName.label')}
					</FormControl.Label>

					<Controller
						control={control}
						name='fullName'
						rules={{
							required: t('errors.form.requiredField'),
							pattern: {
								value: /^[А-ЯA-Z][а-яa-z]+\s+[А-ЯA-Z][а-яa-z]+/,
								message: t('auth.fields.fullName.errors.notValid'),
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder={t('auth.fields.fullName.placeholder')}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								autoCapitalize='words'
								keyboardType='default'
								autoComplete='name'
								returnKeyType='next'
							/>
						)}
					/>

					<FormControl.ErrorMessage>
						{errors.fullName?.message}
					</FormControl.ErrorMessage>
				</FormControl>

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

				<FormControl isRequired isInvalid={!!errors.password}>
					<FormControl.Label>
						{t('auth.fields.password.label')}
					</FormControl.Label>

					<Controller
						control={control}
						name='password'
						rules={{
							required: t('errors.form.requiredField') as string,
							minLength: {
								value: 6,
								message: t('auth.fields.password.errors.minLength', { n: 6 }),
							},
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder={t('auth.fields.password.placeholder')}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								secureTextEntry={!passwordIsVisible}
								autoCapitalize='none'
								InputRightElement={
									<Pressable
										onPress={() => setPasswordIsVisible((s) => !s)}
										mr='3'
									>
										<Icon
											as={
												<Feather name={passwordIsVisible ? 'eye-off' : 'eye'} />
											}
										/>
									</Pressable>
								}
							/>
						)}
					/>

					<FormControl.HelperText>
						{t('auth.fields.password.hint')}
					</FormControl.HelperText>
					<FormControl.ErrorMessage>
						{errors.password?.message}
					</FormControl.ErrorMessage>
				</FormControl>

				<FormControl isRequired isInvalid={!!errors.passwordConfirm}>
					<FormControl.Label>
						{t('auth.fields.passwordConfirm.label')}
					</FormControl.Label>

					<Controller
						control={control}
						name='passwordConfirm'
						rules={{
							required: t('errors.form.requiredField') as string,
							validate: (value) =>
								value === getValues('password') ||
								(t('auth.fields.passwordConfirm.errors.notMatch') as string),
						}}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								placeholder={t('auth.fields.passwordConfirm.placeholder')}
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								secureTextEntry={!confirmPasswordIsVisible}
								autoCapitalize='none'
								InputRightElement={
									<Pressable
										onPress={() => setConfirmPasswordIsVisible((s) => !s)}
										mr='3'
									>
										<Icon
											as={
												<Feather name={passwordIsVisible ? 'eye-off' : 'eye'} />
											}
										/>
									</Pressable>
								}
							/>
						)}
					/>

					<FormControl.HelperText>
						{t('auth.fields.passwordConfirm.hint')}
					</FormControl.HelperText>
					<FormControl.ErrorMessage>
						{errors.passwordConfirm?.message}
					</FormControl.ErrorMessage>
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
