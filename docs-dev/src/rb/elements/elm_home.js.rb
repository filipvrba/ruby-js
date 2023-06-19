export default class ElmHome < HTMLElement
  def initialize
    super
    @h_hash_change = lambda do
      enter_hash()
    end
    
    init_elm()
    enter_hash()
  end

  def connectedCallback()
    window.addEventListener('hashchange', @h_hash_change) 
  end

  def disconnectedCallback()
    window.removeEventListener('hashchange', @h_hash_change) 
  end

  def init_elm()
    template = """
    <div class='py-3'>
      <elm-header></elm-header>
      <main>
        <elm-content></elm-content>
      </main>
      <elm-footer></elm-footer>
    </div>
    """

    self.innerHTML = template
  end

  def enter_hash()
    if location.hash
      endpoint(location.hash.replace('#', ''))
    else
      endpoint('0-introduction')
    end
  end

  def endpoint(page_name)
    page_name_split = page_name.split('-')
    category_number = Number(page_name_split[0])
    case category_number
    when 0  ## Html page
      page_name_camel_no_category = page_name_split.map do |e, i|
        if i > 1
          e.charAt(0).toUpperCase() + e.slice(1)
        elsif i > 0
          e
        end
      end.join('')
      nav_item_category_click(page_name_camel_no_category)
    when 1  # Docs API
      content_id = page_name_split[1]
      nav_item_content_click(content_id)
    end
  end
end