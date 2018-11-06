<template lang="html">

	<!-- START : spTable Container -->
	<div class="spTableContainer">

		<!-- START : Top (Dark) Border -->
		<div class="spTableTopBorder"></div>
		<!-- END   : Top (Dark) Border -->

		<!-- START : Top Controls -->
		<div class="spTableControls">

			<!-- START : Search Bar -->
			<div class="spTableControls-Search">
				<div v-if="search" class="spTableControls-SearchContainer">
					<i class="fas fa-search findIcon"></i>
					<input v-model="searchTerm" type="search" placeholder="Search List .." v-on:input="performSearch()">
					<span v-if="searchTerm" class="spTableControls-Button closeIcon">
						<i v-on:mouseover="setTableTitleText('Clear Search')" v-on:mouseout="setTableTitleText('')" v-on:click="searchTerm = ''" class="far fa-window-close"></i>
					</span>
				</div>
			</div>
			<!-- END   : Search Bar -->

			<!-- START : Table Hover Title -->
			<div class="spTableControls-Title">
				<transition name="transitionSlideDown">
					<span v-if="tableTitle !== ''">{{ tableTitle }}</span>
				</transition>
			</div>
			<!-- END   : Table Hover Title -->

			<!-- START : Buttons/Icons -->
			<div class="spTableControls-Button">
				<i v-if="addNew" v-on:mouseover="setTableTitleText('Add New Item')" v-on:mouseout="setTableTitleText('')" v-on:click="addNewItem()" class="far fa-plus-square"></i>
				<i v-if="filter" v-on:mouseover="setTableTitleText('Filter By Column')" v-on:mouseout="setTableTitleText('')" v-on:click="filterPane = !filterPane" class="fas fa-filter smallerIcon" :class="filterPane ? 'selectedIcon' : filtersExist ? 'filterApplied' : ''"></i>
				<i v-if="refresh" v-on:mouseover="setTableTitleText('Refresh List')" v-on:mouseout="setTableTitleText('')" v-on:click="initializeList()" class="fas fa-sync-alt smallerIcon"></i>
			</div>
			<!-- END   : Buttons/Icons -->

		</div>
		<!-- END   : Top Controls -->

		<!-- START : Table Content (Header/Rows) -->
		<div class="spTableContent">
			<transition name="transitionFadeNoOut">
				<div class="spTableDataArea">

					<!-- START : Loader -->
					<div v-if="!spListTasksComplete" class="tableLoading">
						<spLoader :message="'Loading Data ..'" :colour="'#7A6054'"></spLoader>
					</div>
					<!-- END   :  Loader -->

					<!-- START : Table Content -->
					<table v-if="spListTasksComplete">

						<!-- START : Header -->
						<thead>
							<tr>
								<th v-for="( column, index ) in columns" v-on:click="performSort( column, index )" v-on:mouseover="setTableTitleText( getSortTitleText( column, index ) )" v-on:mouseout="setTableTitleText('')" :class="getCurrentSortDirection( index )">
									{{ column.displayName }}
								</th>
							</tr>
						</thead>
						<!-- END  : Header -->

						<!-- START : Body -->
						<tbody v-if="currentRowTotal">
							<tr v-for="( row, index ) in tablePaginatedData" v-on:click="viewItem( index, row )" v-on:mouseover="setTableTitleText( getRowTitleText( row, index ) )" v-on:mouseout="setTableTitleText('')">
								<td v-for="column in columns" :data-title="column.displayName">
									{{ row[column.internalName] }}
								</td>
							</tr>
						</tbody>

						<tbody v-else>
							<tr>
								<td :colspan="columns.length" class="noTableData">No Data Found.</td>
							</tr>
						</tbody>
						<!-- END   : Body -->

					</table>
					<!-- END   : Table Content -->

					<!-- START : Filter Pane -->
					<transition name="transitionSlideLeftThenRight">
						<div v-if="filterPane" class="spTableFilterPane">

							<!-- START : Filter Pane Left Border -->
							<div class="sTableFilterPaneBorder"></div>
							<!-- END   : Filter Pane Left Border -->

							<!-- START : Filter Pane Center Content -->
							<div class="sTableFilterPaneContent">

								<!-- START : Filter Pane Title/Clear -->
								<div class="spTableFilterPaneTitle">
									<span>Filter Options</span>
									<button v-if="filterColumns.length > 0 && !filterApplied" v-on:click="generateFilterOptions()" type="button" class="vueFormButton vueFormButtonLight vueFormButtonSlim">
										<i class="fas fa-minus-circle"></i>
										<span>Clear All Filters</span>
									</button>
								</div>
								<!-- END   : Filter Pane Title/Clear -->

								<!-- START : Filter Pane Column List -->
								<div class="spTableFilterPaneColumns">
									<div v-if="filterColumns.length > 0" v-for="column in filterColumns" class="spTableFilterPaneColumnsItems">
										<div v-on:click="displayFilterOptions( column )" class="spTableFilterPaneColumnsItem">
											<span>{{ getColumnDisplayName( column ) }}</span>
										</div>

										<transition name="transitionSlideDownThenNone">
											<div v-show="filterActiveColumn === column" class="spTableFilterPaneOptions">
												<span v-for="( item, index ) in filterOptions[column]" v-on:click="filterSelected( column, index )" :class="getFilterClass( column, index )">{{ item.value }}</span>
											</div>
										</transition>
									</div>
									<div v-if="filterColumns.length === 0" class="spTableFilterPaneNone">
										<span>Filters are not enabled</span>
										<span>for this table.</span>
									</div>
								</div>
								<!-- END   : Filter Pane Column List -->

								<!-- START : Filter Pane Close -->
								<div v-on:click="filterPane = false" class="spTableFilterPaneClose">
									<i class="far fa-times-circle"></i>
								</div>
								<!-- END   : Filter Pane Close -->

							</div>
							<!-- END   : Filter Pane Center Content -->

							<!-- START : Filter Pane Right Border -->
							<div class="sTableFilterPaneBorder"></div>
							<!-- END   : Filter Pane Right Border -->
						</div>
					</transition>
					<!-- END   : Filter Pane -->

				</div>
			</transition>
		</div>
		<!-- END   : Table Content (Header/Rows) -->

		<!-- START : spTable Footer -->
		<div class="spTableFooter">

			<!-- START : spTable Footer Item Limit -->
			<div class="spTableFooter-RowQuantity">
				<span>Items</span>

				<select v-model="currentPerPage" class="spTableFooter-RowQuantity-Select" v-on:change="currentPage = 1">
					<option v-for="option in perPageOptions" :value="option" :selected="option === currentPerPage">
						{{ option === -1 ? 'All' : option }}
					</option>
				</select>
			</div>
			<!-- END   : spTable Footer Item Limit -->

			<!-- START : spTable Footer Items Found -->
			<div class="spTableFooter-SearchFound">
				<span v-if="searchTerm !== '' || filtersExist">Found {{ currentRowTotal }} Items</span>
			</div>
			<!-- END   : spTable Footer Items Found -->

			<!-- START : spTable Footer Pagination -->
			<div class="spTableFooter-Pager">
				<i v-if="currentPerPage > 0" v-on:click="paginationPrevious()" v-on:mouseover="setTableTitleText('Previous')" v-on:mouseout="setTableTitleText('')" class="fas fa-angle-double-left"></i>

				<span>Showing Items: {{ firstItemPosition }} - {{ lastItemPosition }} of {{ currentRowTotal }}</span>

				<i v-if="currentPerPage > 0" v-on:click="paginationNext()" v-on:mouseover="setTableTitleText('Next')" v-on:mouseout="setTableTitleText('')" class="fas fa-angle-double-right"></i>
			</div>
			<!-- END   : spTable Footer Pagination -->

		</div>
		<!-- END   : spTable Footer -->

	</div>
	<!-- END   :  spTable Container -->

