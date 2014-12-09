(function () {
	$("table[data-graph=box-and-whisker]").each(function () {
		var min = parseFloat($(this).find('[data-role=min]').text()),
			lowerQ = parseFloat($(this).find('[data-role=lower-q]').text()),
			median = parseFloat($(this).find('[data-role=median]').text()),
			upperQ = parseFloat($(this).find('[data-role=upper-q]').text()),
			max = parseFloat($(this).find('[data-role=max]').text());

		// Calculations
		var scaleMin = Math.min(0, min),
			scaleMax = Math.max(1, max),
			outerRange = scaleMax - scaleMin,
			innerRange = max - min,
			innerOffset = min - scaleMin,
			medianOffset = median - scaleMin,
			quartileOffset = lowerQ - min,
			quartileRange = upperQ - lowerQ,
			distance = max / 5;

		var html = ["<div class='grapher-container grapher-whisker-container'>"];

		// Box and Whisker
		html.push("<div class='grapher-whisker-wrapper'>");
		html.push("<div class='grapher-whisker' style='width:", (innerRange / scaleMax) * 100,  "%; left:", (min / scaleMax) * 100, "%'></div>");
		
		if (quartileRange > 0) {
			html.push("<div class='grapher-box' style='width:", (quartileRange / scaleMax) * 100, "%; left:", (lowerQ / scaleMax) * 100, "%'></div>");
			html.push("<div class='grapher-whisker-median' style='left:", (medianOffset / scaleMax) * 100, "%'></div>");
		}
		
		html.push("</div>");

		// Scale
		html.push("<div class='grapher-scale'>");

		// Major Ticks
		for (var val = 0; val <= max; val += distance) {
			var val = Math.round(val * 10) / 10;
			html.push("<div class='grapher-scale-tick' style='left:", (val / scaleMax) * 100, "%'>", val, "</div>");
		}

		// Minor Ticks
		for (var val = 0; val <= max; val += distance / 5) {
			html.push("<div class='grapher-scale-tick grapher-scale-minor-tick' style='left:", (val / scaleMax) * 100, "%'>", val, "</div>");
		}
		html.push("</div>");

		html.push("</div>");
		$(this).before(html.join(""));
	});

	var colours = ["#468966", "#FFF0A5", "#FFB03B", "#B64926", "#8E2800"];

	$("table[data-graph=donut], table[data-graph=pie]").each(function () {
		var data = [];

		var index = 0;
		$(this).find("tr").each(function () {
			var columns = $(this).children("td");
			console.log(columns);
			data.push({
				name: $(columns[0]).text(),
				value: parseFloat($(columns[1]).text()),
				colour: colours[index++]
			});
		});

		console.log(data);
		var html = ["<div class='grapher-container grapher-pie-container'>"];

		// Legend
		html.push("<div class='grapher-pie'>");
		html.push("<ul class='grapher-legend'>");
		for (var i = 0; i < data.length; i++) {
			html.push(
			"<li>", 
				"<div class='grapher-legend-badge' style='background: ", 
					data[i].colour, "'></div>",
					data[i].name,
			"</li>");
		}
		html.push("</ul>");

		// Graph
		html.push("<ul class='grapher-pie-graph'>");
		var offset = 0;
		for (var i = 0; i < data.length; i++) {
			var extra = i === data.length - 1 ? 0 : 1, // To remove the gaps
				degrees = data[i].value * 3.6,
				className = (degrees + extra) > 180 ? "grapher-pie-segment-large" : "grapher-pie-segment";

			if (i === 0) {
				extra++;
				offset--;
			}


			html.push("<li class='", className, "' style='-webkit-transform: rotate(", offset, "deg)'>", 
				"<div class='grapher-pie-segment-start' style='background: ", data[i].colour, "; -webkit-transform: rotate(", degrees + extra, "deg);'></div>",
				"<div class='grapher-pie-segment-end' style='background: ", data[i].colour, "'></div>",
			"</li>");

			if (i === 0) {
				offset++;
			}
			offset += degrees;
		}

			if ($(this).data("graph") === "donut") {
				html.push("<li class='grapher-donut-centre'></li>");
			}
		html.push("</ul>");

		html.push("</div>");
		// html.push("</div>");
		$(this).before(html.join(""));
	});
})();