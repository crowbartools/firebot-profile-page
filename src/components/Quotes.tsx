import clsx from "clsx";
import { useObserver } from "mobx-react";
import moment from "moment";
import React from "react";
import { useStores } from "../stores";
import { Pagination } from "./Pagination";

export const Quotes = () => {
    const { profileStore } = useStores();
    return useObserver(() => (
        <>
            <div className="bg-gray-500 rounded-md overflow-hidden mt-2 mb-16 md:mb-9">
                {profileStore.profileData &&
                    profileStore.currentQuotes.map((q, i) => (
                        <div
                            key={q._id}
                            className={clsx("p-6", {
                                "border-t border-gray-700 border-solid": i > 0,
                            })}
                        >
                            <div className="text-2xl italic font-hairline mb-2 break-words">
                                {q.text}
                            </div>
                            <div>
                                &#8212; <span>{q.originator}</span>,{" "}
                                <span className="font-thin">
                                    {moment(q.createdAt).format("M/D/YYYY")}
                                </span>
                                <span className="text-sm text-gray-200 ml-2">({q.game})</span>
                            </div>
                            <div className="text-gray-200 tracking-wide mt-2">#{q._id}</div>
                        </div>
                    ))}
            </div>
            <div
                className="fixed flex items-center justify-center mb-8 md:mb-5 shadow-xl"
                style={{ bottom: 0, left: "50%", transform: "translateX(-50%)" }}
            >
                <Pagination
                    totalRecords={profileStore.filteredQuotes.length}
                    currentPage={profileStore.quotesPagination.currentPage}
                    pageSize={profileStore.quotesPagination.pageSize}
                    onPageChanged={profileStore.setCurrentQuotesPage}
                />
            </div>
        </>
    ));
};
