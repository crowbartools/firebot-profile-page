import { useObserver } from "mobx-react";
import moment from "moment";
import React from "react";
import { useStores } from "../stores";
import { Pagination } from "./Pagination";
import { Searchbar } from "./Searchbar";

export const Quotes = () => {
    const { profileStore } = useStores();
    return useObserver(() => (
        <>
            <Searchbar onSearch={profileStore.setQuoteQuery} />
            <div className="my-2 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider max-w-md">
                                Text
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Author
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                Game
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {profileStore.profileData &&
                            profileStore.currentQuotes.map((q, i) => (
                                <tr key={q._id} className="odd:bg-white even:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                                        {q._id}
                                    </td>
                                    <td className="px-6 py-4 text-sm leading-5 text-gray-500 max-w-md whitespace-normal">
                                        {q.text}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {q.creator}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {moment(q.createdAt).format()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                        {q.game}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-center">
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
