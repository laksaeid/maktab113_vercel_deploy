/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { axiosInstance } from "../../utils/axionInsrance";
import PaginationControlled from "./Pagination";
import { useDebouncedCallback } from "use-debounce";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(Object.fromEntries([...searchParams]));

  const debounced = useDebouncedCallback((value) => {
    if (value) {
      setSearchParams({ search: value });
    } else {
      const qs = Object.fromEntries([...searchParams]);
      delete qs["search"];
      setSearchParams(qs);
    }
  }, 1000);
  const { data: products, isLoading } = useQuery({
    queryFn: async () =>
      (
        await axiosInstance(
          `/products${
            searchParams.get("search")
              ? `/search?q=${searchParams.get("search")}`
              : ""
          }${searchParams.get("search") ? "&" : "?"}limit=10` +
            `&skip=${((searchParams.get("page") || 1) - 1) * 10}`
        )
      ).data,
    queryKey: [
      "products",
      searchParams.get("page") || "1",
      searchParams.get("search"),
    ],
  });

  return (
    <Stack gap={1} alignItems={"center"} mt={2}>
      <Button
        onClick={() =>
          setSearchParams((prev) => {
            prev.delete("search");
            return prev;
          })
        }
      >
        asd
      </Button>
      <TextField
        fullWidth
        placeholder="search"
        onChange={(e) => debounced(e.target.value)}
      />
      <Stack
        direction={"row"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        gap={4}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          products?.products?.map((product) => (
            <Card key={product.id} sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={
                    "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
                  }
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        )}
      </Stack>
      <PaginationControlled count={Math.ceil(products?.total / 10)} />
    </Stack>
  );
};

export default Products;
