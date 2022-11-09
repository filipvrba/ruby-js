module Description
  module_function

  def get_readme(parag_count)
    path_ra = File.expand_path("..", __dir__)
    path_fa = File.join(path_ra, 'README.md')
    content = File.open(path_fa).read.split("\n")[1..parag_count + 1]
    content.join("\n")
  end
end
