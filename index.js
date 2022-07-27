const fs = require("fs")
const os = require("os")

const ducky = [
	"            ",
	"     (o\x1b[33m<\x1b[0m    ",
	"  \x1b[34m~~\x1b[0m<__)\x1b[34m~~\x1b[0m  ",
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

async function start() {
	var help = process.argv.includes("-h") || process.argv.includes("--help")
	var flatten = process.argv.includes("-f") || process.argv.includes("--flatten")
	var shortened = process.argv.includes("-s") || process.argv.includes("--shorten")

	if (help) {
		console.log("ducker is a simple system fetcher. It can be called by default with no addition arguments as follows: ducker")
		console.log()
		console.log("Optional Arguments")
		console.log("     -h/--help: Prints this help menu")
		console.log("  -f/--flatten: Outputs horizontally as opposed to vertically")
		console.log("  -s/--shorten: Minifies output slightly")
		return
	}

	if (!flatten) ducky.forEach(line => console.log(line))
	
	console.log("\n%s%s %s",
		flatten ? ducky[0] : " ",
		shortened ? "" : "user:",
		os.userInfo().username
	)

	console.log("%s%s %s",
		flatten ? ducky[1] : " ",
		shortened ? "" : " sys:",
		os.hostname()
	)

	console.log("%s%s %s\n",
		flatten ? ducky[2] : " ",
		shortened ? "" : "  os:",
		await get_os()
	)
}

start()
