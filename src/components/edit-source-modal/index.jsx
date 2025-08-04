import React, { useEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import CategoryDropdown from "../category-tab";
import CheckOn from "../../assets/icons/check-on.svg";
import CheckOff from "../../assets/icons/check-off.svg";
import { rssSource } from "../../assets";
import { useSearchParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../../services/feed";
import { useRssFeedQuery } from "../../services/rss";
import { useSelector } from "react-redux";
import { getFont } from "../../utils";

const EditSourceModal = () => {
  const [selectedCategories, setSelectedCategories] = useState({});
  const [category, setCategory] = useState("");
  const [activeId, setActiveId] = useState("");
  const [rssPage, setRssPage] = useState(1);
  const { category: categoriesData } = useSelector((state) => state.category);
  const [fetched, setFetched] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(false);

  const {
    data: rssData,
    isLoading: rssLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useRssFeedQuery(
    {
      page: rssPage,
      limit: 7,
      categoryId: activeId,
    },
    { skip: activeId === "" }
  );

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (rssData) {
      const data = rssData?.data?.items?.map((item) => ({
        id: item?.id,
        link: item?.url,
        img: item?.logo,
        checked: true,
      }));
      setFetched(true);
      setItems(data);
      setHasMoreData(rssData?.data?.pagination?.hasNextPage);
    }
  }, [rssData]);

  const handleItemClicked = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  useEffect(() => {
    const filtered = categoriesData.filter(
      (item) => selectedCategories[item.name] === true
    );
    console.log("HELLO");

    const newIds = filtered?.map((item) => item?.id);
    // console.log(newIds, "NEWS IDS");
    setActiveId(newIds?.join(","));
  }, [selectedCategories]);

  useEffect(() => {
    if (activeId === "") {
      setItems([]);
    }
  }, [activeId]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: "10px",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Typography sx={{ fontSize: getFont("32px"), fontWeight: "600" }}>
          Edit New Source
        </Typography>
        <Box
          sx={{
            flex: 1,
            // height: "57.28px",
            minWidth: 0,
            width: { xs: "100%" },
          }}
        >
          <CategoryDropdown
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedText={category}
            setSelectedText={setCategory}
            width="100%"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          px: "15px",
          minHeight: "250px",
          mt: "20px",
        }}
      >
        {rssLoading || isFetching
          ? [...Array(2)]?.map((_, index) => (
              <Skeleton
                variant="rectangular"
                sx={{ height: "100px", mt: "10px" }}
                key={index}
              />
            ))
          : items?.map((item, index) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                key={index}
              >
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "10px",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item?.checked ? CheckOn : CheckOff}
                    alt="checkbox"
                    style={{
                      cursor: "pointer",
                      width: 35,
                      height: 35,
                      //   marginRight: 8,
                    }}
                    onClick={() => handleItemClicked(item?.id)}
                  />
                  <Typography
                    sx={{
                      fontSize: getFont("20.38px"),
                      color: "#101828",
                      fontWeight: "600",
                    }}
                    title={item?.link}
                  >
                    {item?.link?.length > 50
                      ? item?.link?.slice(0, 50) + "..."
                      : item?.link}
                  </Typography>
                </Box>
                <Box
                  component={"img"}
                  src={item?.img}
                  sx={{
                    width: { xs: "90.80px", md: "120.80px", lg: "190.80px" },
                    height: { xs: "80px", md: "100.85px", lg: "130.85px" },
                    objectFit: "cover",
                  }}
                />
              </Box>
            ))}
        {!rssLoading && !isFetching && hasMoreData && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: "15px",
              }}
            >
              <Box sx={{ width: "200px", height: "40px" }}>
                <Button variant="gradient">View More</Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default EditSourceModal;
