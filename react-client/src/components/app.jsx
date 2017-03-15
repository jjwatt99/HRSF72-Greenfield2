import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class View extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		//some states	
		}
	}

	render() {
		return (<div>
			<div class="clasp hole-left"></div>
			<div class="clasp hole-right"></div>
			<div class="hole hole-left"></div>
			<div class="hole hole-right"></div>
			<div id="month">« March 2012 »</div>
			<div id="days">
				<table class="days">
					<tr>
						<td>SUN</td>
						<td>MON</td>
						<td>TUE</td>
						<td>WED</td>
						<td>THU</td>
						<td>FRI</td>
						<td>SAT</td>
					</tr>
				</table>
			</div>
			<table class="day">
				<tr>
					<td class="old-month">26</td>
					<td class="old-month">27</td>
					<td class="old-month">28</td>
					<td class="old-month">29</td>
					<td>1</td>
					<td>2</td>
					<td class="selected">3</td>
				</tr>
				<tr>
					<td>4</td>
					<td class="appoint">5</td>
					<td>6</td>
					<td>7</td>
					<td>8</td>
					<td>9</td>
					<td>10</td>
				</tr>
				<tr>
					<td>11</td>
					<td>12</td>
					<td>13</td>
					<td>14</td>
					<td>15</td>
					<td>16</td>
					<td>17</td>
				</tr>
				<tr>
					<td>18</td>
					<td>19</td>
					<td>20</td>
					<td>21</td>
					<td class="appoint">22</td>
					<td class="appoint">23</td>
					<td>24</td>
				</tr>
				<tr>
					<td>25</td>
					<td>26</td>
					<td>27</td>
					<td>28</td>
					<td>29</td>
					<td>30</td>
					<td>31</td>
				</tr>
			</table>
		</div>)
	}
}

ReactDOM.render(<View />, document.getElementById('app'));