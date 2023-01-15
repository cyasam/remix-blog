import { Badge, Box, Image } from '@chakra-ui/react';

interface Props {
  id?: number;
  title: string;
  user?: any;
  newBadge?: boolean;
  image?: any;
  avatar?: string;
  publishedDate?: string;
}

export default function Card({
  title,
  user,
  newBadge,
  image,
  avatar,
  publishedDate,
}: Props) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={`${image.fields.file.url}`} alt={title} />

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
          as="h3"
          lineHeight="tight"
          noOfLines={2}
          title={title}
        >
          {title}
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt="3"
        >
          <Box display="flex" alignItems="center">
            <Image src={`${avatar}`} alt={user.fields.name} mr="3" width="10" />
            <Box as="p">{user.fields.name}</Box>
          </Box>
          {publishedDate && (
            <Box>
              {new Intl.DateTimeFormat('en-US').format(new Date(publishedDate))}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
