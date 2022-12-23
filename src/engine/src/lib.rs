pub mod nmkill {
    use std::fs;
    use std::path::Path;
    use std::path::PathBuf;
    use filesize::PathExt;

    pub fn delete_node_modules(path: &Path) -> std::io::Result<()> {
        fs::remove_dir_all(path)?;
        Ok(())
    }
    pub fn get_folder_size(path: &Path) -> Result<u64, std::io::Error>{
        println!("Path: {:?}", path);
        let metadata = fs::metadata(path).unwrap();
        let size = metadata.len();
        println!("Size: {:?}", size);
        let real_size=path.size_on_disk()?;
        println!("Real Size: {:?}", real_size);
        Ok(real_size)
    }

    pub fn find_node_modules(path: &Path, depth: u8) -> Vec<PathBuf> {
        if depth > 3 {
            return Vec::new();
        }
        let mut node_modules = Vec::new();
        for entry in fs::read_dir(path).unwrap() {
            let entry = entry.unwrap();
            let path = entry.path();
            if path.is_dir() {
                if path.file_name().unwrap() == "node_modules" {
                    println!("{:?} {:?}", path.display(),get_folder_size(&path));
                    node_modules.push(path);
                } else {
                    node_modules.append(&mut find_node_modules(&path, depth + 1));
                }
            }
        }
        node_modules
    }
}
