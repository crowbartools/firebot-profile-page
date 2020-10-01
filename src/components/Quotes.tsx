import { useObserver } from "mobx-react";
import moment from "moment";
import React from "react";
import { useStores } from "../stores";
import { Pagination } from "./Pagination";

export const Quotes = () => {
    const { profileStore } = useStores();
    return useObserver(() => (
        <>
            <div className="my-2 overflow-hidden border-b border-gray-700 rounded-lg">
                <table className="min-w-full divide-y divide-gray-500 pb-0">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium uppercase tracking-wider max-w-md">
                                Text
                            </th>
                            <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                Author
                            </th>
                            <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 bg-gray-400 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                Game
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {profileStore.profileData &&
                            profileStore.currentQuotes.map((q, i) => (
                                <tr key={q._id} className="odd:bg-gray-500 even:bg-gray-400">
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium">
                                        {q._id}
                                    </td>
                                    <td className="px-6 py-4 text-sm leading-5 max-w-md whitespace-normal">
                                        {q.text}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        {q.originator}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        {moment(q.createdAt).format()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                        {q.game}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div
                className="fixed flex items-center justify-center mb-8 shadow-xl"
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
