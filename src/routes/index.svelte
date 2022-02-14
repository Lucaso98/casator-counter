<script context="module" lang="ts">
	import Icon from 'svelte-awesome/components/Icon.svelte';
	import { plus, times } from 'svelte-awesome/icons';
	export const prerender = true;
</script>

<script lang="ts">
	const units = ['Villa Lindö', 'U&T', 'Sörgården', 'Botorp'];
	const months = [
		'Januari',
		'Februari',
		'Mars',
		'April',
		'Maj',
		'Juni',
		'Juli',
		'Augusti',
		'September',
		'Oktober',
		'November',
		'December'
	];
	const depositTableHeaders = ['Datum', 'Summa', 'Insatt från', 'Sign'];
	const mainTableHeaders = ["Inköp av", "Kostnad", "Konto", "Sign"];

	let ingoingBalance = 0;

	let depositRows = [
		{date: "01-feb", sum: 0, depositFrom: "-", sign: "-"}
	];
	let mainRows = [
		{purchase: "-", cost: 0, account: "-", sign: "-"}
	];

	$: depositAmount = depositRows.reduce((sum, dr) => sum + dr.sum, 0);
	$: sumOfPurchases = mainRows.reduce((sum, mr) => sum + mr.cost, 0)

	function addNewDepositRow() {
		depositRows = [...depositRows, {date: "-", sum: 0, depositFrom: "-", sign: "-"}];
	};
	function addNewMainRow() {
		mainRows = [...mainRows, {purchase: "-", cost: 0, account: "-", sign: "-"}];
	};

	function deleteDepositRow(depositRowToBeDeleted) {
		depositRows = depositRows.filter(depositRow => depositRow != depositRowToBeDeleted);
	};
	function deleteMainRow(mainRowToBeDeleted) {
		mainRows = mainRows.filter(mainRow => mainRow != mainRowToBeDeleted);
	};

	let inventorySum = 0;
</script>

<div>
	<h1 class="text-lg mx-4 text-left leading-6 font-bold text-gray-900">Handkassa redovisning</h1>
