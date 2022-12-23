use engine::nmkill::{delete_node_modules, find_node_modules};
use std::{env, path::Path};
fn main() -> std::io::Result<()> {
    let args: Vec<String> = env::args().collect();
    let path = args.get(1).unwrap();
    let function = args.get(2).unwrap();
    let path = Path::new(path);
    if function == "find" {
        if path.is_dir() {
            let node_modules = find_node_modules(path, 0);
            if node_modules.len() == 0 {
                println!("No node_modules found");
                std::process::exit(0);
            }
            // for node_module in node_modules {
            //     println!("{:?}", node_module);
            // }
        } else {
            println!("The path {:?} is not a directory", path);
            std::process::exit(1);
        }
    } else if function == "delete" {
        if path.is_dir() {
            delete_node_modules(path)?;
            println!("Deleted {:?}", path);
        } else {
            println!("The path {:?} is not a directory", path);
            std::process::exit(1);
        }
    } else {
        println!("The function {:?} is not supported", function);
        std::process::exit(1);
    }

    Ok(())
}
