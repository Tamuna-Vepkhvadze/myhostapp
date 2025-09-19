import { useInfiniteQuery } from "@tanstack/react-query";
import fatchLibrary from "../../../App servise/ReactQuery/Query/fatchLibrary";

const LIMIT = 15;

const useSubjectWorks = (subject: string | null) => {
  return useInfiniteQuery({
    queryKey: ["subjectWorks", subject],
    queryFn: async ({ pageParam = 0 }) => {
      if (!subject) return [];
      return await fatchLibrary(subject, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < LIMIT ? undefined : allPages.length;
    },
    enabled: !!subject,
  });
};

export default useSubjectWorks;