</template>

<script>
import spListMix    from '../../mixins/spListMix';
import { mapState } from 'vuex';

export default
{
	// Vue name for this component.
    name : 'spTable',

	// Vue mixin components this component uses.
	mixins :
	[
		spListMix
	],

	// Properties passed in when the component is called.
	props :
	{
		// SharePoint list name to retrieve data from.
		listName :
		{
			type    : String,
			default : ''
		},

		// Columns of the SharePoint list to display.
		columns :
		{
			type    : Array,
			default : () => []
		},

		// Indicates the column data will be taken from to display along the title bar when hovering over a row.
		columnTitle :
		{
			type    : String,
			default : ''
		},

		// Inidicates the columns which are filterable.
		filterColumns :
		{
			type    : Array,
			default : () => []
		},

		// A RegExpression representing the characters which will be stripped away form the search term.
		restrictedSearchCharacters :
		{
			type    : RegExp,
			default : () => /[\\<>/{}\[\]()\-=+\'\"^,]/g
		},

		// Enables or disables the search feature.
		search :
		{
			type    : Boolean,
			default : true
		},

		// Enables or disables the refresh feature.
		refresh :
		{
			type    : Boolean,
			default : true
		},

		// Enables or disables the filter feature.
		filter :
		{
			type    : Boolean,
			default : true
		},

		// Enables or disables the addNew feature.
		addNew :
		{
			type    : Boolean,
			default : true
		}
	},

	// Local variables to this component.
	data ()
	{
		return {
			// Holds the table header title text. Typically used when hovering over a function.
			tableTitle    : '',

			// Tells the spListMix mixing to not process anything on create.
			processOnCreatedSPListMix : false,

			// Indicates the number of rows in the current view.
			listRawRowTotal : 0,

			// Indicates the current sorted column.
			currentSortColumnIndex : 0,

			// Indicates the current sort direction.
			currentSortDirection : 'ascending',

			// Stores the items per page options. The number '-1' means "All".
			perPageOptions : [10, 20, 50, -1],

			// Indicates the current max items to show on a page. This should be the first value in perPageOptions array.
			currentPerPage : 20,

			// Indicates the current page user is on.
			currentPage : 1,

			// Holds a copy of the prop "columns" along with their processed type.
			processedColumnType : {},

			// Holds a copy of the list data from the store when all the list tasks are complete.
			tableRawData : [],

			// Holds a copy of the list column settings from the store when all list tasks are complete.
			tableColumnSettings : [],

			// Holds the current position of the first item in the view.
			firstItemPosition : 0,

			// Holds the current position of the last item in the view.
			lastItemPosition : 0,

			// Holds the value in the search box.
			searchTerm : '',

			// Indicates if the filter pane is visible or not.
			filterPane : false,

			// Indicates if a filter is currently applied to the list.
			filterApplied : false,

			// Indicates the column which a filter is currently being selected.
			filterActiveColumn : '',

			// Holds the active filter options.
			filterOptions : {},
		}
	},

	// Executed when component is created.
	created : function ()
	{
		this.initializeList();
	},

	// Local functions available to this component.
	methods :
	{
		// Initializes the list data according to the props for list name and columns.
		initializeList : function ()
		{
			// Clear the existing data.
			this.loadListDetails = [];
			this.columnsToGet    = { [this.listName] : [] };
			this.loadListData    = [];

			// Validate list name and columns were provided.
			if ( this.listName && this.columns.length )
			{
				// Mixin (spListMix): Register the list name for details.
				this.loadListDetails.push( this.listName );

				// Mixin (spListMix): Register columns to get when retrieving list data. Send only the internal names.
				this.columnsToGet[this.listName].push( ...this.columns.map( ( column ) => { return column.internalName } ) );

				// Mixin (spListMix): Register the list name for data.
				this.loadListData.push( this.listName );

				// Mixin (spListMix): Process all the spListMix tasks based on the registered variables.
				this.processListTasks();
			}
			else
			{
				this.setMessage
				({
					title      : 'spTable Error',
					body       : 'A list name and columns are required to use the spTable component.',
					icon       : 'fas fa-times',
					iconColour : '#B71C1C',
					size       : 'medium',
					type       : 'OK'
				});

				this.showMessage();
			}
		},

		// Sets the spTable header title.
		setTableTitleText : function ( text )
		{
			this.tableTitle = text;
		},

		// Returns the sort direction. If the column is not being sorted, returns null.
		getCurrentSortDirection : function ( index )
		{
			if ( index === this.currentSortColumnIndex )
			{
				return this.currentSortDirection;
			}

			return 'notSorted';
		},

		// Sorts the row data according to the column (index) and direction.
		performSort : function ( column, index )
		{
			// If the column clicked is already being sorted, change the direction.
			if ( index === this.currentSortColumnIndex )
			{
				if ( this.currentSortDirection === 'ascending' )
				{
					this.currentSortDirection = 'decending';
				}
				else
				{
					this.currentSortDirection = 'ascending';
				}
			}
			// If a new column is clicked, sort by ascending.
			else
			{
				this.currentSortDirection   = 'decending';
				this.currentSortColumnIndex = index;
			}
		},

		// Returns a string which is outputted to the table title area depending on the column and sort.
		getSortTitleText : function ( column, index )
		{
			// If the column clicked is already being sorted, display opposite direction.
			if ( index === this.currentSortColumnIndex )
			{
				if ( this.currentSortDirection === 'ascending' )
				{
					return `Sort ${column.displayName} by Decending`;
				}
				else
				{
					return `Sort ${column.displayName} by Ascending`;
				}
			}

			// If a new column is clicked, sort by ascending.
			return `Sort ${column.displayName} by Decending`;
		},

		// Returns a string which is outputted to the table title area depending on which row is actively hovered.
		getRowTitleText : function ( row, index )
		{
			if ( this.columnTitle && row[this.columnTitle] )
			{
				return `View Item: ${ row[this.columnTitle] }`
			}

			return `View Item #${ index + 1 }`;
		},

		// Takes row SharePoint field data and returns a string for displaying on a table.
		convertSharePointData : function ( internalName, data )
		{
			// Get the type the data is associated to.
			let dataType = data.constructor.getName();

			// TEXT
			if ( dataType === 'String' )
			{
				this.processedColumnType[internalName] = 'String';

				return data;
			}

			// NUMBER
			if ( dataType === 'Number' )
			{
				this.processedColumnType[internalName] = 'String';

				return String(data);
			}

			// USER
			if ( dataType === 'SP.FieldUserValue' )
			{
				this.processedColumnType[internalName] = 'String';

				return data.get_lookupValue();
			}

			// Data type is unknown, just return the data.
			return data;
		},

		// Move to the next page in the pagination.
		paginationNext : function ()
		{
			if ( this.tableFilteredSearchedSortedData.length > ( this.currentPage * this.currentPerPage ) )
			{
				this.currentPage++;
			}
		},

		// Return to the last page in the pagination.
		paginationPrevious : function ()
		{
			if ( this.currentPage > 1 )
			{
				this.currentPage--;
			}
		},

		// Triggered each time the search box changes.
		performSearch : function ()
		{
			// Reset the current page if necessary.
			this.currentPage = 1;
		},

		// Triggers when a user selects a column in the filter options pane.
		displayFilterOptions : function ( column )
		{
			// If the clicked column for filtering is the current active - Clear it.
			if ( this.filterActiveColumn === column )
			{
				this.filterActiveColumn = '';
			}
			// Otherwise, make it active.
			else
			{
				// Close the old column options.
				this.filterActiveColumn = '';

				// Wait then open the new.
				setTimeout( () =>
				{
					this.filterActiveColumn = column;
				}, 100)
			}
		},

		// Generate the filter options.
		generateFilterOptions : function ()
		{
			this.filterActiveColumn = '';

			// Checks to see if a value exists in a array of objects.
			const checkUniqueValueObject = (filterData, value) =>
			{
				return filterData.some( (e) => e.value === value );
			}

			// For each of the columns to display.
			this.filterColumns.forEach( ( column ) =>
			{
				// Create a new key in a object which is reactive.
				this.$set(this.filterOptions, column, [] );

				// Extract only a specific column.
				let filterData = [];

				// Cycle through the data in each row and extract only the specific column.
				this.tableProcessedData.forEach( ( row ) =>
			 	{
					// Check if data exists and is not already in the filter options array.
					if ( row[column] && !checkUniqueValueObject( filterData, row[column] ) )
					{
						filterData.push
						({
							value    : row[column],
							selected : false
						});
					}
				});

				// Sort the data.
				this.filterOptions[column] = filterData.sort( ( a, b ) =>
				{
					let itemA = String(a.value).toLowerCase();
					let itemB = String(b.value).toLowerCase();

					if ( itemA < itemB )
					{
						return -1;
					}

					if ( itemA > itemB )
					{
						return 1
					}

					return 0;
				});
			});
		},

		// Processes a selected filter option.
		filterSelected : function ( column, index )
		{
			// Reset the current page if necessary.
			this.currentPage = 1;

			if ( this.filterOptions[column][index].selected )
			{
				// Creates/sets a reactive key in a object.
				this.$set( this.filterOptions[column][index], 'selected', false );
			}
			else
			{
				this.$set( this.filterOptions[column][index], 'selected', true );
			}
		},

		// Gets the appropriate class for a filter option check box.
		getFilterClass : function ( column, index )
		{
			if ( this.filterOptions[column][index].selected )
			{
				return 'spTableFilterPaneOptionsChecked';
			}

			return 'spTableFilterPaneOptionsUnchecked'
		},

		// Returns the display name of the passed column internal name.
		getColumnDisplayName : function ( internalName )
		{
			let identifiedColumn = this.columns.filter( ( column ) =>
			{
				return column.internalName === internalName
			});

			return identifiedColumn[0].displayName;
		},

		// Action for when the add new button is pressed. Calls a parent function.
		// Use v-on:AddNewItem="myFunction" in your component call to assign the event.
		addNewItem : function ()
		{
			this.$emit( 'AddNewItem' );
		},

		// Action for when a row is clicked on. Calls a parent function.
		// Use v-on:viewItem="myFunction" in your component call to assign the event.
		viewItem : function ( index, row )
		{
			this.$emit( 'ViewItem', row.employeeID );
		}
	},

	// Calculated local variables that update when states change.
	computed :
	{
		// Processes the raw data and manipulates it for the view according to SharePoint field types.
		tableProcessedData : function ()
		{
			let processedData = [];

			// If there is data to show.
			if ( this.listRawRowTotal > 0 )
			{
				// Process the data from SharePoint to simple String/Array/Number.
				this.tableRawData.forEach ( ( row ) =>
				{
					// Create a blank processed row of data.
					let processedRowData = {};

					// For each of the columns to display in the view ..
					this.columns.forEach ( ( column ) =>
					{
						// If the row column has data, process it.
						if ( row[column.internalName] !== null )
						{
							// The value will be a regular string or array -- converted from the SharePoint raw data/object.
							processedRowData[column.internalName] = this.convertSharePointData( column.internalName, row[column.internalName] );
						}
						else
						{
							processedRowData[column.internalName] = '';
						}
					});

					// Add the row to the overall processed data.
					processedData.push( processedRowData );
				});
			}

			return processedData;
		},

		// Sorts the table processed data according to the current sort paramenters.
		tableFilteredSearchedSortedData : function ()
		{
			let sortedData = this.tableProcessedData;

			// Process filters.
			if ( this.filtersExist )
			{
				let boiledFilterOptions = {};

				this.filterColumns.forEach( ( column ) =>
				{
					if( typeof( this.filterOptions[column] ) !== 'undefined' )
					{
						// Reduce the filtered options to just those that are selected.
						boiledFilterOptions[column] = this.filterOptions[column].filter( ( item ) =>
						{
							return item.selected === true;
						});

						// If a filter exists for the given column.
						if( boiledFilterOptions[column].length > 0 )
						{
							sortedData = sortedData.filter( ( item ) =>
							{
								// Look through the boiled down filter options per column and see if it matches the processed data.
								return boiledFilterOptions[column].find( ( filterValue ) =>
								{
									if ( filterValue.value === String( item[column] ) )
									{
										return true;
									}

									return false;
								});
							});
						}
					}
				});
			}

			// If a search string exists, apply the search string and reprocess.
			if ( this.searchTerm )
			{
				sortedData = sortedData.filter ( ( row ) =>
				{
					// Define the search pattern for various column type date: String/Number/Array.
					const searchAlgorithm = ( column ) =>
					{
						// Search a column which is made up of an array or strings.
						if ( this.processedColumnType[column.internalName] === 'Array' )
						{

						}
						// Search a column which is made up of strings or numbers.
						else
						{
							let searchText      = String( row[column.internalName] ).toLowerCase();
							let cleanSearchTerm = this.cleanSearchTerm.toLowerCase();

							// Casts number variables to strings to make the searchable with Strings.
							if ( searchText.includes( cleanSearchTerm ) )
							{
								return true;
							}
						}

						return false;
					};

					// If the search algorithm function returns true, that row is kept (not filtered).
					return this.columns.find( searchAlgorithm );
				});
			}

			if ( this.listRawRowTotal > 0 )
			{
				let currentSortColumn    = this.columns[this.currentSortColumnIndex].internalName;
				let currentSortDirection = this.currentSortDirection;
				let columnSettingData    = this.tableColumnSettings;

				sortedData.sort( ( a, b ) =>
				{
					// Sort the data with null values.
					const sortByNull = ( x, y ) =>
					{
						if ( !x[currentSortColumn] )
						{
							return -1 * ( ( currentSortDirection === 'decending' ) ? -1 : 1 );
						}

						if ( !y[currentSortColumn] )
						{
							return 1 * ( ( currentSortDirection === 'decending' ) ? -1 : 1 );
						}
					}

					// Sort the data by string.
					const sortByString = ( x, y ) =>
					{
						let stringX = x[currentSortColumn].toUpperCase();
						let stringY = y[currentSortColumn].toUpperCase();

						if ( stringX < stringY )
						{
							return -1 * ( ( currentSortDirection === 'decending' ) ? -1 : 1 );
						}

						if ( stringX > stringY )
						{
							return 1 * ( ( currentSortDirection === 'decending' ) ? -1 : 1 );
						}

						// Strings are the same.
						return 0;
					};

					// Sort the data by number.
					const sortByNumber = ( x, y ) =>
					{
						return ( x[currentSortColumn] - y[currentSortColumn] ) * ( ( currentSortDirection === 'decending' ) ? -1 : 1 );
					};

					// Sort the data by array. Sorts the first string in the array.
					const sortByArray = ( x, y ) =>
					{
						let stringX = x[currentSortColumn][0].toUpperCase();
						let stringY = y[currentSortColumn][0].toUpperCase();

						if ( stringX < stringY )
						{
							return -1;
						}

						if ( stringX > stringY )
						{
							return 1;
						}

						// Strings are the same.
						return 0;
					};

					// Check for nulls.
					if ( !a[currentSortColumn] || !b[currentSortColumn] )
					{
						return sortByNull ( a, b );
					}

					// If the column is a string, sort using string function.
					if ( this.processedColumnType[currentSortColumn] === 'String' )
					{
						return sortByString ( a, b );
					}

					// If the column is a Number, sort using Number function.
					if ( this.processedColumnType[currentSortColumn] === 'Number' )
					{
						return sortByNumber ( a, b );
					}

					// If the column is a Array, sort using Array function.
					if ( this.processedColumnType[currentSortColumn] === 'Array' )
					{
						return sortByArray ( a, b );
					}
				});

			}

			return sortedData;
		},

		// Takes the sorted data (tableFilteredSearchedSortedData) and returns only the rows which should be viewed based on the current page and per page values.
		tablePaginatedData : function ()
		{
			let paginatedData = this.tableFilteredSearchedSortedData;

			// Update the positions.
			this.firstItemPosition = 1;
			this.lastItemPosition  = this.listRawRowTotal;

			if ( this.listRawRowTotal > 0 )
			{
				// Initial start position for page 1 (Beginning of sorted array stack).
				let startPosition = 0;

				// Initial end position, defaults for showing all items.
				let endPosition = paginatedData.length;

				// If user has not selected "All". Slice the paginated array to only hold what should be shown.
				if ( this.currentPerPage > 0 )
				{
					// If the page is greater than one, calculate the starting position.
					if ( this.currentPage > 1 )
					{
						startPosition = ( this.currentPage - 1 ) * this.currentPerPage;
					}

					// Calculate the end position based on the current page and per page values.
					endPosition = ( this.currentPage * this.currentPerPage );

					// Adjust the endPosition if it exceeds the list size.
					if ( endPosition > paginatedData.length )
					{
						endPosition = paginatedData.length;
					}

					// Cut the paginated down to only what should be viewed.
					paginatedData = paginatedData.slice( startPosition, endPosition );
				}

				// Update the positions.
				this.firstItemPosition = startPosition + 1;
				this.lastItemPosition  = endPosition;
			}

			return paginatedData;
		},

		// Indicates the current total of viewable rows.
		currentRowTotal : function ()
		{
			return this.tableFilteredSearchedSortedData.length;
		},

		// Cleaned search term using the restricted characters pattern.
		cleanSearchTerm : function ()
		{
			return String(this.searchTerm).trim().replace( this.restrictedSearchCharacters, '' );
		},

		// Returns true if a filter has been selected.
		filtersExist : function ()
		{
			let filterFound         = false;
			let boiledFilterOptions = {};

			this.filterColumns.forEach( ( column ) =>
			{
				// Ensure the filter exists.
				if( typeof( this.filterOptions[column] ) !== 'undefined' )
				{
					// Check all the filter options for one selected.
					this.filterOptions[column].forEach( ( item ) =>
					{
						if( item.selected === true )
						{
							filterFound = true;

							return;
						}
					});
				}
			});
			return filterFound;
		}
	},

	// Vue watches which execute on a variable change.
	watch :
	{
		// Executed when the list tasks changes.
		spListTasksComplete : function ( to, from )
		{
			// Logic for when list tasks are completed.
			if ( from === false && to === true )
			{
				// Create a local copy of the store to process from.
				this.tableRawData        = this.$store.getters['list/dataByListTitle'](this.listName);
				this.tableColumnSettings = this.$store.getters['list/columnsByListTitle'](this.listName);

				if ( this.tableRawData )
				{
					// Denote the total returned rows.
					this.listRawRowTotal = this.tableRawData.length;

					// Generate the filter options.
					this.generateFilterOptions();
				}
			}
		},
	}
}
</script>

<style lang="scss">

</style>