</div>
<aside class="grid grid-cols-3 mx-4 my-10 gap-20">
	<div class="space-y-6 col-span-1">
		<div class="space-y-6 sm:space-y-5">
			<div
				class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
			>
				<label for="unit" class="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
					Enhet
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<select
						id="unit"
						name="unit"
						class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md print:bg-none"
					>
						{#each units as unit}
							<option value={unit}>{unit}</option>
						{/each}
					</select>
				</div>
			</div>
			<div
				class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
			>
				<label for="month" class="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
					Månad
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<select
						id="month"
						name="month"
						class="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md print:bg-none"
					>
						{#each months as month}
							<option value={month}>{month}</option>
						{/each}
					</select>
				</div>
			</div>
			<div
				class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
			>
				<label for="year" class="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
					År
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						type="number"
						name="year"
						id="year"
						placeholder="2022"
						class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>
			<div
				class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
			>
				<label for="balance" class="block text-sm font-bold text-gray-700 sm:mt-px sm:pt-2">
					Ingående saldo (SEK)
				</label>
				<div class="mt-1 sm:mt-0 sm:col-span-2">
					<input
						type="number"
						name="balance"
						id="balance"
						placeholder="0"
						bind:value={ingoingBalance}
						class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- This example requires Tailwind CSS v2.0+ -->
	<div class="flex flex-col col-span-2">
		<h2 class="text-black font-base font-bold mb-3">Månadens insättningar</h2>
		<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
				<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
					
					<table class="min-w-full divide-y divide-gray-200">
						<thead class="bg-gray-50">
							<tr>
								{#each depositTableHeaders as depositTableHeader}
									<th scope="col" class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{depositTableHeader}</th>
								{/each}
								
								<th
									scope="col"
									class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								/>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200 align-center">
							{#each depositRows as depositRow}
							<tr class="align-baseline">
									<td class="p-3 text-left text-xs font-medium tracking-wider" contenteditable="false">
										<input type="text" name="depositDate" id="depositDate" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" bind:value={depositRow.date} />
									</td>
									<td class="p-3 text-left text-xs font-medium tracking-wider" contenteditable="false">
										<input type="number" name="depositSum" id="depositSum" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" bind:value={depositRow.sum} />
									</td>
									<td class="p-3 text-left text-xs font-medium tracking-wider" contenteditable="false">
										<input type="text" name="depositFrom" id="depositFrom" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" bind:value={depositRow.depositFrom} />
									</td>
									<td class="p-3 text-left text-xs font-medium tracking-wider" contenteditable="false">
										<input type="text" name="depositSign" id="depositSign" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" bind:value={depositRow.sign} />
									</td>
									<button class="text-red-600 font-bold hover:text-red-700 print:hidden" on:click={() => deleteDepositRow(depositRow)}>X</button>
								</tr>
								{/each}
						</tbody>
					</table>
					<div class="mx-4 my-1">
						<p class="block text-sm font-bold text-gray-700">Summa av insättningar: <span class="font-medium">{depositAmount}</span></p>
					</div>
					<div class="w-full text-center">
						<button on:click={addNewDepositRow} type="button" class="inline-flex mb-2 items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-none focus:ring-offset-none focus:ring-none">
							<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
							</svg>
						  </button>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full text-center mt-4" />
	</div>
</aside>

<!-- This example requires Tailwind CSS v2.0+ -->
<div class="flex flex-col mx-4">
	<div class="overflow-x-auto">
		<div class="py-2 align-middle inline-block min-w-full">
			<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
				<table id="table" class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							{#each mainTableHeaders as mainTableHeader}
								<th scope="col" class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{mainTableHeader}</th>
							{/each}
							<th
								scope="col"
								class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							/>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200 align-center">
						{#each mainRows as mainRow}
							<tr class="align-baseline">
									<td class="p-3 text-left text-xs font-medium tracking-wider" contenteditable="false">
										<input type="text" name="purchase" id="purchase" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" bind:value={mainRow.purchase} />
									</td>
									<td class="p-3 text-left text-xs font-medium tracking-wider" contenteditable="false">
										<input type="number" name="cost" id="cost" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" bind:value={mainRow.cost} />
									</td>
									<td class="p-3 text-left text-xs font-medium tracking-wider" contenteditable="false">
										<input type="text" name="depositFrom" id="depositFrom" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" bind:value={mainRow.account} />
									</td>
									<td class="p-3 text-left text-xs font-medium tracking-wider" contenteditable="false">
										<input type="text" name="mainSign" id="mainSign" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" bind:value={mainRow.sign} />
									</td>
									<button class="text-red-600 font-bold hover:text-red-700 print:hidden" on:click={() => deleteMainRow(mainRow)}>X</button>
								</tr>
								{/each}
					</tbody>
				</table>
				<div class="mx-4 my-1">
					<p class="block text-sm font-bold text-gray-700">Summa av kostnader: <span class="font-medium">{sumOfPurchases}</span></p>
				</div>
				<div class="w-full text-center">
					<button on:click={addNewMainRow} type="button" class="inline-flex mb-2 items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-none focus:ring-offset-none focus:ring-none">
						<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
						</svg>
					  </button>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- This example requires Tailwind CSS v2.0+ -->
<ul class="divide-y divide-gray-200">
	<li class="py-4">
		<p  class="block text-base font-bold text-gray-700">Summa kvar enligt redovisning: <span class="font-medium">{(ingoingBalance + depositAmount) - sumOfPurchases}</span></p>
	</li>
	<li class="py-4">
		<div class="flex items-baseline">
			<label for="inventorySum" class="block text-base font-bold text-gray-700">Summa enligt inventering (faktisk summa kvar i kassan):</label>
			<div class="mt-1">
	  			<input bind:value={inventorySum} type="number" name="inventorySum" id="inventorySum" class="shadow-sm ml-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full text-base border-gray-300 rounded-md">
			</div>
  		</div>
	</li>
	<li class="py-4">
		<p class="block text-base font-bold text-gray-700">Diff: <span class="font-medium">{inventorySum - ((ingoingBalance + depositAmount) - sumOfPurchases)}</span></p>
	</li>
  </ul>
<button class="absolute left-3/4 items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-none focus:ring-offset-none focus:ring-none print:hidden" on:click={() => window.print()}>Skriv ut</button>
<style>
</style>
