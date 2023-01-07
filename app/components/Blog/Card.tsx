import { Badge, Box, Image } from '@chakra-ui/react';

interface Props {
  id?: number;
  title: string;
  user: string;
  newBadge?: boolean;
}

export default function Card({ id, title, user, newBadge }: Props) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={`https://picsum.photos/400/400?random=${id}`} alt={title} />

      <Box p="6">
        {newBadge && (
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
          </Box>
        )}

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={2}
          title={title}
        >
          {title}
        </Box>

        <Box>{user}</Box>
      </Box>
    </Box>
  );
}
