// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// For license information, please see license.txt


frappe.query_reports["Company Monthly Attendance Sheet"] = {
	"filters": [
		{
			"fieldname": "from_date",
			"label": __("From Date"),
			"fieldtype": "Date",
			"reqd": 1 ,
			"default": frappe.datetime.month_start(),
		},
		{
			"fieldname":"to_date",
			"label": __("To Date"),
			"fieldtype": "Date",
			"reqd": 1,
			"default": frappe.datetime.month_end(),
		},
		{
			"fieldname":"employee",
			"label": __("Employee"),
			"fieldtype": "Link",
			"options": "Employee",
			get_query: () => {
				var company = frappe.query_report.get_filter_value('company');
				return {
					filters: {
						'company': company
					}
				};
			}
		},
		{
			"fieldname":"company",
			"label": __("Company"),
			"fieldtype": "Link",
			"options": "Company",
			"default": frappe.defaults.get_user_default("Company"),
			"reqd": 1
		},
		{
			"fieldname":"group_by",
			"label": __("Group By"),
			"fieldtype": "Select",
			"options": ["","Branch","Grade","Department","Designation"]
		}
	],
	formatter: function(value, row, column, data, default_formatter) {
		value = default_formatter(value, row, column, data);
		const group_by = frappe.query_report.get_filter_value('group_by');

		if ((group_by && column.colIndex > 3) || (!group_by && column.colIndex > 2)) {
			if (value == 'P' || value == 'WFH')
				value = "<span style='color:green'>" + value + "</span>";
			else if (value == 'A')
				value = "<span style='color:red'>" + value + "</span>";
			else if (value == 'HD')
				value = "<span style='color:orange'>" + value + "</span>";
			else if (value == 'L')
				value = "<span style='color:#318AD8'>" + value + "</span>";
		}

		return value;
	}
}