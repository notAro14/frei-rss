import { useEffect } from "react";
import { useDispatch } from "src/store";
import { getFeeds } from "src/Feed/usecases/getFeeds";

export default function useGetFeeds() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);
}
