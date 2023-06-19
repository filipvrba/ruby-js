import 'gettingStarted', '../../html/getting_started.html?raw'
import 'apiReference', '../../html/api_reference.html?raw'
import 'introduction', '../../html/introduction.html?raw'

export default class ElmMainContent < HTMLElement
  def initialize
    super
    @h_nic = lambda do |e|
      is_api = typeof(e.detail) == 'object'
      change_content(e.detail, is_api)
    end
    @html = {
      getting_started: getting_started,
      api_reference: apiReference,
      introduction: introduction
    }
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
    <div class='container'>
      <h1>#{first_keyword.name}</h1>
      
      <ul class='nav flex-column'>
        <li class='nav-item'>
          <h3 style='padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);'>#{first_keyword.keyword}</h3>
        </li>
        <li class='nav-item'>
          <a class='nav-link active' href='#{GH_PROFILE_URL}/#{path_file}' target='_blank'>#{path_file}</a>
        </li>
      </ul>
      <br>
      <p class=''>#{first_keyword.comment}</p>
      <br>
      #{l_comments_keywords()}
    </div>
    """

    self.innerHTML = template
  end

  def init_html(content_html)
    content_html = content_html
      .gsub('#{GH_PROFILE_URL}', GH_PROFILE_URL.replace('/blob/main', ''))
      .replace('#{DOCS_API_VERSION}', DOCS_API_VERSION)

    self.innerHTML = content_html
  end

  def change_content(info, is_api)
    if is_api
      init_elm(info)
    else
      init_html(@html[info])
    end
  end
end