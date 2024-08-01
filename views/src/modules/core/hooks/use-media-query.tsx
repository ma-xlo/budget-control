import { useMediaQuery as mediaQuery } from "@uidotdev/usehooks";

interface useMediaQueryProps {
  query?: string;
}

const useMediaQuery = (
  props: useMediaQueryProps = { query: "(min-width: 768px)" }
) => {
  const { query } = props;
  const isDesktop = mediaQuery(query ? query : "(min-width: 768px)");

  return isDesktop;
};

export default useMediaQuery;
