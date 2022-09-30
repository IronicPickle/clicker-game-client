import useGetSession from "@api/get/hooks/useGetSession";
import useStorageItem from "@hooks/useStorageItem";

export default () => {
  const sessionItem = useStorageItem<string>("sessionId");

  const { isLoading, errs, data, send: get } = useGetSession();

  sessionItem.item.subscribe(({ data }) => {
    if (data) get({ id: data });
  });

  return { isLoading, errs, data };
};
