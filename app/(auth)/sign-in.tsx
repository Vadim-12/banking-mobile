import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import {
	Box,
	Button,
	Center,
	FormControl,
	Heading,
	Icon,
	Input,
	Pressable,
	Text,
} from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface IFormData {
	phoneNumber: string;
	password: string;
}

export default function SignInScreen() {
	const { t } = useTranslation();
	const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);
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
				<Heading>{t('auth.title.sign-in')}</Heading>

				<FormControl isRequired isInvalid={!!errors.phoneNumber}>
					<FormControl.Label>{t('auth.fields.email.label')}</FormControl.Label>

					<Controller
						control={control}
						name='phoneNumber'
						rules={{
							required: t('errors.form.requiredField') as string,
							pattern: {
								// Разрешаем только цифры, пробелы, +, -, (, )
								value: /^[0-9+\-() ]{6,20}$/,
								message: t('auth.fields.phoneNumber.errors.notValid'),
							},
						}}
						render={({ field: { value, onChange, onBlur } }) => (
							<>
								<Input
									placeholder={t('auth.fields.phoneNumber.placeholder')}
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									keyboardType='phone-pad'
									autoComplete='tel'
									returnKeyType='next'
								/>
							</>
						)}
					/>

					<FormControl.ErrorMessage>
						{errors.phoneNumber?.message}
					</FormControl.ErrorMessage>
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

				<Button onPress={onSubmit}>{t('auth.buttons.sign-in.enter')}</Button>
				<Box>
					<Text>{t('auth.buttons.sign-in.navigation.firstPart')}</Text>
					<Link href={'/(auth)/sign-in'}>
						{t('auth.buttons.sign-in.navigation.secondPart')}
					</Link>
				</Box>
			</Box>
		</Center>
	);
}
