const fs = require("fs")
const os = require("os")

const ducky = [
	"        ",
	"   (o\x1b[33m<\x1b[0m  ",
	"\x1b[34m~~\x1b[0m<__)\x1b[34m~~\x1b[0m",
]

async function get_distro() {
	return new Promise((resolve, reject) => {
		fs.readFile("/etc/os-release", "utf8", (err, data) => {
			if (err) throw err

			const lines = data.split("\n")
			lines.forEach((line) => {
				words = line.split("=")
				if(words.length > 0) {
					if(words[0] == "ID") return resolve(words[1])
				}
			})

			resolve("linux")
		})
	})
}

async function get_os() {
	switch(os.platform()) {
		case "linux": return await get_distro()
		case "darwin": return "macOS"
		case "win32": return "windows"
		case "openbsd":
		case "freebsd": return "bsd"
		case "android": return "android"
		default: return "unknown"
	}
}

function align_center(text, size, force_text_size=0) {
	padding_size = force_text_size == 0 ? (size - text.length) / 2 : (size - force_text_size) / 2
	extra_space = false

	if (padding_size < 0) return console.log("Error: Attempted to align text in a space it does not fit! Details: text '%s' couldn't fit in %d spaces!", text, size)

	if (typeof(padding_size) == "float") {
		extra_space = true
		padding_size = Math.floor(padding_size)
	}
	
	return " ".repeat(padding_size) + text + " ".repeat(padding_size) + (extra_space ? " " : "")
}

function largest_of(array) {
	return array.sort(
		function(a, b) {
			return b.length - a.length
		}
	)[0]
}

async function start() {
	var help = process.argv.includes("-h") || process.argv.includes("--help")
	var flatten = process.argv.includes("-f") || process.argv.includes("--flatten")
	var shortened = process.argv.includes("-s") || process.argv.includes("--simple")
	var center = process.argv.includes("-c") || process.argv.includes("--center")

	var username = os.userInfo().username
	var hostname = os.hostname()
	var opsys = await get_os()

	if (help) {
		console.log("ducker is a simple system fetcher. It can be called by default with no addition arguments as follows: ducker")
		console.log()
		console.log("Optional Arguments")
		console.log(" [-h/--help]    : Prints this help menu")
		console.log(" [-f/--flatten] : Outputs horizontally as opposed to vertically (default)")
		console.log(" [-s/--simple]  : Minifies output slightly")
		console.log(" [-c/--center]  : Center aligns output")
		return
	}

	if (center) width = (shortened ? 0 : 6) + largest_of([ducky[0], username, hostname, opsys]).length
	if (!flatten) ducky.forEach(line => console.log(center ? align_center(line, width, ducky[0].length): line))

	//console.log(ducky[0].escape())
	line = (shortened ? "" : "user: ") + os.userInfo().username
	console.log("\n%s%s",
		flatten ? ducky[0] + " " : "",
		center ? align_center(line, width) : line
	)

	line = (shortened ? "" : "sys: ") + os.hostname()
	console.log("%s%s",
		flatten ? ducky[1] + " " : "",
		center ? align_center(line, width) : line
	)

	line = (shortened ? "" : "os: ") + await get_os()
	console.log("%s%s\n",
		flatten ? ducky[2] + " " : "",
		center ? align_center(line, width) : line
	)
}

start()
