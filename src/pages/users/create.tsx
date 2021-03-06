import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	VStack,
} from "@chakra-ui/react";

import Link from "next/link";
import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreateUserFormData = {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
	name: yup.string().required("Nome obrigátorio"),
	email: yup.string().required("E-mail obrigátorio").email("E-mail inválido"),
	password: yup
		.string()
		.required("Senha obrigátoria")
		.min(6, "Mínimo 6 caracteres"),
	password_confirmation: yup
		.string()
		.oneOf([null, yup.ref("password")], "As senha precisam ser iguais"),
});

export default function CreateUser() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm({
		resolver: yupResolver(createUserFormSchema),
	});

	const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
		values
	) => {
		router.push("/users");
	};

	return (
		<Box>
			<Header />

			<Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
				<Sidebar />

				<Box
					as="form"
					flex="1"
					borderRadius={8}
					bg="gray.800"
					p={["6", "8"]}
					onSubmit={handleSubmit(handleCreateUser)}
				>
					<Heading size="lg" fontWeight="normal">
						Criar usuário
					</Heading>

					<Divider my="6" borderColor="gray.700" />

					<VStack spacing="8">
						<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
							<Input
								name="name"
								label="Nome Completo"
								error={errors.name}
								{...register("name")}
							/>
							<Input
								name="email"
								label="E-mail"
								error={errors.email}
								{...register("email")}
							/>
						</SimpleGrid>
						<SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
							<Input
								name="password"
								type="password"
								label="Senha"
								error={errors.password}
								{...register("password")}
							/>
							<Input
								name="password_confirmation"
								type="password"
								label="Confirmar Senha"
								error={errors.password_confirmation}
								{...register("password_confirmation")}
							/>
						</SimpleGrid>
					</VStack>

					<Flex mt="8" justify="flex-end">
						<HStack spacing="4">
							<Link href="/users" passHref>
								<Button as="a" colorScheme="whiteAlpha">
									Cancelar
								</Button>
							</Link>
							<Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
								Cadastrar
							</Button>
						</HStack>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
}
