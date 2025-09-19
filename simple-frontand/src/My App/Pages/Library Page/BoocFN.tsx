import { useEffect, useRef, useState } from "react";
import useSubjectWorks from "../../components/Hook/iuseFetchBook";
import BoocJSX from "./BoocJSX";


type Work = {
  key: string;
  title: string;
  cover_id?: number;
  authors?: { key: string; name?: string }[];
  first_publish_year?: number;
};

type WorkDetail = {
  title: string;
  description?: string | { value: string };
  subjects?: string[];
  covers?: number[];
  first_publish_date?: string;
  authors?: { author: { key: string; name?: string } }[];
  key?: string;
};

const OPENLIB_BASE = "https://openlibrary.org";

export default function BookFN() {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [selectedWorkKey, setSelectedWorkKey] = useState<string | null>(null);
  const [workDetail, setWorkDetail] = useState<WorkDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useSubjectWorks(activeSubject);

  const subjectWorks: Work[] = data?.pages.flatMap((page) => page) ?? [];

  useEffect(() => {
    if (status === "error") setError("Error loading works");
    else setError(null);
  }, [status]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSubjectChange = (subject: string) => {
    setError(null);
    setActiveSubject(subject);
    setSelectedWorkKey(null);
    setWorkDetail(null);
  };

  const fetchWorkDetail = async (workKey: string) => {
    setSelectedWorkKey(workKey);
    setWorkDetail(null);
    setLoadingDetail(true);
    try {
      const res = await fetch(`${OPENLIB_BASE}${workKey}.json`);
      if (!res.ok) throw new Error("Failed to load work detail");
      const data = await res.json();
      setWorkDetail(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unknown error");
    } finally {
      setLoadingDetail(false);
    }
  };

  return (
    <BoocJSX
      activeSubject={activeSubject}
      subjectWorks={subjectWorks}
      workDetail={workDetail}
      selectedWorkKey={selectedWorkKey}
      loadingDetail={loadingDetail}
      error={error}
      observerRef={observerRef}
      isFetching={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      handleSubjectChange={handleSubjectChange}
      fetchWorkDetail={fetchWorkDetail}
      setSelectedWorkKey={setSelectedWorkKey}
      setWorkDetail={setWorkDetail}
    />
  );
}
