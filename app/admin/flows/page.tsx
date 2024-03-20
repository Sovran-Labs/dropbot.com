'use client';

import React, { useEffect, useState } from 'react';
import {
	createColumnHelper,
	useReactTable,
	getCoreRowModel,
	flexRender,
	SortingState,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel
} from '@tanstack/react-table';
import { getFlows } from '@/services/flows/getFlows';
import { Flow } from '@/ts/types/Flow';
import { useRouter } from 'next/navigation';
import { WindowLoader } from '@/components/shared/WindowLoader';
import { DebouncedInput } from '@/components/shared/DebouncedInput';

export default function Flows() {
	const router = useRouter();

	const columnHelper = createColumnHelper<Flow>();
	const [renderCount, rerender] = useState<number>(0);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = React.useState('');

	const columns = [
		columnHelper.accessor('template.id', {
			header: () => 'ID',
			cell: (info) => info.renderValue(),
			footer: (info) => info.column.id
		}),
		columnHelper.accessor('description', {
			cell: (info) =>
				info.getValue()
					? `${info.getValue()?.substring(0, 20)}...`
					: 'No description',
			header: () => <span>Description</span>,
			footer: (info) => info.column.id
		}),
		columnHelper.accessor((row) => row.createdAt, {
			id: 'createdAt',
			cell: (info) => <>{new Date(info.getValue()).toLocaleString()}</>,
			header: () => <span>Created</span>,
			footer: (info) => info.column.id
		}),
		columnHelper.accessor((row) => row.createdAt, {
			id: 'actions',
			cell: (info) => (
				<>
					{/* <Dropdown /> */}
					<span
						className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
						onClick={() => {
							if (info.row.original.template.id === '7c') {
								router.push(
									'/admin/flows/view/7c/' +
										info.row.original._id
								);
							} else if (info.row.original.template.id === '7d') {
								router.push(
									'/admin/flows/view/7d/' +
										info.row.original._id
								);
							} else {
								router.push(
									'/admin/flows/' + info.row.original._id
								);
							}
						}}
					>
						<a
							href="#"
							className="text-indigo-400 hover:text-indigo-300"
						>
							View<span className="sr-only">View Flow</span>
						</a>
					</span>
				</>
			),
			header: () => <span>Actions</span>,
			footer: (info) => info.column.id
		})
	];

	const [flows, setFlows] = useState<{
		v: any;
		l: boolean;
		e: any;
	}>({
		v: [],
		l: true,
		e: null
	});

	const table = useReactTable({
		data: flows.v,
		columns,
		state: {
			sorting,
			globalFilter
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});

	useEffect(() => {
		async function req() {
			try {
				setFlows({ ...flows, l: true, e: null });
				const resp = await getFlows();
				const data = await resp.json();

				console.log('-> data <-', data);

				setFlows({ v: data?.flows ?? [], l: false, e: null });
			} catch (e) {
				setFlows({ ...flows, l: false, e: e });
			}
		}

		req();
	}, []);

	return (
		<>
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<div className="m-4 text-white text-3xl">Your Flows</div>
				</div>
			</div>

			<div className="h-2" />
			<div>
				<DebouncedInput
					value={globalFilter ?? ''}
					onChange={(value) => setGlobalFilter(String(value))}
					// className="p-2 font-lg shadow border border-block"
					className="block w-1/2 sm:w-1/4 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
					placeholder="Search all columns..."
				/>
			</div>
			<div className="h-2" />
			{flows.l ? (
				<WindowLoader />
			) : flows.v.length === 0 ? (
				<>No records found</>
			) : (
				<div className="mt-8 flow-root">
					<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table className="min-w-full divide-y divide-gray-300">
								<thead>
									{table
										.getHeaderGroups()
										.map((headerGroup) => (
											<tr key={headerGroup.id}>
												{headerGroup.headers.map(
													(header) => (
														<th
															key={header.id}
															scope="col"
															className="px-3 py-3.5 text-left text-sm font-semibold text-white"
														>
															{header.isPlaceholder
																? null
																: flexRender(
																		header
																			.column
																			.columnDef
																			.header,
																		header.getContext()
																  )}
														</th>
													)
												)}
											</tr>
										))}
								</thead>
								<tbody className="divide-y divide-gray-800">
									{table.getRowModel().rows.map((row) => (
										<tr key={row.id}>
											{row
												.getVisibleCells()
												.map((cell) => (
													<td
														key={cell.id}
														className="whitespace-nowrap px-3 py-4 text-sm text-white"
													>
														{flexRender(
															cell.column
																.columnDef.cell,
															cell.getContext()
														)}
													</td>
												))}
										</tr>
									))}
								</tbody>
							</table>
							<div className="h-2" />
							<div className="flex items-center gap-2">
								<button
									className="border rounded p-1"
									onClick={() => table.setPageIndex(0)}
									disabled={!table.getCanPreviousPage()}
								>
									{'<<'}
								</button>
								<button
									className="border rounded p-1"
									onClick={() => table.previousPage()}
									disabled={!table.getCanPreviousPage()}
								>
									{'<'}
								</button>
								<button
									className="border rounded p-1"
									onClick={() => table.nextPage()}
									disabled={!table.getCanNextPage()}
								>
									{'>'}
								</button>
								<button
									className="border rounded p-1"
									onClick={() =>
										table.setPageIndex(
											table.getPageCount() - 1
										)
									}
									disabled={!table.getCanNextPage()}
								>
									{'>>'}
								</button>
								<span className="flex items-center gap-1">
									<div>Page</div>
									<strong>
										{table.getState().pagination.pageIndex +
											1}{' '}
										of {table.getPageCount()}
									</strong>
								</span>
								<span className="flex items-center gap-1">
									| Go to page:
									<input
										type="number"
										defaultValue={
											table.getState().pagination
												.pageIndex + 1
										}
										onChange={(e) => {
											const page = e.target.value
												? Number(e.target.value) - 1
												: 0;
											table.setPageIndex(page);
										}}
										className="block w-16 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									/>
								</span>
								<select
									value={table.getState().pagination.pageSize}
									onChange={(e) => {
										table.setPageSize(
											Number(e.target.value)
										);
									}}
									className="block rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
								>
									{[10, 20, 30, 40, 50].map((pageSize) => (
										<option key={pageSize} value={pageSize}>
											Show {pageSize}
										</option>
									))}
								</select>
							</div>
							<div>{table.getRowModel().rows.length} Rows</div>
							{/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
