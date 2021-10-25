import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
	showProfileDate?: boolean;
}

export function Profile({ showProfileDate = true }: ProfileProps) {
	return (
		<Flex align="center">
			{showProfileDate && (
				<Box mr="4" textAlign="right">
					<Text>Marco Echevestre</Text>
					<Text color="gray.300" fontSize="small">
						devminotto@gmail.com
					</Text>
				</Box>
			)}
			<Avatar
				size="md"
				name="Marco Echevestre"
				src="https://avatars.githubusercontent.com/u/21248323?v=4"
			/>
		</Flex>
	);
}
