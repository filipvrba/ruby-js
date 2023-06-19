export default class ElmContent < HTMLElement
  def initialize
    super
    
    @data = DOCS_API
    init_elm(@data)
    window.nav_item_content_click = nav_item_content_click
    window.nav_item_category_click = nav_item_category_click
  end

  def list_path()
    list = []
    (0...@data.length).each do |i|
      info = @data[i]

      unless list.includes(info.path)  
        list << info.path
      end
    end
    return list.sort()
  end

  def list_data(path)
    list = []
    (0...@data.length).each do |i|
      info = @data[i] 
      if info.path == path
        list << [info, i]
      end
    end
    return list
  end

  def init_elm(data)
    l_list_data = lambda do |path|
      template = []
      list_data(path).each do |info, i| 
        name = info['comments_with_keywords'][0].name
        name_file_no_suffix = info.file.replace('.rb', '')
        href = "#{info.path}/#{name_file_no_suffix}"
        li_item_dom = """
          <ul class='nav-item'>
            <a class='nav-link' href='##{href}' onclick='navItemContentClick(#{i})'>#{name}</a>
          </ul>
        """
        template << li_item_dom
      end
      return template.join("\n")
    end

    @list_path = list_path()
    l_list_item = lambda do
      template = []
      @list_path.each do |path|
        ul_item_dom = """
          <ul class='nav-item'>
            <span class='nav-link'>#{path}</span>
            #{l_list_data(path)}
          </ul>
        """
        template << ul_item_dom
      end
      return template.join("\n")
    end

    template = """
    <div class='container-fluid'>
      <div class='row'>
        <!-- Sidebar -->
        <div class='col-sm-3 col-lg-2'>
          <nav class='sidebar'>
            <ul class='nav flex-column'>
              <li class='nav-item'>
                <a class='nav-link active' href='#getting-started' onclick='navItemCategoryClick(\"gettingStarted\")'>Getting Started</a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='#api-reference' onclick='navItemCategoryClick(\"apiReference\")'>API Reference</a>
                #{l_list_item()}
              </li>
            </ul>
          </nav>
        </div>

        <div class='col-sm-9 col-lg-10'>
          <elm-main-content></elm-main-content>
        </div>
      </div>
    </div>
    """

    self.innerHTML = template
  end

  def nav_item_content_click(id)
    Events.send(EVENTS.nav_item_content, @data[id])
  end

  def nav_item_category_click(file)
    Events.send(EVENTS.nav_item_content, file)
  end
end