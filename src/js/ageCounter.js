'use strict';

class ageCounter{
	constructor(date){
		try{
			this.countingDate = new Date(date);
			if(this.countingDate == "Invalid Date") throw new ReferenceError("Invalid DateTime is provided"); 
		}catch(e) {
			console.error(e);
		}
	}

	today(){
		return new Date();
	}

	updateParameters(){
		let today = this.today(),
			start = new Date(0),
			diff;

		if(today >= this.countingDate){
			diff = new Date(today - this.countingDate);
		}else{
			diff = new Date(this.countingDate - today);
		}

		this.year = diff.getUTCFullYear() - start.getUTCFullYear();
		this.month = diff.getUTCMonth() - start.getUTCMonth();
		this.date = diff.getUTCDate() - start.getUTCDate();
		this.hours = diff.getUTCHours() - start.getUTCHours();
		this.minutes = diff.getUTCMinutes() - start.getUTCMinutes();
		this.seconds = diff.getUTCSeconds() - start.getUTCSeconds();
		this.milliseconds = diff.getUTCMilliseconds() - start.getUTCMilliseconds();
	}

	getYear(updated = true){
		if(updated) this.updateParameters();
		return this.year;
	}

	getMonth(updated = true){
		if(updated) this.updateParameters();
		return this.month;
	}

	getDate(updated = true){
		if(updated) this.updateParameters();
		return this.date;
	}

	getHours(updated = true){
		if(updated) this.updateParameters();
		return this.hours;
	}

	getMinutes(updated = true){
		if(updated) this.updateParameters();
		return this.minutes;
	}

	getSeconds(updated = true){
		if(updated) this.updateParameters();
		return this.seconds;
	}

	getMilliseconds(updated = true){
		if(updated) this.updateParameters();
		return this.milliseconds;
	}

	getLeapDayCount(){
		let firstLeapYear = this.countingDate.getFullYear(), 
			current = this.today(),
			currentYear = current.getFullYear();


		while(firstLeapYear%4 != 0){
			firstLeapYear++;
		}

		if(currentYear%4 == 0 && current.getMonth() <= 1){
			// this year is leap year and leap day not came yet
			current-=4;
		}
		if(this.countingDate.getFullYear()%4 == 0 && this.countingDate.getMonth() > 1){
			// born year was leap year but missed the leap day
			firstLeapYear+=4;
		}

		return parseInt((currentYear - firstLeapYear)/4 + 1);
	}

	getTotalDays(){
		this.updateParameters();

		var monthDays = [31,28,31,30,31,30,31,31,30,31,30,31],
			dayInMonths = eval(monthDays.splice(0, this.month).join('+'));

		return (
			this.year * 365 +
			dayInMonths +
			this.getLeapDayCount() +
			this.date
		);
	}

	getTotalHours(){
		return (
			this.getTotalDays() * 24 +
			this.hours
		);
	}

	getTotalMinutes(){
		return (
			this.getTotalHours() * 60 +
			this.minutes
		)
	}

	getTotalSeconds(){
		return (
			this.getTotalMinutes() * 60 +
			this.seconds
		)
	}
}
