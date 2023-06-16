export default class ElmMainContent < HTMLElement
  def initialize
    super
    @h_nic = lambda { |e| change_content(e.detail) }
    
    # init_elm()
  end

  def connectedCallback()
    document.add_event_listener(EVENTS.nav_item_content, @h_nic)
  end

  def disconnectedCallback()
    document.remove_event_listener(EVENTS.nav_item_content, @h_nic)
  end

  def init_elm(info)
    l_comments_keywords = lambda do
      template = []
      (1...info['comments_with_keywords'].length).each do |i|
        comments_keywords = info['comments_with_keywords'][i]
        template_dom = """
        <div class=''>
          <h4>#{comments_keywords.keyword} #{comments_keywords.name}</h4>
          <p>#{comments_keywords.comment}</p>
          <br>
        <div>
        """
        template << template_dom
      end
      template.join("\n")
    end

    path_file = "#{info.path}/#{info.file}"
    first_keyword = info['comments_with_keywords'][0]
    template = """
      <h1>#{first_keyword.name}</h1>
      <h3>#{first_keyword.keyword}</h3>
      <p>#{path_file}</p>
      <br>
      <p class=''>#{first_keyword.comment}</p>
      <hr>
      #{l_comments_keywords()}
    """

    self.innerHTML = template
  end

  def change_content(info)
    init_elm(info)
  end
end