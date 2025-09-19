import type { RefObject } from "react";

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

interface Props {
  activeSubject: string | null;
  subjectWorks: Work[];
  workDetail: WorkDetail | null;
  selectedWorkKey: string | null;
  loadingDetail: boolean;
  error: string | null;
  observerRef: RefObject<HTMLDivElement | null>;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  handleSubjectChange: (s: string) => void;
  fetchWorkDetail: (key: string) => void;
  setSelectedWorkKey: (key: string | null) => void;
  setWorkDetail: (detail: WorkDetail | null) => void;
}

const SUBJECTS = [
  "fantasy",
  "science_fiction",
  "romance",
  "mystery",
  "thriller",
  "horror",
  "history",
  "biography",
  "children",
  "poetry",
  "travel",
  "cookbooks",
];

const OPENLIB_BASE = "https://openlibrary.org";
const COVER_URL = (id: number, size: "S" | "M" | "L" = "M") =>
  `https://covers.openlibrary.org/b/id/${id}-${size}.jpg`;

const tidyTitle = (t?: string) =>
  t && t.length > 60 ? t.slice(0, 57) + "..." : t ?? "";

export default function BoocJSX({
  activeSubject,
  subjectWorks,
  workDetail,
  selectedWorkKey,
  loadingDetail,
  error,
  observerRef,
  isFetching,
  isFetchingNextPage,
  hasNextPage,
  handleSubjectChange,
  fetchWorkDetail,
  setSelectedWorkKey,
  setWorkDetail,
}: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800">
              Book Explorer
            </h1>
            <p className="text-slate-500 mt-1">
              Discover by genre → books. Open Library powered.
            </p>
          </div>
          <div className="mt-3 sm:mt-0">
            <nav className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-500 mr-2">Genres:</span>
              {SUBJECTS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSubjectChange(s)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                    activeSubject === s
                      ? "bg-indigo-600 text-white shadow"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {s.replace("_", " ")}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* Works grid */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-800">
              {activeSubject
                ? `Top works in "${activeSubject.replace("_", " ")}"`
                : "Choose a genre"}
            </h2>
            <div>
              {isFetching && !isFetchingNextPage && (
                <span className="text-sm text-slate-500">Loading works...</span>
              )}
              {error && (
                <span className="text-sm text-red-500 ml-2">{error}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjectWorks.map((w) => (
              <article
                key={w.key}
                className="bg-white rounded-2xl shadow p-4 flex gap-4 hover:shadow-md transition cursor-pointer"
                onClick={() => fetchWorkDetail(w.key)}
              >
                <div className="w-28 h-36 flex-shrink-0 rounded overflow-hidden bg-slate-100">
                  {w.cover_id ? (
                    <img
                      src={COVER_URL(w.cover_id, "L")}
                      alt={w.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                      No cover
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {tidyTitle(w.title)}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {w.authors && w.authors.length > 0
                      ? w.authors
                          .map(
                            (a) => a.name ?? a.key.replace("/authors/", "")
                          )
                          .join(", ")
                      : "Unknown author"}
                  </p>
                  <div className="mt-3 text-sm text-slate-400">
                    {w.first_publish_year ?? "—"}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {hasNextPage && (
            <div ref={observerRef} className="text-center py-4">
              {isFetchingNextPage ? "Loading more..." : ""}
            </div>
          )}
        </section>

        {/* Work detail modal */}
        {selectedWorkKey && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => {
                setSelectedWorkKey(null);
                setWorkDetail(null);
              }}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-auto">
              <div className="p-6">
                <div className="flex items-start gap-6">
                  <div className="w-40 h-56 rounded overflow-hidden bg-slate-100 flex-shrink-0">
                    {workDetail?.covers && workDetail.covers.length > 0 ? (
                      <img
                        src={COVER_URL(workDetail.covers[0], "L")}
                        alt={workDetail.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        No cover
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                          {workDetail?.title}
                        </h2>
                        <div className="text-sm text-slate-500 mt-1">
                          {workDetail?.authors && workDetail.authors.length > 0
                            ? workDetail.authors
                                .map(
                                  (a) =>
                                    a.author.name ??
                                    a.author.key.replace("/authors/", "")
                                )
                                .join(", ")
                            : ""}
                          {workDetail?.first_publish_date
                            ? ` • ${workDetail.first_publish_date}`
                            : ""}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`${OPENLIB_BASE}${selectedWorkKey}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                        >
                          Open on OpenLibrary
                        </a>
                        <button
                          onClick={() => {
                            setSelectedWorkKey(null);
                            setWorkDetail(null);
                          }}
                          className="px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200"
                        >
                          Close
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">
                        Subjects
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(workDetail?.subjects ?? [])
                          .slice(0, 12)
                          .map((sub) => (
                            <span
                              key={sub}
                              className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-600"
                            >
                              {sub}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-slate-700 mb-2">
                        Description
                      </h4>
                      <p className="text-sm text-slate-700 whitespace-pre-line">
                        {typeof workDetail?.description === "string"
                          ? workDetail?.description
                          : workDetail?.description?.value ??
                            "No description available."}
                      </p>
                    </div>

                    {loadingDetail && (
                      <p className="text-sm text-slate-500 mt-4">
                        Loading detail...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-10 text-center text-sm text-slate-400">
          Data from{" "}
          <a href="https://openlibrary.org" className="underline">
            Open Library
          </a>
          . Covers via OpenLibrary Cover API.
        </footer>
      </div>
    </div>
  );
}
