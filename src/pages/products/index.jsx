/* eslint-disable no-unused-vars */
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { axiosInstance } from "../../utils/axionInsrance";

const Products = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam }) => {
      return await axiosInstance("/products", {
        params: {
          limit: 10,
          skip: pageParam,
        },
      });
    },
    initialPageParam: 0,
    getNextPageParam: (LastPage, allPages, lastPageParam, allPagesParams) => {
      // console.log(LastPage.data.total, "lastPage");
      const products = allPages
        .flatMap((item) => item.data)
        .map((item) => item.products)
        .flat();

      if (products.length === LastPage.data.total) {
        return undefined;
      } else {
        return LastPage.data.skip + 10;
      }
    },
    placeholderData: keepPreviousData,
  });

  const products = useMemo(() => {
    return data?.pages
      ?.flatMap((item) => item.data)
      .flatMap((item) => item.products);
  }, [data]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && inView) fetchNextPage();
  }, [inView]);

  return (
    <>
      <Stack direction={"row"} flexWrap={"wrap"} gap={4}>
        {products?.map((product) => (
          <Card key={product.id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={product.images[0]}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
        <div ref={ref} />
      </Stack>
    </>
  );
};

export default Products;
