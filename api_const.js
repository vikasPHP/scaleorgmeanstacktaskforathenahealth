/*API defination is given here*/

'use static'
const apis = {
   'DISPLAY_ALL_DATA': '/display_all_data',
   'DISPLAY_LIMIT_30_DATA': '/display_limit_30_data',
   'SORTING_ACS_DESC': '/sorting_acs_desc',
   'FILTER_BY_ALL_COLUMN': '/filter_by_all_column',
   'GROUPBY_PROVIDE_SUBTOTAL': '/groupby_provide_subtotal',
   'DISPLAY_CUSTOM_CHART': '/display_custom_chart'
};

const message = {
	'STATUS_MSG_1001': 'Records are not available',
	'STATUS_MSG_1002': 'are getting less or exceed',
	'STATUS_MSG_1003': 'can not be empty or null'
}

module.exports = {
  api: apis,
  messages: message
}
