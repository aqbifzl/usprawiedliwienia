start_msg = "Dzień dobry, chciałbym usprawiedliwić syna w dniach"
after_date_msg_singular = "o godzinnie"
after_date_msg_plural = "w godzinach"

marks = Array.from(document.getElementsByClassName("ocena"))
date_regex = /(\d{4}-\d{2}-\d{2}) \((.*?)\)/;
hour_regex = /Godzina lekcyjna: (\d+)/;
counter = 0
hours_by_date = new Map()

add_to_hashmap = (date, hour) => {
	if(!hours_by_date.has(date)){
    hours_by_date.set(date, [])
  }
	hours_by_date.get(date).push(hour)
}

marks.forEach(mark => {
	let mark_type = mark.innerText
	if(mark_type != "nb")
		return
	let mark_content = mark.title
	let mark_date = mark_content.match(date_regex)[0]
	let lession_hour = mark_content.match(hour_regex)[1]
	++counter
	add_to_hashmap(mark_date, lession_hour)
})

buffer = start_msg + '\n'


hours_by_date.forEach((value, key) => {
	buffer += `${key} ${value.length > 1 ? after_date_msg_plural :after_date_msg_singular } ${value}\n`
})

console.log(buffer)
