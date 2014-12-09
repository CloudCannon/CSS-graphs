## CSS Graphs
Creates graphs from HTML tables. Graphs are all HTML and CSS, JS used to read the table data and generate the HTML.

### Box and Whisker
Data elements on td elements are important
	<table data-graph="box-and-whisker">
		<tr>
			<td>Min</td>
			<td data-role="min">1</td>
		</tr>
		<tr>
			<td>Lower Quartile</td>
			<td data-role="lower-q">5</td>
		</tr>
		<tr>
			<td>Median</td>
			<td data-role="median">7</td>
		</tr>
		<tr>
			<td>Upper Quartile</td>
			<td data-role="upper-q">8</td>
		</tr>
		<tr>
			<td>Max</td>
			<td data-role="max">11</td>
		</tr>
	</table>
	

### Donut
Table must be formatted as key then value as two separeate td elements.
	<table data-graph="donut">
		<tr>
			<td>Half</td>
			<td>50%</td>
		</tr>
		<tr>
			<td>Half</td>
			<td>50%</td>
		</tr>
	</table>

### Pie
Same as the Donut.
	<table data-graph="pie">
		<tr>
			<td>Third</td>
			<td>33.3%</td>
		</tr>
		<tr>
			<td>Third</td>
			<td>33.3%</td>
		</tr>
		<tr>
			<td>Third</td>
			<td>33.3%</td>
		</tr>
	</table>
