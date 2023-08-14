import React from "react";

function renderOptions(options, level = 0) {
	return options.map((option) => (
		<React.Fragment key={option.value}>
			<option value={option.value}>
				{level > 0 && "\u00A0".repeat(level * 4)}
				{option.label}
			</option>
			{option.subcategories &&
				renderOptions(option.subcategories, level + 1)}
		</React.Fragment>
	));
}

export default renderOptions;
