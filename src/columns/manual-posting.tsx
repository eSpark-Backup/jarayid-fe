export const columns = () => {
  return [
    { name: "Headline", key: "title" },
    { name: "Category", key: "category" },
    {
      name: "Image",
      key: "image",
      component: (item) => {
        return item?.image ? <img width={30} src={item?.image} /> : null;
      },
    },
    { name: "Published On", key: "publishedDate" },
    { name: "Actions", key: "action" },
  ];
};
