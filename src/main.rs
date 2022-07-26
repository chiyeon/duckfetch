use libmacchina::{GeneralReadout};

fn main() {
	use libmacchina::traits::GeneralReadout as _;

	let general_readout = GeneralReadout::new();

	let cpu = general_readout.cpu_model_name().unwrap();
	let username = general_readout.username().unwrap();
	let hostname = general_readout.hostname().unwrap();
	let os = general_readout.os_name().unwrap();

	println!("");
	println!("            \x1b[35m{}@{}\x1b[0m", username, hostname);
	println!("     (o\x1b[33m<\x1b[0m    {}", os);
	println!("  \x1b[34m~~\x1b[0m<__)\x1b[34m~~\x1b[0m  {}", cpu);
	println!("");
}
